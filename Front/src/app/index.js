import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Components from './routes/components';
import Pickers from './routes/pickers';
import Extensions from './routes/extensions';
import Map from './routes/map';
import Calendar from './routes/calendar';
import TimeLine from './routes/timeLine';
import AppModule from './routes/appModule';
import ExtraPages from './routes/extraPages';
//import Tour from '../components/Tour/index';  es el circulito que va diciendo lo que hace cada apartado que tenemos
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import ColorOption from 'containers/Customizer/ColorOption';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';


import Antojos from './routes/antojos';
import Imagenes from './routes/imagenes/funcionalidadImagenes';
import Ejercicios from './routes/ejercicios';
import Evolucionamiento from './routes/evolucionamiento';
import Calendario from './routes/calendario';
import Cronometro from './routes/cronometro';
import Geolocalización from './routes/geolocalización';
import NombresBebes from './routes/nombresBebes';

class App extends React.Component {

  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        {/*<Tour/> */}

        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
              <TopNav styleName="app-top-header" />}
            <Header />
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
              <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>

                <Route path={`${match.url}/components`} component={Components} />
                <Route path={`${match.url}/pickers`} component={Pickers} />
                <Route path={`${match.url}/extensions`} component={Extensions} />
                <Route path={`${match.url}/map`} component={Map} />
                <Route path={`${match.url}/calendar`} component={Calendar} />
                <Route path={`${match.url}/time-line`} component={TimeLine} />

                <Route path={`${match.url}/funcionalidadesAntojos`} component={Antojos} />
                <Route path={`${match.url}/imagenes`} component={Imagenes} />
                <Route path={`${match.url}/ejercicios`} component={Ejercicios} />
                <Route path={`${match.url}/evolucionamiento`} component={Evolucionamiento} />
                <Route path={`${match.url}/calendario`} component={Calendario} />
                <Route path={`${match.url}/cronometro`} component={Cronometro} />
                <Route path={`${match.url}/geolocalizacion`} component={Geolocalización} />
                <Route path={`${match.url}/nombresBebes`} component={NombresBebes} />


                <Route path={`${match.url}/app-module`} component={AppModule} />
                <Route path={`${match.url}/chat`}
                  component={asyncComponent(() => import('./routes/chatPanel/basic/index'))} />
                <Route path={`${match.url}/chat-redux`}
                  component={asyncComponent(() => import('./routes/chatPanel/redux/index'))} />
                <Route path={`${match.url}/extra-pages`} component={ExtraPages} />
                <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))} />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
        <ColorOption />
      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition }
};
export default withRouter(connect(mapStateToProps)(App));