import "./FiltroDatas.css";
import { getDiaPtBr } from "../../myDates";

export default function FiltroDatas({listaDiasMes, setListaDiasMes, listaDiasSemana, setListaDiasSemana}) {

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
    <div className="internal-div">
        <label>Dias do mes</label>
        <input 
          name="diaMes"
          className="input"
          type="date"
          value=""
          onChange={(evt) => handleChange(evt, listaDiasMes, setListaDiasMes)} />

      {listaDiasMes.map( (dia) => 
        <p>
          <a>* {getDiaPtBr(dia)}</a>
        </p>
      )}

      <select
        name="diaSemana"
        className="input"
        value=""
        onChange={(evt) => handleChange(evt, listaDiasSemana, setListaDiasSemana)}
      >
        <option value="">Dias da semana</option>
        <option value="segunda">Segunda</option>
        <option value="terça">Terça</option>
        <option value="quarta">Quarta</option>
        <option value="quinta">Quinta</option>
        <option value="sexta">Sexta</option>
        <option value="sabado">Sabado</option>
        <option value="domingo">Domingo</option>
      </select>

      {listaDiasSemana.map( (dia) => 
        <p>
          <a>* {dia}</a>
        </p>
      )}
    </div>
  );
};