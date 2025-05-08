import { get } from "./myClientPython";
import { createClient } from "@supabase/supabase-js";

export default class myClientSupabase{

    constructor(){
        this.supabase;
        this.apiInfo;
    }

    async load() {

        if (typeof this.supabase === 'undefined'){
            this.apiInfo = await get('/configSupabase');
            try {
                this.supabase = createClient(this.apiInfo.url, this.apiInfo.key);
            } 
            catch (error) {
                console.error(error);
            };
        };

        return typeof this.supabase !== 'undefined';
    };

    async getSession(){
    
        if (typeof this.supabase === 'undefined'){
            return false;
        };
    
        const { 'data':sessionData, 'error':sessionE } = await this.supabase.auth.getSession();
    
        return sessionData.session !== null;
    }

    async envioEscala(escala) {
    
        if (typeof this.supabase === 'undefined'){
            return false;
        };
    
        const { 'data':updateData, 'error':updateE } = await this.supabase.from(this.apiInfo.tabela_escala)
                                                                    .upsert(escala)
                                                                    .select();
    
        return updateData !== null;
    };
    
    async login(userData){
    
        if (typeof this.supabase === 'undefined'){
            return false;
        };
    
        const { 'data':signinData, 'error':signinE } = await this.supabase.auth.signInWithPassword({ 'email': userData.email, 'password': userData.password });
    
        if ( signinData.session === null){
            return false;
        };
    
        return true;
    };
    
    async logout(){
    
        if (typeof this.supabase === 'undefined'){
            return false;
        };
    
        const { error } = await this.supabase.auth.signOut({'scope': 'local'});
    
        return error === null;
    };
    
    async getListaPessoas() {
    
        if (typeof this.supabase === 'undefined'){
            return null;
        };
    
        const { 'data':selectData, 'error':selectE } = await this.supabase.from(this.apiInfo.tabela_pessoas)
                                                                    .select('id,nome,homeOffice');
        
        return selectData;
    };

};