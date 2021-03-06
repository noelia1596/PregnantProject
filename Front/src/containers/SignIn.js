import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from 'actions/Auth';
import request from 'request';
import { Redirect } from 'react-router-dom';
import './csss.css';


class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'example@example.com',
      password: 'demo#123'
    }
  }

  signInDB(username, password) {
    const self = this;
    const url = "http://localhost:3000/api-login";
    request.post(url, { form: { username: username, password: password } },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        //console.log('Upload successful!  Server responded with:',httpResponse);
        let result = JSON.parse(httpResponse.body);

        self.setState({
          userLogged: result.customer
        });

      });
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    if (this.state.userLogged) {
      console.log('token', this.state.userLogged)
      return <Redirect to={{ pathname: '/app/home', userLogged: this.state.userLogged }} />

    }
    const {
      email,
      password
    } = this.state;
    const { showMessage, loader, alertMessage } = this.props;
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/">
              <img src={require("assets/images/logo.png")} alt="logo" height="240rem" />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1><IntlMessages id="sidebar.components.usuario" /></h1>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="sidebar.components.usuario" />}
                    fullWidth
                    onChange={(event) => this.setState({ email: event.target.value })}
                    defaultValue={email}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <TextField
                    type="password"
                    label={<IntlMessages id="sidebar.components.contraseña" />}
                    fullWidth
                    onChange={(event) => this.setState({ password: event.target.value })}
                    defaultValue={password}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button onClick={() => {
                      this.signInDB(email, password);
                    }} variant="contained" color="primary">
                      <IntlMessages id="sidebar.components.entrar" />
                    </Button>

                    <Link to="/signup">
                      <IntlMessages id="sidebar.components.registrarse" />
                    </Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

        </div>
        {
          loader &&
          <div className="loader-view">
            <CircularProgress />
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser }
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
})(SignIn);
