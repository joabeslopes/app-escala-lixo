import "./Integracao.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import { login, logout, isLogged, envioEscala, getListaPessoas } from "../../myClientSupabase";

export default function Integracao({escalaMes, listaPessoas, setListaPessoas}) {

    const [userLogged, setUserLogged] = useState(undefined);

    const init = async function () {
        if (typeof userLogged === "undefined"){
            const hasSession = await isLogged();
            setUserLogged(hasSession);
        };
    };

    init();

    return <div className="meu-form">
        <h1 className="form-title">Integracao</h1>

        <LoginForm userLogged={userLogged} setUserLogged={setUserLogged} />

        <EnvioPessoas userLogged={userLogged} listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <EnvioEscala userLogged={userLogged} escalaMes={escalaMes} />

    </div>
};

function LoginForm({userLogged, setUserLogged}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(undefined);

    const handleLogin = async function (evt) {
        evt.preventDefault();

        const userData = { email, password };
        const loginSuccess = await login(userData);
        setSuccess(loginSuccess);
        setUserLogged(loginSuccess);
    };

    const handleLogout = async function () {
        const logoutSuccess = await logout();

        if (logoutSuccess){
            setSuccess(undefined);
            setUserLogged(false);
        };
    };

    if (typeof userLogged === "undefined"){
        return <></>
    };

    if (userLogged){
        return <button className="submit" onClick={handleLogout}>Logout</button>

    } else{

        return <form onSubmit={handleLogin}>

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

            <button type="submit" className="submit">Login</button>
            <Result success={success} />
        </form>
    };
};

function Result({success}){

    if (typeof success === 'undefined'){
        return <></>
    } else {
        if (success){
            return <a className="success">Sucesso</a>
        } else {
            return <a className="error">Erro</a>
        };
    };

};

function EnvioEscala({userLogged, escalaMes}){

    const [success, setSuccess] = useState(undefined);

    const handleSubmit = async function () {
        const envioSuccess = await envioEscala(escalaMes);

        setSuccess(envioSuccess);
    };

    if (typeof userLogged === "undefined" || !userLogged){
        return <></>
    }

    if (escalaMes.length === 0){
        return <></>
    } else {

        return <>
            <button className="submit" onClick={handleSubmit}>Enviar escala</button>
            <Result success={success} />
        </>
    }
}

function EnvioPessoas({userLogged, listaPessoas, setListaPessoas}){

    const [success, setSuccess] = useState(undefined);
    const [recieved, setRecieved] = useState(undefined);

    const handleSubmit = async function () {

        if (typeof recieved === "undefined"){
            const lista = await getListaPessoas();
            if (lista !== null){
                setListaPessoas(lista)
            };

            setSuccess(lista !== null);
            setRecieved(true);
        };
    };

    if (typeof userLogged === "undefined" || !userLogged){
        return <></>
    };

    return <>
        <button className="submit" onClick={handleSubmit}>Buscar lista de duplas</button>
        <Result success={success} />
    </>

};

// Integracao.propTypes = {
//     escalaMes: PropTypes.array,
// };

Result.propTypes = {
    success: PropTypes.bool
};