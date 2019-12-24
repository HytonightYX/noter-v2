import React, { Suspense } from 'react'

export default (Component) => {
	return props => (
		<Suspense fallback={<div>Loading...</div>}>
			<Component {...props} />
		</Suspense>
	)
}
