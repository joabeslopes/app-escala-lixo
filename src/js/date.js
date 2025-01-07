const dataAtual = new Date();

const addInputDate = function(tagDate){

    const stringDataAtual = dataAtual.toISOString().split('T')[0];

    const divDate = $("<input>", {type: "date", class: "input", min: stringDataAtual, value: stringDataAtual});

    $(tagDate).append(divDate);

};

const getInputDate = function(tagDate){

    return $(tagDate).children('input').val();

};

export { getInputDate, addInputDate };