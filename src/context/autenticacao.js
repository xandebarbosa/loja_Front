import react, { createContext, useContext, useState, useEffect } from 'react';

import { buscarUsuarioPorToken } from '../services/api';

const AutenticacaoContext = createContext({});

export const AutenticacaoProvider = ({ children }) => {

    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {

        const token = localStorage.getItem("token");  //verifica se existe algum item de token

        if (token){  //se existir espo pegando o tokem e passando para a função buscarUsuarioPorToken - essa função é um get
             
            async function getUsuario(){
                const resposta = await buscarUsuarioPorToken({ token: token });

                if (resposta.error === true) {
                    return alert(resposta.message);

                    return localStorage.removeItem("token");
                }

                setUsuario(resposta);
                setLogado(true); 
            }

            getUsuario();
        }
    }, []);

    const logarUsuario = (usuario, token) =>{
        setUsuario(usuario);
        setLogado(true);

        localStorage.setItem("token", token);
    }

    const deslogarUsuario = () => {
        setUsuario(null);
        setLogado(false);

        localStorage.removeItem("token");
    }

    return <AutenticacaoContext.Provider 
     value={{
        usuario: usuario,
        logado: logado,
        logarUsuario: logarUsuario, 
        deslogarUsuario: deslogarUsuario,
     }}
    >
        {children}
    </AutenticacaoContext.Provider>
}

export const useAutenticacaoContext = () => {

    const context = useContext(AutenticacaoContext);

    return context;
}