import "./FiltroDatas.css";
import { getDiaAtual } from "../../myDates";
import { useState } from "react";

export default function FiltroDatas({setDiaMes, setdiaSemana}) {

  const [internalDiaMes, setInternalDiaMes] = useState(getDiaAtual());

  const [internalDiaSemana, setInternalDiaSemana] = useState("");

  const changeDiaMes = function (evt) {
    const dia = evt.target.value;
    if (dia === ""){
      return null;
    };
    setInternalDiaMes(dia);
    setDiaMes(dia);
  };

  const changeDiaSemana = function (evt) {
    const dia = evt.target.value;
    if (dia === ""){
      return null;
    };
    setInternalDiaSemana(dia);
    setdiaSemana(dia);
  };

  return (
    <div>
      <h2>Dia do mes</h2>
        <input 
          name="diaMes"
          className="input"
          type="date"
          value={internalDiaMes}
          onChange={changeDiaMes} />

      <select
        name="diaSemana"
        className="input"
        value={internalDiaSemana}
        onClick={() => setInternalDiaSemana("")}
        onChange={changeDiaSemana}
      >
        <option value="">Dia da semana</option>
        <option value="nenhum">Nenhum</option>
        <option value="segunda">Segunda</option>
        <option value="terça">Terça</option>
        <option value="quarta">Quarta</option>
        <option value="quinta">Quinta</option>
        <option value="sexta">Sexta</option>
        <option value="sabado">Sabado</option>
        <option value="domingo">Domingo</option>
      </select>
      <p></p>
    </div>
  );
};