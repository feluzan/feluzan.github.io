var currentCorrect = -1;
var selectedOption = -1;

var pontoAcerto = 1;
var pontoErro = 0;
var respondidas = 0;

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
	// return;
}

$(document).ready(function() {

    // iniciaJogo();

});

function enableButton(enable=true){
    
    if(enable){
        $("#botao-responder").removeClass("disabled");
        $("#botao-responder").prop("disabled",false);
    }else{
        $("#botao-responder").addClass("disabled");
        $("#botao-responder").prop("disabled",true);
    }
}

function selectOption(optionID){
    selectedOption = optionID;
    
    $(".option.selected").removeClass("selected");
    $(".option[optionID="+optionID+"]").addClass("selected");
    enableButton(!(optionID==-1));
}

function fillQuestionWrapper(question){
    enableButton(false);
    selectOption(-1);
    $("#question-text").text(question.text);
    currentCorrect = parseInt(Math.random()*10)%4 + 1;
    for(i=1,y=0;i<=4;i++){
        if (i==currentCorrect){
            $(".option[optionID="+i+"]").text(question.correctAnswer);
            continue;
        }
        $(".option[optionID="+i+"]").text(question.wrongAnswers[y++]);

    }
}

function sortAndShowQuestion(){
    if(perguntasNovas.length==0){
        finalizaJogo();
        return;
    }
    var sorteado = parseInt(Math.random()*100)%perguntasNovas.length;

    var question = perguntasNovas.splice(sorteado,1)[0];
    fillQuestionWrapper(question);
}

function enviarResposta(){

    respondidas+=1;
    if(currentCorrect==selectedOption) pontuacao=pontuacao+pontoAcerto;
    else pontuacao=pontuacao+pontoErro;
    sortAndShowQuestion();
}

async function startTimer(init){
    
    for(clockTime=init;clockTime>=0;clockTime--){
        $("#clock").text(clockTime);
        await sleep(1000);
    }
    finalizaJogo();
}

function finalizaJogo(){
    $("#header").addClass("hide-block");
    $("#game").addClass("hide-block");
    $("#finish").removeClass("hide-block");
    $("#pontos").text(pontuacao);
    $("#nQuestoes").text(respondidas);
}

function iniciaJogo(){
    $("#welcome").addClass("hide-block");
    $("#game").removeClass("hide-block");
    sortAndShowQuestion();
    startTimer(120);
}