const siteUrl = 'https://kdev_stack.ru';


module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', disallow: '/admin' },
            { userAgent: '*', allow: '/' }
        ],

        additionalSitemaps: [`${siteUrl}/server-sitemap.xml`]
    },
    exclude: ['/admin', '']
};