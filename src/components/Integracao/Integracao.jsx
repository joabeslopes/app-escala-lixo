import "./Integracao.css";
import { useState, useEffect } from "react";
import myClientSupabase from "../../myClientSupabase";
import Result from "../Result/Result";

const clientSupabase = new myClientSupabase();

export default function Integracao({escalaMes, listaPessoas, setListaPessoas}) {

    const [userLogged, setUserLogged] = useState(undefined);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [resultMessage, setResultMessage] = useState(undefined);

    const setMessage = function(status, text) {
        const message = {
            'status': status,
            'text': text
        };
        setResultMessage(message);
    };

    useEffect(() => {
        const get_session = async function () {
            const loaded = await clientSupabase.load();
            setApiLoaded(loaded);

            if (!loaded){
                setMessage('error', 'Conexão com a integração');
            } else {
                setResultMessage(undefined);
            };

            const hasSession = await clientSupabase.getSession();
            setUserLogged(hasSession);
        };

        get_session();
    }, []);

    return <div className="meu-form">
        <h1 className="form-title">Integracao</h1>

        {apiLoaded ?
            <>
                <LoginForm userLogged={userLogged} setUserLogged={setUserLogged} setMessage={setMessage} />
                <EnvioPessoas userLogged={userLogged} setListaPessoas={setListaPessoas} setMessage={setMessage} />
                <EnvioEscala userLogged={userLogged} escalaMes={escalaMes} setMessage={setMessage} />
            </>
            :
            null
        }
        <Result messageObj={resultMessage} />
    </div>
};


function LoginForm({userLogged, setUserLogged, setMessage}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async function (evt) {
        evt.preventDefault();

        const userData = { email, password };
        const loginSuccess = await clientSupabase.login(userData);

        if (loginSuccess){
            setMessage('success', 'Login efetuado')
        } else {
            setMessage('error', 'Dados de login invalidos')
        };
        setUserLogged(loginSuccess);

    };

    const handleLogout = async function () {
        const logoutSuccess = await clientSupabase.logout();

        if (logoutSuccess){
            setMessage('success', 'Logout efetuado')
        } else {
            setMessage('error', 'Nao foi possivel fazer o logout')
        };

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


function EnvioEscala({userLogged, escalaMes, setMessage}){

    const handleSubmit = async function () {
        const envioSuccess = await clientSupabase.envioEscala(escalaMes);

        if (envioSuccess){
            setMessage('success', 'Escala enviada')
        } else {
            setMessage('error', 'Nao foi possivel enviar a escala')
        };
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


function EnvioPessoas({userLogged, setListaPessoas, setMessage}){

    const handleSubmit = async function () {

        const lista = await clientSupabase.getListaPessoas();
        const sucesso = lista !== null;

        if (sucesso && lista.length > 0){
            setListaPessoas(lista)
            setMessage('success', 'Obteve lista de pessoas')
        } else {
            setMessage('error', 'Nao obteve lista de pessoas')
        };
    };

    if (typeof userLogged === "undefined" || !userLogged){
        return null
    };

    return <button className="submit" onClick={handleSubmit}>Buscar lista de pessoas</button>
};