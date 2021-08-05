import React, { useState } from "react";

import { useFormik } from 'formik';

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import '../styles/page_login.css';

import { login } from '../services/api';

//import usuarios from '../data/usuario.json';

import { useAutenticacaoContext } from '../context/autenticacao';

const Login = () => {

    const history = useHistory();
    const { logarUsuario } = useAutenticacaoContext();

    const formik = useFormik({
      initialValues: {
        login: "",
        senha: "",
      },
      onSubmit: async (values) => {
        const resposta = await login({ 
          usuario: values.login, 
          senha: values.senha, 
        });

        if(resposta.error === true ){
          
          return toast.error(resposta.message);

        }

        toast.success("Seja bem vindo!!")
        logarUsuario(resposta.user, resposta.token);  //São as duas informações que resposta me devolve
        history.push("/");
      },
    });

    return (
    <div className="login-container">
        <div className="login-content">
            <h3>Olá! Para continuar, digite o seu telefone, e-mail ou usuário</h3>
            
            <form onSubmit={formik.handleSubmit}> 

            <input 
            name="login"
            data-cy="input-login"
            placeholder="Telefone, e-mail ou usuário" 
            onChange={formik.handleChange} 
            value={formik.values.login}
            />

            <input
            name="senha"
            data-cy="input-senha"
            placeholder="Senha" type="password" 
            onChange={formik.handleChange}
            value={formik.values.senha}
            />

            <button type="submit"> Continuar </button>
            </form>
            
            <button className="login-button-register"> Criar conta </button>
            
        </div> 

    </div>
    );
};

export default Login;