import { Autobind } from '../decorators/autobind'
import { DragTarget } from '../models/drag-drop'
import { Project, ProjectStatus } from '../models/project'
import { projectState } from '../state/project-state'
import { Component } from './base-component'
import { ProjectItem } from './project-item'

/*
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
*/

// namespace App {
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer?.types[0] === 'text/plain') {
      // tells JS that for this element we want to ALLOW a drop and the drop event will fire now on drop. by default it won't
      event.preventDefault()

      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('drop', this.dropHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)

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
// }
