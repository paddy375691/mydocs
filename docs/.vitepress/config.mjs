import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mydocs/',
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'HomeHome', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Python', items: [
        {text:'drf基础', link: '/python/django_drf'},
        {text:'drf常用组件', link: '/python/drf_component'}
      ]},
      { text: 'Vue', items: [
        { text: 'CSS', link: '/vue/css_base'}
      ]}
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
