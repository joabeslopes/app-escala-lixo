import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";
import FiltroDatas, {getDiaAtual} from "../FiltroDatas/FiltroDatas";

function gerarEscala(request, setEscalaMes) {

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const apiUrl = protocol + '//' + hostname + ':5000' + '/api';

  fetch(apiUrl + "/gerarEscala",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request
    }

  ).then(response => response.json()

  ).then(response => {

    if (response["escala"]) {
      setEscalaMes(response["escala"]);
    }
    else {
      alert('erro na api');
    }

  }

  ).catch(() => { alert('erro na api'); });

};


export default function MainForm() {

  const [listaPessoas, setListaPessoas] = useState([{ nome: '', homeOffice: '', id: '' }]);

  const [escalaMes, setEscalaMes] = useState([]);

  const [DiaInicial, setDiaInicial] = useState(getDiaAtual());

  const [listaExclusaoSemana, setlistaExclusaoSemana] = useState([]);

  const handleSubmit = function (evt) {

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
        DiaInicial: DiaInicial,
        listaExclusaoSemana: listaExclusaoSemana
      };

      gerarEscala(JSON.stringify(dados), setEscalaMes);

    };

  };

  return (
    <>
      <form className="meu-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Escala do lixo</h1>

        <FiltroDatas DiaInicial={DiaInicial} setDiaInicial={setDiaInicial} listaExclusaoSemana={listaExclusaoSemana} setlistaExclusaoSemana={setlistaExclusaoSemana}  />

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />

        <button type="submit" className="submit">Enviar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}