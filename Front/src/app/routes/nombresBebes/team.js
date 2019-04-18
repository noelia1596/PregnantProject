import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Team = ({ team }) => {
    const { name, destination, description, image, nombre, origen, significado } = team;

    return (
        <div className="m-1">
            <div className="jr-card px-0 pt-sm-5 text-center">
                <img className="size-100 avatar-shadow rounded-circle mx-auto mb-2" src={image} alt="Team-member" />
                <div className="card-body bg-transparent">
                    <h3 className="card-title">{name}</h3>
                    <span className="post-designation">{destination}</span>
                    <p className="card-text">{description}</p>

                </div>
            </div>

            <div className="jr-card px-0 pt-sm-5 text-center">
                <img className="size-100 avatar-shadow rounded-circle mx-auto mb-2" src={image} alt="Team-member" />
                <div className="card-body bg-transparent">
                    <h3 className="card-title">{nombre}</h3>
                    <span className="post-designation">{origen}</span>
                    <p className="card-text">{significado}</p>

                </div>
            </div>
        </div>
    );
};


export default Team;