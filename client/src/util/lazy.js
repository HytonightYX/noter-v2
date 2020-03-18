import React from 'react'

const retry = (fn, retriesLeft = 5, interval = 500) => {
	return new Promise((resolve, reject) => {
		fn()
			.then(resolve)
			.catch((error) => {
				setTimeout(() => {
					if (retriesLeft === 1) {
						reject(error)
					} else {
						retry(fn, retriesLeft - 1, interval).then(resolve, reject)
					}
				}, interval)
			})
	})
}

const lazy = (fn) => React.lazy(() => retry(fn))
export default lazy
