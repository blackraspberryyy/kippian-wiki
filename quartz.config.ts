import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Kippian Wiki",
    pageTitleSuffix: " | Kippian Wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "blackraspberryyy.github.io/kippian-wiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Faculty Glyphic",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f6eee3",
          lightgray: "#c4c4c4",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#930C10",
          tertiary: "#dd9e9e",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
          blockquotebg: "rgba(236, 211, 193, 0.6)"
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#bc3e3e",
          tertiary: "#dd9e9e",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
          blockquotebg: "rgba(17, 17, 15, 0.6)"
        },
      },
    },

    // custom configs
    hideInfobox: true,
    calendarConfig: {
      name: 'Kippian Calendar',
      weekdays: [
        {name: 'Akenday'},
        {name: 'Matunday'},
        {name: 'Tashday'},
        {name: 'Walladay'},
        {name: 'Corday'},
        {name: 'Arygday'},
        {name: 'Barciday'}
      ],
      months: [
        {
          name: 'Mathudim',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Bastordyl',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Azir',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Gustkil',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Kwonyr',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Zagi',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Cappodon',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Spekid',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Mastkil',
          daysInMonth: 28,
          monthInYear: 10,
        },
        {
          name: 'Yugad',
          daysInMonth: 28,
          monthInYear: 10,
        },
      ],
      seasons: [
        {
          name: 'Akenatun\'s Season',
          monthOfYear: 1,
          dayOfMonth: 1,
        },
        {
          name: 'Matunda\'s Season',
          monthOfYear: 6,
          dayOfMonth: 1,
        },
      ],
      monthStartOnWeekStart: true,
      hasYear0: true
    }
  },
  plugins: {
    transformers: [
      Plugin.HideInfobox(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative"}),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      Plugin.CalendarPage(),
    ],
  },
}

export default config
