import Headroom from 'headroom.js'
import Ready from 'ready'
import GetId from 'get-id'

Ready(() => {
  const header = GetId('header')
  const nav = GetId('nav')

  (new Headroom(header)).init()
  (new Headroom(nav)).init()
})
