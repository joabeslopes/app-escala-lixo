import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas from "../FiltroDatas/FiltroDatas";
import gerarEscala from "../../escala";
import Integracao from "../Integracao/Integracao";
import { getDiaAtual } from "../../myDates";

async function gerarEscalaFinal(dados, setEscalaMes) {

  const escala = await gerarEscala(dados.diaInicial, dados.exclusaoSemana, dados.listaPessoas);

  if (typeof escala === "undefined"){
    alert('Erro ao gerar escala, verifique os dados e tente novamente')
  } else {
    setEscalaMes(escala);
  }

};


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([{ nome: '', homeOffice: '', id: '' }]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [diaInicial, setDiaInicial] = useState(getDiaAtual());

  const [exclusaoSemana, setExclusaoSemana] = useState([]);

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
        exclusaoSemana: exclusaoSemana
      };

      await gerarEscalaFinal(dados, setEscalaMes);

    };

  };

  return (
    <>
      <Integracao escalaMes={escalaMes} listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

      <FiltroDatas diaInicial={diaInicial} setDiaInicial={setDiaInicial} exclusaoSemana={exclusaoSemana} setExclusaoSemana={setExclusaoSemana}  />
      
      <form className="meu-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Escala do lixo</h1>

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <button type="submit" className="submit">Gerar</button>
      </form>

      <Escala diaInicial={diaInicial} escalaMes={escalaMes} />
    </>
  );
}