import carpLogo from "./assets/logo-carp-flat-colored.png";
import mcatLogo from "./assets/logo-mcat.png";

/** The app a link host belongs to, and how to open or install it. */
export type AppConfig = {
  name: string;
  logo: string;
  logoAlt: string;
  /** Android intent URL that opens the app, falling back to the Play Store. */
  androidIntent: (link: string) => string;
  appStoreUrl: string;
};

/** Play Store listing that hands [link] to the app as its install referrer. */
const playStoreUrl = (packageName: string, link: string) =>
  `https://play.google.com/store/apps/details?id=${packageName}` +
  `&referrer=${encodeURIComponent(link)}`;

const carpStudies: AppConfig = {
  name: "CARP Studies App",
  logo: carpLogo,
  logoAlt: "CARP logo",
  androidIntent: (link) => {
    // The fallback lives inside the intent string, so it is encoded again.
    const fallbackUrl = encodeURIComponent(
      playStoreUrl("dk.cachet.carp_study_app", link),
    );
    return `intent:///#Intent;scheme=carp-studies;package=dk.cachet.carp_study_app;S.browser_fallback_url=${fallbackUrl};end`;
  },
  appStoreUrl: "https://apps.apple.com/us/app/carp-studies/id1569798025",
};

const mcat: AppConfig = {
  name: "mCAT app",
  logo: mcatLogo,
  logoAlt: "mCAT logo",
  androidIntent: (link) => {
    // The link itself, addressed to mCAT: its App Link filters claim this
    // host's root and magic-link paths, so an installed app opens straight
    // into the login. Not installed, the Play Store carries the link over as
    // the install referrer, which mCAT reads on first launch.
    const url = new URL(link);
    const fallbackUrl = encodeURIComponent(playStoreUrl("dk.carp.mcat", link));
    return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=https;package=dk.carp.mcat;S.browser_fallback_url=${fallbackUrl};end`;
  },
  appStoreUrl: "https://apps.apple.com/app/id6773671479",
};

/** mcat.app.<server> serves mCAT; every other host the CARP Studies App. */
export const appForHost = (host: string): AppConfig =>
  host.startsWith("mcat.app.") ? mcat : carpStudies;
