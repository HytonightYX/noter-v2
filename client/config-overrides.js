const {
	override,
	fixBabelImports,
	addLessLoader,
	addDecoratorsLegacy,
	disableEsLint,
	addWebpackAlias,
	addBundleVisualizer
} = require('customize-cra')

const rewireUglifyjs = require('react-app-rewire-uglifyjs')
const path = require('path')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {'@primary-color': '#3d74aa'},
		// modifyVars: {'@primary-color': '#f9c700'},
	}),
	addDecoratorsLegacy(),
	disableEsLint(),
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src'),
		'@app': path.resolve(__dirname, 'src/app'),
		'@util': path.resolve(__dirname, 'src/util'),
		'@constant': path.resolve(__dirname, 'src/constant'),
		'@component': path.resolve(__dirname, 'src/component'),
	}),
	// addBundleVisualizer({generateStatsFile: true}),
	rewireUglifyjs,
	// used to minimise bundle size by 500KB
	function(config, env) {
		const alias = config.resolve.alias || {};
		alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/icons.js');
		config.resolve.alias = alias;
		return config;
	},
)
