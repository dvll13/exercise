// namespace App {
// base components class - used to render a component to the screen
// abstract - should be only used for inheritance, no instantiating
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
// }
