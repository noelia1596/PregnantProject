import React from 'react';
import './css.css';

const DefaultTimeLineItem = ({ styleName, timeLine }) => {
  const { image, title, description, longitud, peso, carac1, carac2, carac3, carac4 } = timeLine;
  return (
    <div className={`timeline-item ${styleName}`}>
      <div className="timeline-badge timeline-img">
        <img src={require("assets/images/pentagon.png")} alt="Pentagon" title="Pentagon" />
      </div>

      <div className="timeline-panel ">
        <div className="timeline-panel-header">
          <div className="timeline-header-img timeline-left">
            <img className="size-60 rounded-circle" src={image} alt="Pentagon" title="Pentagon" />
          </div>
          <div className="timeline-heading">
            <h3 className="timeline-title">{title}</h3>
          </div>
        </div>
        <div className="timeline-body">
          <p>{description} <br /> {longitud} <br /> {peso} <br /> {carac1} <br /> {carac2} <br /> {carac3} <br /> {carac4} </p>
        </div>
      </div>
    </div>
  )
};
export default DefaultTimeLineItem;

