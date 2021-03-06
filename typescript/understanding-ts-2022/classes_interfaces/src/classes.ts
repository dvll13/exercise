abstract class Department {
  // READONLY - can be set only once

  // private readonly id: string
  // public name: string // field or property
  protected employees: string[] = []

  // SHORTCUT: instead defining the props on top and then initializing them in the constructor, instead they can be once written as arguments in the constructor with their MODIFIERS in front
  constructor(protected readonly id: number, public name: string) {
    // this.name = name
    // this.fiscalYear // cannot be accessed by the constructor
    // Department.fiscalYear // now can be accessed
  }

  // STATIC
  static fiscalYear = 2022

  static createEmployee(name: string) {
    return { name }
  }

  abstract describe(this: Department): void
  //{
  // `this` is not required to be passed when describe is executed, but this notation tells TS that the usage of `this` inside the fn must refer to the Department object and TS will notify if it's not used correctly or doesn't refer to it
  // console.log('Department:', this.id, this.name)
  //}

  // can be overridden by children classes
  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

/*
// Cannot create an instance of an abstract class.ts(2511)

const finance = new Department(0, 'Finance') // constructor is called an a new normal js object is created
console.log(finance)

finance.addEmployee('Ivan')
finance.addEmployee('Peter')

// finance.employees[2] = 'Anna'

finance.printEmployeeInformation()
finance.describe()
/*
// const financeCopy = { describe: finance.describe }
const financeCopy = { name: 'dummy', describe: finance.describe }
console.log(financeCopy.describe())
// Department: undefined (`this` refers to the thing, responsible for calling the method, in this case financeCopy)

// if we add a `name` prop to the financeCopy object, then there'll be no errors
*/

class ITDepartment extends Department {
  admins: string[]
  // extending the constructor
  constructor(id: number, admins: string[]) {
    super(id, 'IT Dept.') // MUST be called BEFORE any usages of `this` in the child constructor
    this.admins = admins
  }

  describe() {
    console.log('IT Dept. ID:', this.id)
  }
  // if describe() is not defined: Non-abstract class 'ITDepartment' does not implement inherited abstract member 'describe' from class 'Department'.ts(2515)
}

const it = new ITDepartment(2, ['Ivan'])
it.addEmployee('John')
it.describe()
it.name = 'Some IT name'
console.log(it)

class AccountingDepartment extends Department {
  private lastReport
  private static instance: AccountingDepartment // singleton pattern

  // getter (to publicly retrieve private prop) - later executed as a prop, not as a fn
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No reports found.')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }

  private constructor(id: number, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  } // private -> singleton pattern

  // singleton pattern
  static getInstance() {
    // this = AccountingDepartment since it's a static method
    if (AccountingDepartment.instance) {
      return this.instance
    }

    this.instance = new AccountingDepartment(5, [])
    return this.instance
  }

  // OVERRIDE base method
  describe() {
    console.log('Accounting dept. ID:', this.id)
  }

  addEmployee(name: string) {
    if (name === 'Max') return

    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

console.log('### AccountingDepartment ###')

// const accounting = new AccountingDepartment(3, [])
const accounting = AccountingDepartment.getInstance() // not singleton
const accounting2 = AccountingDepartment.getInstance() // same instance as with accounting

// using getter and setter
accounting.mostRecentReport = 'Ivan'
console.log(accounting.mostRecentReport)

accounting.addReport('Something went wrong...')

accounting.addEmployee('Max')
accounting.addEmployee('Anna')

// accounting.printReports()
// accounting.printEmployeeInformation()

accounting.describe() // overridden method

// static methods:
const employee1 = Department.createEmployee('Max')
console.log(employee1, Department.fiscalYear) // {name: 'Max'} 2022
