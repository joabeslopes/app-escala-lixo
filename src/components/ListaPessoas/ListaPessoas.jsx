import PropTypes from 'prop-types';
import Pessoa from "../Pessoa/Pessoa";
import "./ListaPessoas.css";

export default function ListaPessoas({listaPessoas, setListaPessoas}){

  const addPessoa = function() {
    const newLista = [...listaPessoas, {nome: "", homeOffice: ""} ];
    setListaPessoas( newLista );
  }; 

  return (
    <div className="input-container">
      
      {listaPessoas.map((pessoa, index) => (

        <Pessoa 
          key={index}
          pessoa={pessoa}
          index={index}
          listaPessoas={listaPessoas}
          setListaPessoas={setListaPessoas}
        />

      ))}
      
      <button className="submit" onClick={ addPessoa }>Add pessoa</button>
    </div>
  );

}

ListaPessoas.propTypes = {
    listaPessoas: PropTypes.array ,
    setListaPessoas: PropTypes.func
};