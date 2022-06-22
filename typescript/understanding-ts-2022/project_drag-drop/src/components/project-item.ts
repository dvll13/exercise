import { Project } from './../models/project'
import { Draggable } from '../models/drag-drop'
import { Component } from './base-component'
import { Autobind } from '../decorators/autobind'

/*
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
*/

// namespace App {
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

  @Autobind
  dragStartHandler(event: DragEvent) {
    // not all drag events have dataTransfer property
    event.dataTransfer!.setData('text/plain', this.project.id)
    // tells the browser about our intention and changes the cursor to the appropriate shape (move, copy, ...)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent) {
    console.log('dragEnd')
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}
// }
