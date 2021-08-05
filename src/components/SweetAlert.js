import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

const SweetAlertComponent = ({ show = false, onCancel, onConfirm }) => {
    
    return (
        <SweetAlert
            show={show}
            warning
            showCancel
            confirmBtnText="Sim, quero deletar !"
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="danger"
            confirmBtnCssClass="btn-confirmar-deletar"
            cancelBtnCssClass="btn-cancelar-deletar"
            title="Deletar item"
            onConfirm={onConfirm}
            onCancel={onCancel}
            focusCancelBtn
        >

        Deseja realmente deletar esse item ?
        </SweetAlert>
    );
};

export default SweetAlertComponent;