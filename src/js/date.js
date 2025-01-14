import {myCreateElement} from "./default";

const dataAtual = new Date();

export function addInputDate(tagDate){

    const stringDataAtual = dataAtual.toISOString().split('T')[0];

    const dateAttributes = {type: "date", class: "input", min: stringDataAtual, value: stringDataAtual};

    const divDate = myCreateElement("input", {type: "date", class: "input", min: stringDataAtual, value: stringDataAtual});

    document.getElementById(tagDate).appendChild(divDate);

};

export function getInputDate(tagDate){

    return document.querySelector(tagDate + " input").value;

};