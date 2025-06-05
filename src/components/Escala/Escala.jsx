import "./Escala.css";
import { getDiaPtBr, getMesPtBr } from "../../myDates";

export default function Escala({ escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };

    const diaInicial = escalaMes[0].dia;

    return (
        <div className="output-container">
            <p className="output">
                *Escala lixo {getMesPtBr(diaInicial)}*
                <br/><br/>
                {escalaMes.map( (dia) =>
                    <DiaEscala dia={dia}/>
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