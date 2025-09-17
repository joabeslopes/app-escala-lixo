import "./Integracao.css";
import { useState, useEffect } from "react";
import myClientSupabase from "../../myClientSupabase";
import Result from "../Result/Result";
import PessoaObj from "../../pessoaObj";

const clientSupabase = new myClientSupabase();

export default function Integracao({escalaMes, listaPessoas, setListaPessoas}) {

    const [userLogged, setUserLogged] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);

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
                setResultMessage(null);
            };

            const hasSession = await clientSupabase.getSession();
            setUserLogged(hasSession);
        };

        get_session();
    }, []);

    return <>
    { apiLoaded ?
        <div className="external-container">
            <h1 className="title">Integracao</h1>
                <LoginForm userLogged={userLogged} setUserLogged={setUserLogged} setMessage={setMessage} />
                <EnvioPessoas userLogged={userLogged} setListaPessoas={setListaPessoas} setMessage={setMessage} />
                <EnvioEscala userLogged={userLogged} escalaMes={escalaMes} setMessage={setMessage} />
                
                <Result messageObj={resultMessage} />
        </div>
    :
        null
    }
    </>
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

    if ( userLogged === null ){
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

    if (userLogged === null || !userLogged){
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

        const listaSupabase = await clientSupabase.getListaPessoas();
        const sucesso = listaSupabase !== null;

        if (sucesso && listaSupabase.length > 0){

            const lista = listaSupabase.map( (row) => {
                const pessoa = new PessoaObj(row.id);
                pessoa.nome = row.nome;
                pessoa.listaSemana.push(row.homeOffice);
                return pessoa
            });

            setListaPessoas(lista)
            setMessage('success', 'Obteve lista de pessoas')
        } else {
            setMessage('error', 'Nao obteve lista de pessoas')
        };
    };

    if (userLogged === null || !userLogged){
        return null
    };

    return <button className="submit" onClick={handleSubmit}>Buscar lista de pessoas</button>
};