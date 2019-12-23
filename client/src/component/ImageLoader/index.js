import React from 'react'
import './style.less'

const _loaded = {}

class ImageLoader extends React.Component {

	state = {
		loaded: false
	}

	static defaultProps = {
		className: '',
		loadingClassName: 'img-loading',
		loadedClassName: 'img-loaded'
	}

	onLoad = () => {
		_loaded[this.props.src] = true
		this.setState(() => ({loaded: true}))
	}

	render() {

		let {className, loadedClassName, loadingClassName} = this.props

		className = `${className} ${this.state.loaded
			? loadedClassName
			: loadingClassName}`

		return (
			<img
				src={this.props.src}
				onClick={this.props.onClick}
				className={`${className} m-find-image`}
				onLoad={this.onLoad}
			/>
		)
	}
}

export default ImageLoader
