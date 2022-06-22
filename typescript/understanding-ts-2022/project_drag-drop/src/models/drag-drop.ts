// namespace App {
export interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

export interface DragTarget {
  // the browser needs to be notified that the thing we're dragging something over is a valid dropping target, so dropping should be permitted
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}
// }
