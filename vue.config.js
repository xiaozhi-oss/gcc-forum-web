const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    // 端口号的配置
		port: 7070
	},
  transpileDependencies: true,
  lintOnSave: false,
})
