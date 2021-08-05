import React, { useEffect, useState } from "react";

import { useHistory } from 'react-router-dom';

import "../styles/page_home.css";

import produtos from "../data/produtos.json";

import imagemJaqueta from "../assets/images/jaqueta.webp";

import { useAppContext } from "../context/App";


const Home = () => {

  const history = useHistory();

  const { produtosHome, capitalizeFirst } = useAppContext();

  return (
        <div className="home-container">
      <div className="home-content">
        <div className="home-titulo-card">
          <p> Baseada na sua última visita </p>
          <span> Ver histórico </span>
        </div>

        <div className="home-card-produto-container">
          {produtosHome.map((item) => (
            <div className="home-card-produto" 
              onClick={() => history.push(`/produto/${item.id}`)}>
                    <div className="home-card-imagem">
                      <img src={ 
                        item.arquivos.length > 0 // se a quantidade de arquivos for maior que zero significa que tem alguma coisa
                        ? item.arquivos[0].url // se tiver o arquivo estou pegando o primeiro(posição zer0), neste caso pega somente a primeira imagem do banco
                        : imagemJaqueta // se não tiver um arquivo mostra imagem padrão que foi definicda com imagmeJaqueta
                      } 
                        alt="jaqueta" />
                    </div>
                      <div className="home-card-info">
                        <div>
                          <p> {item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>
                          <span className="card-info-detalhes">
                            12 x {(item.preco / 12).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} sem juros
                          </span>
                          <span className="card-info-frete"> Frete grátis </span>
                        </div>
                      </div>

                    <div className="card-info-descricao">
                      <span>
                        {capitalizeFirst(item.nome)}

                      </span>
                    </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default Home;