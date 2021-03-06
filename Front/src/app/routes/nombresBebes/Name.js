import React from 'react';

const Name = ({ name }) => {
    const { imagen, nombre, origen, significado } = name;

    return (
        <div className="m-1">
            <div className="jr-card px-0 pt-sm-5 text-center">
                <img className="size-100 avatar-shadow rounded-circle mx-auto mb-2" src={imagen} alt="Team-member" />
                <div className="card-body bg-transparent">
                    <h3 className="card-title">{nombre}</h3>
                    <span className="post-designation">{origen}</span>
                    <p className="card-text">{significado}</p>

                </div>
            </div>
        </div>
    );
};


export default Name;