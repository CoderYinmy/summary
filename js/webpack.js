// const root = process.cwd()
// const path = require('path')

// module.exports = {
//     mode: 'production',
//     entry: {
//         //构建项目入口起点
//         index: path.resolve(root, './src/page/index/index.js'),
//         home: path.resolve(root, './src/page/home/index.js'),
//     },
//     output: {
//         //要保存的bundled文件路径及文件名
//         path: path.resolve(root, 'dist'), //输出路径
//         filename: '[name].js', //打包文件的文件名
//         publicPath: '/', //输出的公共路径
//         chunkFilename: '[name].js', //输出的附带chunk的文件名
//     },
//     resolve: {
//         //设置模块如何被解析
//         alias: {
//             //指定模块别名
//             '@': path.resolve(root, './src'),
//             vue$: 'vue/dist/vue.esm.js',
//         },
//     },
//     module: {
//         rules: [
//             //创建模块时，匹配请求规则的数组
//             {
//                 test: /\.js$/, // filepath
//                 use: [
//                     {
//                         loader: 'babel-loader',
//                     },
//                 ],
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     {
//                         loader: 'css-loader',
//                     },
//                 ],
//             },
//         ],
//     },
//     // optimization: {
//     //     minimize: true,
//     //     splitChunks: {
//     //         chunks: 'all',
//     //         minSize: 10,
//     //         cacheGroups: {
//     //             vendors: false,
//     //             common: false,
//     //             common2: {
//     //                 name: 'common2',
//     //                 test: /^\/Users\/xiaows__\/Documents\/workspace\/webpack-study\/src\/lib\/common2/,
//     //                 // test: /lib\/common2/,
//     //                 priority: -5,
//     //                 minChunks: 1,
//     //                 reuseExistingChunk: true,
//     //             },
//     //             common3: {
//     //                 name: 'common3',
//     //                 // test: /^\/Users\/xiaows__\/Documents\/workspace\/webpack-study\/src\/lib\/common3/,
//     //                 test: /node_modules\/[vue|vue-router]/,
//     //                 priority: -5,
//     //                 minChunks: 2,
//     //                 reuseExistingChunk: true,
//     //             },
//     //         },
//     //     },
//     // },
// }

// module.exports = {
//     entry: {
//         index: './src/page/index.js',
//     },
//     output: {
//         path: 'dist',
//         filename: '[name].js',
//         publicPath: '/',
//     },
//     resolve: {
//         alias: {
//             "@": './src'
//         },
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: [
//                     {
//                         loader: 'babel-loader'
//                     }
//                 ]
//             }
//         ]
//     }
// }


