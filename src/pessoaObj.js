import { v4 as uuidv4 } from 'uuid';

export default class PessoaObj {
    constructor (id) {
        if (!id){
            this.id = uuidv4();
        } else {
            this.id = id;
        }
        this.nome = "";
        this.listaMes = [];
        this.listaSemana = [];
    };
}