import './Result.css';

export default function Result({messageObj}){

    if (typeof messageObj == 'undefined'){
        return null;
    };

    const status = messageObj.status;
    const text = messageObj.text;

    const statusDict = {
        'success': 'Sucesso: ',
        'error': 'Erro: '
    };

    if (! Object.hasOwn(statusDict, status) ){
        return null
    };

    const message = statusDict[status] + text;

    return <a className={status}>{message}</a>
};