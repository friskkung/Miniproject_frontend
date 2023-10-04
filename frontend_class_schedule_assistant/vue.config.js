const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8090
  },
  pluginOptions: {
    vuetify: {
      theme: {
        dark: true, // or true if you want a dark theme
      },
    },
  },
  lintOnSave: false
})
