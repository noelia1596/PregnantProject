import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  MINI_DRAWER,

} from 'constants/ActionTypes'

import { setDrawerType } from 'actions/index';

import { Button, ButtonGroup } from 'reactstrap';

class Customizer extends React.Component {
  setFixedDrawer = () => {
    this.props.setDrawerType(FIXED_DRAWER);
  };
  setCollapsedDrawer = () => {
    this.props.setDrawerType(COLLAPSED_DRAWER);
  };
  setMiniDrawer = () => {
    this.props.setDrawerType(MINI_DRAWER);
  };

  render() {
    const { drawerType, navigationStyle, horizontalNavPosition } = this.props;

    return (
      <div className="side-nav-option">



        <ButtonGroup>
          <Button color="default"
            className={`jr-btn  ${drawerType === FIXED_DRAWER && 'active'} `}
            onClick={this.setFixedDrawer.bind(this)}>Fixed</Button>
          <Button color="default"
            className={`jr-btn ${drawerType === COLLAPSED_DRAWER && 'active'} `}
            onClick={this.setCollapsedDrawer.bind(this)}>Collapsed</Button>
          <Button color="default"
            className={`jr-btn ${drawerType === MINI_DRAWER && 'active'} `}
            onClick={this.setMiniDrawer.bind(this)}>Mini</Button>
        </ButtonGroup>
      </div>);
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition }
};

export default withRouter(connect(mapStateToProps, {

  setDrawerType,
})(Customizer));

