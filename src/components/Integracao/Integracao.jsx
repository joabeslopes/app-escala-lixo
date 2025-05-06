import "./Integracao.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import { get } from "../../myApiClient";
import { createClient } from "@supabase/supabase-js";

var supabase;

async function loadSupabase() {

    if (typeof supabase === 'undefined'){
        const apiInfo = await get('/integracaoSupabase');
        supabase = createClient(apiInfo.url, apiInfo.key);
    };
}

loadSupabase();

async function envioIntegracao (request) {

    if (typeof supabase === 'undefined'){
        return false;
    }

    const { 'data':signinData, 'error':signinE } = await supabase.auth.signInWithPassword({ 'email': request.email, 'password': request.password });

    if ( signinData.session === null){
        return false;
    };

    supabase.auth.signOut();

    return true;
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