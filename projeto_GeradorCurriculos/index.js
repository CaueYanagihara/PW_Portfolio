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

function verificarVarLocalizacao() {
    const localizacaoArmazenada = localStorage.getItem('localizacao');

    if (localizacaoArmazenada) {
        document.getElementById("localizacao").value = localizacaoArmazenada;
    } else{
        buscarLocalizacao();
    }
}

function buscarLocalizacao() {
    if(navigator.geolocation) {//PERGUNTA SE O USUARIO PERMITE OU NAO
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.latitude;
            const long = position.longitude;

            fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)//API QUE INFORMA O ENDERECO PELA LAT E LONG
                .then(response => response.json())
                .then(data => {
                    const localizacao = data.region || data.city || `${lat},${long}`;

                    document.getElementById("localizacao").value = localizacao;
                    localStorage.setItem('localizacao', localizacao);

                }).catch(error => { console.error("Algo deu errado!", error); });
        });
    }
}

function gerarCurriculo(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const localizacao = document.getElementById("localizacao").value;
    const experiencia = document.getElementById("experiencia").value;
    const habilidades = document.getElementById("habilidades").value;

    const curriculo = {nome, email, telefone, localizacao, experiencia, habilidades};
    localStorage.setItem("curriculo", JSON.stringify(curriculo));

    apresentarCurriculo(curriculo);
}

function apresentarCurriculo(data){
    const template = document.getElementById("templateCurriculo").content.cloneNode(true);
    template.querySelector(".nome").textContent = data.nome;
    template.querySelector(".email").textContent = data.email;
    template.querySelector(".telefone").textContent = data.telefone;
    template.querySelector(".localizacao").textContent = data.localizacao;
    template.querySelector(".experiencia").textContent = data.experiencia;
    template.querySelector(".habilidades").textContent = data.habilidades;
    
    const mostrarCurriculo = document.getElementById("mostrarCurriculo");
    mostrarCurriculo.innerHTML='';
    mostrarCurriculo.appendChild(template);
  }

function copiar(){
    const curriculo = document.getElementById("mostrarCurriculo").textContent;
    navigator.clipboard.writeText(curriculo).then(()=>{
        alert("Conteudo copiado!");
    }).catch(error=>{
        console.error("Erro ao copiar", error);
        alert("Erro ao copiar.");
    });
}