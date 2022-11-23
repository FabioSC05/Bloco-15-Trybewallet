import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disable: true,
    };
  }

  saveInfo = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const number6 = 6;
      const validEmail = email.includes('@') && email.includes('.com');
      const validPassword = password.length >= number6;
      const validate = validEmail && validPassword;
      this.setState({ disable: !validate });
    });
  };

  toWallet = () => {
    const { history, emailToStore } = this.props;
    const { email } = this.state;
    emailToStore(email);
    history.push('/carteira');
  };

  render() {
    const { disable } = this.state;
    return (
      <div className="login-container">
        <div className="login-name">
          <p className="trybe">Trybe</p>
          <p className="wallet">Wallet</p>
        </div>
        <form className="login-form">
          <p className="login">Login</p>
          <label htmlFor="email">
            E-Mail
            <input
              type="email"
              className="login-input"
              data-testid="email-input"
              name="email"
              onChange={ this.saveInfo }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              className="login-input"
              data-testid="password-input"
              name="password"
              onChange={ this.saveInfo }
            />
          </label>
          <button
            type="button"
            className="login-button"
            disabled={ disable }
            onClick={ this.toWallet }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailToStore: (state) => dispatch(saveEmail(state)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  emailToStore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
