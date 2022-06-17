// Project type
enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// ### PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = []

  // static - utility and global constants
  // singleton pattern - guarantees that we work with the same state object throughout the app
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState()
    }

    return this.instance
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
    this.projects.push(newProject)

    for (const listenerFn of this.listeners) {
      // pass a copy because if we change the original from outside, then no one will get notified
      listenerFn([...this.projects])
    }
  }
}

const projectState = ProjectState.getInstance()

// ### DECORATORS

// ## AUTOBIND
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

// ## VALIDATION
interface ValidatorConfig {
  [className: string]: {
    [propName: string]: string[]
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

// ### CLASSES

// base components class - used to render a component to the screen
// abstract - should be only used for inheritance, no instantiating
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  containerElement: T
  element: U // since there is no HTMLSectionElement

  constructor(templateId: string, containerId: string, insertAtStart: boolean, newElementId?: string) {
    // create list element
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
    this.containerElement = document.getElementById(containerId)! as T

    // importNode - returns a copy of a node
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElementId) {
      this.element.id = newElementId
    }

    this.attachContent(insertAtStart)
  }

  // attach the created element to the DOM
  private attachContent(insertAtStart: boolean) {
    // insertAdjacentElement - inserts an element at a given position, relative to the element that it invoked upon
    this.containerElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element)
  }

  // abstract methods - no concrete implementation here, but force children to implement them
  abstract configure(): void
  abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project

  get persons() {
    return this.project.people === 1 ? '1 person' : `${this.project.people} persons`
  }

  constructor(containerId: string, project: Project) {
    super('single-project', containerId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  configure() {}

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[]

  // not using the enum here because we need a type string for the id generation
  constructor(private type: 'active' | 'finished') {
    // `this` cannot be used before the `super()` is finished running
    super('project-list', 'app', false, `${type}-projects`)

    this.assignedProjects = []

    this.configure()

    // populate data inside the elements from the template
    this.renderContent()
  }

  configure() {
    // subscribe to state changes
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active
        }
        return project.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
  }

  // not private since private abstract is not supported
  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = `${this.type}`.toUpperCase() + ' PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project)
    }
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  // private since they will be used only within this class
  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = +this.peopleInputElement.value

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
      projectState.addProject(title, description, people)
    }
  }
}

const projectInput = new ProjectInput()
const activeProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finished')
