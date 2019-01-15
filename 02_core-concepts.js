const { createStore } = require('redux')

const initialState = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {'todos': state.todos.concat(({'text': action.tex, 'completed': false}))}) 
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {'todos': state.todos.map((e, i) => i === action.index ? Object.assign(e, {'completed': !e.completed}) : e)})
    case 'SET_VISIBILITY_FILTER':
      return Object.assign({}, state, {'visibilityFilter': action.filter}) 
    default:
      return Object.assign({}, state)
  }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ADD_TODO', text: 'Go to swimming pool' })
store.dispatch({ type: 'TOGGLE_TODO', index: 1 })
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' })
