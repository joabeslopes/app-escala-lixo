import {myCreateElement} from "./default";

export class MyDate {

    constructor(tagDate){

        this.tagDate = tagDate;
        this.dataAtual = new Date();

        this.addInputDate();

    }

    addInputDate(){

        const stringDataAtual = this.dataAtual.toISOString().split('T')[0];
    
        const dateAttributes = {type: "date", class: "input", min: stringDataAtual, value: stringDataAtual};
    
        const divDate = myCreateElement("input", {type: "date", class: "input", min: stringDataAtual, value: stringDataAtual});
    
        document.getElementById(this.tagDate).appendChild(divDate);
    
    };

    getInputDate(){

        return document.querySelector('#' + this.tagDate + ' input').value;
    
    };

}