import Ready from 'ready'
import GetId from 'get-id'
import Flip  from 'data-flip'

Ready(() => {
  window.toggleNav = () => Flip('navToggled')
})
