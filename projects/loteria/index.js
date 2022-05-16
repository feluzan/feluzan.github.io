var latest = 0;
var latestSpecific = 0;
var allMegaSena = null;

$(document).ready(async function() {

    await appStart();
    closeLoaderDiv();
    showMore();
    fillMoreAndLess();
        
});

async function appStart(){
    setAppStatus("Aguarde um instante enquanto os resultados da Mega-Sena são carregados.");
    
    console.log("Buscando resultados...")
    allMegaSena = await getAllFetched();
    console.log("Pronto!")

    console.log("Contando numeros por sorteio...")
    contarNumerosEmSorteio();
    console.log("Pronto!");

    console.log("Contando duplas...")
    contaDuplasSorteadas();
    console.log("Pronto!");

    console.log("Contando triplas...")
    contaTriplasSorteadas();
    console.log("Pronto!");

    console.log("Contando quadras...")
    contaQuadrasSorteadas();
    console.log("Pronto!");

    console.log("Contando quinas...")
    contaQuinasSorteadas();
    console.log("Pronto!");

    console.log("Contando senas...")
    contaSenasSorteadas();
    console.log("Pronto!");

    
}

function setAppStatus(string){
    $("#app-status").append(string);
}

function closeLoaderDiv(){
    $(".loader-div").hide();
}

function expandMore(element){
    $(element).next().toggleClass("expanded");
}

function cardGenerator(info){
    var concurso = info["concurso"];
    var numeros = info["dezenas"];
    var data = info["data"];
    var sena = info["premiacoes"][0];
    var quina = info["premiacoes"][1];
    var quadra = info["premiacoes"][2];
    var acumulado = info["acumuladaProxConcurso"];

    var ret = '<div class="main-card">';
    ret = ret + '<div class="card-header">';
    ret = ret + 'Concurso <span id="numero-concurso">' + concurso + '</span>';
    ret = ret + '</div>';
    ret = ret + '<div class="numbers">';
    ret = ret + '<div class="number-item">' + numeros[0] + '</div>';
    ret = ret + '<div class="number-item">' + numeros[1] + '</div>';
    ret = ret + '<div class="number-item">' + numeros[2] + '</div>';
    ret = ret + '<div class="number-item">' + numeros[3] + '</div>';
    ret = ret + '<div class="number-item">' + numeros[4] + '</div>';
    ret = ret + '<div class="number-item">' + numeros[5] + '</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="expand-button" onclick="expandMore(this)"> mais infos</div>';
    ret = ret + '<div class="more">';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Data do sorteio</div>';
    ret = ret + '<div class="info-value">' + data + '</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Acertos da Sena</div>';
    ret = ret + '<div class="info-value">' + sena["vencedores"] + ' (' + sena["premio"] + ')</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Acertos da Quina</div>';
    ret = ret + '<div class="info-value">' + quina["vencedores"] + ' (' + quina["premio"] + ')</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Acertos da Quadra</div>';
    ret = ret + '<div class="info-value">' + quadra["vencedores"] + ' (' + quadra["premio"] + ')</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Próxima Premiação</div>';
    ret = ret + '<div class="info-value">' + acumulado + '</div>';
    ret = ret + '</div>';
    ret = ret + '</div>';
    ret = ret + '';
    ret = ret + '</div>';

    return ret;

}

function showMore(n=4){
    for(i=0;i<n;i++){
        showNext();
    }
}

function showNext(){
    $("#latests-row").append(cardGenerator(allMegaSena[latest++]))
}

function fillMoreAndLess(){
    var order = vezesSorteado(numeros);
    $("#mais-sorteado").append(order[0][0]+ " ("+ order[0][1] + " vezes)")
    $("#menos-sorteado").append(order[59][0]+ " ("+ order[59][1] + " vezes)")
}

function toggleSelection(obj){
    $(obj).toggleClass("selected");
}
function fillDetails(numero){
    $("#tabela-numeros .item").removeClass("selected");
    $("#tabela-numero-" + numero).addClass("selected");
    $("#detalhe-numero").addClass("expanded");
    var item = numeros[parseInt(numero)];
    console.log(item, item.length);
    $("#vezes-sorteado").text(item.length)
    $("#number-latests-row").text("");
    for(i=0;i<item.length;i++){
        $("#number-latests-row").append(cardGenerator(item[i]));
    }
}