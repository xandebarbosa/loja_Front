import React, { createContext, useContext, useState, useEffect } from 'react';   // useEffect - serve para ouvir uma alterção dentro de alguma coisa
import { toast } from 'react-toastify';

import { fazerPedido, buscarProduto, buscarProdutos } from '../services/api';

const AppContext = createContext({});

export const AppContextProvider =  ({ children }) => {

    const [produtos, setProdutos ] = useState([]);
    const [produtosHome, setProdutosHome] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [produtosBuscados, setProdutosBuscados] = useState([]); //armazena a respota da pesquisa por produto para poder pegar essa informação e mostrar

    const addProduto = (produto) => {   //recebendo parametro produto para deixar dinamico
        console.log("add produto", produto);
        //antes de colocarmos o produto, será feito uma verificação
        //setProdutos([...produtos, produto]); //recebe produto do parametro
        if (produtos.some((item) => item.id === produto.id)){ //some retorna verdadeiro ou falso
           // return false; // return false - não vai permitir que eu adicione o mesmo produto mais de uma vez
           //quando existir o produto, vamos percorer um por um
           setProdutos(
               produtos.map((item) => {
                    if (item.id === produto.id) {
                        return {
                            ...item, //mantém todas as informações de produto
                            quantidade: item.quantidade + 1,  //quantidade pega o valor que já existe, que a principio é um e adicionar mais um
                        };
                    } else {
                        return item;
                    }
                })
           );

           return; // return dentro de um if para a exeução de uma função, ou seja, não vai executar o codigo abaixo
        }  

        // se a condicçao de cima for verdadeira, não executa o codigo de baixo
        setProdutos([...produtos, { //...produtos - mantém os produtos que tem 
            ...produto,  //...produtos - vai adicionar mais uma, chamada quantidade, toda vez que um produto for adicionado essa quantidade vai como um
            quantidade: 1, // adiciona uma propriedade nova -  quantidade - que vai como um(01), quando ele não existir
            
        }]);   
    };

    //passando como parametro produtoId para informar qual produto estou mexendo
    const addQuantidade = ({ produtoId }) => {
        setProdutos(
            produtos.map((item) => {
                 if (item.id === produtoId) {
                     return {
                         ...item, //mantém todas as informações de produto
                         quantidade: item.quantidade + 1,  //quantidade pega o valor que já existe, que a principio é um e adicionar mais um
                     };
                 } else {
                     return item;
                 }
             })
        );
    };

    const removerQuantidade = ({ produtoId }) => {
        setProdutos(
            produtos.map((item) => {
                 if (item.id === produtoId) {
                     return {
                         ...item, //mantém todas as informações de produto
                         quantidade: item.quantidade - 1,  //quantidade pega o valor que já existe, que a principio é um e adicionar mais um
                     };
                 } else {
                     return item;
                 }
             })
        );
    };

    const removerItem = ({ produtoId }) => {
        //para remover item de um array
        setProdutos(produtos.filter(item => item.id !== produtoId)); //estamos filtrando os produtos onde o id for diferente de produtoId(produto que esou passando)
                                                                    //ou seja, mantém todos que forem diferentes do que estou passando (Estou passando produtoId)
    }                                                               //o que estou passando não vai ser retornado

    const limparCarrinho = () => {
        setProdutos([]);
    }

    //toda vez que um produto é adicionado essa função faz a atualização das informações
    //a função useEffect fica ouvindo as alterações dentro de produtos, sempre que um produto mudar setValorTotal é recalculado
    useEffect(() => {
        setValorTotal(produtos.reduce((acc, cur) => acc + (cur.preco * cur.quantidade), 0));
    }, [produtos]);

    useEffect(() => {
        async function getProdutos() {
        const resposta = await buscarProdutos();
        //console.log(resposta);
        setProdutosHome(resposta);
        
        }
    
   getProdutos();
    
  }, []);

    //função para fazer o pedido
    const enviarPedido = async (pedido) => {  //recebendo peido com as informações do payLoad de Carrinho.js
        const resposta = await fazerPedido({ pedido });

        if (resposta.error) {

            resposta.message.forEach((item) => {  //mostrando os erros separados
                toast.error(item);
            })
            return false;
        }

        toast.success("Pedido realizado com sucesso");
        return true;
    };

    const enviarBuscarProduto = async (produto) => {
        const resposta = await buscarProduto({ produto: produto });  //recebe um parametro chamado Produto que recebe produto

        console.log("Resposta -->", resposta); //sempre debugar para ver se esta funcionando corretamente
        
        setProdutosBuscados(resposta);// quando vem uma resposta armazena em setProdutosBuscados
    }

    function capitalizeFirst(str){
        const subst = str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
          return a.toUpperCase();
        });
        return subst;
      }

    return (
        <AppContext.Provider
            value={{   //permite que as funções listadas abaixo possam ser acessadas por outras paginas
                produtos: produtos,
                quantidadeTotal: produtos.length, // length - tamanho do array
                valorTotal:valorTotal,
                produtosBuscados: produtosBuscados, // compartinha os produtos buscados
                produtosHome: produtosHome, // compartilhar na tela de home
                setProdutosHome: setProdutosHome, // compartilhar na tela de Header
                addProduto: addProduto,
                enviarPedido: enviarPedido,
                addQuantidade: addQuantidade,
                removerQuantidade: removerQuantidade,
                removerItem: removerItem,
                limparCarrinho: limparCarrinho,
                enviarBuscarProduto: enviarBuscarProduto,
                capitalizeFirst: capitalizeFirst,
            }}
        >
            {children}
        </AppContext.Provider>
    );

};

export const useAppContext = () => {
    const context = useContext(AppContext)

    return context;
}

