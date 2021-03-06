module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            boxShadow: {
                'baseShadow': '0px 0px 4px rgb(122 177 255 / 25%), 0px 4px 4px -1px rgb(77 149 255 / 25%)'
            },

            screens: {
                'mobMd': '375px'
            }
        },

        fontFamily: {
            'moderan': ['Moderan'],
            'roboto': ['Roboto'],
            'robotoCond': ['Roboto Condensed']
        },

        colors: {
            'awhite': '#F5F5F5',
            'btnActive': '#5D9BF8',
            'btnInactive': '#96C0FF',
            'contrastAlt': '#4C8CEB',
            'contrast': '#5D9BF8',
            'subtitle': '#373737',
            'inputInactive': '#A0D2FF',
            'inputFocused': '#45A3FB',
            'error': '#EE5A87',
            'status': '#195FC8',
            'customGray': '#BFBFBF',
            'lowBlue': '#EAF2FF',
            'errorSubdued': 'rgba(238, 90, 135, 0.42)',
            'contrastDark': '#397EE4',
            'low-blue': '#F7FAFF',
            'info-field': '#6CA7FF',
            'link': '#5D9BF8'
        }
    },

    plugins: [],
}
