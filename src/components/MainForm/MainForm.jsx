import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas from "../FiltroDatas/FiltroDatas";
import gerarEscala from "../../escala";
import { getDiaAtual } from "../../mydates";

async function gerarEscalaFinal(dados, setEscalaMes) {

  const escala = await gerarEscala(dados.diaInicial, dados.listaPessoas, dados.listaExclusaoSemana);

  if (typeof escala === "undefined"){
    alert('Erro ao gerar escala, corrija os dados e tente novamente')
  } else {
    setEscalaMes(escala);
  }

};


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([{ nome: '', homeOffice: '', id: '' }]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [diaInicial, setDiaInicial] = useState(getDiaAtual());

  const [listaExclusaoSemana, setlistaExclusaoSemana] = useState([]);

  const handleSubmit = async function (evt) {

    evt.preventDefault();

    if (listaPessoas.length > 0) {

      const listaFiltrada = listaPessoas.map((pessoa) => {
        return {
          nome: pessoa.nome,
          homeOffice: pessoa.homeOffice,
        }
      });

      const dados = {
        listaPessoas: listaFiltrada,
        diaInicial: diaInicial,
        listaExclusaoSemana: listaExclusaoSemana
      };

      await gerarEscalaFinal(dados, setEscalaMes);

    };

  };

  return (
    <>
      <FiltroDatas diaInicial={diaInicial} setDiaInicial={setDiaInicial} listaExclusaoSemana={listaExclusaoSemana} setlistaExclusaoSemana={setlistaExclusaoSemana}  />
      
      <form className="meu-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Escala do lixo</h1>

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <button type="submit" className="submit">Gerar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}