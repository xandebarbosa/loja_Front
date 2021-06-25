import React from "react";

import { useParams } from 'react-router-dom';

import JaquetaImagem from '../assets/images/jaqueta.webp';
import JaquetaImagemCostas from '../assets/images/jaqueta_costas.webp';
import MotoSprint from '../assets/images/motosprint.webp';
import JaquetaBlack from '../assets/images/jaqueta_preta.webp';
//import JaquetaVideo from '/assets/videos/JaquetaVideo.mp4';
import heart from '../assets/icones/heart.svg';
import truck from '../assets/icones/truck.svg';
import setaEsquerda from '../assets/icones/corner-down-left.svg';

import produtos from '../data/produtos.json';

import { useAppContext } from '../context/App';

import "../styles/page_produto.css";

const Produto = () => {

    const params = useParams();
    //console.log('Meu parametro -->',params.id);

    const { addProduto } = useAppContext(); //pegar a função que estamos passando como parametros

    const produto = produtos.find(item => item.id === params.id);
    //console.log('Meu produto -->',produto);

    return (
        <div className="produto-container">
            <div className="produto-content">
                <div className="produto-mini-imagem">
                    <img src={JaquetaImagem} alt="jaquetaFrente" width="44" height="44" />
                    <img src={JaquetaImagemCostas} alt="jaquetaCostas" width="44" height="44" />
                    <img src={MotoSprint} alt="motoSprint" width="44" height="44" />
                    <img src={JaquetaImagem} alt="jaqueta" width="44" height="44" />
                </div>
                <div className="produto-imagem-principal">
                    <img id="trocarImagem" src={JaquetaImagem}  alt="imagemPrincipal"  width="476" height="500" />
                </div>

               
                <div className="produto-info">
                
                    <span className="novo"> Novo </span>

                        <div className="produto-info-titulo-container">
                            
                            <p className="produto-info-titulo"> {produto.descricao} </p>
                            <img src={heart} alt="coracao"/>

                        </div>

                            <p className="produto-info-preco"> R$ {produto.valor} </p>
                            <span className="produto-info-parcelamento"> em 12 x R$ 124,17 sem juros </span>
                            <span className="produto-info-forma-pagamento"> ver os meios de pagamento </span>
                        
                        <div className="produto-info-frete">
                            <div className="produto-info-frete-box-1">
                                <img src={truck} alt="caminhao" />
                            </div>
                            
                            <div className="produto-info-frete-box-2"> 
                                <span className="produto-info-frete-entrega"> Chegará grátis entre os dias 9 e 14 jun. </span> 
                                <span className="produto-info-frete-adicional"> Você pode tê-lo <b>entre segunda-feira e quarta-feira 9 de junho</b> por R$ 5,90 Antes: <s>R$ 27,90</s> </span>
                                <span className="produto-frete-forma-entrega"> Ver mais formas de entrega </span>
                            </div>
                        </div>

                        <p className="produto-info-tamanho"> Tamanho: <b> {produto.tamanho} </b> </p>
                        <p className="produto-info-cor"> Cor: <b> {produto.cor} </b> </p>

                        <div className="produto-info-cores-disponiveis">
                            <img src={JaquetaImagem} alt="imagem" width="40" height="40" />
                            <img src={JaquetaBlack} alt="imagem" width="40" height="40" />
                        </div>

                        <p className="produto-info-disponivel"> Último disponível! </p>

                        <button className="produto-info-comprar"> Comprar agora </button>
                        <button onClick={() => addProduto(produto)} className="produto-info-adicionar"> Adicionar ao carrinho </button>

                        <div className="produto-info-adicional">
                            <div className="produto-info-adicional-box-1">
                                <img src={setaEsquerda} alt="seta" width="22" height="22"/>
                            </div>
                            <div className="produto-info-adicional-box-2">
                                <span className="produto-info-devolucao">Devolução grátis.</span>
                                <span className="produto-info-devolucao-dias">Você tem 30 dias a partir da data de recebimento.</span>
                                
                            </div>
                        </div>
                 
                </div>
            
            </div>

        </div>
    );
};

export default Produto;