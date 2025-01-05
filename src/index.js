import { onFormLoad } from "./js/form";


$("#app").ready( function() {

    $("#app").load('/html/form.html', onFormLoad);
});