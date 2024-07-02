async function consultarRepositorios() {
    const nomeUsuario = document.getElementById("inputNomeUsuario").value;

    const listaRepositorios = document.getElementById("listaRepositorios");
    listaRepositorios.innerText = '';

    const status = document.getElementById("status");

    if (!nomeUsuario) {
        alert("Obrigatorio informar nome do usuario!");
        return;
    }

    const url = `https://api.github.com/users/${nomeUsuario}/repos`;

    status.innerText="Carregando...";
    try {
        const resposta = await fetch(url); //AGUARDA A RESPOSTA PARA DEPOIS EXECUTAR O RESTO DO CODIGO
        //resposta.then(res=>{console.log(res)});       //-----EXECUTA O RESTO DO CODIGO ENQUANTO AGUARDA O FETCH ATRIBUIR UM VALOR A VARIAVEL.

        if(!resposta.ok){
            alert("Erro ao realizar a consulta.");
            return;
        }

        const repositorios = await resposta.json();

        repositorios.forEach(element => {
            const itemLista = document.createElement('li');
            itemLista.textContent = element.name;
            listaRepositorios.appendChild(itemLista);
        });

        status.innerText = "";
    } catch (error) {
    }
}