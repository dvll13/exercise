import { combineReducers } from 'redux'
import repositoriesReducer from './repositoriesReducer'

const reducers = combineReducers({
  repositories: repositoriesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
// ReturnType: TS builtin helper, that receives a function and returns the type that the function returns:
/*
  type RootState = {
      readonly [$CombinedState]?: undefined;
  } & {
      repositories: RepositoriesState;
  }
*/
