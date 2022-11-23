import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import mockData from './mockData';
import renderWithRouterAndRedux from './renderWith';

const currencyKeys = Object.keys(mockData);
const currency = currencyKeys.filter((cur) => cur !== 'USDT');
const addExp = 'Adicionar despesa';
const newObj = {
  id: 4,
  value: '100',
  description: 'Food',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};
const newObj2 = {
  id: 5,
  value: '200',
  description: 'More Food',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

describe('Cobertura total do código', () => {
  it('Testa a página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const login = screen.getByText('Login');
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    const btnLogin = screen.getByRole('button', { name: 'Entrar' });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
    userEvent.type(email, 'user@test.com');
    userEvent.type(password, '246810');
    expect(btnLogin).toBeEnabled();
    userEvent.click(btnLogin);
    expect(history.location.pathname).toBe('/carteira');
    const headerEmail = screen.getByTestId('email-field');
    const headerTotal = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerEmail).toBeInTheDocument();
    expect(headerTotal).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
    expect(headerEmail.innerHTML).toBe('user@test.com');
    expect(headerTotal.innerHTML).toBe('0.00');
    expect(headerCurrency.innerHTML).toBe('BRL');
  });
  it('Testa o Formulário', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        wallet: {
          currencies: currency,
          expenses: [],
          btnName: addExp,
          newId: '',
        },
      },
    });
    const formValue = screen.getByTestId('value-input');
    const formDescription = screen.getByTestId('description-input');
    const formCurrency = screen.getByTestId('currency-input');
    const formMethod = screen.getByTestId('method-input');
    const formTag = screen.getByTestId('tag-input');
    const btnForm = screen.getByRole('button', { name: addExp });
    expect(formValue).toBeInTheDocument();
    expect(formDescription).toBeInTheDocument();
    expect(formCurrency).toBeInTheDocument();
    expect(formMethod).toBeInTheDocument();
    expect(formTag).toBeInTheDocument();
    expect(btnForm).toBeInTheDocument();
    userEvent.type(formValue, '100');
    userEvent.type(formDescription, 'Food');
    userEvent.click(btnForm);
    await waitFor(() => {
      const btnEdit = screen.getByTestId('edit-btn');
      expect(btnEdit).toBeInTheDocument();
    }, { timeout: 10000 });
  });
  it('Testa a Tabela', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        wallet: {
          currencies: currency,
          expenses: [newObj, newObj2],
          btnName: addExp,
          newId: '',
        },
      },
    });
    const btnEdit = screen.getAllByTestId('edit-btn');
    userEvent.click(btnEdit[0]);
    const formValue = screen.getByTestId('value-input');
    const formDescription = screen.getByTestId('description-input');
    const btnForm = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.type(formValue, '100');
    userEvent.type(formDescription, 'Food');
    userEvent.click(btnForm);
    const btnDelete = screen.getAllByTestId('delete-btn');
    userEvent.click(btnDelete[0]);
    userEvent.type(formValue, '300');
    userEvent.type(formDescription, 'More Food');
    const btnNew = screen.getByRole('button', { name: addExp });
    userEvent.click(btnNew);
    await waitFor(() => {
      const valueText = screen.getByText(/300/);
      expect(valueText).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});
