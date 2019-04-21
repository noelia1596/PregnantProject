import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
} from 'constants/ActionTypes';
import { switchLanguage, toggleCollapsedNav } from 'actions/Setting';
import LanguageSwitcher from 'components/LanguageSwitcher/index';


class Header extends React.Component {

  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher
    })
  };
  handleRequestClose = () => {
    this.setState({
      langSwitcher: false,
      apps: false
    });
  };
  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedNav(val);
  };

  constructor() {
    super();
    this.state = {
      langSwitcher: false,
    }
  }

  render() {
    const { drawerType, locale, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

    return (
      <AppBar
        className={`app-main-header ${(horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
        <Toolbar className="app-toolbar" disableGutters={false}>

          <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
            onClick={this.onToggleCollapsedNav}>
            <span className="menu-icon" />
          </IconButton>
          <ul className="header-notifications list-inline ml-auto">
            <li className="list-inline-item"></li>
            <li className="list-inline-item">
              <Dropdown
                className="quick-menu"
                isOpen={this.state.langSwitcher}
                toggle={this.onLangSwitcherSelect.bind(this)}>

                <DropdownToggle
                  className="d-inline-block"
                  tag="span"
                  data-toggle="dropdown">
                  <IconButton className="icon-btn">
                    <i className={`flag flag-24 flag-${locale.icon}`} />
                  </IconButton>
                </DropdownToggle>

                <DropdownMenu right className="w-50">
                  <LanguageSwitcher switchLanguage={this.props.switchLanguage}
                    handleRequestClose={this.handleRequestClose} />
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
          <div className="ellipse-shape"></div>
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = ({ settings }) => {
  const { drawerType, locale, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, locale, navigationStyle, horizontalNavPosition }
};

export default withRouter(connect(mapStateToProps, { toggleCollapsedNav, switchLanguage })(Header));