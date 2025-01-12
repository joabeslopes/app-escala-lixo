export function myCreateElement(name, attributes){
    const myelement = document.createElement(name);

    for (let key in attributes){
        myelement.setAttribute(key, attributes[key]);
    };

    return myelement;

}

export function myLoad(element, link) {

    fetch(link).then( 
        response => response.text()
    ).then( 
        (text) => {
            element.innerHTML = text;
    }
    );

}