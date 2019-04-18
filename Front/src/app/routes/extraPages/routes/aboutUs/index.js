import React from 'react';
import Slider from "react-slick";
import Team from './Componets/Team';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';


const teams = [
  {
    name: 'Alex Dolgove',
    destination: 'Co-Founder & CEO',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Domnic Brown',
    destination: 'HR Manager',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Stella Johnson',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Domnic Harris',
    destination: 'HR Manager',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Garry Sobars',
    destination: 'Co-Founder & CEO',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'John Smith',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'kadir',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  }
];


const teamss = [
  {
    name: 'Alex Dolgove',
    destination: 'Co-Founder & CEO',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Domnic Brown',
    destination: 'HR Manager',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Stella Johnson',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Domnic Harris',
    destination: 'HR Manager',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'Garry Sobars',
    destination: 'Co-Founder & CEO',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'John Smith',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
  },
  {
    name: 'kadir',
    destination: 'BDM',
    description: 'Nam imperdiet ornare enim ac tempor Suspendisse ac accumsan orci jomnic dr neva ketoli respecotra domeko... ',
    image: 'https://via.placeholder.com/150x150'
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

  const options2 = {
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
      </Slider>

      <Slider className="slick-slider-cr" {...options2}>
        <div className="slick-slide-item">
          <Team team={teamss[0]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[1]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[2]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[3]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[4]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[5]} />
        </div>
        <div className="slick-slide-item">
          <Team team={teamss[6]} />
        </div>
      </Slider>
    </div>
  );
};

export default AboutUs;

