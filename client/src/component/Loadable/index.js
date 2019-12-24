import L from 'react-loadable'
import LoadingPage from '../LoadingPage'

const Loadable = opt => (
  L({
    loading: LoadingPage,
    delay: 300,
    ...opt
  })
)

export default Loadable