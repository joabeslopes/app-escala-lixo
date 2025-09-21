import "./Escala.css";
import { getDiaPtBr, getMesPtBr } from "../../myDates";
import { useRef } from "react";

export default function Escala({ escalaMes }) {

    if (escalaMes.length === 0){
        return <></>
    };

    const diaInicial = escalaMes[0].dia;
    const pRef = useRef();

    const copyFunction = function() {
        const texto = pRef.current.innerText;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto);
        } 
        else { // fallback usando a forma antiga
            const input = document.createElement("textarea");
            input.value = texto;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            document.execCommand("copy");
            document.body.removeChild(input);
        };
    };

    return (
        <div className="external-container">
            <div>
                <button className="output copy-button" onClick={copyFunction}>
                Copiar
                </button>
            </div>
            <p ref={pRef} className="output">
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