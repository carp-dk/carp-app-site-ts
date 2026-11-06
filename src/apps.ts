import carpLogo from "./assets/logo-carp-flat-colored.png";
import mcatLogo from "./assets/logo-mcat.png";
import neuropathyLogo from "./assets/logo-neuropathy.svg";

/** The app a link host belongs to, and how to open or install it. */
export type AppConfig = {
  name: string;
  logo: string;
  logoAlt: string;
  /** Android intent URL that opens the app, falling back to the Play Store. */
  androidIntent: (link: string) => string;
  /** Default App Clip link that hands [link] to the App Clip. */
  appClipUrl: (link: string) => string;
};

/**
 * Apple's default App Clip link for [bundleId], carrying [link] in a `link`
 * parameter. AppClipUI unwraps it, so the full app gets the page URL just as
 * from the Smart App Banner, which a page cannot raise itself.
 */
const appClipUrl = (bundleId: string, link: string) =>
  `https://appclip.apple.com/id?p=${bundleId}&link=${encodeURIComponent(link)}`;

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
  appClipUrl: (link) => appClipUrl("com.cachet.carpstudyapp.appclip", link),
};

export const mcat: AppConfig = {
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
  appClipUrl: (link) => appClipUrl("dk.carp.mcat.appclip", link),
};

const neuropathy: AppConfig = {
  name: "Neuropathy Tracker",
  logo: neuropathyLogo,
  logoAlt: "Neuropathy Tracker logo",
  androidIntent: (link) => {
    // Opened like mCAT: the link addressed to the app over https, with the
    // Play Store and install referrer as the fallback.
    const url = new URL(link);
    const fallbackUrl = encodeURIComponent(
      playStoreUrl("dk.carp.neuropathy_tracker", link),
    );
    return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=https;package=dk.carp.neuropathy_tracker;S.browser_fallback_url=${fallbackUrl};end`;
  },
  appClipUrl: (link) => appClipUrl("dk.carp.neuropathy-tracker.appclip", link),
};

/**
 * mcat.app.<server> serves mCAT, neuropathy.app.<server> the Neuropathy
 * Tracker; every other host the CARP Studies App.
 */
export const appForHost = (host: string): AppConfig => {
  if (host.startsWith("mcat.app.")) return mcat;
  if (host.startsWith("neuropathy.app.")) return neuropathy;
  return carpStudies;
};
