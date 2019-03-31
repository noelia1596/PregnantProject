import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
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
    const {history} = nextProps;
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
            <IntlMessages id="sidebar.main"/>
          </li>

         

          <li className="ui_tooltip menu">
            <Button className="void">
              <i className="zmdi zmdi-folder zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.components"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/auto-complete">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.components.autocomplete"/></span>
                </NavLink>
              </li>
             
              <li>
                <NavLink className="prepend-icon" to="/app/components/buttons">
                  <span className="nav-text"><IntlMessages id="sidebar.components.buttons"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/button-group">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.components.buttonGroup"/></span>
                </NavLink>
              </li>
            
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/carousel">
                  <span className="nav-text"><IntlMessages id="sidebar.components.carousel"/></span>
                </NavLink>
              </li>
            
              <li>
                <NavLink className="prepend-icon" to="/app/components/dialogs">
                  <span className="nav-text"><IntlMessages id="sidebar.components.dialogs"/></span>
                </NavLink>
              </li>
            
              <li>
                <NavLink className="prepend-icon" to="/app/components/list">
                  <span className="nav-text"><IntlMessages id="sidebar.components.lists"/></span>
                </NavLink>
              </li>
            
              <li>
                <NavLink className="prepend-icon" to="/app/components/pickers">
                  <span className="nav-text"><IntlMessages id="sidebar.components.pickers"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/popovers">
                  <span className="nav-text"><IntlMessages id="sidebar.components.popovers"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/progressbar">
                  <span className="nav-text"><IntlMessages id="sidebar.components.progress"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/components/selects">
                  <span className="nav-text"><IntlMessages id="sidebar.components.selects"/></span>
                </NavLink>
              </li>
             
              <li>
                <NavLink className="prepend-icon" to="/app/components/stepper">
                  <span className="nav-text"><IntlMessages id="sidebar.components.stepper"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/components/tables">
                  <span className="nav-text"><IntlMessages id="sidebar.components.tables"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/components/tabs">
                  <span className="nav-text"><IntlMessages id="sidebar.components.tabs"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/components/text-fields">
                  <span className="nav-text"><IntlMessages id="sidebar.components.textFields"/></span>
                </NavLink>
              </li>
              
            </ul>
          </li>

         
          <li className="nav-header">
            <IntlMessages id="sidebar.inBuiltApp"/>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/app/chat">
              <i className="zmdi zmdi-comment zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.appModule.chat"/></span>
            </NavLink>
          </li>

          <li className="timeline_tooltip menu">
            <Button>
              <i className="zmdi zmdi-swap-alt zmdi-hc-fw zmdi-hc-rotate-90"/>
              <span className="nav-text"><IntlMessages id="sidebar.timeLine"/></span>
            </Button>
            <ul className="sub-menu">

              <li>
                <NavLink className="prepend-icon" to="/app/time-line/default">
                  <span className="nav-text"><IntlMessages id="sidebar.timeLine.default"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/time-line/default-with-icon">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.timeLine.defaultwithIcons"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/time-line/left-align">
                  <span className="nav-text"><IntlMessages id="sidebar.timeLine.leftAligned"/></span>
                </NavLink>
              </li>
              {/*<li>
                            <NavLink className="prepend-icon" to="/app/time-line/zigzag">
                                <span className="nav-text"><IntlMessages id="sidebar.timeLine.zigzag"/></span>
                            </NavLink>
                        </li>*/}
            </ul>
          </li>


          <li className="nav-header">
            <IntlMessages id="sidebar.extensions"/>
          </li>


          <li className="menu">
            <Button className="void">
              <i className="zmdi zmdi-brush zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.pickers"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/pickers/date-time">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.pickers.dateTimePickers"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/pickers/color">
                  <span className="nav-text"><IntlMessages id="sidebar.pickers.colorPickers"/></span>
                </NavLink>
              </li>
            </ul>

          </li>

          <li className="menu">
            <Button className="void">
              <i className="zmdi zmdi-key zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.extensions"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/extensions/dnd">
                  <span className="nav-text"><IntlMessages id="sidebar.extensions.dragNDrop"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/extensions/dropzone">
                  <span className="nav-text"><IntlMessages id="sidebar.extensions.dropzone"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extensions/sweet-alert">
                  <span className="nav-text"><IntlMessages id="sidebar.extensions.sweetAlert"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extensions/notification">
                                    <span className="nav-text"><IntlMessages
                                      id="sidebar.extensions.notification"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

          

          <li className="map_tooltip menu">
            <Button>
              <i className="zmdi zmdi-google-maps zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.map"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/map/simple">
                  <span className="nav-text"><IntlMessages id="sidebar.map.simple"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/styled">
                  <span className="nav-text"><IntlMessages id="sidebar.map.styled"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/geo-location">
                  <span className="nav-text"><IntlMessages id="sidebar.map.geoLocation"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/directions">
                  <span className="nav-text"><IntlMessages id="sidebar.map.mapDirection"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/overlay">
                  <span className="nav-text"><IntlMessages id="sidebar.map.overlay"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/kml">
                  <span className="nav-text"><IntlMessages id="sidebar.map.kmLayer"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/popup-info">
                  <span className="nav-text"><IntlMessages id="sidebar.map.popupInfo"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/traffic">
                  <span className="nav-text"><IntlMessages id="sidebar.map.trafficLayer"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/street-view">
                  <span className="nav-text"><IntlMessages id="sidebar.map.streetView"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/event">
                  <span className="nav-text"><IntlMessages id="sidebar.map.eventListener"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/drawing">
                  <span className="nav-text"><IntlMessages id="sidebar.map.mapDrawing"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/map/clustering">
                  <span className="nav-text"><IntlMessages id="sidebar.map.mapClustering"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-header">
            <IntlMessages id="sidebar.modules"/>
          </li>

          <li className="menu">
            <Button className="void">
              <i className="zmdi zmdi-calendar zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.calendar"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/calendar/basic">
                  <span className="nav-text"><IntlMessages id="sidebar.calendar.basic"/></span>
                </NavLink>
              </li>
             
            
            </ul>

          </li>
          <li className="menu">
            <Button>
              <i className="zmdi zmdi-collection-item-8 zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.appModule"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/app-module/login-1">
                  <span className="nav-text"><IntlMessages id="sidebar.appModule.login1"/></span>
                </NavLink>
              </li>  
              <li>
                <NavLink className="prepend-icon"
                         to="/app/app-module/sign-up-1">
                  <span className="nav-text"><IntlMessages id="sidebar.appModule.signup1"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

        


          <li className="menu">
            <Button>
              <i className="zmdi zmdi-pages zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.extraPages"/></span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extra-pages/about-us">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.aboutUs"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extra-pages/contact-us">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.contactUs"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/extra-pages/blog">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.blog"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/extra-pages/faq">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.faq"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extra-pages/portfolio">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.portfolio"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extra-pages/error-404">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.404"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon"
                         to="/app/extra-pages/error-500">
                  <span className="nav-text"><IntlMessages id="sidebar.extraPages.500"/></span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <Button>
              <i className="zmdi zmdi-device-hub zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="sidebar.menuLevels"/></span>
            </Button>

            <ul className="sub-menu">
              <li>
                <Button className="prepend-icon">
                  <span className="nav-text"><IntlMessages id="sidebar.menuLevels.level1"/></span>
                </Button>
              </li>
              <li className="menu">
                <Button className="prepend-icon">
                  <span className="nav-text"><IntlMessages id="sidebar.menuLevels.level1"/></span>
                </Button>

                <ul className="sub-menu">
                  <li>
                    <Button href="">
                      <span className="nav-text"><IntlMessages
                        id="sidebar.menuLevels.level2"/></span>
                    </Button>
                  </li>
                  <li className="menu">
                    <Button href="">
                      <span className="nav-text"><IntlMessages
                        id="sidebar.menuLevels.level2"/></span>
                    </Button>

                    <ul className="sub-menu">
                      <li>
                        <Button href="">
                          <span className="nav-text"><IntlMessages
                            id="sidebar.menuLevels.level3"/></span>
                        </Button>
                      </li>
                      <li>
                        <Button href="">
                          <span className="nav-text"><IntlMessages
                            id="sidebar.menuLevels.level3"/></span>
                        </Button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
