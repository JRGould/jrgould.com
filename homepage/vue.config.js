const path = require('path');

module.exports = {
	baseUrl: '/',
	outputDir: 'dist',
	css: {
		modules: true
	},
	chainWebpack: (config) => {
		config
			.module
			.rule('scss')
			.use('sass-resources-loader')
			.loader('sass-resources-loader')
			.options({
			resources: [
				path.resolve('./src/scss/_variables.scss'),
			//   path.resolve('./src/scss/_mixins.scss')
			]
			})
		}
}