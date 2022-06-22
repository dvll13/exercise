import { Project, ProjectStatus } from '../models/project'

// namespace App {

// ### PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

export class ProjectState extends State<Project> {
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
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((p) => p.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // pass a copy because if we change the original from outside, then no one will get notified
      // listenerFn(this.projects.slice())
      listenerFn([...this.projects])
    }
  }
}

export const projectState = ProjectState.getInstance()
// }
