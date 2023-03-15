import {createStore} from 'redux';

const initialState = {
  user: null,
  token: null,
  cartItems: [],
};

function authReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userId: action.payload.user._id,
        username : action.payload.user.username
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        userId: null, 
        username : null
      };
    default:
      return state;
  }
}

const store = createStore(authReducer);

export default store;
