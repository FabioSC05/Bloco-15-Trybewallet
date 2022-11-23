import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editValues, changeValues } from '../redux/actions';

class Table extends Component {
  deleteExp = ({ target }) => {
    const { name } = target;
    const { receiveExpenses, changeState } = this.props;
    const newArray = receiveExpenses.filter((ele) => JSON.stringify(ele.id) !== name);
    changeState(newArray);
  };

  editExp = ({ target }) => {
    const { name } = target;
    const { editState } = this.props;
    const object = { btnName: 'Editar despesa', newId: name };
    editState(object);
  };

  render() {
    const { receiveExpenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="table-unit">Descrição</th>
              <th className="table-unit">Tag</th>
              <th className="table-unit">Método de pagamento</th>
              <th className="table-unit">Valor</th>
              <th className="table-unit">Moeda</th>
              <th className="table-unit">Câmbio utilizado</th>
              <th className="table-unit">Valor convertido</th>
              <th className="table-unit">Moeda de conversão</th>
              <th className="table-unit">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {receiveExpenses.map((exp) => {
              const { value, exchangeRates, currency } = exp;
              const number = JSON.parse(value);
              const price = JSON.parse(exchangeRates[currency].ask);
              const converted = number * price;
              return (
                <tr key={ exp.id }>
                  <td className="table-unit">{ exp.description }</td>
                  <td className="table-unit">{ exp.tag }</td>
                  <td className="table-unit">{ exp.method }</td>
                  <td className="table-unit">{ number.toFixed(2) }</td>
                  <td className="table-unit">{ exp.exchangeRates[exp.currency].name }</td>
                  <td className="table-unit">{ price.toFixed(2) }</td>
                  <td className="table-unit">{ converted.toFixed(2) }</td>
                  <td className="table-unit">Real</td>
                  <td className="table-unit">
                    <button
                      type="button"
                      className="table-edit"
                      name={ exp.id }
                      onClick={ this.editExp }
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="table-delete"
                      name={ exp.id }
                      onClick={ this.deleteExp }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  receiveExpenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  changeState: (state) => dispatch(changeValues(state)),
  editState: (state) => dispatch(editValues(state)),
});

Table.propTypes = {
  receiveExpenses: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  changeState: PropTypes.func.isRequired,
  editState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
