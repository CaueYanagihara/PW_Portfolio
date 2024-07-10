document.addEventListener('DOMContentLoaded', ()=>{
    verificarVarTema();
    verificarVarLocalizacao();
});

function verificarVarTema(){
    const temaArmazenado = localStorage.getItem('tema');//VERIFICA A VARIAVEL LOCAL NO NAVEGADOR

    if(temaArmazenado){
        document.body.setAttribute('data-tema', temaArmazenado);//ATRIBUI O VALOR DA VARIAVEL A TAG DATA-TEMA
    }
}

function alterarTema(){ 
    const tema = document.body.getAttribute("data-tema");//VERIFICA O TEMA ATUAL
    const novoTema = tema == 'dark' ? 'light' : 'dark';//ARMAZENA O TEMA OPOSTO AO ATUAL

    document.body.setAttribute("data-tema", novoTema);//ALTERA PARA O NOVO TEMA
    
    localStorage.setItem('tema', novoTema);//SALVA UMA VARIAVEL LOCAL NO NAVEGADOR
}