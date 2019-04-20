import React from 'react';
import ContainerHeader from 'components/ContainerHeader'
import IntlMessages from 'util/IntlMessages';

const Blog = ({ match }) => {
    return (
        <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader title={<IntlMessages id="sidebar.components.paginaPrincipal" />} match={match} />
            <div className="row">
                <div className="col-md-8 col-sm-7 col-12 animation slideInLeft">
                    <div className="card shadow border-0 text-muted">
                        <img className="card-img-top" src='http://localhost:5000/images/fotosBlog/acidoFolico.jpg' alt="post" />

                        <div className="card-body">
                            <h3><IntlMessages id="sidebar.components.acidoFolico" /></h3>
                            <div className="meta-wrapper">
                                <span className="meta-date"><i className="zmdi zmdi-calendar-note zmdi-hc-lg" />10 Abr, 2019</span>
                            </div>
                            <p className="card-text">
                                <IntlMessages id="sidebar.components.razonAcidoFolico" />
                            </p>
                        </div>
                    </div>

                    <div className="card shadow border-0 text-muted">
                        <img className="card-img-top" src="http://localhost:5000/images/fotosBlog/medicamentos.jpg" alt="post" />

                        <div className="card-body">
                            <h3><IntlMessages id="sidebar.components.farmacos" /></h3>
                            <div className="meta-wrapper">
                                <span className="meta-date"><i className="zmdi zmdi-calendar-note zmdi-hc-lg" />25 Ene, 2019</span>
                            </div>
                            <p className="card-text">
                                <strong><IntlMessages id="sidebar.components.listaFarmacosn0" /></strong>
                                <IntlMessages id="sidebar.components.listaFarmacos0" /> <br />
                                <strong><IntlMessages id="sidebar.components.listaFarmacosn1" /></strong>
                                <IntlMessages id="sidebar.components.listaFarmacos1" /> <br />
                                <strong><IntlMessages id="sidebar.components.listaFarmacosn2" /></strong>
                                <IntlMessages id="sidebar.components.listaFarmacos2" /> <br />
                                <strong><IntlMessages id="sidebar.components.listaFarmacosn3" /></strong>
                                <IntlMessages id="sidebar.components.listaFarmacos3" /> <br />
                                <strong><IntlMessages id="sidebar.components.listaFarmacosn4" /></strong>
                                <IntlMessages id="sidebar.components.listaFarmacos4" />
                            </p>
                        </div>
                    </div>

                    <div className="card shadow border-0 text-muted">
                        <img className="card-img-top" src="http://localhost:5000/images/fotosBlog/padre.jpg" alt="post" />

                        <div className="card-body">
                            <h3><IntlMessages id="sidebar.components.embarazoPadre" /></h3>
                            <div className="meta-wrapper">
                                <span className="meta-date"><i className="zmdi zmdi-calendar-note zmdi-hc-lg" />25 May, 2018</span>
                            </div>
                            <p className="card-text">
                                <strong><IntlMessages id="sidebar.components.embarazoPadreFisicosn" /></strong>
                                <IntlMessages id="sidebar.components.embarazoPadreFisicos" /> <br />
                                <strong><IntlMessages id="sidebar.components.embarazoPadrePsicologicosn" /></strong>
                                <IntlMessages id="sidebar.components.embarazoPadrePsicologicos" />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-5 col-12 animation slideInRight">
                    <div className="sidebar">
                        <div className="card shadow border-0 p-4">
                            <h3 className="text-uppercase letter-spacing-base mb-3" ><IntlMessages id="sidebar.components.tipsEmbarazo" /></h3>


                            <ul className="categories-list list-unstyled">
                                <li><span className="jr-link"><IntlMessages id="sidebar.components.clases" /></span></li>
                                <li><span className="jr-link"><IntlMessages id="sidebar.components.comunicarnos" />
                                </span></li>

                                <li><span className="jr-link"><IntlMessages id="sidebar.components.descansoBebe" /></span></li>
                                <li className="active"><span className="jr-link"><IntlMessages id="sidebar.components.cuidarPiel" /></span></li>
                                <li><span className="jr-link"><IntlMessages id="sidebar.components.mimarMente" /></span></li>
                                <li><span className="jr-link"><IntlMessages id="sidebar.components.ropaComoda" /></span></li>
                            </ul>
                        </div>

                        <div className="card shadow border-0 p-4">
                            <ul className="articles-section list-unstyled">
                                <li className="articles">
                                    <span className="article-image jr-link">
                                        <img src="http://localhost:5000/images/fotosBlog/barriga.jpg" alt="Articales Post" />
                                    </span>
                                </li>

                                <li className="articles">
                                    <span className="article-image jr-link">
                                        <img src='http://localhost:5000/images/fotosBlog/barriga2.jpg' alt="Articales Post" />
                                    </span>
                                </li>

                                <li className="articles">
                                    <span className="article-image jr-link">
                                        <img src="http://localhost:5000/images/fotosBlog/barriga1.jpg" alt="Articales Post" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



};

export default Blog;

