import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl'
import "assets/vendors/style"
import indigoTheme from './themes/indigoTheme';
import AppLocale from '../lngProvider';
import MainApp from 'app/index';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { setInitUrl } from '../actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
let userLogged;
/**
 * se usa para validar el usuario que ha entrado
 * @param {*} param0 
 */
const RestrictedRoute = ({ component: Component, authUser, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      authUser || userLogged //si tiene el authUser o el token, entonces sigue esta logic, y abajo **
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />}
  />;

class App extends Component {

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  render() {
    const { match, location, locale, authUser, initURL, isDirectionRTL } = this.props;
    let applyTheme = createMuiTheme(indigoTheme);

    if (location.pathname === '/') {
      if /*(authUser === null) {
        return ( <Redirect to={'/signin'}/> );
      } else if*/ (initURL === '' || initURL === '/' || initURL === '/signin') {
        return (<Redirect to={'/app/home'} />);
      } else {
        return (<Redirect to={initURL} />);
      }
    }
    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    let userFromProps = location.userLogged;
    //console.log('userLogged',userFromProps);

    let userInLocalStorage = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
    console.log('userInLocalStorage', userInLocalStorage);

    /*  Este if hace que cuando nos metemos con el login o registro, guarda el token de la persona en el ls*/
    if (userFromProps) {
      //console.log('hay token')
      userLogged = userFromProps;//guardamos en userLogged, el usuario que nos llega por propiedades
      let parseUser = JSON.stringify(userLogged);
      localStorage.setItem(USER_LOGGED_LOCAL_STORAGE, parseUser);

    } else if (userInLocalStorage) {
      /*cuando queremos pasar de una pag a otra, coge el user que hay guardado en el locaStorage,
      */
      //console.log('tenemos userInLocalStorage', userInLocalStorage);
      userLogged = userInLocalStorage;
    } else {
      //console.log('no hay token', location)
      userLogged = '';
    }

    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">
                <Switch>
                  <RestrictedRoute path={`${match.url}app`} authUser={authUser}
                    component={MainApp} />
                  <Route path='/signin' component={SignIn} />
                  <Route path='/signup' component={SignUp} />
                  <Route
                    component={asyncComponent(() => import('app/routes/extraPages/routes/404'))} />
                </Switch>
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { themeColor, sideNavColor, darkTheme, locale, isDirectionRTL } = settings;
  const { authUser, initURL } = auth;
  return { themeColor, sideNavColor, isDarkTheme: darkTheme, locale, isDirectionRTL, authUser, initURL }
};

export default connect(mapStateToProps, { setInitUrl })(App);
