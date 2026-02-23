export default function Estrategia({estrategia, setEstrategia}){

    return <div className="internal-container">
        <h1 className="title">Estrategia da escala</h1>
        <select
        name="estrategia"
        className="input"
        value={estrategia}
        onChange={(evt) => setEstrategia(evt.target.value)}
        >
            <option value="0">Dias simples</option>
            <option value="1">Dias alternados</option>
        </select>
    </div>
};