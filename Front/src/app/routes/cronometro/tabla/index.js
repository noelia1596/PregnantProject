import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';


let id = 0;
function createData(inicio, final) {
    var inicioMoment = moment(inicio);
    var finalMoment = moment(final);
    var tiempoTranscurrido = moment.utc((finalMoment).diff(inicioMoment)).format("HH:mm:ss");
    id += 1;
    return { id, inicio: inicioMoment.format('YYYY-MM-DD HH:mm:ss'), final: finalMoment.format('YYYY-MM-DD HH:mm:ss'), tiempoTranscurrido: tiempoTranscurrido };
}

var data = [];

class BasicTable extends React.Component {
    render() {
        if (this.props.data) {
            data = this.props.data.map((e) => { return createData(e.inicio, e.final) });
        } else {
            data = [];
        }

        return (
            <div className="table-responsive-material">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Inicio</TableCell>
                            <TableCell align="center">Final</TableCell>
                            <TableCell align="center">Tiempo Transcurrido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell align="center">{n.inicio}</TableCell>
                                    <TableCell align="center">{n.final}</TableCell>
                                    <TableCell align="center">{n.tiempoTranscurrido}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default BasicTable;