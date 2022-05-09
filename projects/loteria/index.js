var latest = null;

var allMegaSena = null;

$(document).ready(async function() {

    setAppStatus("Carregando todos os resultados da Mega Sena...");
    allMegaSena = await getAllFetched();
    setAppStatus(" pronto!<br>");
    
    setAppStatus("Contando numeros por sorteio...")
    contarNumerosEmSorteio();
    setAppStatus(" pronto!<br>");

    setAppStatus("Contando duplas...")
    contaDuplasSorteadas();
    setAppStatus(" pronto!<br>");

    setAppStatus("Contando triplas...")
    contaTriplasSorteadas();
    setAppStatus(" pronto!<br>");

    setAppStatus("Contando quadras...")
    contaQuadrasSorteadas();
    setAppStatus(" pronto!<br>");

    setAppStatus("Contando quinas...")
    contaQuinasSorteadas();
    setAppStatus(" pronto!<br>");

    setAppStatus("Contando senas...")
    contaSenasSorteadas();
    setAppStatus(" pronto!<br>");
    

    
});

async function loadAllMegaSena(){
    latest = await getLatest();

    for(i=latest.concurso;i>0;i--){
        console.log("\tBuscando concurto " + i + "...");
        allMegaSena[i] = await getResult(i);
        console.log("\tpronto!");
    }

}

function setAppStatus(string){
    $("#app-status").append(string);
}