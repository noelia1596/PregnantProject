import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import SideNavOption from './SideNavOption';
/*
'actions/index';
*/
class ColorOption extends React.Component {

  toggleCustomizer = () => {
    this.setState({ drawerStatus: !this.state.drawerStatus });
  };
  closeCustomizer = () => {
    this.setState({ drawerStatus: false });
  };

  constructor() {
    super();
    this.state = { drawerStatus: false }
  }
  render() {
    return (

      <div className="theme-option">
        <IconButton onClick={this.toggleCustomizer.bind(this)}>
          <i className="zmdi zmdi-settings zmdi-hc-spin text-white" />
        </IconButton>
        <Drawer className="app-sidebar-content right-sidebar"

          anchor="right"
          open={this.state.drawerStatus}
          onClose={this.closeCustomizer.bind(this)}>
          <div className="color-theme">
            <div className="color-theme-header">
              <h3 className="color-theme-title">Service Panel </h3>

              <IconButton className="icon-btn" onClick={this.closeCustomizer}>
                <i className="zmdi zmdi-close text-white" />
              </IconButton>
            </div>
            <div className="color-theme-body">
              <div className="mt-3">
                <SideNavOption closeCustomizer={this.closeCustomizer} />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}



export default ColorOption;

