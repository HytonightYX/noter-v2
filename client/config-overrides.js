const {
	override,
	fixBabelImports,
	addLessLoader,
	addDecoratorsLegacy,
	disableEsLint,
	addWebpackAlias
} = require('customize-cra')

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
)
