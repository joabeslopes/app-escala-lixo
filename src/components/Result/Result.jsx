import './Result.css';
import PropTypes from 'prop-types';

export default function Result({status, text}){

    if (typeof status === 'undefined'){
        return null
    };

    let message = status ? 'Sucesso' : 'Erro';

    const resultType = status ? 'success' : 'error';

    const messageDetail = text === '' ? '' : ': '+text;

    message += messageDetail;

    return <a className={resultType}>{message}</a>
};

Result.propTypes = {
    status: PropTypes.bool,
    text: PropTypes.string
};