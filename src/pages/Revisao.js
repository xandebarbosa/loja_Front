import React from "react";

import '../styles/page_revisao.css';

import MapPin from "../assets/icones/map-pin.svg";
import Truck from "../assets/icones/truck-blue.svg";
import CodeBar from "../assets/icones/truck-blue.svg";
import Jaqueta from "../assets/images/jaqueta.webp";

const Revisao = () => {
    return (
        <div className="revisao-container">
            <div className="revisao-esquerda">
                <p className="revisao-titulo"> Revise e confirme sua compra </p>
                
                <p className="revisao-subtitulo"> Detalhes da entrega </p>
                <div className="revisao-card-container">
                    <div className="revisao-card-flex">
                        <div className="revisao-card-image">
                            <img src={MapPin} alt="map-pin" />
                        </div>
                            <div className="revisao-card-content">
                                <p className="revisao-card-titulo"> Rua Ana Rosa Zuicker Dannunziata 232 </p>
                                <span className="revisao-card-subtitulo"> Rua Ana Rosa Zuicker Dannunziata 232 Bauru, São Paulo - CEP 17030-310  </span>
                                <span className="revisao-card-subtitulo"> Alexandre Barbosa - 14991038089 </span>
                            </div>
                    </div>
                    <p className="revisao-card-info"> Editar ou escolher outro </p>
                </div>
                
                <div className="revisao-card-container">
                    <div className="revisao-card-flex">
                        <div className="revisao-card-image">
                            <img src={Truck} alt="truck" />
                        </div>
                            <p className="revisao-card-titulo"> Chegará entre 18  e22 de Junho no seu endereco </p>
                    </div>
                    
                    <p className="revisao-card-info"> Alterar o metódo de entrega </p>
                </div>

                <p className="revisao-subtitulo"> Detalhes do pagamento</p>

                <div className="revisao-card-container">
                   <div className="revisao-card-flex">
                        <div className="revisao-card-image">
                            <img src={CodeBar} alt="code-bar" />
                        </div>
                            <div className="revisao-card-content">
                                <p className="revisao-card-titulo"> Boleto </p>
                                <span className="revisao-card-subtitulo"> Você pagará R$1.490  </span>
                                <span className="revisao-card-descricao"> O boleto tem prazo de compensação de 1 a 2 dias úteis. Nós não reservamos <br />
                                estoque até que o pagamento seja aprovado. Não perca tempo! </span>
                            </div>
                   </div>
                    <p className="revisao-card-info"> Alterar </p>
                </div>
                <div className="revisao-card-button">
                    <button>Continuar</button>
                </div>
            </div>
            <div className="revisao-direita">
                <div className="revisao-direita-container">
                    <div className="revisao-direita-image">
                        <img src={Jaqueta} alt="jaqueta"/>
                    </div>
                        
                        <p className="revisao-direita-descricao">Jaqueta Revit Vertex Air Motosprint</p>
                        <span className="revisao-direita-cor">Cor: branca</span>
                        <span className="revisao-direita-quantidade">Quantidade: 1</span>
                </div>
                
                <div className="linha-divisoria"></div>

                    <div className="revisao-direita-valor-produto">
                        <p>Produto </p>
                        <span>R$1.490</span>
                    </div>
                
                <div className="linha-divisoria"></div>

                    <div className="revisao-direita-valor-total">
                        <p>Você pagará </p>
                        <span>R$1.490</span>
                    </div>
            </div>
                
                
                
        </div>
    )
};

export default Revisao;