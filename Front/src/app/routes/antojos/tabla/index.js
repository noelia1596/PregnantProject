import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';
import IntlMessages from 'util/IntlMessages';


let counter = 0;
var antojos = [];
function createData(id, NombreAntojo, TipoDeAntojo, FechaAntojo, VecesAntojo, aQuienDio) {
  counter += 1;
  return { id: counter, id, NombreAntojo, TipoDeAntojo, FechaAntojo: moment(FechaAntojo).format('YYYY-MM-DD'), VecesAntojo, aQuienDio };
}


const columnData = [
  //{id: 'id', align: false, disablePadding: true, label: 'Id'},
  { id: 'NombreDelAntojo', align: false, disablePadding: true, label: <IntlMessages id="sidebar.components.nombreAntojo" /> },
  { id: 'TipoDeAntojo', align: true, disablePadding: false, label: <IntlMessages id="sidebar.components.tipoAntojo" /> },
  { id: 'FechaDelAntojo', align: true, disablePadding: false, label: <IntlMessages id="sidebar.components.fechaAntojo" /> },
  { id: 'VecesDadasDelAntojo', align: true, disablePadding: false, label: <IntlMessages id="sidebar.components.vecesAntojo" /> },
  { id: 'AQuienLeDio', align: true, disablePadding: false, label: <IntlMessages id="sidebar.components.dioAntojo" /> },
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };


  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, antojos } = this.props;
    //const { antojos } = this.props; 
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}


let EnhancedTableToolbar = props => {
  const { numSelected, selected, deleteCravings } = props;
  return (
    <Toolbar
      className="table-header">
      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} selected</Typography>
        ) : (
            <Typography variant="title">Cravings</Typography>
          )}
      </div>
      <div className="spacer" />
      <div className="actions">
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete"
              onClick={event => deleteCravings(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const antojosOrder =
      order === 'desc'
        ? antojos.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : antojos.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    antojos = antojosOrder;
    this.setState({ antojosOrder, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: antojos.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  render() {
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const { list, deleteCraving } = this.props;

    if (!list || list.length === 0) {
      console.log('No tenemos antojos', list)
      return <div>no hay datos</div>
    } else {

      antojos = list
    }
    return (
      <div>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          deleteCravings={deleteCraving}
        />
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={antojos.length}
              />
              <TableBody>
                {antojos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      onKeyDown={event => this.handleKeyDown(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isSelected} />
                      </TableCell>
                      <TableCell padding="none">{n.NombreDelAntojo}</TableCell>
                      <TableCell align="none">{n.TipoDeAntojo}</TableCell>
                      <TableCell align="none">{moment(n.FechaDelAntojo).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="none">{n.VecesDadasDelAntojo}</TableCell>
                      <TableCell align="none">{n.AQuienLeDio}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={antojos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default EnhancedTable;








