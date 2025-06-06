import Pessoa from "../Pessoa/Pessoa";
import "./ListaPessoas.css";
import { v4 as uuidv4 } from 'uuid';

export default function ListaPessoas({listaPessoas, setListaPessoas}){

  const addPessoa = function() {
    const pessoaId = uuidv4();
    const newLista =  [...listaPessoas, 
                      { id: pessoaId, nome: '', listaSemana: [], listaMes: [] } 
                      ];
    setListaPessoas( newLista );
  }; 

  return (
    <div className="input-container">
      
      {listaPessoas.map((pessoa, index) => (

        <Pessoa 
          key={pessoa.id}
          pessoa={pessoa}
          index={index}
          listaPessoas={listaPessoas}
          setListaPessoas={setListaPessoas}
        />

      ))}
      
      <button className="submit" onClick={ addPessoa }>Add pessoa</button>
    </div>
  );

};