import "./Escala.css";
import { getDiaPtBr, getMesPtBr } from "../../myDates";
import Integracao from "../Integracao/Integracao";

export default function Escala({ diaInicial, escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };

    return (
        <>
            <div className="output-container">
                <p className="output">
                    *Escala lixo {getMesPtBr(diaInicial)}*
                    <br/><br/>
                    {escalaMes.map( (dia) =>
                        <DiaEscala dia={dia}/>
                    )}
                </p>
            </div>
            <Integracao escalaMes={escalaMes} />
        </>
    );
};

function DiaEscala({dia}){

    const escalaString = getDiaPtBr(dia.dia) + " - " + dia.nome;
    return <> 
        {escalaString} 
        <br/> 
    </>
};