import Pessoa from "../Pessoa/Pessoa";
import "./ListaPessoas.css";
import PessoaObj from "../../pessoaObj";

export default function ListaPessoas({listaPessoas, setListaPessoas}){

  const addPessoa = function() {
    const newLista =  [...listaPessoas, 
                      new PessoaObj()
                      ];
    setListaPessoas( newLista );
  }; 

  return (
    <div className="internal-container">
      
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