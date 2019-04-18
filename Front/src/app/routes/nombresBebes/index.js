import React from 'react';
import Slider from "react-slick";
import Team from './team';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';


const teams = [
    {
        name: 'ALEJANDRO',
        destination: 'Griego',
        description: 'Protector de familia, amigos, pareja',
        image: 'http://localhost:5000/images/fotosNombres/alejandro.jpg'
    },
    {
        name: 'DANIEL',
        destination: 'Hebreo',
        description: 'Amistad y cercanía',
        image: 'http://localhost:5000/images/fotosNombres/daniel.jpg'
    },
    {
        name: 'DAVID',
        destination: 'Hebreo',
        description: 'Persona de confianza',
        image: 'http://localhost:5000/images/fotosNombres/david.jpg'
    },
    {
        name: 'PABLO',
        destination: 'Latín',
        description: 'Humilde y afable',
        image: 'http://localhost:5000/images/fotosNombres/pablo.jpg'
    },
    {
        name: 'ADRIÁN',
        destination: 'Latín',
        description: 'Personalidad pacifica y templada',
        image: 'http://localhost:5000/images/fotosNombres/adrian.jpg'
    },
    {
        name: 'JAVIER',
        destination: 'Navarra',
        description: 'Personalidad seria',
        image: 'http://localhost:5000/images/fotosNombres/jorge.jpg'
    },
    {
        name: 'ÁLVARO',
        destination: 'Alemania',
        description: 'Sexto sentido para proteger',
        image: 'http://localhost:5000/images/fotosNombres/alvaro.jpg'
    }, {
        name: 'SERGIO',
        destination: 'Latín',
        description: 'Proteger lo suyo y estar siempre cerca de los suyos',
        image: 'http://localhost:5000/images/fotosNombres/sergio.jpg'
    }, {
        name: 'CARLOS',
        destination: 'Griego',
        description: 'Hombre libre o hombre sabio',
        image: 'http://localhost:5000/images/fotosNombres/carlos.jpg'
    }, {
        name: 'JORGE',
        destination: 'Griego',
        description: 'Personalidad trabajadora y humilde',
        image: 'http://localhost:5000/images/fotosNombres/jorge.jpg'
    }, {
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
    }
];

const AboutUs = ({ match }) => {
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
            <ContainerHeader
                match={match}
                styleName="text-center"
                title={<IntlMessages id="sidebar.extraPages.aboutUs" />} />


            <Slider className="slick-slider-cr" {...options1}>
                <div className="slick-slide-item">
                    <Team team={teams[0]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[1]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[2]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[3]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[4]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[5]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[6]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[7]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[8]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[9]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[10]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[11]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[12]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[13]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[14]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[15]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[16]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[17]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[18]} />
                </div>
                <div className="slick-slide-item">
                    <Team team={teams[19]} />
                </div>

            </Slider>

        </div>
    );
};

export default AboutUs;

