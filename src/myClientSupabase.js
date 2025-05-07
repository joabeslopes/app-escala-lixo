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

export async function envioIntegracao (request) {

    await loadSupabase();

    if (typeof supabase === 'undefined'){
        return false;
    };

    const { 'data':signinData, 'error':signinE } = await supabase.auth.signInWithPassword({ 'email': request.email, 'password': request.password });

    if ( signinData.session === null){
        return false;
    };

    const { 'data':updateData, 'error':updateE } = await supabase.from(apiInfo.tabela_escala)
                                                                .upsert(request.escala)
                                                                .select();
    supabase.auth.signOut();

    return updateData !== null;
};