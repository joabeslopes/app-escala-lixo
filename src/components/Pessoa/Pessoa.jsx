import PropTypes from 'prop-types';
import "./Pessoa.css";

export default function Pessoa({pessoa, index, listaPessoas, setListaPessoas}) {

    const handleChange = function(evt, index) {
        const newLista = [...listaPessoas];
        newLista[index][evt.target.name] = evt.target.value;
        setListaPessoas(newLista);
    };

    const handleDelete = function(index) {
        const newLista = [...listaPessoas];
        newLista.splice(index,1);
        setListaPessoas(newLista);
    };

    return (
        <>
        <input
            required
            type="text"
            className="input"
            placeholder="Nome"
            name="nome"
            value={pessoa.nome} 
            onChange={(evt) => handleChange(evt, index)}
        />

        <span className="remove" onClick={() => handleDelete(index)}>X</span>

        <select
            required
            className="input"
            value={pessoa.homeOffice} 
            name="homeOffice"
            onChange={(evt) => handleChange(evt, index)} 
        >
            <option value="">Dia home office</option>
            <option value="segunda">Segunda</option>
            <option value="terça">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="nenhum">Nenhum</option>
        </select>

        <div className='separator' />

        </>
    );

}


Pessoa.propTypes = {
    pessoa: PropTypes.exact( {
        nome: PropTypes.string,
        homeOffice: PropTypes.string,
        id: PropTypes.string
    } ),
    index: PropTypes.number,
    listaPessoas: PropTypes.array , 
    setListaPessoas: PropTypes.func
};