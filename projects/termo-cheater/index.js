
var currentRow = 0;

var possibleGuesses = null;


$(document).ready(function() {
    $(".cell").click(onClickCell);
    $(".cell").on("selectstart", false);
    $(".cell").on("mousedown", false);
    $("#guess").on("keypress", checkInputKeyPress);
    $("#guess").on('input',onInputChange);

    refreshPossibleGuesses();
    setHelpText("");
});

function setHelpText(text){
    $("#help-text").text(text);
    if(text.length==0) $("#help-text").addClass("empty");
    else $("#help-text").removeClass("empty"); 
}

function checkInputKeyPress(e){
    
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter' && isTypedGuessValid()){
        insertGuess();
    }
}

function typedGuessSize(){
    var typed = $("#guess").val();
    return typed.length;
}

function isTypedGuessValid(){
    var typed = $("#guess").val();
    if(typed.length == 0){
        setHelpText("");
        return false;
    }
    if(typed.length == 5){
        if (words.indexOf(typed)>-1){
            setHelpText("Essa palavra está ok.")
            return true;
        }else{
            setHelpText("Essa palavra não está no nosso dicionário.");
            return false;
        }
    }
    if(typed.length > 5){
        setHelpText("Tem muita letra nessa palavra. Use somente 5 letras.");
        return false;
    }
    if(typed.length < 5){
        setHelpText("Digite um pouco mais. Somente palavras de 5 letras são aceitas.");
        return false;
    }


}

function onInputChange(e){
    if(isTypedGuessValid()){
        $("#insert-button").prop("disabled",false);
    }else{
        $("#insert-button").prop("disabled",true);
    }
    
}

function onClickCell(){
    var currentPlace = parseInt($(this).attr("place"));
    if(currentPlace==3){
        $(this).attr("place", 1);
    }else{
        $(this).attr("place", currentPlace+1);
    }
    refreshPossibleGuesses();
}

function insertGuess(){
    var guess = $("#guess").val();
    
    // if (!guessValidator(guess)) return;

    var row = $(".row[data-row=" + currentRow + "]")[0];
    $(row).removeClass("locked");

    children = $(row).children();
    for(let i=0; i<5; i++){
        $(children[i]).html(guess[i].toLowerCase());
    }
    $("#guess").val("");
    currentRow+=1;

    $('#insert-button').blur();
}

function guessValidator(guess){
    if(guess.length != 5){
        alert("Tem certeza? A palavra digitada não tem 5 letras.")
        return false;
    }
    return true;
}

function getWordFromRow(rowNumber){
    var row = $(".row[data-row=" + rowNumber + "]")[0];
    children = $(row).children();
    word = "";
    for(let i=0; i<5; i++){
        word+=$(children[i]).html();
    }
    return word;
}

function refreshPossibleGuesses(){
    possibleGuesses = words;
    var processed = "";

    /** Ordem de processamento 1: letras na posição correta */
    var rightLetters = $(".cell[place=1]");
    for(i=0;i<rightLetters.length;i++){
        var childLetter = $(rightLetters[i]).html();
        var childndex = $(rightLetters[i]).attr("index");
        processed += childLetter;
        removePossibleGuessesByRightLetter(childLetter,childndex);
    }

    /** Ordem de processamento 2: letras na posição incorreta
     * ignorando caso elas estejam na string processed
     */
    var wrongLetters = $(".cell[place=3]");
    for(i=0;i<wrongLetters.length;i++){
        var childLetter = $(wrongLetters[i]).html();
        if(processed.indexOf(childLetter)>-1) continue;
        processed += childLetter;
        removePossibleGuessesByWrongLetter(childLetter,childndex);
    }

    /** Ordem de processamento 3: letras existentes em posição incorreta */
    var placeLetters = $(".cell[place=2]");
    for(i=0;i<placeLetters.length;i++){
        var childLetter = $(placeLetters[i]).html();
        var childndex = $(placeLetters[i]).attr("index");
        if(processed.indexOf(childLetter)>-1) continue;
        processed += childLetter;
        removePossibleGuessesByPlaceLetter(childLetter,childndex);
    }

    refreshOutput();

}

function refreshOutput(){
    $("#highlight").html(possibleGuesses.length);
    $("#guesses-list").html(possibleGuesses.join(" || "));
    

}

/** Remove da lista de possíveis palpites todas
 *  as palavras que tenham determinada letra */
function removePossibleGuessesByWrongLetter(letter){
    possibleGuesses = possibleGuesses.filter(word => word.indexOf(letter)==-1);
}

/** Remove da lista de possíveis palpites todas
 *  as palavras que não tenham determinada letra em determinada posição*/
function removePossibleGuessesByRightLetter(letter,position){
    possibleGuesses = possibleGuesses.filter(word => word[position]==letter);
}

/** Remove da lista de possíveis palpites todas
 *  as palavras que não tenham determinada letra */
function removePossibleGuessesByPlaceLetter(letter, index){
    possibleGuesses = possibleGuesses.filter(word => word.indexOf(letter)>-1 && word.indexOf(letter)!=index);
}