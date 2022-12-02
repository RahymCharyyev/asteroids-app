module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/asteroids-app/" : "/",
  pwa: {
    name: "Asteroids App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // настройки манифеста
    manifestOptions: {
      display: "landscape",
      background_color: "#42B883",
      // ...другие настройки манифеста...
    },

    // настройка workbox-плагина
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc необходимо в режиме InjectManifest
      swSrc: "dev/sw.js",
      // ...другие настройки Workbox...
    },
  },
};
