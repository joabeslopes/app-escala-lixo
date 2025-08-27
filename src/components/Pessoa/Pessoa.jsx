import "./Pessoa.css";
import FiltroDatas from "../FiltroDatas/FiltroDatas";

export default function Pessoa({pessoa, index, listaPessoas, setListaPessoas, diasOptions}) {

    const handleChange = function(evt, index) {
        const newLista = [...listaPessoas];
        newLista[index][evt.target.name] = evt.target.value;
        setListaPessoas(newLista);
    };

    const changeDiasMes = function(lista) {
        const newLista = [...listaPessoas];
        newLista[index].listaMes = lista;
        setListaPessoas(newLista);
    };

    const changeDiasSemana = function(lista) {
        const newLista = [...listaPessoas];
        newLista[index].listaSemana = lista;
        setListaPessoas(newLista);
    };

    const handleDelete = function(index) {
        const newLista = [...listaPessoas];
        newLista.splice(index,1);
        setListaPessoas(newLista);
    };

    return (
        <>
        <div className="nomePessoa">
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
        </div>

        <FiltroDatas listaDiasMes={pessoa.listaMes} setListaDiasMes={changeDiasMes} listaDiasSemana={pessoa.listaSemana} setListaDiasSemana={changeDiasSemana} diasOptions={diasOptions} />

        <div className='separator' />

        </>
    );

};