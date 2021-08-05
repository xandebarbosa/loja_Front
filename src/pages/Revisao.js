import React, {useState} from "react";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Cards from 'react-credit-cards';


import '../styles/page_revisao.css';
import 'react-credit-cards/es/styles-compiled.css';

import MapPin from "../assets/icones/map-pin.svg";
import Truck from "../assets/icones/truck-blue.svg";
import Pix from "../assets/icones/pix.svg";
import Jaqueta from "../assets/images/jaqueta.webp";
import { FaBarcode } from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";
import FormCC from "../assets/images/formCC.PNG";

import { useAppContext } from "../context/App";
import { useAutenticacaoContext } from "../context/autenticacao";

const Revisao = () => {

    const { limparCarrinho, enviarPedido, produtos, valorTotal, capitalizeFirst } = useAppContext();
    const { usuario } = useAutenticacaoContext();
    const [formaPagamento, setFormaPagamento] = useState("");
    const [dadosCartao, setDadosCartao] = useState({codigo_seguranca:"", data_vencimento:"", nome_completo:"", numero_cartao:"", focus: ""});
    const history = useHistory();

    function handleChangeDadosCartao(event, key) {
        const value = event.target.value;

        setDadosCartao({ 
            ...dadosCartao, 
            [key] : value
        })
    }

    async function finalizarCompra() {

        if (!formaPagamento) {//senão tiver formaPagamento - mensagem de erro
            return toast.error("Informe a forma de pagamento!!");
        }

        if (formaPagamento === "cartao") {
            if(!dadosCartao.numero_cartao){
                return toast.error("Informe o numero do Cartão");
            }
        }

        if (formaPagamento === "cartao") {
            if(!dadosCartao.nome_completo){
                return toast.error("Informe o nome completo");
            }
        }

        if (formaPagamento === "cartao") {
            if(!dadosCartao.data_vencimento){
                return toast.error("Informe a data de validade do Cartão");
            }
        }

        if (formaPagamento === "cartao") {
            if(!dadosCartao.codigo_seguranca){
                return toast.error("Informe o código de segurança do Cartão");
            }
        }

        if (formaPagamento === "cartao") {
            if(!dadosCartao.cpf){
                return toast.error("Informe o CPF");
            }
        }
        

        const payLoad = {
            usuarioId: usuario.id,
            valor: valorTotal,
            produtos: produtos.map((item) =>({
                id: item.id,
                tamanho: item.tamanho,
                cor: item.cor,
                quantidade: item.quantidade,
                
            })),
            forma_pagamento: formaPagamento,
            dadosCartao,
            
        };

        const resposta = await enviarPedido(payLoad);

        if (resposta === true) {
            limparCarrinho();
            history.push("/pedidos");
        }

       
    }

       

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

                <div>
                    <label className={formaPagamento === "boleto" ? "revisao-card-container checked-formaPagamento" : "revisao-card-container"}>
                        <input 
                            type="radio" 
                            name="forma_pagamento" 
                            value="boleto" 
                            onChange={(event) => setFormaPagamento(event.target.value)} 
                        />
                        <div>
                            <div className="revisao-card-flex">
                                <div className="revisao-card-image">
                                    <FaBarcode color="#3483fa" size="30"/>
                                </div>
                            
                                <div className="revisao-card-content">
                                    <p className="revisao-card-titulo"> Boleto </p>
                                    <span className="revisao-card-subtitulo"> Você pagará {valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}  </span>
                                
                                    <span className="revisao-card-descricao"> O boleto tem prazo de compensação de 1 a 2 dias úteis. Nós não reservamos <br />
                                    estoque até que o pagamento seja aprovado. Não perca tempo! </span>
                                </div>
                            </div>
                                 
                        </div>

                    </label>

                    <label className={formaPagamento === "cartao" ? "revisao-card-container checked-formaPagamento" : "revisao-card-container"}>
                        <input 
                            type="radio" 
                            name="forma_pagamento" 
                            value="cartao" 
                            onChange={(event) => setFormaPagamento(event.target.value)} 
                        />
                            <div>
                            <div className="revisao-card-flex">
                                <div className="revisao-card-image">
                                    <BiCreditCard color="#3483fa" size="40"/>
                                </div>
                            
                                <div className="revisao-card-content">
                                    <p className="revisao-card-titulo"> Cartão </p>
                                    <span className="revisao-card-subtitulo"> Você pagará {valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </span>
                                    {formaPagamento === "cartao" ? (
                                        <div className="revisao-cartao-container">
                                            <div id="PaymentForm">
                                                <Cards
                                                    cvc={dadosCartao?.codigo_seguranca}
                                                    expiry={dadosCartao?.data_vencimento}
                                                    focused={dadosCartao?.focus}
                                                    name={dadosCartao?.nome_completo}
                                                    number={dadosCartao?.numero_cartao}
                                                />
                                            </div>
                                            
                                            <div className="revisao-cartao-content">
                                                <form>
                                                    <input name="number" onChange={event => handleChangeDadosCartao(event, 'numero_cartao')} placeholder="Numero do Cartão"/>
                                                    <input name="name" onChange={event => handleChangeDadosCartao(event, 'nome_completo')} placeholder="Nome Completo"/>
                                                    <div className="revisao-cartao-linha">
                                                        <input name="expiry" maxLength="5" onChange={event => handleChangeDadosCartao(event, 'data_vencimento')} placeholder="Validade do Cartão"/>
                                                        <input name="cvc" maxLength="3" onChange={event => handleChangeDadosCartao(event, 'codigo_seguranca')} placeholder="Codigo de segurça"/>
                                                    </div>
                                                    <input onChange={event => handleChangeDadosCartao(event, 'cpf')} placeholder="CPF"/>
                                                </form>
                                            
                                            
                                            </div>
                                        </div>
                                    ) : null }
                                </div>
                            </div>
                                 
                        </div>
                    </label>

                    <label 
                        className={
                            formaPagamento === "pix" 
                            ? "revisao-card-container checked-formaPagamento" 
                            : "revisao-card-container"
                        }
                        >
                        <input 
                            type="radio" 
                            name="forma_pagamento" 
                            value="pix" 
                            onChange={(event) => setFormaPagamento(event.target.value)} 
                        />
                        <div>
                            <div className="revisao-card-flex">
                                <div className="revisao-card-image">
                                   <img src={Pix} alt="pix" color="#3483fa" size="30" />
                                </div>
                            
                                <div className="revisao-card-content">
                                    <p className="revisao-card-titulo"> Pix </p>
                                    <span className="revisao-card-subtitulo"> Você pagará {valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}  </span>
                                
                                    <span className="revisao-card-descricao"> O Pix tem compensação instântanea. Não perca tempo! </span>
                                </div>
                            </div>
                                 
                        </div>

                    </label>

                </div>
            </div>

            <div className="revisao-direita">
                {
                    produtos.map((item) => (
                        <>
                        <div className="revisao-direita-container">
                            <div className="revisao-direita-image">
                                <img src={Jaqueta} alt="jaqueta"/>
                            </div>
                        
                            <p className="revisao-direita-descricao">{capitalizeFirst(item.nome)}</p>
                            <span className="revisao-direita-cor">Cor: {item.cor}</span>
                            <span className="revisao-direita-quantidade">Quantidade: {item.quantidade}</span>
                        </div>
                
                        <div className="linha-divisoria"></div>

                         <div className="revisao-direita-valor-produto">
                            <p>Produto </p>
                            <span>{item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                        </div>
                        </>    
                    ))
                }
                
                <div className="linha-divisoria"></div>

                    <div className="revisao-direita-valor-total">
                        <p>Você pagará </p>
                        <span>{valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                    </div>

                    <div className="revisao-card-button">
                        <button onClick={finalizarCompra}>Continuar</button>
                    </div>
            </div>
                
                
                
        </div>
    )
};

export default Revisao;