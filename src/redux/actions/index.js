export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_VALUES = 'RECEIVE_VALUES';
export const CHANGE_VALUES = 'CHANGE_VALUES';
export const EDIT_VALUES = 'EDIT_VALUES';

export const saveEmail = (state) => ({ type: SAVE_EMAIL, state });

const receiveCurrencies = (state) => ({ type: RECEIVE_CURRENCIES, state });

const receiveValues = (state) => ({ type: RECEIVE_VALUES, state });

export const changeValues = (state) => ({ type: CHANGE_VALUES, state });

export const editValues = (state) => ({ type: EDIT_VALUES, state });

export const fetchCurrencies = () => (
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const keys = Object.keys(data).filter((key) => key !== 'USDT');
    dispatch(receiveCurrencies(keys));
  }
);

export const fetchValues = (state) => (
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const { id, value, description, currency, method, tag } = state;
    const newObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
    dispatch(receiveValues(newObj));
  }
);
