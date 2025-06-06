import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas from "../FiltroDatas/FiltroDatas";
import gerarEscala from "../../escala";
import Integracao from "../Integracao/Integracao";

async function gerarEscalaFinal(dados, setEscalaMes) {

  const escala = await gerarEscala(dados.diaInicial, dados.exclusaoSemana, dados.listaPessoas);

  if (typeof escala === "undefined"){
    alert('Erro ao gerar escala, verifique os dados e tente novamente')
  } else {
    setEscalaMes(escala);
  }

};


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([{ id: '', nome: '', listaSemana: [], listaMes: [] }]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [diasMes, setDiasMes] = useState([]);

  const [diasSemana, setDiasSemana] = useState([]);

  const handleSubmit = async function (evt) {

    evt.preventDefault();

    if (listaPessoas.length == 0) {
      return null;
    };

    const listaFiltrada = listaPessoas.map((pessoa) => {
      return {
        nome: pessoa.nome,
        homeOffice: pessoa.listaSemana[0],
      }
    });

    const dados = {
      listaPessoas: listaFiltrada,
      diaInicial: diasMes[0],
      exclusaoSemana: [...diasSemana]
    };

    await gerarEscalaFinal(dados, setEscalaMes);

  };

  return (
    <>
      <Integracao escalaMes={escalaMes} listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

      <div className="meu-form">
        <FiltroDatas listaDiasMes={diasMes} setListaDiasMes={setDiasMes} listaDiasSemana={diasSemana} setListaDiasSemana={setDiasSemana} />
      </div>

      <form className="meu-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Escala do lixo</h2>

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <button type="submit" className="submit">Gerar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}