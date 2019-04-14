import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const localizer = BigCalendar.momentLocalizer(moment);

console.log(localizer, 'localizer');


var alertt;
var inicio;
var final;
class Basic extends React.Component {
  constructor() {
    super();
    this.state = {
      recogidaEvents: events,
    }
  }
  render() {
    return (
      <div className="app-calendar animated slideInUpTiny animation-duration-3">
        <BigCalendar
          selectable
          {...this.props}
          localizer={localizer}
          events={this.state.recogidaEvents}
          views={allViews}
          step={60}
          defaultDate={new Date(2015, 3, 1)}
          onSelectSlot={(slotInfo) => {
            alert(alertt = prompt('Introduza evento'),
              inicio = slotInfo.end,
              final = slotInfo.end,
              this.setState({ recogidaEvents: [{ 'title': alertt, 'start': inicio, 'end': final }, ...this.state.recogidaEvents] })
            )
          }}
        />
      </div>
    )
  }
}
export default Basic;