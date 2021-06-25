import React, { createContext, useContext, useState, useEffect } from 'react';   // useEffect - serve para ouvir uma alterção dentro de alguma coisa

const AppContext = createContext({});

export const AppContextProvider =  ({ children }) => {

    const [produtos, setProdutos ] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);

    const addProduto = (produto) => {   //recebendo parametro produto para deixar dinamico
        setProdutos([...produtos, produto]); //recebe produto do parametro
    };

    useEffect(() => {
        setValorTotal(produtos.reduce((acc, cur) => acc + cur.valor, 0));
    }, [produtos])

    return (
        <AppContext.Provider
            value={{
                produtos: produtos,
                quantidadeTotal: produtos.length, // length - tamanho do array
                valorTotal:valorTotal,
                addProduto: addProduto,
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

