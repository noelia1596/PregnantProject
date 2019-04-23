import React from 'react';
import './css.css';
import moment from 'moment';
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

const USER_LOGGED_LOCAL_STORAGE = 'userLoggedLS';
var userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
const FechaActual = moment();
const fechaEmbarazo = userLogged ? moment(userLogged.FechaEmbarazo) : moment();
const monthDifference = FechaActual.diff(fechaEmbarazo, 'months');


const items = [
  {
    id: 1,
    src: 'https://www.youtube.com/embed/jsPderhu-0k',
    mes: 1
  },
  {
    id: 2,
    src: 'https://www.youtube.com/embed/B4OuYdOgH7c',
    mes: 2
  }, {
    id: 3,
    src: 'https://www.youtube.com/embed/GiR3tc1tJuw',
    mes: 3
  }, {
    id: 4,
    src: 'https://www.youtube.com/embed/j00jEuPkz3I',
    mes: 3
  }, {
    id: 5,
    src: 'https://www.youtube.com/embed/rXsas9nyoMI',
    mes: 3
  }, {
    id: 6,
    src: 'https://www.youtube.com/embed/o2AtNJFDuaU',
    mes: 3
  }, {
    id: 7,
    src: "https://www.youtube.com/embed/0fA5NvLdySQ",
    mes: 3
  }
];

class videos extends React.Component {
  constructor(props) {
    super(props);

    userLogged = JSON.parse(localStorage.getItem(USER_LOGGED_LOCAL_STORAGE));
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.slides = [];
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.slides.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.slides.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    if (monthDifference < 4) {
      this.slides = items.filter((ele) => { return ele.mes == 1 }).map((item) => {
        return (
          <CarouselItem className='estilos'
            key={item.id}
            onExiting={this.onExiting}
            onExited={this.onExited}>
            <iframe width="100%" height="600rem" src={item.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            <CarouselCaption className="text-danger" />
          </CarouselItem>
        );
      });
    } else if (monthDifference >= 4 && monthDifference < 7) {
      this.slides = items.filter((ele) => { return ele.mes == 2 }).map((item) => {
        return (
          <CarouselItem className='estilos'
            key={item.id}
            onExiting={this.onExiting}
            onExited={this.onExited}>
            <iframe width="100%" height="600rem" src={item.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            <CarouselCaption className="text-danger" />
          </CarouselItem>
        );
      });
    } else if (monthDifference >= 7 && monthDifference <= 9) {
      this.slides = items.filter((ele) => { return ele.mes == 3 }).map((item) => {
        return (
          <CarouselItem className='estilos'
            key={item.id}
            onExiting={this.onExiting}
            onExited={this.onExited}>
            <iframe width="100%" height="600rem" src={item.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            <CarouselCaption className="text-danger" />
          </CarouselItem>
        );
      });
    } else {
      return <div></div>
    }
    return (
      <Carousel
        interval={false}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        align='center'>
        <CarouselIndicators items={this.slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {this.slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default videos;
