const timeLineData = [  
    {
      image:  'https://www.hola.com/imagenes/ninos/2017081798296/sintomas-embarazo-primer-mes-hk/0-480-157/primer-mes-embarazo-t.jpg',
      title: 'PRIMER MES',
      description: '*Tamaño de lenteja',   
      longitud : '*Longitud > 0,2cm',
      peso:'*Peso >0,1gm', 
      mes: 0
    }, {
      image: 'https://i.ytimg.com/vi/soOwe6Wp4vU/maxresdefault.jpg',
      title: 'SEGUNDO MES',
      description: '*Tamaño de una franguesa',   
      longitud : '*Longitud > 1cm',
      peso:'*Peso > 1gm',
      carac1: '*Se desarrolla el cerebro',
      carac2: '*Se crea el esqueleto',
      //description: '*Su corazón empieza a latir *Tamaño como una franguesa \ *Longitud > 1cm \ *Peso > 1gm *Se desarrolla el cerebro *Se crea el esqueleto',
      mes: 1
    }, {
      image:  'https://assets.babycenter.com/ims/2015/01/pregnancy-week-13-fingerprints_square.jpg?width=600',
      title: 'TERCER MES',
      description: '*Tamaño de un melocotón',   
      longitud : '*Longitud > 7,4cm',
      peso:'*Peso > 23gm',
      carac1: '*Tiene las cuatro extremidades',
      carac2: '*Se desarrollan los ojos',
      carac3: '*Se escuchan latidos',
      carac4: '*Desarrollan órganos principales',
      //description: '*Se empieza a mover *Tamaño de un melocotón *Longitud > 7,4cm \ *Peso > 23gm *Tiene ya las cuatro extremedidas *Se desarrollan los ojos *Se escuchan latidos *Desarrollan órganos principales ',
      mes: 2
    }, {
      image:  'https://assets.babycenter.com/ims/2015/01/pregnancy-week-16-heart-development_square.jpg?width=600',
      title: 'CUARTO MES',
      description: '*Tamaño de una manzana',   
      longitud : '*Longitud > 13cm',
      peso:'*Peso > 140gm',
      carac1: '*Se crea el sistema inmunológico',
      carac2: '*Está listo para comer  hablar',
      carac3: '*Los músuclos toman fuerza',
      carac4: '*Define características del cuerpo',
      //description: '*Se crea el sistema inmunológico *Tamaño de una manzana *Longitud > 13cm \ *Peso > 140gm *Está listo para comer  hablar *Tiene mucha elasticidad *Los músuclos toman fuerza *Define características del cuerpo',
      mes: 3
    }, {
      image:  'https://www.mibebeyyo.com/images/herramientas/tu-embarazo/semana-28-de-embarazo.jpg',
      title: 'QUINTO MES',
      description: '*Tamaño de un plátano',   
      longitud : '*Longitud > 26,7cm',
      peso:'*Peso > 360gm',
      carac1: '*Puede escuchar la voz de Papá y Mamá',
      carac2: '*Los pulmones se ponen en marcha',
      carac3: '*Órganos reproductores están formados',
      carac4: '*Duerme y se despierta',
      //description: '*Puede escuchar la voz de Papá y Mamá *Tamaño de un plátano *Longitud > 26,7cm \ *Peso > 360gm *Los pulmones se ponen en marcha *Órganos reproductores están formados *Duerme y se despierta',
      mes: 4
    },{
        image:  'http://4.bp.blogspot.com/-WJBWaWoJQEc/UjbCMQGiVvI/AAAAAAAAL14/4nJglzt0sR4/s1600/feto-desarrollo-utero.jpg',
        title: 'SEXTO MES',
        description: '*Tamaño de una coliflor',   
        longitud : '*Longitud > 35,6cm',
        peso:'*Peso > 760gm',
        carac1: '*Abre sus ojos',
        carac2: '*Gusto y olfato desarrollado',
        carac3: '*Siente emociones',
        carac4: '*Duerme 20h diarias',
        //description: '*Abre sus ojos *Tamaño a una coliflor *Longitud > 35,6cm \ *Peso > 760gm *Acumula grasa corporal *Siente emociones *Gusto y olfato desarrollado *Duerme 20h diarias',
        mes: 5
      },{
        image:  'https://assets.babycenter.com/ims/2015/01/pregnancy-week-30-amniotic-fluid_square.jpg?width=600',
        title: 'SÉPTIMO MES',
        description: '*Tamaño de un coco',   
        longitud : '*Longitud > 39,9cm',
        peso:'*Peso > 1,319kg',
        carac1: '*Siente tus estados de ánimo',
        carac2: '*Diferencia el sabor dulce y salado',
        carac3: '*Huesos desarrollados',
        //description: '*Tamaño de un coco, *Longitud > 39,9cm \ *Peso > 1,319kg *Siente tus estados de ánimo *Compartís alimento *Diferencia el sabor dulce y salado *Huesos desarrollados ',
        mes: 6
      },{
        image:  'https://www.etapainfantil.com/wp-content/uploads/2016/12/Embarazo-mes-a-mes-Octavo-mes-de-embarazo-700x700.jpg',
        title: 'OCTAVO MES',
        description: '*Tamaño de una piña',   
        longitud : '*Longitud > 47cm',
        peso:'*Peso > 2,5kg',
        carac1: '*Se ubica la cabeza hacia abajo',
        carac2: '*Ensayo general de los órganos',
        carac3: '*Reconoce perfectamente voces ',
        carac4: '*Tiene las proporciones definitivas',
        //description: '*Tamaño de una piña, *Longitud > 47cm \ *Peso > 2,5kg *Se ubica la cabeza hacia abajo *Ensayo general de los órganos *Reconoce perfectamente voces *Tiene las proporciones definitivas',
        mes: 7
      },{
        image:  'https://assets.afcdn.com/story/20171031/37a-semana-9-mes-de-embarazo-1131833_w767h767c1.jpg',
        title: 'NOVENO MES',
        description: '*Tamaño de una sandía',   
        longitud : '*Longitud > 52,1cm',
        peso:'*Peso > 3,4kg',
        carac1: '*Está en posición defálica',
        carac2: '*El cabello del cuerpo se le cae',
        carac3: '*En el día del parto segrerá hormonas del estrés ',
        //description: '*Tamaño de una sandía, *Longitud > 52,1cm \ *Peso > 3,4kg * Está en posición defálica *El cabello del cuerpo se le cae *Sigue recibiendo nutrientes *En el día del parto segrerá hormonas del estrés',
        mes: 8
      }
  ];
  export default timeLineData;