import "./Escala.css";
import PropTypes from 'prop-types';
import { getDiaPtBr } from "../../mydates";

export default function Escala({ escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };

    return (
        <div className="output-container">
            <p className="output">
                {escalaMes.map( (semana) =>
                    <>
                        {semana.map( (dia) => 
                            <DiaEscala dia={dia} />
                        )}
                        <br/>
                    </>
                )}
            </p>
        </div>
    );

};

function DiaEscala({dia}){

    const escalaString = getDiaPtBr(dia.dia) + " - " + dia.nome;
    return <> 
        {escalaString} 
        <br/> 
    </>
};

Escala.propTypes = {
    escalaMes: PropTypes.array
};

DiaEscala.propTypes = {
    dia: PropTypes.object
};