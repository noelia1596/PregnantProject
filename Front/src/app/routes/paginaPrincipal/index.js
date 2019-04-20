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
                            <h3>Fármacos que no se deben tomar durante el embarazo</h3>
                            <div className="meta-wrapper">
                                <span className="meta-date"><i className="zmdi zmdi-calendar-note zmdi-hc-lg" />25 Ene, 2019</span>
                            </div>
                            <p className="card-text">
                                <strong>Antiinflamatorios no esteroideos:</strong>Alteran el flujo sanguíneo del feto. <br />
                                <strong> Parches de nicotina:</strong>Tienen un efecto nocivo sobre el fetO. <br />
                                <strong>Antihipertensivos: </strong>Relacionados con defectos de nacimiento en el feto. <br />
                                <strong>Antidiabéticos secretagogos:</strong> Pueden provocar hipoglucemias sostenidas en el tiempo. <br />
                                <strong>Estatinas:</strong>Se asocian a malformaciones de la tráquea, esófago, corazón y ano en el feto. <br />
                                <strong>Cortisona:</strong>Puede provocar una malformación fetal característica, el paladar hendido. <br />
                                <strong>Anticonceptivos orales:</strong>Aumentan el riesgo de que el feto sufra síndrome de Down. <br />
                                <strong>Omeprazol:</strong>No es recomendable tomarlo. <br />
                                <strong>Bicarbonato:</strong>Produce un aumento del pH natural de la sangre.<br />
                            </p>
                        </div>
                    </div>

                    <div className="card shadow border-0 text-muted">
                        <img className="card-img-top" src="http://localhost:5000/images/fotosBlog/padre.jpg" alt="post" />

                        <div className="card-body">
                            <h3>Síndrome de «Couvade»: Cuando los padres desarrollan los síntomas del embarazo</h3>
                            <div className="meta-wrapper">
                                <span className="meta-date"><i className="zmdi zmdi-calendar-note zmdi-hc-lg" />25 May, 2018</span>
                            </div>
                            <p className="card-text">
                                Habitualmente aparecen en el primer trimestre, disminuyen en el segundo y reaparecen en el tercer trimestre del embarazo.
                                 Puede incluir tanto síntomas <strong>físicos</strong> como <strong>psicológicos</strong>. <br /><br />Entre los <strong>físicos</strong> estarían las náuseas,
                       la sensación de hinchazón, los cambios en el apetito, los «antojos»,el aumento de peso,el dolor de cabeza,los calambres en las piernas,
                                   los dolores de espalda y las molestias urinarias o genitales. <br />Entre los <strong>psicológicos</strong>se incluyen cambios en el patrón de sueño,
  síntomas de ansiedad, irritabilidad, disminución de la líbido e inquietud.
              </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-5 col-12 animation slideInRight">
                    <div className="sidebar">
                        <div className="card shadow border-0 p-4">
                            <h3 className="text-uppercase letter-spacing-base mb-3" ><IntlMessages id="sidebar.components.noticiasInteres" /></h3>


                            <ul className="categories-list list-unstyled">
                                <li><span className="jr-link">Technology</span></li>
                                <li><span className="jr-link">Branding</span></li>
                                <li><span className="jr-link">Holly</span></li>
                                <li className="active"><span className="jr-link">Stories</span></li>
                                <li><span className="jr-link">Designing</span></li>
                                <li><span className="jr-link">Programing</span></li>
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

