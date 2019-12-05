const path = require("path");

// Theme API.
module.exports = (options, ctx) => ({
  alias () {
    const { themeConfig, siteConfig } = ctx;
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      );
    return {
      "@AlgoliaSearchBox": isAlgoliaSearch
        ? path.resolve(__dirname, "components/AlgoliaSearchBox.vue")
        : path.resolve(__dirname, "noopModule.js")
    };
  },

  plugins: [
    ["@vuepress/active-header-links", options.activeHeaderLinks],
    ["@vuepress/plugin-nprogress"],
    [path.resolve(__dirname, 'search.js')],
    [
      "container",
      {
        type: "tip",
        defaultTitle: {
          "/zh/": "提示"
        }
      }
    ],
    [
      "container",
      {
        type: "warning",
        defaultTitle: {
          "/zh/": "注意"
        }
      }
    ],
    [
      "container",
      {
        type: "danger",
        defaultTitle: {
          "/zh/": "警告"
        }
      }
    ]
  ],

  enhanceAppFiles: path.resolve(__dirname, "enhanceAppFile.js")
});
