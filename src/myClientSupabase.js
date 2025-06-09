import { get } from "./myClientPython";
import { createClient } from "@supabase/supabase-js";

export default class myClientSupabase{

    constructor(){
        this.supabase = null;
        this.apiInfo = null;
    }

    async load() {

        if (this.supabase === null){
            this.apiInfo = await get('/configSupabase');
            try {
                this.supabase = createClient(this.apiInfo.url, this.apiInfo.key);
            } 
            catch (error) {
                console.error(error);
            };
        };

        return this.supabase !== null;
    };

    async getSession(){
    
        if (this.supabase === null){
            return false;
        };
    
        const { 'data':sessionData, 'error':sessionE } = await this.supabase.auth.getSession();
    
        return sessionData.session !== null;
    }

    async envioEscala(escala) {
    
        if (this.supabase === null){
            return false;
        };

        const newEscala = [];
        escala.forEach( (diaEscala) => 
            diaEscala.nome.forEach( (pessoa) => { 
                newEscala.push( {dia: diaEscala.dia, nome: pessoa } );
            })
        );

        const { 'data':updateData, 'error':updateE } = await this.supabase.from(this.apiInfo.tabela_escala)
                                                                    .upsert(newEscala)
                                                                    .select();
    
        return updateData !== null;
    };
    
    async login(userData){
    
        if (this.supabase === null){
            return false;
        };
    
        const { 'data':signinData, 'error':signinE } = await this.supabase.auth.signInWithPassword({ 'email': userData.email, 'password': userData.password });
    
        if ( signinData.session === null){
            return false;
        };
    
        return true;
    };
    
    async logout(){
    
        if (this.supabase === null){
            return false;
        };
    
        const { error } = await this.supabase.auth.signOut({'scope': 'local'});
    
        return error === null;
    };
    
    async getListaPessoas() {
    
        if (this.supabase === null){
            return false;
        };
    
        const { 'data':selectData, 'error':selectE } = await this.supabase.from(this.apiInfo.tabela_pessoas)
                                                                    .select('id,nome,homeOffice');
        
        return selectData;
    };

};