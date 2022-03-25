const person = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age
  }
}

// annotation when destructuring:
const { age, name }: { age: number; name: string } = person
const {
  coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = person
