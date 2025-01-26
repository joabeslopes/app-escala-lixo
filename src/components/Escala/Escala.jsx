import "./Escala.css";
import PropTypes from 'prop-types';

export default function Escala({ escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };


    return (
        <div className="output-container">
            <p className="output">
                {escalaMes.map( (semana) =>
                    <>
                        {semana.map( (dia) => {
                            const escalaString = dia.dia + " - " + dia.nome;
                            return <> {escalaString} <br/> </>
                        })}

                        <br/>
                    </>
                )}
            </p>
        </div>
    );

};

Escala.propTypes = {
    escalaMes: PropTypes.array
};