import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas from "../FiltroDatas/FiltroDatas";
import gerarEscala from "../../escala";
import Integracao from "../Integracao/Integracao";
import PessoaObj from "../../pessoaObj";
import Dias from "../Dias/Dias";


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([ new PessoaObj() ]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [diaInicial, setDiaInicial] = useState("");

  const [diasMes, setDiasMes] = useState([]);

  const [diasSemana, setDiasSemana] = useState([]);

  const [ignoraFeriados, setIgnoraFeriados] = useState(false);

  const [pessoasDia, setPessoasDia] = useState(1);

  const [diasOptions, setDiasOptions] = useState({"":""});

  const handleSubmit = async function (evt) {

    evt.preventDefault();

    if (listaPessoas.length == 0) {
      return null;
    };

    const dados = {
      listaPessoas: [...listaPessoas],
      diaInicial: diaInicial,
      exclusaoSemana: [...diasSemana],
      exclusaoMes: [...diasMes],
      ignoraFeriados: ignoraFeriados,
      pessoasDia: pessoasDia,
      diasOptions: {...diasOptions}
    };

    const escala = await gerarEscala(dados);

    if (escala === null){
      alert('Erro ao gerar escala, verifique os dados e tente novamente')
    } else {
      setEscalaMes(escala);
    };

  };

  return (
    <>
      <Integracao escalaMes={escalaMes} listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

      <div className="external-container">
        <h2 className="title">Dia inicial</h2>
        <input 
          name="diaInicial"
          className="input"
          type="date"
          value={diaInicial}
          onChange={(evt) => setDiaInicial(evt.target.value)} />

        <h2 className="title">Ignorar feriados</h2>
        <input 
          name="ignoraFeriados"
          className="checkbox"
          type="checkbox"
          onChange={() => setIgnoraFeriados(!ignoraFeriados) }
          />

        <h2 className="title">Dias da semana com escala</h2>
        <Dias diasOptions={diasOptions} setDiasOptions={setDiasOptions} />

        <h2 className="title">Dias em geral sem escala</h2>
        <FiltroDatas listaDiasMes={diasMes} setListaDiasMes={setDiasMes} listaDiasSemana={diasSemana} setListaDiasSemana={setDiasSemana} diasOptions={diasOptions} />

      </div>

      <form className="external-container" onSubmit={handleSubmit}>
        <h3 className="title">Pessoas por dia</h3>
        <input
          required
          name="pessoasDia"
          className="input"
          type="number"
          min="1"
          value={pessoasDia}
          onChange={(evt) => setPessoasDia(evt.target.value) }
          />

        <h2 className="title">Pessoas/Grupos</h2>
        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} diasOptions={diasOptions} />

        <button type="submit" className="submit">Gerar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}