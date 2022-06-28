import { ActionType } from '../action-types'
import { Action } from '../actions'

export interface RepositoriesState {
  loading: boolean
  error: string | null
  data: string[]
}

const initialState = {
  loading: false,
  error: null,
  data: []
}

const reducer = (state: RepositoriesState = initialState, action: Action): RepositoriesState => {
  //switch cases act also as type guards
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORY:
      return { ...state, loading: true, error: null, data: [] }

    case ActionType.SEARCH_REPOSITORY_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload }

    case ActionType.SEARCH_REPOSITORY_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] }

    default:
      return state
  }
}

export default reducer
