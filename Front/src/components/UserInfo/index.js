import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import { Redirect } from 'react-router-dom';


const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';

class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
    if (this.state.loGout) {
      return (
        <Redirect
          to={{
            pathname: '/signin',
          }}
        />
      )

    }
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={'https://via.placeholder.com/150x150'}
          className="user-avatar "
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>{userLogged.Nombre} {userLogged.Apellidos} <i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
        </div>
        <Menu className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <MenuItem onClick={() => {
            this.handleRequestClose();
            this.props.userSignOut();
            localStorage.removeItem(USER_LOGGED_LOCAL_STORAGE);
            this.setState({ loGout: true });
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

            <IntlMessages id="sidebar.components.salir" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale }
};
export default connect(mapStateToProps, { userSignOut })(UserInfo);


