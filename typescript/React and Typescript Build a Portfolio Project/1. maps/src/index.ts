import {} from 'google-maps' // some SOF workaround so that TS finds the global 'google' namespace types
import { WrappedMap } from './WrappedMap'
import { User } from './User'
import { Company } from './Company'

const wrappedMap = new WrappedMap('map')

const user = new User()
const company = new Company()

wrappedMap.addMarker(user)
wrappedMap.addMarker(company)
