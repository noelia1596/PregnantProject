import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import {Dropdown, DropdownMenu, DropdownToggle, Popover} from 'reactstrap';



class AppModuleHeader extends React.Component {


  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const {placeholder, onChange, value, user, notification, apps} = this.props;

    return (
      <div className="module-box-header-inner">
        <div className="search-bar right-side-icon bg-transparent d-none d-sm-block">
          <div className="form-group">
            <input className="form-control border-0" type="search" placeholder={placeholder}
                   onChange={onChange}
                   value={value}/>
            <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
          </div>
        </div>

        <Popover className="p-3" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1"
                 toggle={this.toggle}>
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
        </Popover>

        

        <div className="module-box-header-right">
          {apps && <IconButton className="size-40" aria-label="Menu">
            <i className="zmdi zmdi-apps"/>
          </IconButton>}
          {notification && <IconButton className="size-40" aria-label="Menu">
            <i className="zmdi zmdi-notifications-none"/>
          </IconButton>}

          <img className="ml-2 rounded-circle size-40 pointer" id="Popover1" alt={user.name}
               onMouseEnter={this.toggle}
               onMouseLeave={this.toggle}
               onClick={this.toggle}
               src={user.avatar}/>
        </div>
      </div>
    )
  }
}

export default AppModuleHeader;

AppModuleHeader.defaultProps = {
  styleName: '',
  value: '',
  notification: true,
  apps: true
};