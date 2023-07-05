module.exports = {
    base: '/',
    title: 'Pterodactyl-Taiwan',
    description: '翼龍是一個使用 PHP、React 和 Go 構建的開源遊戲伺服器管理面板。翼龍在設計時考慮了安全性，在隔離的 Docker 映象中執行所有遊戲伺服器，同時向終端使用者展示了美觀直觀的 UI。',
    locales: {
      '/': {
        lang: 'zh-TW',
      }
    },
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['vuepress-plugin-container', {
            type: 'warning',
            defaultTitle: '警告',
        }],
        ['vuepress-plugin-container', {
            type: 'tip',
            defaultTitle: '提示',
        }],
        ['vuepress-plugin-container', {
            type: 'danger',
            defaultTitle: '危險',
        }],
        ['vuepress-plugin-sitemap', {
            hostname: 'https://pterodactyl-taiwan.github.io',
        }],
        ['tabs'],
    ],
    configureWebpack: {
        serve: {
            hot: {
                port: 9091,
            },
        },
    },
    head: [
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' }],
        ['link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#0e4688' }],
        ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
        ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
        ['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
        ['meta', { name: 'theme-color', content: '#0e4688' }],
        ['meta', { name: 'keywords', content: '翼龍,翼龍面板,翼龍面板臺灣化,面板臺灣化,臺灣化,中文,中文臺灣化,面板,翼龍臺灣化,翼龍臺灣,翼手龍,臺灣化版,pterodactyl-taiwan,taiwan,pterodactyl,教程,翼龍最新版,翼龍官網,翼龍臺灣官網,官網' }],
        ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-KWVNS6PXK2' }],
        ['script', {}, `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KWVNS6PXK2');
        `],
    ],
    themeConfig: {
        repo: 'pterodactyl-taiwan/panel',
        docsRepo: 'pterodactyl-taiwan/documentation',
        repoLabel: 'GitHub',
        editLinkText: '幫助我們改進此頁面。',
        editLinks: true,
        logo: '/logos/pterry.svg',
        nav: [
            {
                text: '文件',
                link: '/project/introduction.md',
            },
            {
                text: '社群指南',
                link: '/community/about.md',
            },
            {
                text: '獲取幫助',
                link: 'https://bbs.pterodactyl-taiwan.github.io'
            },
            {
                text: 'API',
                link: 'https://dashflo.net/docs/api/pterodactyl/v1/'
            }
        ],
        sidebar: {
            '/community/': [
                {
                    title: '社群指南',
                    collapsable: false,
                    children: [
                        '/community/about.md',
                    ]
                },
                {
                    title: '面板安裝',
                    collapsable: false,
                    children: [
                        '/community/installation-guides/panel/centos7.md',
                        '/community/installation-guides/panel/centos8.md',
                        '/community/installation-guides/panel/debian10.md',
                        '/community/installation-guides/panel/debian11.md',
                    ]
                },
                {
                    title: 'Wings 安裝',
                    collapsable: false,
                    children: [
                        '/community/installation-guides/wings/centos7.md',
                        '/community/installation-guides/wings/centos8.md',
                        '/community/installation-guides/wings/debian10.md',
                        '/community/installation-guides/wings/debian11.md',
                    ]
                },
                {
                    title: '建立預設',
                    collapsable: false,
                    children: [
                        '/community/config/eggs/creating_a_custom_egg.md',
                        '/community/config/eggs/creating_a_custom_image.md',
                    ],
                },
                {
                    title: '遊戲配置',
                    collapsable: false,
                    children: [
                        '/community/games/minecraft.md',
                    ],
                },
                {
                    title: '教程',
                    collapsable: false,
                    children: [
                        '/community/config/nodes/add_node.md',
                        '/community/tutorials/artisan.md',
                    ],
                },
                {
                    title: '定製',
                    collapsable: false,
                    children: [
                        '/community/customization/panel.md',
                        '/community/customization/wings.md',
                    ],
                },
            ],
            '/': [
                {
                    title: '專案資訊',
                    collapsable: false,
                    children: [
                        '/project/introduction.md',
                        '/project/about.md',
                        '/project/terms.md',
                        '/project/community.md',
                    ]
                },
                {
                    title: '面板 (前端)',
                    collapsable: false,
                    path: '/panel/',
                    currentVersion: '1.0',
                    versions: [
                        {
                            title: '1.11',
                            name: '1.0',
                            status: 'stable',
                            children: [
                                '/getting_started',
								'/btpanel_getstarted',
								'/docker_getstarted',
                                '/webserver_configuration',
                                '/additional_configuration',
                                '/updating',
                                '/troubleshooting',
                                '/legacy_upgrade',
                            ]
                        }
                    ]
                },
                {
                    title: 'Wings (後端)',
                    collapsable: false,
                    path: '/wings/',
                    currentVersion: '1.0',
                    versions: [
                        {
                            title: '1.11',
                            name: '1.0',
                            status: 'stable',
                            children: [
                                '/installing',
                                '/upgrading',
                                '/migrating',
                                '/configuration',
                            ]
                        }
                    ]
                },
                {
                    title: '教程',
                    collapsable: false,
                    children: [
                        '/tutorials/mysql_setup.md',
                        '/tutorials/creating_ssl_certificates.md',
                    ],
                },
                {
                    title: '指南',
                    collapsable: false,
                    children: [
                        '/guides/mounts.md',
                    ],
                },
            ],
        },
    },
    postcss: {
        plugins: [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.js'),
            require('precss'),
            require('autoprefixer'),
            require('cssnano'),
        ]
    },
};
