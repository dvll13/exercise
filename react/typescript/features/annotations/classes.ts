class Vehicle {
  /*
  color: string

  constructor(color: string) {
    this.color = color
  }
  CAN BE SHORTENED TO:
  */
  constructor(public color: string) {}

  // drive(): void {
  //   console.log(`chugga chugga`)
  // }

  private honk(): void {
    console.log(`beep`)
  }

  protected stop(): void {
    console.log(`stopping`)
  }
}

const vehicle = new Vehicle('orange')
// vehicle.honk() // nope!
console.log(vehicle.color)

//                superclass/parent
class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color) // call parent's constructor
  }

  private drive(): void {
    // nope! can't change from public to private
    console.log(`vroom`)
  }

  startDrivingProcess(): void {
    this.drive()
    // this.honk() // nope!
    this.stop()
  }
}

const car = new Car(4, 'red')
// car.drive() // nope! can't be called outside
car.startDrivingProcess()
// car.honk() // nope!
