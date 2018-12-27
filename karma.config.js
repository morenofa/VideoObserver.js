/**
 * Created by aitor on 11/6/18.
 */

const webpackConfig = require('./webpack.config.js');

module.exports = config => {
    config.set({
        autoWatch: true,
        //singleRun: false,
        browsers: ['ChromeHeadlessNoSandbox'],
        basePath: '.',

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },

        files: [
            { pattern: 'test/*_test.js', watched: false },
            { pattern: 'test/**/*.test.js', watched: false }
        ],

        preprocessors: {
            'test/*.test.js': ['webpack', 'sourcemap'],
            'test/**/*.test.js': ['webpack', 'sourcemap']
        },

        exclude: [],
        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],
        reporters: ['mocha'],
        logLevel: config.LOG_INFO,
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        port: 9876,
        colors: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};