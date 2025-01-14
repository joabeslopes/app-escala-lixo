import onFormLoad from "./js/form";

const app = document.getElementById("app");

const form = document.createElement("div");

fetch("/html/form.html").then( 
                        response => response.text()
                    ).then( 
                        (text) => {
                            form.innerHTML = text;
                            app.appendChild(form);
                            onFormLoad();
                    }
                    );