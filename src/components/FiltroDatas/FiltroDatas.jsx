import PropTypes from 'prop-types';
import "./FiltroDatas.css";

export function getDiaAtual(){
  const diaAtual = new Date().toISOString().split('T')[0];
  return diaAtual;
}

export default function FiltroDatas({DiaInicial, setDiaInicial, listaExclusaoSemana, setlistaExclusaoSemana}) {

  const diaAtual = getDiaAtual();

  function addExclusaoSemana(evt){
    const dia = evt.target.value;

    if (dia == ""){
      return true;
    };

    if (listaExclusaoSemana.includes(dia) ){
      const newLista = listaExclusaoSemana.filter( (diaExclusao) => diaExclusao != dia );
      setlistaExclusaoSemana(newLista);
    } else {
      const newLista = listaExclusaoSemana.concat( dia );
      setlistaExclusaoSemana(newLista);
    };
  };

  return (
    <>
    <h2>A partir de</h2>
      <input 
        required
        type="date"
        className="input"
        value={DiaInicial}
        min={diaAtual}
        onChange={(evt) => setDiaInicial(evt.target.value)} />

    <h2>Dias da semana sem escala</h2>
    {
      listaExclusaoSemana.map( (dia) => <a>* {dia}</a> )
    }

    <select
      className="input"
      value=""
      name="listaExclusaoSemana"
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
    </>
  );
}

FiltroDatas.propTypes = {
  DiaInicial: PropTypes.string,
  setDiaInicial: PropTypes.func,
  listaExclusaoSemana: PropTypes.array,
  setlistaExclusaoSemana: PropTypes.func
};