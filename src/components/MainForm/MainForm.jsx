import { useState } from "react";
import "./MainForm.css";
import ListaPessoas from "../ListaPessoas/ListaPessoas";
import Escala from "../Escala/Escala";


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

  const [listaPessoas, setListaPessoas] = useState([{nome: '', homeOffice: ''}]);

  const [escalaMes, setEscalaMes] = useState([]);

  const diaAtual = new Date().toISOString().split('T')[0];
  const [ISODate, setISODate] = useState(diaAtual);

  
  const handleSubmit = function (evt) {

    evt.preventDefault();

    if (listaPessoas.length > 0) {

      const dados = {
        listaPessoas: listaPessoas,
        ISODate: ISODate
      };

      gerarEscala(JSON.stringify(dados), setEscalaMes);

    };

  };

  return (
    <>
      <form className="meu-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Escala do lixo</h1>

        <ListaPessoas listaPessoas={listaPessoas} setListaPessoas={setListaPessoas} />
        
        <input  required
                type="date" 
                className="input" 
                value={ISODate}
                min={diaAtual}
                onChange={(evt) => setISODate(evt.target.value)} />

        <button type="submit" className="submit">Enviar</button>
      </form>

      <Escala escalaMes={escalaMes} />
    </>
  );
}