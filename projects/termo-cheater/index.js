
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
    var typed = $("#guess").val().toLowerCase();
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
    setHelpText("");
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

function refreshOutput(){
    $("#highlight").html(possibleGuesses.length);
    $("#guesses-list").html(possibleGuesses.join(" || "));
    

}

function countInArray(array, value){
    occurrences = array.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    var count = occurrences[value];
    if(count) return count;
    return 0;
}


function refreshPossibleGuesses(){
    possibleGuesses = words;
    
    var rows = $(".row").not(".locked");
    
    // Analisando uma linha por vez
    for(i=0;i<rows.length;i++){
        var processedRight = [];
        var processedPlace = [];
        var processedWrong = [];
        var word = getWordFromRow(i);

        // Células com letras na posição correta
        var rightCells = $(rows[i]).children(".cell[place=1]");
        for (j=0;j<rightCells.length;j++){
            var content = $(rightCells[j]).html();
            processedRight.push(content);
            removePossibleGuessesByRightLetter(content,$(rightCells[j]).attr("index"));
        }
        
        // Células com letras na posição incorreta
        var placeCells = $(rows[i]).children(".cell[place=2]");
        for (j=0;j<placeCells.length;j++){
            var content = $(placeCells[j]).html();
            countRight = countInArray(processedRight,content);
            countPlace = countInArray(processedPlace,content);
            removePossibleGuessesByCountingLetters(content, countRight+countPlace+1, true);
            processedPlace.push(content);
            removePossibleGuessesByPlaceLetter(content,$(placeCells[j]).attr("index"));
        }

        // Células com letras erradas
        var placeCells = $(rows[i]).children(".cell[place=3]");
        for (j=0;j<placeCells.length;j++){
            var content = $(placeCells[j]).html();
            countRight = countInArray(processedRight,content);
            countPlace = countInArray(processedPlace,content);
            removePossibleGuessesByCountingLetters(content, countRight+countPlace+1, false);
            processedWrong.push(content);
            removePossibleGuessesByWrongLetter(content,$(placeCells[j]).attr("index"));
        }
        
    }
    refreshOutput();

}

/** Remove da lista de possíveis palpites todas
 *  as palavras que tenham determinada letra */
function removePossibleGuessesByWrongLetter(letter, index){
    possibleGuesses = possibleGuesses.filter(word =>word[index]!=letter);
}

/** Remove da lista de possíveis palpites todas
 *  as palavras que não tenham determinada letra em determinada posição*/
function removePossibleGuessesByRightLetter(letter,position){
    possibleGuesses = possibleGuesses.filter(word => word[position]==letter);
}

/** Remove da lista de possíveis palpites todas
 *  as palavras que não tenham determinada letra */
function removePossibleGuessesByPlaceLetter(letter, index){
    possibleGuesses = possibleGuesses.filter(word => word.indexOf(letter)>-1 && word[index]!=letter);
}

function removePossibleGuessesByCountingLetters(letter, count, atLeast = true){
    if (atLeast){
        possibleGuesses = possibleGuesses.filter(word => word.split(letter).length -1 >= count);
    }else{
        possibleGuesses = possibleGuesses.filter(word => word.split(letter).length - 1 == count);
    }

}