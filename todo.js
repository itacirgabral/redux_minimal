const { createStore, combineReducers } = Redux

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const ADD_TODO = 'ADD_TODO'                                            ////////
const TOGGLE_TODO = 'TOGGLE_TODO'                                      ////////
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'                  ////////
                                                                       ////////
const VisibilityFilters = {                                            ////////
  SHOW_ALL: 'SHOW_ALL',                                                ////////
  SHOW_COMPLETED: 'SHOW_COMPLETED',                                    ////////
  SHOW_ACTIVE: 'SHOW_ACTIVE'                                           ////////
}                                                                      ////////
                                                                       ////////
function addTodo(text) {                                               ////////
  return { type: ADD_TODO, text }                                      ////////
}                                                                      ////////
                                                                       ////////
function toggleTodo(index) {                                           ////////
  return { type: TOGGLE_TODO, index }                                  ////////
}                                                                      ////////
                                                                       ////////
function setVisibilityFilter(filter) {                                 ////////
  return { type: SET_VISIBILITY_FILTER, filter }                       ////////
}                                                                      ////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = {
  todos: [
    {
      text: 'Eat food',
      completed: true
    }, {
      text: 'Exercise',
      completed: false
    }
  ],
  visibilityFilter: 'SHOW_COMPLETED'
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {'text': action.text, 'completed': false}]
    break
    case TOGGLE_TODO:
      return state.map((e, i) => i === action.index ? Object.assign(e, {'completed': !e.completed}) : e)
    break
    default:
      return state
    break    
  }
}

function visibilityFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    break
    default:
      return state
    break
  }
}

const reducer = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(reducer, initialState)

store.dispatch(toggleTodo(1))
store.dispatch(addTodo('Go to swimming pool'))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))

// store.subscribe(() => console.log(store.getState()))