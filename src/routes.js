import React from "react";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//paginas
import Carrinho from './pages/Carrinho';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Produto from './pages/Produto';
import Revisao from './pages/Revisao';

//Componente
import Header from './components/Header';
import Footer from './components/Footer';

const Routes = () => {
    return (
        <Router>
        <Header />
        <Switch>
            <Route exact path="/carrinho" component={Carrinho} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />        
            <Route exact path="/cadastro" component={Cadastro} />    
            <Route exact path="/produto/:id" component={Produto} />
            <Route exact path="/revisao" component={Revisao}/>
        </Switch>
        <Footer />
    </Router>
    );
    
};

export default Routes;