import {
  CHANGE_VALUES,
  EDIT_VALUES,
  RECEIVE_CURRENCIES,
  RECEIVE_VALUES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  btnName: 'Adicionar despesa',
  newId: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return { ...state, currencies: action.state };
  case RECEIVE_VALUES:
    return { ...state, expenses: [...state.expenses, action.state] };
  case CHANGE_VALUES:
    return { ...state, expenses: action.state };
  case EDIT_VALUES:
    return { ...state, btnName: action.state.btnName, newId: action.state.newId };
  default:
    return state;
  }
};

export default wallet;
