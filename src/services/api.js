import axios from 'axios';

function buscarProdutos() {
    return axios.get('http://localhost:3333/produtos').then((resposta) => {
      return resposta.data;
    });
}

function buscarProdutoPorId({ produtoId }) {
    return axios.get(`http://localhost:3333/produtos/${produtoId}`).then((resposta) => {
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

function fazerPedido({ pedido }){ //recebendo como parametro um pedido para poder enviar
    return axios.post('http://localhost:3333/pedido', pedido).then((resposta) => {
        return resposta.data;
    });
}

function buscarPedidos(){
    return axios.get("http://localhost:3333/pedido").then((resposta) => { 
        return resposta.data;
    });
}

function cancelarPedido({ pedidoId }) {
    return axios.post(`http://localhost:3333/pedido/cancelar/${pedidoId}`).then((resposta) => { 
        return resposta.data;
    });
}

function buscarProduto({ produto }) {
    return axios.post('http://localhost:3333/produto/buscar', {
        parteProduto: produto
    }).then((resposta) => {
        return resposta.data;
    });
}

function buscarCategorias() {
    return axios.get('http://localhost:3333/categoria')
    .then((resposta) => {
        return resposta.data;
    });
}

function buscarCategoria({ categoriaId }) { //busca somente uma categoria, passando o parametro categoriaId
    return axios.get(`http://localhost:3333/categoria/${categoriaId}`)
    .then((resposta) => {
        return resposta.data;
    });

}
  export { 
      buscarProdutos, 
      login, 
      cadastro, 
      buscarUsuarioPorToken, 
      buscarProdutoPorId, 
      fazerPedido,
      buscarPedidos,
      cancelarPedido,
      buscarProduto,
      buscarCategorias,
      buscarCategoria,
  };