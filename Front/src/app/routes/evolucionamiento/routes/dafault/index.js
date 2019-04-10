import React from 'react';
import timeLineData from '../timeLineData';
import DefaultTimeLineItem from '../../dafaultTimeLineItem';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import moment from 'moment'

const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
const userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
const FechaActual = moment();
//console.log(userLogged.FechaEmbarazo,'userLogged.FechaEmbarazo');
const fechaEmbarazo = moment(userLogged.FechaEmbarazo);

//console.log(fechaEmbarazo, 'fecha embarazooooo');

const Default = ({ match }) => {
  return (
    <div background='red'>
      <ContainerHeader title={<IntlMessages id="sidebar.components.Evolucionbebe" />} match={match} />

      <div className="timeline-section timeline-center clearfix animated slideInUpTiny animation-duration-3">
        {timeLineData.map(

          (timeLine, index) => {
            if (moment(fechaEmbarazo).add(timeLine.mes, 'M') <= FechaActual) {
              //console.log('entraaaa',timeLine.mes,moment(fechaEmbarazo).add(timeLine.mes, 'M') ,FechaActual);
              return <DefaultTimeLineItem key={index}
                styleName={index % 2 === 0 ? '' : 'timeline-inverted'}
                timeLine={timeLine} />
            }
          })
        }
      </div>
    </div>
  )
};

export default Default;
