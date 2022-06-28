import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions'

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // a fn that can only be called with an argument, matching Action; now TS knows what the type and payload below can be in each case
    dispatch({
      type: ActionType.SEARCH_REPOSITORY
    })

    try {
      const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term
        }
      })

      const names = data.objects.map((result: any) => {
        return result.package.name
      })

      dispatch({ type: ActionType.SEARCH_REPOSITORY_SUCCESS, payload: names })
    } catch (error: any) {
      // not sure of 'any'
      dispatch({ type: ActionType.SEARCH_REPOSITORY_ERROR, payload: error.message })
    }
  }
}
