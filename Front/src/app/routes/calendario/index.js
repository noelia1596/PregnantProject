import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const localizer = BigCalendar.momentLocalizer(moment);

class Basic extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      recogidaEvents: events,
    }
  }
  crearEvento(titlee, inicioo, finall) {
    this.setState({ recogidaEvents: [{ 'title': titlee, 'start': inicioo, 'end': finall }, ...this.state.recogidaEvents] })
  }

  render() {
    console.log(this.state.open, 'open')
    return (
      <div className="app-calendar animated slideInUpTiny animation-duration-3">
        <BigCalendar
          selectable
          {...this.props}
          localizer={localizer}
          events={this.state.recogidaEvents}
          views={allViews}
          step={60}
          defaultDate={new Date()}
          onSelectSlot={(slotInfo) => {
            this.setState({ inicio: slotInfo.start, final: slotInfo.end, open: true })
          }}
        />
        <Dialog open={this.state.open}>
          <DialogTitle>Evento</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Escriba Evento"
              type="text"
              onChange={(evt) => { this.setState({ valorTexto: evt.target.value }) }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.crearEvento(this.state.valorTexto, this.state.inicio, this.state.final)
                this.setState({ open: false })
              }
              }
              color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

      </div>

    )

  }
}
export default Basic;