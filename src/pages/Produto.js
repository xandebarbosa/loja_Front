import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import ReactImageMagnify from 'react-image-magnify';

import JaquetaImagem from '../assets/images/jaqueta.webp';
import semImagem from '../assets/images/semImagem.jpeg';
import MotoSprint from '../assets/images/motosprint.webp';
import JaquetaBlack from '../assets/images/jaqueta_preta.webp';
//import JaquetaVideo from '/assets/videos/JaquetaVideo.mp4';
import heart from '../assets/icones/heart.svg';
import truck from '../assets/icones/truck.svg';
import setaEsquerda from '../assets/icones/corner-down-left.svg';

//import produtos from '../data/produtos.json';
import Loading from '../components/Loading';

import { useAppContext } from '../context/App';

import { buscarProdutoPorId } from '../services/api';

import "../styles/page_produto.css";

const Produto = () => {

    const params = useParams();
    
    const [ produto, setProduto ] = useState();
    const [tamanhoSelecionado, setTamanhoSelecionado ] = useState(null);
    const [corSelecionada, setCorSelecionada] = useState(null);
    const [imagemSelecionada, setImagemSelecionada] = useState("");

    useEffect(() => {
        const buscarProduto = async () => {
            const resposta = await buscarProdutoPorId({ produtoId: params.id });

            //console.log(produto);
            setProduto(resposta);
            setImagemSelecionada(resposta.arquivos.length > 0 ? resposta.arquivos[0].url : semImagem);
        }

        buscarProduto(); //chamando a funcção buscar produto
    }, []); //useEffect como array de dependencia vazio, ou seja, sera executado somente uma vez

    function addProdutoCarrinho(produto) {

        if (produto?.tamanhos.length > 0 && !tamanhoSelecionado) {
            return toast.error('Selecione um tamanho');
        }

        if (produto?.cores.length > 0 && !corSelecionada) {
            return toast.error('Selecione uma cor');
        }

        addProduto({
            ...produto,
            tamanho: tamanhoSelecionado !== null ? tamanhoSelecionado.medida : null,
            cor: corSelecionada !== null ? corSelecionada.cor : null,
        });
        toast.success("Produto adicionado ao carrinho");
    }

    function handleSelecionarTamanho(event){
        const value = event.target.value;

        setTamanhoSelecionado(JSON.parse(value));
    }

    function handleSelecionarCor(event){
        const value = event.target.value;

        setCorSelecionada(JSON.parse(value));
    }

    const { addProduto, capitalizeFirst } = useAppContext(); //pegar a função que estamos passando como parametros

    //const produto = produtos.find(item => item.id === params.id); //procura produto pelo id
    //console.log('Meu produto -->',produto);

    if (!produto) { //negação de produto, se não tiver, retorna como resposta, carregando
        return (
            <div className="produto-container">
                <Loading />
            </div>
        );
    }

    return (
        <div className="produto-container">
            <div className="produto-content">
                <div className="produto-mini-imagem">
                    {produto.arquivos.map((item) => (
                         <img src={item.url} alt="jaquetaFrente" width="44" height="44" onClick={() => setImagemSelecionada(item.url)} />
                    ))}
                </div>
                <div className="produto-imagem-principal">
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Qualquer coisa',
                        isFluidWidth: true,
                        src: imagemSelecionada,
                        width: 300,
                        height: 100,
                        sizes: "(min-width: 300px) 33.5vw, (min-width: 115px) 50vw, 100vw",
                    },
                    largeImage: {
                        src: imagemSelecionada,
                        width: 1200,
                        height: 2200
                    },
                    isHintEnabled: true
                }} />
                </div>

               
                <div className="produto-info">
                
                    <span className="novo"> Novo </span>

                        <div className="produto-info-titulo-container">
                            
                            <p className="produto-info-titulo"> {capitalizeFirst(produto.nome)} </p>
                            <img src={heart} alt="coracao"/>

                        </div>

                            <p className="produto-info-preco"> {produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>
                            <span className="produto-info-parcelamento"> em 12 x {(produto.preco / 12).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} sem juros </span>
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

                        <div className="produto-info-tamanho-card">
                            {produto.tamanhos.length > 0 ? (
                                <div>
                                Tamanho: &nbsp;
                                <b>  
                                {!tamanhoSelecionado
                                    ? "Nenhum selecionado"
                                    : tamanhoSelecionado.medida
                                }
                                </b>    
                            </div>
                            ) : null }
                            <div className="produto-info-tamanho-items-card">
                                {produto.tamanhos.map((itemTamanho) =>(
                                    <label
                                        key={itemTamanho.id}
                                        className={
                                            tamanhoSelecionado?.id === itemTamanho.id
                                                ? "produto-item-selecionado"
                                                : ""
                                        }
                                    >
                                        <p>{itemTamanho.medida}</p>   
                                        <input 
                                            type="radio" 
                                            className="produto-info-tamanho-card-element"
                                            name="tamanho" 
                                            checked=""
                                            value={JSON.stringify(itemTamanho)}
                                            onChange={handleSelecionarTamanho}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="produto-info-cor"> 
                            {produto.cores.length > 0 ? (
                                <div>
                                    Cor: &nbsp;
                                    <b>
                                        {!corSelecionada
                                            ? "Nenhuma cor selecionada"
                                            : corSelecionada.cor

                                        }
                                    </b>
                                </div>
                            ) : null }
                            <div className="produto-info-card-cores">
                            {produto.cores.map(itemCor => (
                                <label
                                    key={itemCor.id}
                                    className={
                                        corSelecionada?.id === itemCor.id
                                            ? "produto-cor-selecionada"
                                            : ""
                                    }
                                >
                                    <p> {itemCor.cor} </p>

                                    <input 
                                        type="radio" 
                                        className= "produto-cor-card-element"
                                        name="cor" 
                                        checked=""
                                        value={JSON.stringify(itemCor)} 
                                        onChange={handleSelecionarCor}
                                    />
                                </label>
                            ))}         
                            </div>
                        
                        </div>

                        <div className="produto-info-cores-disponiveis">
                            {/*<img src={JaquetaImagem} alt="imagem" width="40" height="40" />*/}
                            {/*<img src={JaquetaBlack} alt="imagem" width="40" height="40" />*/}
                        </div>

                        <p className="produto-info-disponivel"> {produto.quantidade} disponível! </p>

                        <button className="produto-info-comprar"> Comprar agora </button>
                        <button onClick={() => addProdutoCarrinho(produto)} className="produto-info-adicionar"> Adicionar ao carrinho </button>

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