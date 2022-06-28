// save cells to fs => if we receive an action from a list of actions, we want to dispach an additional action
import { Dispatch } from 'react'
import { saveCells } from '../action-creators'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { RootState } from '../reducers'

export const persistMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: any

  // param: store - an object similar to the store, we take dispatch out of it
  return (next: (action: Action) => void) => {
    // next - take an action and forward along to the next middleware
    return (action: Action) => {
      next(action) // we always wanna forward to the next action

      if (
        [ActionType.MOVE_CELL, ActionType.UPDATE_CELL, ActionType.INSERT_CELL_AFTER, ActionType.DELETE_CELL].includes(
          action.type
        )
      ) {
        // debounce
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => saveCells()(dispatch, getState), 250)
      }
    }
  }
}
