import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeValues, editValues, fetchCurrencies, fetchValues } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expenses: [],
    };
  }

  componentDidMount() {
    const { getApi, receiveExpenses } = this.props;
    const { expenses } = this.state;
    getApi();
    this.setState({ expenses: receiveExpenses }, () => {
      this.setState({ id: expenses.length });
    });
  }

  saveState = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  saveInfo = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const {
      getValues,
      receiveExpenses,
      receiveName,
      editState,
      receiveId,
      changeState,
    } = this.props;
    if (receiveName === 'Adicionar despesa') {
      const obj = { id, value, description, currency, method, tag };
      getValues(obj);
      this.setState({ expenses: receiveExpenses }, () => {
        this.setState({ id: id + 1, value: '', description: '' });
      });
    }
    if (receiveName === 'Editar despesa') {
      const exact = receiveExpenses.find((ele) => JSON.stringify(ele.id) === receiveId);
      exact.id = JSON.parse(receiveId);
      exact.value = value;
      exact.description = description;
      exact.currency = currency;
      exact.method = method;
      exact.tag = tag;
      const editedExp = receiveExpenses
        .filter((ele) => JSON.stringify(ele.id) !== receiveId);
      editedExp.push(exact);
      const newArray = editedExp.sort((a, b) => a.id - b.id);
      changeState(newArray);
      const object = { btnName: 'Adicionar despesa', newId: '' };
      editState(object);
      this.setState({ expenses: receiveExpenses }, () => {
        this.setState({ id: id + 1, value: '', description: '' });
      });
    }
  };

  render() {
    const { value, description } = this.state;
    const { receiveCurrency, receiveName } = this.props;
    return (
      <div className="wallet-container">
        <form className="wallet-form">
          <label htmlFor="value">
            Valor
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.saveState }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.saveState }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              onChange={ this.saveState }
              name="currency"
              data-testid="currency-input"
            >
              {receiveCurrency.map((currency) => (
                <option key={ currency }>{ currency }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento
            <select
              onChange={ this.saveState }
              name="method"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              onChange={ this.saveState }
              name="tag"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.saveInfo }
            className="wallet-button"
          >
            { receiveName }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  receiveCurrency: store.wallet.currencies,
  receiveExpenses: store.wallet.expenses,
  receiveName: store.wallet.btnName,
  receiveId: store.wallet.newId,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(fetchCurrencies()),
  getValues: (state) => dispatch(fetchValues(state)),
  editState: (state) => dispatch(editValues(state)),
  changeState: (state) => dispatch(changeValues(state)),
});

WalletForm.propTypes = {
  receiveCurrency: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  receiveExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  getApi: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  receiveName: PropTypes.string.isRequired,
  editState: PropTypes.func.isRequired,
  receiveId: PropTypes.string.isRequired,
  changeState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
