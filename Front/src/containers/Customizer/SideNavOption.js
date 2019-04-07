import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER,
  MINI_DRAWER,
  VERTICAL_NAVIGATION
} from 'constants/ActionTypes'

import {changeNavigationStyle, setDrawerType, setHorizontalMenuPosition} from 'actions/index';

import {Button, ButtonGroup} from 'reactstrap';

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
    const {drawerType, navigationStyle, horizontalNavPosition} = this.props;

    return (
      <div className="side-nav-option">

        
          
          <ButtonGroup>
            <Button color="default"
                    className={`jr-btn  ${drawerType === FIXED_DRAWER && 'active' } `}
                    onClick={this.setFixedDrawer.bind(this)}>Fixed</Button>
            <Button color="default"
                    className={`jr-btn ${drawerType === COLLAPSED_DRAWER && 'active'} `}
                    onClick={this.setCollapsedDrawer.bind(this)}>Collapsed</Button>
            <Button color="default"
                    className={`jr-btn ${drawerType === MINI_DRAWER && 'active' } `}
                    onClick={this.setMiniDrawer.bind(this)}>Mini</Button>
          </ButtonGroup>
        


      </div>);
  }
}

const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};

export default withRouter(connect(mapStateToProps, {
  changeNavigationStyle,
  setDrawerType,
  setHorizontalMenuPosition
})(Customizer));

