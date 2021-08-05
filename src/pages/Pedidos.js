import React, { useEffect, useState } from "react";
import SweetAlert from '../components/SweetAlert';

import "../styles/page_pedidos.css";

import JaquetaImage from "../assets/images/jaqueta.webp";

import { buscarPedidos, cancelarPedido } from "../services/api";

import { useAppContext } from "../context/App"; 

const tiposStatusInverso = {
    "Cancelado": 0,
    "Processando": 1,
    "Validando pagamento": 2,
    "Separando para entrega": 3,
    "Saiu para entrega": 4,
    "Entregue": 5,
}

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const [abrirModal, setAbrirModal] = useState(false);
    const [idPedido, setIdPedido] = useState(false);

    const { capitalizeFirst} = useAppContext();

    //vamos usar useEffect para podermos carregar os pedidos
    useEffect(() => {
        async function fetchPedidos() {
            const resposta = await buscarPedidos();
            
            setPedidos(resposta);
        }

        fetchPedidos();
    }, [])

    function handleToggleModal(id) {  // essa função troca o estado do useState - vou trocar o estado qdo clicar no botão
        setIdPedido(id);  //seta qual o ID do pedido
        setAbrirModal(!abrirModal); //negação de abrirModal que é falso, vai ficar verdadeiro
        // poderia fazer dessa forma tbm - (abriModal === true ? false : true)
        //--------------------------------
        // (true - false) -- [!true (negação de true) - false]  -- [!false (negação de false) - true]
    }

    function cancelar() { // clicando no cancelar vai fechar o Modal(caixa de informação)
        setAbrirModal(false); //para fechar o modal
    }

    async function confirmar() { // confirma a exclusão do pedido
        await cancelarPedido({ pedidoId: idPedido })  // primeiro vou cancelar o pedido
        const resposta = await buscarPedidos(); // busca os pedidos e seta na const resposta
        setPedidos(resposta);

        setAbrirModal(false); //depois fecha o modal
        

    }

    return (
    <div className="pedidos-container">
        <div className="pedidos-content">
            <h1 className="pedidos-titulo">Compras</h1>
            <span className="pedidos-subtitulo"> {pedidos.length} compras </span>

            {pedidos.map((item) => {

                const statusAtual = tiposStatusInverso[item.status]

                return (
                    (
                        <div className="pedidos-card">
                            <div className="pedidos-card-1">
                             <img src={JaquetaImage} alt="imagem jaqueta"/>
                                <div className="pedidos-card-content">
                                    <p>Entregue no dia 4 de maio </p>
                                    
                                    {item.produtos.map((itemProduto) => (
                                        <div className="pedidos-card-content-produtos">
                                            <span> {capitalizeFirst(itemProduto.nome)} - Ref {itemProduto.id} </span>
                                            <span> {itemProduto.pedido_produto.quantidade} unidades | Cor: {console.log(itemProduto.cor)}, Tamanho: {itemProduto.tamanho} </span>
                                            <span> <b>Forma de pagamento: </b>{item.forma_pagamento}</span>
                                            <span> <b>Status: </b> {item.status}</span>
                                        </div>
                                    ))}
        
                                </div>
                            </div>
        
                            <div className="pedidos-card-2">
                                <button className="btn-azul"> Ver compra </button>
                                <button className="btn-padrao"> Comprar novamente </button>
                                {statusAtual >= 1 && statusAtual <= 3 && (
                                    <button 
                                        onClick={() => handleToggleModal(item.id)} 
                                        className="btn-cancelar"
                                    > 
                                    Cancelar compra 
                                    </button>
                                )}
                            </div>
        
                         <div className="pedidos-card-3">
                            <p> Ações rápidas </p>
                            <span> Mensagens com o vendedor </span>
                            <span> Preciso de ajuda </span>
                         </div>
                        </div>
                    )
                )
            })}   
        </div>  
        <SweetAlert show={abrirModal} onCancel={cancelar} onConfirm={confirmar} />  
    </div>
    );
};

export default Pedidos;