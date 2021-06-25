import React from "react";
import "../styles/componente_footer.css";
import creditcard from "../assets/icones/credit-card.svg";
import archive from "../assets/icones/archive.svg";
import shield from "../assets/icones/shield.svg";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-linha-1">
                    <div className="footer-left">
                        <div className="footer-information-credit">
                            <img src={creditcard} />
                            <br></br>
                            
                        <p>Pague com cartão de crédito ou <br/>
                                    boleto<br /></p>
                        </div>
                        <div className="footer-information-credit-text">
                        <p>Com o Mercado Pago você paga parcelado com<br />
                        sem juros ou à vista no boleto. É sempre<br />
                                    seguro!<br />
                        </p>
                        </div>
                        <div className="footer-information-credit-text2">
                            <a href="#" target="_blank">Como pagar com Mercado Pago</a>
                        </div>
                        
                    </div>
                   <div className="footer-center">
                        <div className="footer-information-frete">
                            <img src={archive} />
                            <br />
                            Frete grátis a partir de R$79<br />
                        </div>
                        <div className="footer-information-frete-text">
                         <p>Só por estar cadastrado no Mercado Livre, <br />
                             você tem frete grátis em milhares de produtos. <br />
                             É um benefício do Mercado Pontos.</p><br />   
                        </div>
                        <div className="footer-information-frete-text2">
                            <a href="#" target="_blank">Saiba mais sobre este benefício</a>
                        </div>
                   </div>
                   <div className="footer-right">
                        <div className="footer-information-security">
                            <img src={shield} />
                            <br />
                            Segurança, do início ao fim<br />
                        </div>
                        <div className="footer-information-security-text">
                         <p>Você não gostou do que comprou? Devolva! <br />
                             No Mercado Livre não há nada que você não <br />
                             possa fazer, porque você está sempre <br />
                             protegido</p><br />   
                        </div>
                        <div className="footer-information-security-text2">
                            <a href="#" target="_blank">Como te protegemos</a>
                        </div>
                   </div>
                </div>
                <hr />
                <div className="footer-linha footer-linha-2">
                <ul className="footer-texto-rodape">
                    <li> <a href="#">Trabalhe conosco</a></li>
                    <li> <a href="#">Termos e condições</a></li>
                    <li> <a href="#">Como cuidamos da sua privacidade</a></li>
                    <li> <a href="#">Contato</a></li>
                </ul>
                <br />
                <div className="footer-texto-rodape2">
                <p>Copyright © 1999-2021 Ebazar.com.br LTDA</p>
                <p>CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.</p>
                </div>
                    
                </div>

            </div>

        </div>

    );
};

export default Footer;