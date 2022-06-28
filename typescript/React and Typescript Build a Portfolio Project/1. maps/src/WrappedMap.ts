// import { User } from './User'
// import { Company } from './Company'

// instruction to any other class on how they can be an argument to 'addMarker'
export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
  color: string
}

export class WrappedMap {
  // we shouldn't allow it to be referenced outside this class
  private googleMap: google.maps.Map // instance of Map class

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    })
  }

  // addMarkerWrong(mappable: User | Company): void {
  //   mappable. -> TS will allow only location, because it's the only common User/Company prop which isn't the purpose here
  //   2nd bad thing about this approach - each Company child will get added eventually ( | CarLot | ...)
  // }

  addMarker(mappable: Mappable) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      })

      infoWindow.open(this.googleMap, marker)
    })
  }
}
