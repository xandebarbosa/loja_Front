import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useAutenticacaoContext } from "../context/autenticacao";
import { cadastro } from "../services/api";
import '../styles/page_cadastro.css';

const Cadastro = () => {

    const history = useHistory();
    const { logarUsuario } = useAutenticacaoContext();

    const formik = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            cpf: '',
            email: '',
            senha: '',
        },
        onSubmit: async (values) => {
            const resposta = await cadastro({ 
                nome: values.nome, 
                sobrenome: values.sobrenome, 
                cpf: values.cpf, 
                email: values.email,
                senha: values.senha
            });
            
            if (resposta.error === true ) {
                return alert("Houve um erro ao registrar-se !!!");
            } 

            logarUsuario(resposta.user, resposta.token);  //user e token são as informações que o back end devolve
            history.push("/");
            
        },
    });

    return(
        <div className="cadastro-container"> 
            <div className="cadastro-content">

                <div className="cadastro-topo">
                    <p className="cadastro-titulo">Preencha os seus dados</p> 
                    <p className="cadastro-conta-empresa">Criar uma conta de empresa</p>
                </div>
               
                <form onSubmit={formik.handleSubmit} className="cadastro-form">

                    <div className="cadastro-input-container">
                        <div className="cadastro-input-centent mr">
                            <label className="cadastrar-input-label">Nome</label>

                            <input 
                                name="nome" 
                                onChange={formik.handleChange} 
                                value={formik.values.nome}  
                                type="text" 
                                className="cadastro-input" 
                            />
                        </div>

                        <div className="cadastro-input-centent">
                            <label className="cadastrar-input-label">Sobrenone</label>

                            <input 
                                name="sobrenome" 
                                onChange={formik.handleChange}
                                value={formik.values.sobrenome} 
                                type="text" 
                                className="cadastro-input" 
                            />
                        </div>

                    </div>


                    <div className="cadastro-input-container">
                       <div className="cadastro-input-centent cpf">
                        <label className="cadastrar-input-label">CPF</label>

                            <input
                                name="cpf" 
                                onChange={formik.handleChange} 
                                value={formik.values.cpf} 
                                type="integer" 
                                className="cadastro-input" 
                            />
                        </div>

                        
                    </div>
                    
                    <div className="cadastro-input-container">
                        <div className="cadastro-input-centent mr">
                            <label className="cadastrar-input-label">E-mail</label>

                            <input 
                                name="email" 
                                onChange={formik.handleChange} 
                                value={formik.values.email} 
                                type="text" 
                                className="cadastro-input" 
                            />
                        </div>
                        <div className="cadastro-input-centent">
                            <label className="cadastrar-input-label">Senha</label>

                            <input 
                                name="senha" 
                                onChange={formik.handleChange} 
                                value={formik.values.senha} 
                                type="password" 
                                className="cadastro-input" 
                            />
                        </div>
                        
                    </div>
                    
                    
                    <div className="cadastro-termos">
                        <label>
                            <input type="checkbox" />Aceito os 
                            <span>Termos e condições </span> e autorizo o uso de meus dados de acordo com a 
                            <span> Declaração de privacidade. </span>
                        </label>
                    </div>
                    <button type="submit" className="cadastro-submit"> Continuar </button>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;