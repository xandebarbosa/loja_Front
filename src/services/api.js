import axios from 'axios';

function buscarProdutos() {
    return axios.get('http://localhost:3333/produtos').then((resposta) => {
      return resposta.data;
    });
  }

function login({ usuario, senha }) {
    return axios.post('http://localhost:3333/login', {
        login: usuario,
        senha: senha
    }).then((resposta) => {
        return resposta.data;
    });
}

function cadastro({ nome, sobrenome, cpf, email, senha }) {
    return axios.post('http://localhost:3333/usuario', {
        nome: `${nome} ${sobrenome}`,
        usuario: email,
        senha: senha
    }).then((resposta) => {
        return resposta.data;
    });
}

function buscarUsuarioPorToken({ token }) {
    return axios.get(`http://localhost:3333/usuario/autenticado`, {
        headers: {  // passando um tokem para dentro do back-end - utlizando o objeto Headers
            Authorization: `Bearer ${token}`
        }
    }).then((resposta) => {
        return resposta.data;
    });
}

  export { buscarProdutos, login, cadastro, buscarUsuarioPorToken };