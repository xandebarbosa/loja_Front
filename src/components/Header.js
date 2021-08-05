import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom"; //serve para criar um link co outras páginas
import { toast } from "react-toastify";

import "../styles/componente_header.css";

import { useAppContext } from "../context/App";
import { useAutenticacaoContext } from "../context/autenticacao";

import { buscarCategorias, buscarCategoria } from "../services/api";

import logo from '../assets/images/logo.PNG';
import iconPesquisa from '../assets/icones/search.svg';
import shoppingCart from '../assets/icones/shopping-cart.svg';
import menu from '../assets/icones/menu.svg';
import mapPinBlack from '../assets/icones/map-pin-Black.svg';
import exit from '../assets/icones/x.svg';
import logoMini from '../assets/images/logoMini1.png';
import user from '../assets/icones/user.svg';
import home from '../assets/icones/home.svg';
import bell from '../assets/icones/bell.svg';

import { BsHouse, BsBell, BsHeart, BsHouseDoor, BsQuestionCircle } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiUserCircle, BiBasket, BiArrowToBottom, BiMenu, BiTime } from 'react-icons/bi';
import { FiTag } from 'react-icons/fi';
import { GoTag } from 'react-icons/go';
import { MdOndemandVideo } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineCloseCircle} from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';


const Header = () => {
    
    const history = useHistory();

    const { quantidadeTotal, enviarBuscarProduto, setProdutosHome } = useAppContext();
    const { logado, usuario, deslogarUsuario } = useAutenticacaoContext();

    const [openMenu, setOpenMenu] = useState(false); //para verificar se o menu lateral esta aberto ou fechado
    const [txtPesquisa, setTxtPesquisa] = useState(''); //captura o que o usuario esta digitando no input
    const [categorias, setCategorias] = useState([]);
    const [openCategorias, setOpenCategorias] = useState(false);
    
    useEffect(() => {
        // carregar todas as categorias do banco
        
        //PARA USAR UMA FUNÇÃO ASSINCRONA (ASYNC) DENTRO DE USEEFFECT PRECISAMOS CRIAR UMA FUNÇÃO
        async function fetchCategorias() {  
            const resposta = await buscarCategorias();
           // console.log(resposta); //para testa se retorna as categorias do banco
           setCategorias(resposta);
        }
        fetchCategorias();
    }, []);

    //função que vai trocar o verdadeiro ou falso de useState
    //para trocar de falso para verdadeiro é só fazer a negação dele, a negação de verdadeiro é falso, a negação de falso é verdadeiro
    //vamos trocar quando for clicado no menu da tela pequena
    const handleToogleOpenMenu = () => {
        setOpenMenu(!openMenu);  
    };

    const handleToogleOpenCategorias = () => {
        setOpenCategorias(!openCategorias);
    }

    const handleLogout = () => {
        deslogarUsuario(); //desloga o usuario
        history.push("/"); //qdo sair, vai para a tela de home
        handleToogleOpenMenu(); //fecha o menu
    }

    const handleToPedidos = () => {
        history.push("/pedidos"); //vai para a tela de pedidos
        handleToogleOpenMenu(); //fecha o menu
    }

    const handleSubmitPesquisa = async (event) => {
        event.preventDefault(); //Para não atualizar a página
        //PRECISAMOS FAZER DUAS AÇÕES
        //1º IR NO BANCO DE DAODS PARA BUSCAR O PRODUTOS
        // para ir no banco de dados usamos a service API, que é onde fica todas as nossas funções de banco
        // precisamos criar no back end a rota da página de resultado
        await enviarBuscarProduto(txtPesquisa); //chamando a função 
        //2º REDIRECIONAR PARA A TELA DE Resultado
        history.push("/resultado");
        // 3º limpar o input a pós a pesquisa
        setTxtPesquisa("");
    }

    async function buscarProdutoCategoria(categoriaId){  //recebe como parametro o id da categoria clicada
        // console.log("Clicou na categoria", categoriaId); //para testar se a função esta sendo chamada
         // precisa passar na função onClick o parametro para mostrar a categoria
        
         const resposta = await buscarCategoria({ categoriaId: categoriaId}); // vai devolver uma resposta com a categoria e os produtos
         //console.log(resposta);
         setProdutosHome(resposta.produtos);
     }
     
    return (
        <>
            <div className="tela-grande">
                <div className="header-container"> 
                    <div className="header-content">
                        <div className="header-linha header-linha-1"> 
                            <div>
                            <img src={logo} alt="logo" onClick={() => history.push("/")} />
                            </div>
                            
                            
                            <form onSubmit={handleSubmitPesquisa}>
                                <div className="header-caixa-pesquisa">
                                    <input 
                                        placeholder="Buscar produtos marcas e muito mais..." 
                                        id="pesquisa" 
                                        onChange={(event) => setTxtPesquisa(event.target.value)} 
                                        value={txtPesquisa}
                                    />
                                    <button type="submit">
                                        <img src={iconPesquisa} 
                                        alt="icone pesquisa"
                                        />
                                    </button>
                                </div>
                            </form>
                            
                            <p> Venda com 50 % off </p>
                            
                        </div>
                            <div className="header-linha header-linha-2"> 
                                <div>
                                 <button className="header-button-cep"> Enviar para Bauru 17030310 </button>
                                </div>
                            
                                <div className="header-menu-categorias">
                                    <ul>
                                            <li onClick={handleToogleOpenCategorias}>Categorias
                                                
                                                {openCategorias === true ? (
                                                    <ul className="header-lista-categorias">
                                                    {categorias.map((item, key) => (
                                                    
                                                        <li key={key} 
                                                            onClick={() => buscarProdutoCategoria(item.id)}> {item.nome} 
                                                        </li>
                                                    
                                                ))}
                                                    </ul>
                                                ): null}
                                            </li>
                                            <li> Ofertas do dia </li>
                                            <li> Histórico </li>
                                            <li> Supermercado </li>
                                            <li> Moda </li>
                                            <li> Vender </li>
                                            <li> Contato </li>
                                            
                                    </ul>
                                </div>
                            
                                <div className="header-texto-carrinho">
                                    <ul className="header-lista-itens">
                                        { logado === true ? (
                                            <>
                                                <li onClick={handleToogleOpenMenu}> {usuario.nome} </li>
                                            </>
                                        ) : (
                                        <> 
                                        <li onClick={() => history.push("/cadastro")}> Crie a sua conta </li>
                                            <li className="dropdown" onClick={() => history.push("/login")}> 
                                                Entre 
                                            </li>
                                        </>
                                        )}
                                            <li onClick={() => history.push("/carrinho")}> 
                                            <img src={shoppingCart} alt="shopping cart" width="15" height="15"/> ({quantidadeTotal}) 
                                        </li>

                                        {openMenu === true ? (
                                            <div className="header-menu-logado">
                                                <p>Olá, {usuario.nome}</p>
                                                <span> Nivel 3 - Mercado Pontos &gt; </span>

                                                <button onClick={handleToPedidos}> Compras </button>
                                                <button> Perguntas </button>
                                                <button> Videos e música </button>
                                                <button> Resumo </button>
                                                <button> Novidades </button>
                                                <button> Anúncio </button>
                                                <button> vendas </button>
                                                <button> Meus dados </button>
                                                <button> Segurança </button>
                                                <button> Privacidade </button>
                                                <button> Alertas de busca </button>
                                                <button onClick={handleLogout}> Sair </button>
                                            </div>
                                        ): null}
                                    </ul>
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <div className="tela-pequena">
                <div className="tela-pequena-lina-1">
                        <img src={logoMini} alt="logo mini" onClick={() => history.push("/")}/>
                        <button onClick={handleToogleOpenMenu}> <img src={menu} alt="menu"/> </button>                                
                        <input placeholder="Buscar no mercado livre" />
                        <button onClick={() => history.push("/carrinho")}> <img src={shoppingCart} alt="carrinho"/> </button>
                </div>

                <div className="tela-pequena-lina-2">
                    <img src={mapPinBlack} alt="map-pin"/>
                    <p> EnvIar para Alexandre - Rua Ana Rosa Zuicker Dannunziata, 232</p>
                </div>
                                   
                {openMenu ===  true ? (
                    <div className="tela-pequena-menu"> 
                        <div className="tela-pequena-menu-linha-1">
                            <BiUserCircle size="40" color="silver" />
                            <div className="tela-pequena-menu-texto">
                                <p> Olá Alexandre </p>
                                <span>Nível 3 - Mercado Pago</span>
                            </div>
                            
                            <button onClick={handleToogleOpenMenu} > 
                                <CgClose size="40" color="gray" /> 
                            </button>
                        </div>

                        <div className="tela-pequena-menu-linha-2">
                            <ul>
                                <li><BsHouse className="icon-house"/>Início</li>
                                <li><BsBell className="icon-bell"/> Avisos</li>
                                <li><HiOutlineShoppingBag className="icon-shopping" />Compras</li>
                                <li><BsHeart className="icon-heart"/> Favoritos</li>
                                <li><BiUserCircle className="icon-circle" />Minha conta</li>
                                <li><FiTag className="icon-tag" />Ofertas do dia</li>
                                <li><MdOndemandVideo className="icon-Video" />Video e música</li>
                                <li><BiTime className="icon-time" />Histórico</li>
                                <li><GoTag className="icon-go-tag" />Vender</li>
                            </ul>
                            
                        </div>

                        <div className="tela-pequena-menu-linha-3">
                            <ul>
                                <li><BiMenu className="icon-menu" />Categorias</li>
                                <li><BiBasket className="icon-basket" />Supermercado</li>
                                <li><BsHouseDoor className="icon-house" />Lojas oficiais</li>
                            </ul>
                            
                        </div>

                        <div className="tela-pequena-menu-linha-4">
                            <p><BsQuestionCircle className="icon-question" />Contato</p>
                        </div>

                        <div className="tela-pequena-menu-linha-5">
                            <p><BiArrowToBottom className="icon-Arrow" /> Compre e venda com o app!</p>
                        </div>
                    </div>
                ) : null}                            

            </div>
        </>
    );
};

export default Header;