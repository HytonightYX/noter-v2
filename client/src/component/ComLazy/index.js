import * as React from 'react'

export default (WrappedComponent) =>
	class HOC extends React.Component {

		render() {
			return (
				<React.Suspense fallback={<div>Loading...</div>} >
					<WrappedComponent {...this.props} />
				</React.Suspense>
			)
		}
	};
