(()=>{"use strict";const e=function(e){const a=$("<input>",{type:"text",name:"nome",class:"input",placeholder:"Nome"}),s=$("<span>",{class:"remove"}).text("X"),n=$("<select>",{class:"input",name:"homeOffice"}),c=$("<div>",{class:"separator"}),o=$("<div>",{name:"pessoaDiv"});$(s).click(t),$(n).load("/html/dias-home.html"),$(o).append(a),$(o).append(s),$(o).append(n),$(o).append(c.clone()),$(e.data.tagListaPessoas).append(o)},t=function(e){$(this).parent().remove()},a=new Date,s=function(e){const t=function(){let e=[];return $("#listaPessoas").children().each((function(){let t=$(this).children('input[name="nome"]').val();t=t.trim();let a=$(this).children('select[name="homeOffice"]').val();if(0==t.length||0==a.length)return e=[],!1;{const s={nome:t,homeOffice:a};e.push(s)}})),e}();if(0==t.length)return alert("Preencher informação completa"),!1;const a={listaPessoas:t,ISODate:$("#dateSelector").children("input").val()},s=JSON.stringify(a);$.ajax({type:"POST",url:"/api/gerarEscala",data:s,contentType:"application/json",success:n,error:function(){alert("erro na api")}})},n=function(e){$("#escalaMes").remove();const t=e.escala,a=$("<p>",{class:"output"});let s="";const n=$("<div>",{class:"output-container",id:"escalaMes"});t.forEach((e=>{e.forEach((e=>{let t=Object.keys(e)[0];s+=t+" - "+e[t]+"<br>"})),s+="<br>"})),$(a).html(s),$(n).html(a),$("#app").append(n)},c=function(){e({data:{tagListaPessoas:"#listaPessoas"}}),function(){const e=a.toISOString().split("T")[0],t=$("<input>",{type:"date",class:"input",min:e,value:e});$("#dateSelector").append(t)}(),$("#addPessoa").click({tagListaPessoas:"#listaPessoas"},e),$("#enviar").click(s)};$("#app").ready((function(){$("#app").load("/html/form.html",c)}))})();
//# sourceMappingURL=main.js.map