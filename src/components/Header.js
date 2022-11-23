import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { getEmail, receiveExpenses } = this.props;
    let result = 0;
    receiveExpenses.forEach((expense) => {
      const { value, currency, exchangeRates } = expense;
      const exact = exchangeRates[currency];
      const multi = value * exact.ask;
      result += JSON.parse(multi);
    });
    return (
      <div className="header-container">
        <p className="header-email" data-testid="email-field">{ getEmail }</p>
        <div className="header-total">
          <p className="number" data-testid="total-field">{ result.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  getEmail: store.user.email,
  receiveExpenses: store.wallet.expenses,
});

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  receiveExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
