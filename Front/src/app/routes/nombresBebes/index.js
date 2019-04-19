import React from 'react';
import Slider from "react-slick";
import Name from './Name';
import './css.css';

const childrenNames = [
    {
        nombre: 'ALEJANDRO',
        origen: 'Griego',
        significado: 'Protector de familia, amigos, pareja',
        imagen: 'http://localhost:5000/images/fotosNombres/alejandro.jpg'
    },
    {
        nombre: 'DANIEL',
        origen: 'Hebreo',
        significado: 'Amistad y cercanía',
        imagen: 'http://localhost:5000/images/fotosNombres/daniel.jpg'
    },
    {
        nombre: 'DAVID',
        origen: 'Hebreo',
        significado: 'Persona de confianza',
        imagen: 'http://localhost:5000/images/fotosNombres/david.jpg'
    },
    {
        nombre: 'PABLO',
        origen: 'Latín',
        significado: 'Humilde y afable',
        imagen: 'http://localhost:5000/images/fotosNombres/pablo.jpg'
    },
    {
        nombre: 'ADRIÁN',
        origen: 'Latín',
        significado: 'Personalidad pacifica y templada',
        imagen: 'http://localhost:5000/images/fotosNombres/adrian.jpg'
    },
    {
        nombre: 'JAVIER',
        origen: 'Navarra',
        significado: 'Personalidad seria',
        imagen: 'http://localhost:5000/images/fotosNombres/jorge.jpg'
    },
    {
        nombre: 'ÁLVARO',
        origen: 'Alemania',
        significado: 'Sexto sentido para proteger',
        imagen: 'http://localhost:5000/images/fotosNombres/alvaro.jpg'
    }, {
        nombre: 'SERGIO',
        origen: 'Latín',
        significado: 'Proteger lo suyo y estar siempre cerca de los suyos',
        imagen: 'http://localhost:5000/images/fotosNombres/sergio.jpg'
    }, {
        nombre: 'CARLOS',
        origen: 'Griego',
        significado: 'Hombre libre o hombre sabio',
        imagen: 'http://localhost:5000/images/fotosNombres/carlos.jpg'
    }, {
        nombre: 'JORGE',
        origen: 'Griego',
        significado: 'Personalidad trabajadora y humilde',
        imagen: 'http://localhost:5000/images/fotosNombres/jorge.jpg'
    }
];


const girlsNames = [
    {
        nombre: 'LUCÍA',
        origen: 'Latín',
        significado: 'Actitud positiva',
        imagen: 'http://localhost:5000/images/fotosNombres/lucia.jpg'
    },
    {
        nombre: 'SOFÍA',
        origen: 'Griego',
        significado: 'Sensible y cariñosa',
        imagen: 'http://localhost:5000/images/fotosNombres/sofia.jpg'
    },
    {
        nombre: 'MARÍA',
        origen: 'Hebreo',
        significado: 'Pacificas, amantes de la armonía',
        imagen: 'http://localhost:5000/images/fotosNombres/maria.jpg'
    },
    {
        nombre: 'MARTINA',
        origen: 'Latín',
        significado: 'Tranquila y muy observadora',
        imagen: 'http://localhost:5000/images/fotosNombres/martina.jpg'
    },
    {
        nombre: 'PAULA',
        origen: 'Latín',
        significado: 'Discreta y alegre',
        imagen: 'http://localhost:5000/images/fotosNombres/paula.jpg'
    },
    {
        nombre: 'JULIA',
        origen: 'Latín',
        significado: 'Extrovertidas y amables',
        imagen: 'http://localhost:5000/images/fotosNombres/julia.jpg'
    },
    {
        nombre: 'DANIELA',
        origen: 'Hebreo',
        significado: 'Líder nata y gran comunicadora',
        imagen: 'http://localhost:5000/images/fotosNombres/daniela.jpg'
    }, {
        nombre: 'VALERIA',
        origen: 'Latín',
        significado: 'Intranquila y muy activa',
        imagen: 'http://localhost:5000/images/fotosNombres/valeria.jpg'
    }, {
        nombre: 'ALBA',
        origen: 'Latín',
        significado: 'Gran don de gentes',
        imagen: 'http://localhost:5000/images/fotosNombres/alba.jpg'
    }, {
        nombre: 'EMMA',
        origen: 'Alemania',
        significado: 'Luchadora y independiente',
        imagen: 'http://localhost:5000/images/fotosNombres/emma.jpg'
    }]

const SliderNames = ({ match }) => {
    const options1 = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="animated slideInUpTiny animation-duration-3">

            <h1 className='estiloLetras'>TOP 10 NOMBRES DE NIÑOS</h1>
            <Slider className="slick-slider-cr" {...options1}>
                {childrenNames.map((e) => {
                    return (
                        <div className="slick-slide-item">
                            <Name name={e} />
                        </div>
                    )
                })}
            </Slider>

            <h1 className='estiloLetras'>TOP 10 NOMBRES DE NIÑAS</h1>
            <Slider className="slick-slider-cr" {...options1}>
                {girlsNames.map((e) => {
                    return (
                        <div className="slick-slide-item">
                            <Name name={e} />
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
};

export default SliderNames;

