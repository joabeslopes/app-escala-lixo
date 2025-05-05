import "./Integracao.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import { post } from "../../myApiClient";

async function envioIntegracao (request) {

    const jsonRequest = JSON.stringify(request);

    const response = await post("/integracaoSupabase", jsonRequest);

    if (response["success"]){
        return true
    } else {
        return false
    };

};


export default function Integracao({escalaMes}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(undefined);

    const handleSubmit = async function (evt) {
        evt.preventDefault();

        const request = {
            'email': email,
            'password': password,
            'escala': escalaMes
        };

        const envioSuccess = await envioIntegracao(request);

        setSuccess(envioSuccess);
    };

    return <>
        <form className="meu-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Enviar para Integracao</h1>

            <input
                required
                type="text"
                className="input"
                placeholder="Email"
                name="email"
                value={email} 
                onChange={(evt) => setEmail(evt.target.value)}
            />

            <input
                required
                type="password"
                className="input"
                placeholder="Senha"
                name="password"
                value={password} 
                onChange={(evt) => setPassword(evt.target.value)}
            />

            <button type="submit" className="submit">Enviar</button>
            <Result success={success} />
        </form>
    </>
};

function Result({success}){

    if (typeof success === 'undefined'){
        return <></>
    } else {
        if (success){
            return <a className="success">Sucesso no envio</a>
        } else {
            return <a className="error">Erro no envio</a>
        };
    };

}

Integracao.propTypes = {
    escalaMes: PropTypes.array
};

Result.propTypes = {
    success: PropTypes.bool
};