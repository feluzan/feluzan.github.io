var currentCorrect = -1;
var selectedOption = -1;

$(document).ready(function() {

    sortAndShowQuestion();


});

function enableButton(enable=true){
    console.log(enable);
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
    console.log(optionID);
    $(".option.selected").removeClass("selected");
    $(".option[optionID="+optionID+"]").addClass("selected");
    enableButton(!(optionID==-1));
}

function fillQuestionWrapper(question){
    enableButton(false);
    selectOption(-1);
    $("#question-text").text(question.text);
    currentCorrect = parseInt(Math.random()*10)%4;
    for(i=1,y=0;i<5;i++){
        if (i==currentCorrect){
            $(".option[optionID="+i+"]").text(question.correctAnswer);
            continue;
        }
        $(".option[optionID="+i+"]").text(question.wrongAnswers[y++]);

    }
}

function sortAndShowQuestion(){
    var sorteado = parseInt(Math.random()*100)%perguntasNovas.length;

    var question = perguntasNovas.splice(sorteado,1)[0];
    fillQuestionWrapper(question);
}

function enviarResposta(){

    console.log("resposta enviada...");
    if(currentCorrect==selectedOption) pontuacao+=1;
    sortAndShowQuestion();
}