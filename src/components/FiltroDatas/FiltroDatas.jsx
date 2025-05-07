import PropTypes from 'prop-types';
import "./FiltroDatas.css";
import { getDiaAtual } from "../../mydates";

export default function FiltroDatas({diaInicial, setDiaInicial, exclusaoSemana, setExclusaoSemana}) {

  const diaAtual = getDiaAtual();

  function addExclusaoSemana(evt){
    const dia = evt.target.value;

    if (dia == ""){
      return true;
    };

    if (exclusaoSemana.includes(dia) ){
      const newLista = exclusaoSemana.filter( (diaExclusao) => diaExclusao != dia );
      setExclusaoSemana(newLista);
    } else {
      const newLista = exclusaoSemana.concat( dia );
      setExclusaoSemana(newLista);
    };
  };

  return (
    <div className='filtro-datas'>
      <h2>A partir de</h2>
        <input 
          required
          type="date"
          className="input"
          value={diaInicial}
          min={diaAtual}
          onChange={(evt) => setDiaInicial(evt.target.value)} />

      <h2>Dias da semana sem escala</h2>
      {
        exclusaoSemana.map( (dia) => <a>* {dia}</a> )
      }

      <select
        className="input"
        value=""
        name="exclusaoSemana"
        onChange={(evt) => {addExclusaoSemana(evt)} }
      >
        <option value="">Dia sem escala</option>
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
}

FiltroDatas.propTypes = {
  diaInicial: PropTypes.string,
  setDiaInicial: PropTypes.func,
  exclusaoSemana: PropTypes.array,
  setExclusaoSemana: PropTypes.func
};