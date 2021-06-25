import React from "react";

import { useHistory } from "react-router-dom";

import "../styles/page_carrinho.css";

import { useAppContext } from "../context/App";
import { useAutenticacaoContext } from "../context/autenticacao";

import jaqueta from '../assets/images/jaqueta.webp';

const Carrinho = () => {

    const { produtos, quantidadeTotal, valorTotal } = useAppContext();
    const { logado } = useAutenticacaoContext();

    const history = useHistory();

    return (
        <div className="carrinho-container">
            <div className="carrinho-content">
                <menu className="carrinho-menu">
                <div className="carrinho-menu-1">
                    <span> Carrinho ({quantidadeTotal}) </span>
                </div>
                <div className="carrinho-menu-2">
                    <span> Salvos (0) </span>
                </div>
                </menu>

                {produtos.map((item) => (
                     <div className="carrinho-conteudo">
                     <div className="carrinho-conteudo-image">
                        
                         <img src={jaqueta} alt="jaqueta" width="50" height="50" />
                     </div>
                     <div className="carrinho-conteudo-info">
                         <h4> {item.descricao} </h4>
                         <p className="carrinho-conteudo-tamanho">
                         
                         Cor:{item.cor}, Tamanho: {item.tamanho}
                         </p>
                         <p className="carrinho-conteudo-frete"> Frete grátis </p>
                         <ul>
                         <li> Excluir </li>
                         <li> Mais produtos do vendedor </li>
                         <li> Comprar agora </li>
                         <li> Salvar para depois </li>
                         </ul>
                     </div>
                     <div className="carrinho-conteudo-qtdade">
                         <div className="carrinho-conteudo-qtdade-container">
                         <button> - </button>1<button> + </button>
                         </div>
     
                         <span> Último disponível </span>
                     </div>
                     <div className="carrinho-conteudo-preco">
                         <p> R$ {item.valor} </p>
                     </div>
                     </div>
                ))}
               
                
                <div className="carrinho-conteudo-endereco">
                    <p>Envio para Rua Ana Rosa Zuicker D'Annunziata 232, Bauru</p>
                    <h4>Gratis</h4>
                </div>
                
                <div className="carrinho-valor-final">
                    <h4>Total com frete</h4>
                    <p> R$ {valorTotal} </p>
                </div>
                < br/>
                <div className="carrinho-finalizar-compra">
                    { logado === true ? (
                        <button className="carrinho-button-finalizar" onClick={() => history.push('/revisao')}>
                            Finalizar a compra
                        </button>
                    ) : (
                        <button className="carrinho-button-finalizar-sem-login">
                            Faça login para continuar 
                        </button>
                    )}
                    
                </div>
                
            </div>
            </div>
    );
};

export default Carrinho;