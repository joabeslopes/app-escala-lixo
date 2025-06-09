import "./Escala.css";
import { getDiaPtBr, getMesPtBr } from "../../myDates";

export default function Escala({ escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };

    const diaInicial = escalaMes[0].dia;

    return (
        <div className="external-container">
            <p className="output">
                *Escala {getMesPtBr(diaInicial)}*
                <br/><br/>
                {escalaMes.map( (dia) =>
                    <DiaEscala dia={dia}/>
                )}
            </p>
        </div>
    );
};

function DiaEscala({dia}){

    let escalaString = getDiaPtBr(dia.dia) + " - ";
    const lastNome = dia.nome.length - 1;
    for (let i = 0; i <= lastNome; i++) {
        const nome = dia.nome[i];
        escalaString += nome;
        if (i !== lastNome) {
            escalaString += ' / ';
        };
    };
    return <> 
        {escalaString} 
        <br/> 
    </>
};