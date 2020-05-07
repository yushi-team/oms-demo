const path = require('path')
const subdirectoryPath = require('./config/subdirectory-path')
const publicpath = require('./config/public-path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
    publicPath: publicpath,
    assetsDir: subdirectoryPath,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    productionSourceMap: !IS_PROD,
    configureWebpack: {
        output: {
            filename: 'oms-demo/js/[name].[hash].b3.js',
            chunkFilename: 'oms-demo/js/[name].[hash].c3.js'
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
        before: app => { }
    },
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        // 配置svg规则排除svgs目录中svg文件处理
        // 目标给svg规则增加一个排除选项exclude:['path/to/icon']
        config.module.rule('svg')
            .exclude
            .add(path.join(__dirname, './src/assets/svgs'))
        // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
        config.module.rule('icons')
            .test(/\.svg$/)
            .include
            .add(path.join(__dirname, './src/assets/svgs'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' })
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/less/common/_theme.less')]
        },
        lintStyleOnBuild: true,
        stylelint: {
            fix: true // boolean (default: true)
            // files: ['src/assets/less/*.l?(e|c)ss'] // string | [string] (default: ['src/**/*.{vue,htm,html,css,sss,less,scss}'])
        }
    }
}
