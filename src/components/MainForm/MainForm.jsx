import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas from "../FiltroDatas/FiltroDatas";
import gerarEscala from "../../escala";
import Integracao from "../Integracao/Integracao";
import { getDiaAtual } from "../../myDates";
import PessoaObj from "../../pessoaObj";


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([ new PessoaObj() ]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [diaInicial, setDiaInicial] = useState(getDiaAtual());

  const [diasMes, setDiasMes] = useState([]);

  const [diasSemana, setDiasSemana] = useState([]);

  const [ignoraFeriados, setIgnoraFeriados] = useState(false);

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
      ignoraFeriados: ignoraFeriados
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

      <div className="external-div">
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

        <h2 className="title">Dias sem escala</h2>
        <FiltroDatas listaDiasMes={diasMes} setListaDiasMes={setDiasMes} listaDiasSemana={diasSemana} setListaDiasSemana={setDiasSemana} />

      </div>

      <form className="external-div" onSubmit={handleSubmit}>
        <h2 className="title">Pessoas/Grupos</h2>

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <button type="submit" className="submit">Gerar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}