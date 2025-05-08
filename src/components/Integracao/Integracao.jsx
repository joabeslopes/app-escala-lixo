import "./Integracao.css";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import myClientSupabase from "../../myClientSupabase";
import Result from "../Result/Result";

const clientSupabase = new myClientSupabase();

export default function Integracao({escalaMes, listaPessoas, setListaPessoas}) {

    const [userLogged, setUserLogged] = useState(undefined);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [resultStatus, setResultStatus] = useState(undefined);
    const [resultText, setResultText] = useState('');

    useEffect(() => {
        const get_session = async function () {
            const loaded = await clientSupabase.load();

            setApiLoaded(loaded);
            setResultStatus(loaded ? undefined : false);
            setResultText(loaded ? '' : 'Não foi possível se conectar à integração');

            const hasSession = await clientSupabase.getSession();
            setUserLogged(hasSession);
        };

        get_session();
    }, []);

    return <div className="meu-form">
        <h1 className="form-title">Integracao</h1>

        {apiLoaded ?
            <>
                <LoginForm userLogged={userLogged} setUserLogged={setUserLogged} setResultStatus={setResultStatus} setResultText={setResultText} />
                <EnvioPessoas userLogged={userLogged} setListaPessoas={setListaPessoas} setResultStatus={setResultStatus} setResultText={setResultText} />
                <EnvioEscala userLogged={userLogged} escalaMes={escalaMes} setResultStatus={setResultStatus} setResultText={setResultText} />
            </>
            :
            null
        }
        <Result status={resultStatus} text={resultText} />
    </div>
};


function LoginForm({userLogged, setUserLogged, setResultStatus, setResultText}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async function (evt) {
        evt.preventDefault();

        const userData = { email, password };
        const loginSuccess = await clientSupabase.login(userData);
        setResultStatus(loginSuccess);
        setResultText(loginSuccess ? 'Login efetuado' : 'Dados de login invalidos');
        setUserLogged(loginSuccess);
    };

    const handleLogout = async function () {
        const logoutSuccess = await clientSupabase.logout();
        setResultStatus(logoutSuccess);
        setResultText(logoutSuccess ? 'Logout efetuado' : 'Nao foi possivel fazer o logout');
        setUserLogged(!logoutSuccess);
    };

    if (typeof userLogged === "undefined"){
        return null
    };

    return <>
        {userLogged ?
            <button className="submit" onClick={handleLogout}>Logout</button>
            :
            <form onSubmit={handleLogin}>
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
            </form>
        }
    </>
};


function EnvioEscala({userLogged, escalaMes, setResultStatus, setResultText}){

    const handleSubmit = async function () {
        const envioSuccess = await clientSupabase.envioEscala(escalaMes);
        setResultStatus(envioSuccess);
        setResultText( envioSuccess ? 'Escala enviada' : 'Nao foi possivel enviar a escala' );
    };

    if (typeof userLogged === "undefined" || !userLogged){
        return null;
    };

    if (escalaMes.length > 0){
        return <button className="submit" onClick={handleSubmit}>Enviar escala</button>
    } else {
        return null;
    };
};


function EnvioPessoas({userLogged, setListaPessoas, setResultStatus, setResultText}){

    const handleSubmit = async function () {

        const lista = await clientSupabase.getListaPessoas();
        const sucesso = lista !== null;

        if (sucesso && lista.length > 0){
            setListaPessoas(lista)
        };

        setResultStatus(sucesso);
        setResultText(sucesso ? 'Buscou lista de pessoas' : 'Nao buscou lista de pessoas');
    };

    if (typeof userLogged === "undefined" || !userLogged){
        return null
    };

    return <button className="submit" onClick={handleSubmit}>Buscar lista de pessoas</button>
};

Integracao.propTypes = {
    escalaMes: PropTypes.array,
    listaPessoas: PropTypes.array,
    setListaPessoas: PropTypes.func
};