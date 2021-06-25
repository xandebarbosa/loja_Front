import React, { useState } from "react";

import { useHistory } from "react-router-dom"; //serve para criar um link co outras páginas

import "../styles/componente_header.css";

import { useAppContext } from "../context/App";
import { useAutenticacaoContext } from "../context/autenticacao";

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

    const { quantidadeTotal } = useAppContext();
    const { logado, usuario, deslogarUsuario } = useAutenticacaoContext();

    const [openMenu, setOpenMenu] = useState(false); //para verificar se o menu lateral esta aberto ou fechado

    //função que vai trocar o verdadeiro ou falso de useState
    //para trocar de falso para verdadeiro é só fazer a negação dele, a negação de verdadeiro é falso, a negação de falso é verdadeiro
    //vamos trocar quando for clicado no menu da tela pequena
    const handleToogleOpenMenu = () => {
        
        setOpenMenu(!openMenu);  
        
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <>
            <div className="tela-grande">
                <div className="header-container"> 
                    <div className="header-content">
                        <div className="header-linha header-linha-1"> 
                            <div>
                            <img src={logo} onClick={() => history.push("/")} />
                            </div>
                            
                            <div className="header-caixa-pesquisa">
                            <input placeholder="Buscar produtos marcas e muito mais..." />
                            <img src={iconPesquisa} />
                            </div>
                            <p> Venda com 50 % off </p>
                            
                        </div>
                            <div className="header-linha header-linha-2"> 
                                <div>
                                 <button className="header-button-cep"> Enviar para Bauru 17030310 </button>
                                </div>
                            
                                <div>
                                    <ul className="header-linha-menu">
                                            <li> <a href="#">Categorias</a> </li>
                                            <li> <a href="#">Ofertas do dia</a> </li>
                                            <li> <a href="#">Histórico</a> </li>
                                            <li> <a href="#">Supermercado</a> </li>
                                            <li> <a href="#">Moda</a> </li>
                                            <li> <a href="#">Vender</a> </li>
                                            <li> <a href="#">Contato</a> </li>
                                    </ul>
                                </div>
                            
                                <div>
                                    <ul className="header-texto-carrinho">
                                        { logado === true ? (
                                            <>
                                                <li> {usuario.nome} </li>
                                                <li onClick={deslogarUsuario}> sair </li>
                                            </>
                                        ) : (
                                        <> 
                                        <li onClick={() => history.push("/cadastro")}> Crie a sua conta </li>
                                            <li className="dropdown" onClick={() => history.push("/login")}> 
                                                Entre 
                                            </li>
                                        </>
                                        )}
                                        <li> Compras </li>
                                        <li onClick={() => history.push("/carrinho")}> <img src={shoppingCart} width="15" height="15"/> ({quantidadeTotal}) </li>
                                    </ul>
                                    
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <div className="tela-pequena">
                <div className="tela-pequena-lina-1">
                        <img src={logoMini} onClick={() => history.push("/")}/>
                        <button onClick={handleToogleOpenMenu}> <img src={menu} alt="menu"/> </button>                                
                        <input placeholder="Buscar no mercado livre" />
                        <button onClick={() => history.push("/carrinho")}> <img src={shoppingCart} alt="carrinho"/> </button>
                </div>

                <div className="tela-pequena-lina-2">
                    <img src={mapPinBlack} alt="map-pin"/>
                    <p> Enivar para Alexandre - Rua Ana Rosa Zuicker Dannunziata, 232</p>
                </div>
                                   
                {openMenu ===  true ? (
                    <div className="tela-pequena-menu"> 
                        <div className="tela-pequena-menu-linha-1">
                            <BiUserCircle size="40" color="silver" />
                            <div className="tela-pequena-menu-texto">
                                <p> Olá {usuario.nome} </p>
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