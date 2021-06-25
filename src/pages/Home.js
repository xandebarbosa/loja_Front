import React, { useEffect, useState } from "react";

import { useHistory } from 'react-router-dom';

import { buscarProdutos } from '../services/api';

import "../styles/page_home.css";

import produtos from "../data/produtos.json";

import imagemJaqueta from "../assets/images/jaqueta.webp";


const Home = () => {

  const history = useHistory();

  const [produtos, setProdutos] = useState([]);

 
  useEffect(() => {
    async function getProdutos() {
      const resposta = await buscarProdutos();
      setProdutos(resposta);
    }

    getProdutos();
    
  }, []);

    return (
        <div className="home-container">
      <div className="home-content">
        <div className="home-titulo-card">
          <p> Baseada na sua última visita </p>
          <span> Ver histórico </span>
        </div>

        <div className="home-card-produto-container">
          {produtos.map((item) => (
            <div className="home-card-produto" 
            onClick={() => history.push(`/produto/${item.id}`)}>
              <div className="home-card-imagem">
                <img src={imagemJaqueta} alt="jaqueta" />{" "}
              </div>
              <div className="home-card-info">
                <div>
                  <p> R$ {item.valor} </p>
                  <span className="card-info-detalhes">
                    {" "}
                    12x R$ 124,24 sem juros{" "}
                  </span>
                  <span className="card-info-frete"> Frete grátis </span>
                </div>
                
               
              </div>

              <div className="card-info-descricao">
                  <span>
                    {item.descricao}
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