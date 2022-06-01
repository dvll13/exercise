// const person: {
//   name: string
//   age: number
//   hobbies: string[]
//   role: [number, string] // tuple
// } = {
//   name: 'Max',
//   age: 30,
//   hobbies: ['Sport', 'Cooking'],
//   role: [2, 'author']
// }

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

console.log(Role.ADMIN, Role.READ_ONLY, Role.AUTHOR) // 0 1 2

// numbers can be changed:
enum Role2 {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR = 200,
  TEST = 'TEST'
}
console.log(Role2.ADMIN, Role2.READ_ONLY, Role2.AUTHOR, Role2.TEST) // 5 6 200 'TEST'

const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sport', 'Cooking'],
  role: Role.ADMIN
}

// person.role.push('admin') // an exception, push is not caught by TS
// person.role[1] = 10  -> error

// let favoriteActivities: any[]
// let favoriteActivities: (string | number)[]

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
}
// for (const role of person.role) {
//   console.log(role)
// }

// console.log(person.x)

if (person.role === Role.ADMIN) {
  console.log('is admin')
}
