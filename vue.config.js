const webpack = require("webpack");
let flag, target
flag = 6
switch (flag) {
    case 1:
        target = 'https://www.58hongren.com'
        break;
    case 2:
        target = 'http://47.111.109.201'
        break;
    case 3:c
        target = 'http://120.26.57.45'
        break;
    case 4:
        target = 'https://test.58hongren.com'
        break;
    case 5:
        target = 'https://app.58hongren.com'
        break;
        case 6:
        target = 'http://47.97.254.4:8899'
        break;

}
module.exports = {
    publicPath: './',
    // 输出文件目录
    outputDir: 'h5',
    // webpack-dev-server 相关配置
    devServer: {
        port: 8080,
    },
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    },
    //相当于 webpack-dev-server，对本地服务器进行配置
    devServer: {
        proxy: {
            "/api": {
                target,
                changeOrigin: true, //将基站名称的虚拟托管网站的选项，如果不配置请求404
                ws: true,
                pathRewrite: {
                    // "^/api": '/'
                }
            }
        }
    },
    runtimeCompiler: true
}