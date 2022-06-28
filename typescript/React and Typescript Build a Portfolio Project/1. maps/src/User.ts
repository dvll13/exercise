import faker from 'faker'
import { Mappable } from './WrappedMap'

export class User implements Mappable {
  name: string
  // this doesn't initialize the location prop, it's just a TS declaration
  location: {
    lat: number
    lng: number
  }
  color: string = 'red'

  constructor() {
    this.name = faker.name.firstName()
    // this.location.lat/.lng -> undefined
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent(): string {
    return `User name: ${this.name}`
  }
}
