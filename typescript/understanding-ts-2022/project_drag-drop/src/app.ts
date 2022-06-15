// autobind
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }

  return adjustedDescriptor
}

// validation
interface ValidatorConfig {
  [className: string]: {
    [propName: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {}

function RequiredValue(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function ValidNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['validNumber']
  }
}

interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validate(validatableInput: Validatable) {
  let isValid = true
  const { value, ...validationProps } = validatableInput
  const isStringValue = typeof value === 'string'

  if (validationProps.required) {
    isValid &&= value.toString().trim().length !== 0
  }
  if (validationProps.minLength != null && isStringValue) {
    isValid &&= value.length >= validationProps.minLength
  }
  if (validationProps.maxLength != null && isStringValue) {
    isValid &&= value.length <= validationProps.maxLength
  }
  if (validationProps.min != null && !isStringValue) {
    isValid &&= value >= validationProps.min
  }
  if (validationProps.max != null && !isStringValue) {
    isValid &&= value <= validationProps.max
  }

  return isValid
}

class ProjectInput {
  templateElement: HTMLTemplateElement
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement

    this.element.id = 'user-input'
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attachContent()
  }

  // will be used only within this class
  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert('Invalid input!')
      return
    } else {
      this.clearInputs()
      return [enteredTitle, enteredDescription, enteredPeople]
    }
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title, description, people)
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attachContent() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const projectInput = new ProjectInput()
