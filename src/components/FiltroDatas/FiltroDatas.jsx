import "./FiltroDatas.css";
import { getDiaPtBr } from "../../myDates";

export default function FiltroDatas({listaDiasMes, setListaDiasMes, listaDiasSemana, setListaDiasSemana, diasOptions}) {

  const handleChange = function(evt, lista, setLista) {
      const dia = evt.target.value;
      if (dia === ""){
        return null;
      };

      const newLista = [...lista];

      if (newLista.includes(dia) ){
        const index = newLista.indexOf(dia);
        newLista.splice(index, 1);
      } else {
        newLista.push(dia);
      };
      setLista(newLista);
  };

  return (
    <div className="internal-container">
        <label>Dias do mes</label>
        <input 
          name="diaMes"
          className="input"
          type="date"
          onChange={(evt) => handleChange(evt, listaDiasMes, setListaDiasMes)} />

      {listaDiasMes.map( (dia) => 
        <p>
          <a>* {getDiaPtBr(dia)}</a>
        </p>
      )}
      <label>Dias da semana</label>
      <select
        name="diaSemana"
        className="input"
        onChange={(evt) => handleChange(evt, listaDiasSemana, setListaDiasSemana)}
      >
      {
        Object.keys(diasOptions).map( (diaNome) => <option value={diaNome}>{diaNome}</option> )
      }
      </select>

      {listaDiasSemana.map( (dia) => 
        <p>
          <a>* {dia}</a>
        </p>
      )}
    </div>
  );
};