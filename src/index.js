import { MyForm } from "./js/MyForm";

const app = document.getElementById("app");

const formdiv = document.createElement("div");

fetch("/html/form.html").then( 
                        response => response.text()
                    ).then( 
                        (text) => {
                            formdiv.innerHTML = text;
                            app.appendChild(formdiv);
                            new MyForm();
                    }
                    );