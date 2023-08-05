class AnalyzeWebpackPlugin {
    apply(compiler) {
        // markdown表格的头部
        let content = `| filename | size |
        | --- | --- |        
        `
        // 注册emit钩子 
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compliaction) => {
            const arr = []
            // 获取所有即将输出的资源
            Object.keys(compliaction.assets).forEach(filename => {
                const file = compliaction.assets[filename]
                // 资源大小转换为kb
                const obj = { filename, size: Math.ceil(file.size() / 1024) }
                arr.push(obj)
            })
            // 降序
            arr.sort((a, b) => b.size - a.size)
            arr.forEach(item => {
                const { filename, size } = item
                const str = `| ${filename} | ${size}kb |`
                content += str + "\n"
            })
            // 输出markdown文件
            compliaction.assets['analyze.md'] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = AnalyzeWebpackPlugin