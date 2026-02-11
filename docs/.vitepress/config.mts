import { createContentLoader, defineConfig } from 'vitepress'

const isBuild = process.env.NODE_ENV === 'production'

const libremesh = {
  stable_version: '2024.1',
  stable_branch_openwrt: ['23.05'],
  oldstable_version: '2020.4',
  oldstable_branch_openwrt: ['19.07'],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LibreMesh",
  description: "A modular framework for creating OpenWrt-based firmwares for wireless mesh nodes",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true,
  base: isBuild && '/libremesh.github.io' || '',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/libremesh_logo.svg', dark: '/libremesh_logo.svg', alt: 'Logo' },
    siteTitle: false,
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'v2024.1', 
        items: [
          { text: 'v2020.4', link: '/changelog' },
          { text: 'Changelog', link: 'https://github.com/libremesh/lime-packages/tree/master/CHANGELOG.md'},
          { text: 'Issues', link: 'https://github.com/libremesh/lime-packages/issues'},
        ]
      },    
      { text: 'News', link: '/news' },  
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is LibreMesh?', link: '/what-is-libremesh' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Features', link: '/features' },
        ]
      },
      {
        text: 'Installation',
        collapsed: false,
        link: '/build/imagebuilder/docker',
        items: [
          { text: 'Packages selection', link: '/packages-selection' },
          { text: 'Build LibreMesh from sources', 
            link: '/build', 
            items: [
              { text: 'Imagebuilder', 
                items: [
                  { text: 'Docker', link: '/build/imagebuilder/docker'},
                  { text: 'Debian', link: '/build/imagebuilder/debian'}
                ]
              },
              { text: 'Buildroot', link: '/build/buildroot/debian'}
          ]},
        ]
      },
      {
        text: 'Configuration',
        collapsed: false,
        link: '/configuration',
        items: [
          { text: 'GUI configuration', link: '/gui-configuration' },
          { text: 'Configuration', link: '/configuration', 
            items: [
              
            ]
          },
          { text: 'Supported flavors', link: '/api-examples' },
          { text: 'Network Profiles', link: '/network-profiles' }
        ]
      },
      {
        text: 'Community',
        collapsed: false,
        items: [
          { text: 'Communication', link: '/communication' },
          { text: 'Meetings', link: '/meetings' }

        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/libremesh/lime-packages' },
      { icon: 'maildotru', link: 'https://www.autistici.org/mailman/listinfo/libremesh' },
      { icon: 'matrix', link: 'https://matrix.to/#/#libremesh-dev:matrix.guifi.net' },
      { icon: 'peertube', link: 'https://media.exo.cat/a/libremesh' },
      { icon: 'mastodon', link: 'https://social.freifunk.net/@libremesh' }
    ],
  },
  // async buildEnd() {
  //   // const meetings = await createContentLoader('meetings/*.md').load()
  //   // generate files based on posts metadata, e.g. RSS feed
  // }
})
