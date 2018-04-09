module.exports = {
    plugins: [
        require('precss'), 
        require('autoprefixer'), 
        require('postcss-font-magician')({
            hosted: ['./src/fonts']
        })
    ]
}