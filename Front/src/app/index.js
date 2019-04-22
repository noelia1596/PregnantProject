import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Components from './routes/components';
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
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER)}
            <Header />
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER)}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>

                <Route path={`${match.url}/components`} component={Components} />
                <Route path={`${match.url}/funcionalidadesAntojos`} component={Antojos} />
                <Route path={`${match.url}/imagenes`} component={Imagenes} />
                <Route path={`${match.url}/ejercicios`} component={Ejercicios} />
                <Route path={`${match.url}/evolucionamiento`} component={Evolucionamiento} />
                <Route path={`${match.url}/calendario`} component={Calendario} />
                <Route path={`${match.url}/cronometro`} component={Cronometro} />
                <Route path={`${match.url}/geolocalizacion`} component={Geolocalización} />
                <Route path={`${match.url}/nombresBebes`} component={NombresBebes} />

                <Route component={asyncComponent(() => import('app/routes/paginaPrincipal/index'))} />
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