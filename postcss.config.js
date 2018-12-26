/**
 * Created by aitor on 8/6/18.
 */

module.exports = {
    plugins: [
        require('postcss-smart-import')({ }),
        require('precss')({ }),
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
            browsers: '> 1%, last 2 versions, IE 11'
        })
    ]
};