export default [
  {
    'title': 'Primera prueba',
    'allDay': true,
    'start': new Date(2019, 3, 15),
    'end': new Date(2019, 3, 19)
  },
  {
    'title': 'Evento largo',
    'start': new Date(2019, 3, 7),
    'end': new Date(2019, 3, 10)
  },

  {
    'title': 'Compras empiezan',
    'start': new Date(2019, 3, 13, 0, 0, 0),
    'end': new Date(2019, 3, 20, 0, 0, 0)
  },

  {
    'title': 'Compras terminan',
    'start': new Date(2019, 3, 6, 0, 0, 0),
    'end': new Date(2019, 3, 13, 0, 0, 0)
  },

  {
    'title': 'Algunos eventos',
    'start': new Date(2019, 4, 9, 0, 0, 0),
    'end': new Date(2019, 4, 9, 0, 0, 0)
  },
  {
    'title': 'Conferencia',
    'start': new Date(2019, 3, 11),
    'end': new Date(2019, 3, 13),
    desc: 'Algo importanteeee'
  },
  {
    'title': 'Meeting',
    'start': new Date(2019, 3, 12, 10, 30, 0, 0), //ponemos primero fecha, y se queremos que salga la hora es lo que hay detras del 12 en este caso se pone 10,30,0,0
    'end': new Date(2019, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2019, 3, 12, 12, 0, 0, 0),
    'end': new Date(2019, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2019, 2, 12, 14, 0, 0, 0),
    'end': new Date(2019, 2, 12, 15, 0, 0, 0)
  }
]