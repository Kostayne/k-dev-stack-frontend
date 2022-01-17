module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            boxShadow: {
                'preview': '0px 0px 4px rgba(36, 88, 165, 0.25), 0px 4px 4px -1px rgba(16, 85, 187, 0.25)'
            }
        },

        fontFamily: {
            'moderan': ['Moderan'],
            'roboto': ['Roboto'],
            'robotoCond': ['Roboto Condensed']
        },

        colors: {
            'awhite': '#F5F5F5',
            'contrastAlt': '#4C8CEB',
            'contrast': '#5D9BF8',
            'subtitle': '#373737',
        }
    },

    plugins: [],
}
