var latest = 0;
var latestSpecific = 0;
var allMegaSena = null;

$(document).ready(async function() {

    await appStart();
    closeLoaderDiv();
    showMore();
    fillMoreAndLess();
    rankingContentGenerator(numeros, "ranking-numeros");
    rankingContentGenerator(duplas, "ranking-duplas");
        
});

async function appStart(){
    setAppStatus("Aguarde um instante enquanto os resultados da Mega-Sena são carregados.");
    
    console.log(Date.now(),"Buscando resultados...")
    allMegaSena = await getAllFetched();
    console.log(Date.now(),"Pronto!")

    console.log(Date.now(),"Contando numeros por sorteio...")
    contarNumerosEmSorteio();
    console.log(Date.now(),"Pronto!");

    console.log(Date.now(),"Contando duplas...")
    contaDuplasSorteadas();
    console.log(Date.now(),"Pronto!");

    console.log(Date.now(),"Contando triplas...")
    contaTriplasSorteadas();
    console.log(Date.now(),"Pronto!");

    console.log(Date.now(),"Contando quadras...")
    contaQuadrasSorteadas();
    console.log(Date.now(),"Pronto!");

    console.log(Date.now(),"Contando quinas...")
    contaQuinasSorteadas();
    console.log(Date.now(),"Pronto!");

    console.log(Date.now(),"Contando senas...")
    contaSenasSorteadas();
    console.log(Date.now(),"Pronto!");

    
}

function setAppStatus(string){
    $("#app-status").append(string);
}

function closeLoaderDiv(){
    $(".loader-div").hide();
}

function expandMore(element, auto=false){
    $(element).next().toggleClass("expanded");
    if(auto) $(element).next().toggleClass("auto");
}

function cardGenerator(info){
    var concurso = info["concurso"];
    var numeros = info["dezenas"];
    var data = info["data"];
    var sena = info["premiacoes"][0];
    var quina = info["premiacoes"][1];
    var quadra = info["premiacoes"][2];
    var acumulado = info["valorAcumuladoProximoConcurso"];

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
    ret = ret + '<div class="info-value">' + sena["ganhadores"] + ' (' + sena["valorPremio"] + ')</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Acertos da Quina</div>';
    ret = ret + '<div class="info-value">' + quina["ganhadores"] + ' (' + quina["valorPremio"] + ')</div>';
    ret = ret + '</div>';
    ret = ret + '<div class="info-wrapper">';
    ret = ret + '<div class="info-title">Acertos da Quadra</div>';
    ret = ret + '<div class="info-value">' + quadra["ganhadores"] + ' (' + quadra["valorPremio"] + ')</div>';
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

function rankingContentGenerator(array, elementId){
    var order = vezesSorteado(array);
    var ret = '';
    for(var i = 0; i < order.length; i++){
        var numeros = order[i][0].split(';');
        ret = ret + '<div class="info-row">';
        for(var j=0;j<numeros.length;j++){
            ret = ret + '<div class="number-item">' + numeros[j] + '</div>';
        }
        ret = ret + '<div class="number-text">' + order[i][1] + '</div>';
        ret = ret + '</div>';
    }
    $("#"+elementId).append(ret);

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


function fillDetails(numero){
    $("#tabela-numeros .item").removeClass("selected");
    $("#tabela-numero-" + numero).addClass("selected");
    $("#detalhe-numero").addClass("expanded");
    var item = numeros[parseInt(numero)];
    $("#vezes-sorteado").text(item.length)
    $("#number-latests-row").text("");
    for(i=0;i<item.length;i++){
        $("#number-latests-row").append(cardGenerator(item[i]));
    }
}