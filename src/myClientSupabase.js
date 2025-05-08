import { get } from "./myClientPython";
import { createClient } from "@supabase/supabase-js";

var supabase, apiInfo;

async function loadSupabase() {

    if (typeof supabase === 'undefined'){
        apiInfo = await get('/configSupabase');
        try {
            supabase = createClient(apiInfo.url, apiInfo.key);
        } 
        catch (error) {
            console.error(error);
        };
    };
};

export async function envioEscala(escala) {

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return false;
    };

    const { 'data':updateData, 'error':updateE } = await supabase.from(apiInfo.tabela_escala)
                                                                .upsert(escala)
                                                                .select();

    return updateData !== null;
};

export async function login(userData){

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return false;
    };

    const { 'data':signinData, 'error':signinE } = await supabase.auth.signInWithPassword({ 'email': userData.email, 'password': userData.password });

    if ( signinData.session === null){
        return false;
    };

    return true;
};


export async function logout(){

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return false;
    };

    const { error } = await supabase.auth.signOut({'scope': 'local'});

    return error === null;
};

export async function isLogged(){

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return false;
    };

    const { 'data':sessionData, 'error':sessionE } = await supabase.auth.getSession();

    return sessionData.session !== null;
}

export async function getListaPessoas() {

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return null;
    };

    const { 'data':selectData, 'error':selectE } = await supabase.from(apiInfo.tabela_duplas)
                                                                .select('id,nome,homeOffice');
    
    return selectData;
};