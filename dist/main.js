(()=>{"use strict";function e(e,t){const n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n}function t(t){const o=e("input",{type:"text",name:"nome",class:"input",placeholder:"Nome"}),a=e("span",{class:"remove"});a.innerText="X";const c=e("select",{class:"input",name:"homeOffice"}),l=e("div",{class:"separator"}),s=e("div",{name:"pessoaDiv"});var i;a.onclick=n,i=c,fetch("/html/dias-home.html").then((e=>e.text())).then((e=>{i.innerHTML=e})),s.appendChild(o),s.appendChild(a),s.appendChild(c),s.appendChild(l),document.getElementById(t).appendChild(s)}function n(e){e.srcElement.parentNode.remove()}const o=new Date;function a(e){const t=function(){let e=[];const t=document.getElementById("listaPessoas").children;for(let n=0;n<t.length;n++){const o=t[n];let a=o.querySelector('input[name="nome"]').value;a=a.trim();let c=o.querySelector('select[name="homeOffice"]').value;if(0==a.length||0==c.length)return[];{const t={nome:a,homeOffice:c};e.push(t)}}return e}();if(0==t.length)return alert("Preencher informação completa"),!1;const n={listaPessoas:t,ISODate:document.querySelector("#dateSelector input").value},o=JSON.stringify(n);fetch("/api/gerarEscala",{method:"POST",headers:{"Content-Type":"application/json"},body:o}).then((e=>e.json())).then(c).catch((function(){alert("erro na api")}))}function c(t){const n=document.getElementById("escalaMes");n&&n.remove();const o=t.escala,a=e("p",{class:"output"});let c="";const l=e("div",{class:"output-container",id:"escalaMes"});o.forEach((e=>{e.forEach((e=>{c+=e.dia+" - "+e.nome+"\n"})),c+="\n"})),a.innerText=c,l.appendChild(a),document.getElementById("app").appendChild(l)}const l=document.getElementById("app"),s=document.createElement("div");fetch("/html/form.html").then((e=>e.text())).then((n=>{s.innerHTML=n,l.appendChild(s),t("listaPessoas"),function(){const t=o.toISOString().split("T")[0],n=e("input",{type:"date",class:"input",min:t,value:t});document.getElementById("dateSelector").appendChild(n)}(),document.getElementById("addPessoa").onclick=e=>{t("listaPessoas")},document.getElementById("enviar").onclick=a}))})();
//# sourceMappingURL=main.js.map