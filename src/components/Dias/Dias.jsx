import { useState } from "react";
import { diasIndex } from "../../myDates";

export default function Dias({diasOptions, setDiasOptions}){
    const [diaComplemento, setDiaComplemento] = useState("");
    const [diaNome, setDiaNome] = useState("");

    const handleSubmit = function(){
        if (diaNome === ""){
            return null;
        };

        const newDiasOptions = {...diasOptions};
        const optionName = `${diaNome} ${diaComplemento}`.trim();

        newDiasOptions[optionName] = diasIndex[diaNome];
        setDiasOptions(newDiasOptions);
    };

    return <div className="internal-container">

        <select
        name="diaNome"
        className="input"
        onChange={(evt) => setDiaNome(evt.target.value)}
        >
            {
                Object.keys(diasIndex).map( (nome) => <option value={nome}>{nome}</option> )
            }
        </select>
        <input
        name="diaSemana"
        className="input"
        placeholder="Complemento opcional (ex: noite)"
        value={diaComplemento}
        onChange={(evt) => setDiaComplemento(evt.target.value)}
        />

        <button className="submit" onClick={handleSubmit}>Adicionar</button>
    </div>
};