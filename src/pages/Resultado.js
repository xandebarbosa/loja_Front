import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '../context/App';

import semImagem from '../assets/images/semImagem.jpeg';

const Resultado = () => {
    
    const { produtosBuscados } = useAppContext();
    const history = useHistory();
    
    return (
        <div className="home-container">
            <div className="home-card-produto-container">
                {produtosBuscados.map((item) => (
                    <div className="home-card-produto" 
                    onClick={() => history.push(`/produto/${item.id}`)}>
                            <div className="home-card-imagem">
                            <img 
                                src={ 
                                    item.arquivos.length > 0 // se a quantidade de arquivos for maior que zero significa que tem alguma coisa
                                    ? item.arquivos[0].url // se tiver o arquivo estou pegando o primeiro(posição zer0), neste caso pega somente a primeira imagem do banco
                                    : semImagem // se não tiver um arquivo mostra imagem padrão que foi definicda com imagmeJaqueta
                                } 
                                alt="jaqueta"
                            />
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
                                {item.nome}
                            </span>
                            </div>
                    
                    </div>
                ))}
            </div>
    </div>
    )
};

export default Resultado;