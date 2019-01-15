const { createStore, applyMiddleware } = Redux

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const DATA = 'DATA'                                                    ////////
const DELAY = 'DELAY'                                                  ////////
                                                                       ////////
function addData ({ data }) {                                          ////////
  return {                                                             ////////
    type: DATA,                                                        ////////
    payload: data                                                      ////////
  }                                                                    ////////
}                                                                      ////////
function addDelay ({ delay, data }) {                                  ////////
  return {                                                             ////////
    type: DELAY,                                                       ////////
    payload: {                                                         ////////
      delay,                                                           ////////
      data                                                             ////////
    }                                                                  ////////
  }                                                                    ////////
}                                                                      ////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const initialState = []

function reducer (state = initialData, action) {
  switch (action.type) {
    case DATA:
      return [...state, action.payload]
    break
    default:
      return state
    break
  }
}

function schedureDispatch ({ delay, data }) {
  setTimeout(() => {
    store.dispatch(addData({ data }))
  }, delay)
}

const delay = store => next => action => {
  if (action.type === 'DELAY') {
    schedureDispatch(action.payload)
  }
  return next(action)
}

const logger1 = store => next => action => {
  console.log('1) dispatching', action)
  let result = next(action)
  console.log('1) next state', store.getState())
  return result
}
const logger2 = store => next => action => {
  console.log('2) dispatching', action)
  let result = next(action)
  console.log('2) next state', store.getState())
  return result
}

const store = createStore(reducer, initialState, applyMiddleware(
  logger1,
  delay,
  logger2
))

store.dispatch(addData({ data: 'a' }))
store.dispatch(addData({ data: 'e' }))
store.dispatch(addDelay({ delay: 1000, data: 'i' }))
store.dispatch(addData({ data: 'o' }))
store.dispatch(addData({ data: 'u' }))
