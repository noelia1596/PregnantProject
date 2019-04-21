import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const { history } = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {
        for (let j = 0; j < menuLi.length; j++) {
          const parentLi = that.closest(this, 'li');
          if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
            menuLi[j].classList.remove('open')
          }
        }
        this.classList.toggle('open');
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] == 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">
          <li className="nav-header">
            <NavLink className="prepend-icon"
              to="/app/home">
              <i className="zmdi zmdi-home" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.principal" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/funcionalidadesAntojos">
              <i className="zmdi zmdi-pizza" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.antojos" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/imagenes">
              <i className="zmdi zmdi-upload" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.imagenes" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/ejercicios">
              <i className="zmdi zmdi-run" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.ejercicios" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/evolucionamiento">
              <i className="zmdi zmdi-graphic-eq" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.evolucion" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/calendario">
              <i className="zmdi zmdi-calendar-check" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.calendario" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/cronometro">
              <i className="zmdi zmdi-timer" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.cronometro" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/geolocalizacion">
              <i className="zmdi zmdi-pin-drop" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.geolocalizacion" /></span>
            </NavLink>
          </li>

          <li>
            <NavLink className="prepend-icon"
              to="/app/nombresBebes">
              <i className="zmdi zmdi-face" />
              <span className="nav-text"><IntlMessages
                id="sidebar.components.nombresBebes" /></span>
            </NavLink>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}
export default withRouter(SidenavContent);
