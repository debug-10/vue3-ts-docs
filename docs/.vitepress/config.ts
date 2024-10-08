import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs

export default defineConfig({
    title: "Vue 3 + Typescript 学习文档",
    description: "详细学习 Vue 3 和 TypeScript 的指南",
    themeConfig: { 
        // siteTitle: "前端学习” ,
        logo: "https://guke-bucket.oss-cn-nanjing.aliyuncs.com/images/V.png",
        nav: [
            { text:"首页", link: "/" },
            { text:"指南", link:"/guide/"},
            { text:"组件", link:"/components/"},
            { text:"API 参考", link:"/api/"},
            { text:"常见问题", link:"/faq/"},
            ],
        socialLinks: [
            { icon: "github", link:"https://github.com/debug-10/vue3-ts-docs" },
            ],
        sidebar: {
         "/guide/": [
         {
           text: "开始",
           collapsible: true,
           items: [
           { text:"介绍" , link:"/quide/"},
           { text:"安装" , link:"/guide/installation" }, 
           { text:"基本概念" , link:"/guide/concepts" },
          ],
         },
        ],
         "components/": [
         {
           text: "常用组件",
           items: [
           { text:"介绍" , link:"/components/"},
           { text:"按钮 Button" , link:"/components/button" }, 
           { text:"表单 Form" , link:"/components/form" },
           { text:"介绍 Table" , link:"/components/table"},
          ],
         },
        ],
       },
    footer: {
        message: "用心学习",
        copyright: "2024©guke"
    },  
    },
});
