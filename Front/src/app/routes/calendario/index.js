import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const localizer = BigCalendar.momentLocalizer(moment);

console.log(localizer,'localizer');




const Basic = (props) => {
  return (
    <div className="app-calendar animated slideInUpTiny animation-duration-3">
      <BigCalendar
        selectable
        {...props}
        localizer={localizer}
        events={events}
        views={allViews}
        step={60}
        defaultDate={new Date(2015, 3, 1)}
        //onSelectEvent={event => alert(event.title)}
        onSelectSlot={(slotInfo) => console.log(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}` +
          `\naction: ${slotInfo.action}`
        //events = {slotInfo,...events}
        )}
        />
    </div>
  )
};

export default Basic;
{/*guardarEventos=(slotInfo)=>console.log(
    
    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    `\nend: ${slotInfo.end.toLocaleString()}` +
    `\naction: ${slotInfo.action}`
) */}



    

{ /*
    class Calendario extends React.Component{
        constructor(){
            super();
            this.state = {
                events : []
            };
        }
        render(){
            return(
                <div className='Calendario'>
                    <BigCalendar
                        events = {this.state.events}
                    />
                </div>
            )
        }
    }
    export default Calendario;
    captarDia = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    */ }