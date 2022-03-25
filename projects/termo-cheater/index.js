
var currentRow = 0;
var currentCol = 0;

var possibleGuesses = null;

var canTouch = -1;

var allLetters = "abcdefghijklmnopqrstuvwxyz";

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
	// return;
}

$(document).ready(function() {
    $(".cell").click(onClickCell);
    $(".cell").on("selectstart", false);
    $(".cell").on("mousedown", false);
    $("#guess").on("keypress", checkInputKeyPress);
    $("#guess").on('input',onInputChange);

    $(".key").click(keyTouch);

    document.addEventListener ('keydown', onKeyPress);

    refreshPossibleGuesses();
    setHelpText("");
    var row = $(".row[data-row=" + currentRow + "]")[0];
    $(row).removeClass("locked");
});

function keyTouch(e){
    hideWarningMsg();
    var key = $(e.target).attr("key-value");
    if(key=="backspace"){
        if(currentCol==0){
            showWarningMsg("sem letra para apagar");
            return;
        }
        fillLetter("",currentRow,--currentCol);
        return;
    }
    if(key=="enter"){
        if(currentCol==0){
            shakeRow(currentRow);
            return;
        }
        if(currentCol!=5){
            showWarningMsg("só palavras com 5 letras");
            return;
        }
        var typed = getWordFromRow(currentRow);
        if (words.indexOf(typed)>-1){
            setAllRowWrong(currentRow);
            currentRow++;
            currentCol=0;
            var row = $(".row[data-row=" + currentRow + "]")[0];
            $(row).removeClass("locked");
            canTouch++;
            return;
        }else{
            showWarningMsg("essa palavra não é aceita");
            return;
        }


    }
    if(currentCol==5) return;
    fillLetter(key,currentRow,currentCol++);

}

function setAllRowWrong(row){
    var row = $(".row[data-row=" + row + "] .cell").attr("place",3);
    refreshPossibleGuesses();
}

function onKeyPress(e){
    hideWarningMsg();
    if(allLetters.includes(e.key)){
        if(currentCol==5) return;
        fillLetter(e.key,currentRow,currentCol++);
        return;
    }
    if(e.key=="Enter"){
        if(currentCol==0){
            shakeRow(currentRow);
            return;
        }
        if(currentCol!=5){
            showWarningMsg("só palavras com 5 letras");
            return;
        }
        var typed = getWordFromRow(currentRow);
        if (words.indexOf(typed)>-1){
            setAllRowWrong(currentRow);
            currentRow++;
            currentCol=0;
            var row = $(".row[data-row=" + currentRow + "]")[0];
            $(row).removeClass("locked");
            canTouch++;
            return;
        }else{
            showWarningMsg("essa palavra não é aceita");
            return;
        }
    }
    if(e.key=="Backspace"){
        if(currentCol==0){
            showWarningMsg("sem letra para apagar");
            return;
        }
        fillLetter("",currentRow,--currentCol);
        return;
    }

    // console.log(e.key);

}
function fillLetter(letter,row,col){
    var row = $(".row[data-row=" + row + "]")[0];
    children = $(row).children();
    $(children[col]).html(letter.toLowerCase());
}

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
    var parent = $(this).parent();
    if(canTouch < parent.attr("data-row")){
        console.log("opa");
        return;
    }
    if(parent.hasClass("locked")) return;
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
            rightPosition(content,$(rightCells[j]).attr("index"));
        }
        
        // Células com letras na posição incorreta
        var placeCells = $(rows[i]).children(".cell[place=2]");
        for (j=0;j<placeCells.length;j++){
            var content = $(placeCells[j]).html();
            countRight = countInArray(processedRight,content);
            countPlace = countInArray(processedPlace,content);
            hasAtLeast(content, countRight+countPlace+1);
            processedPlace.push(content);
            wrongPosition(content,$(placeCells[j]).attr("index"));
        }

        // Células com letras erradas
        var placeCells = $(rows[i]).children(".cell[place=3]");
        for (j=0;j<placeCells.length;j++){
            var content = $(placeCells[j]).html();
            countRight = countInArray(processedRight,content);
            countPlace = countInArray(processedPlace,content);
            hasExactly(content, countRight+countPlace);
            processedWrong.push(content);
        }
        
    }
    refreshOutput();

}

function hasAtLeast(letter, count){
    possibleGuesses = possibleGuesses.filter(word => word.split(letter).length - 1 >= count);
}

function hasExactly(letter, count){
    possibleGuesses = possibleGuesses.filter(word => word.split(letter).length - 1 == count);
}

function rightPosition(letter, position){
    possibleGuesses = possibleGuesses.filter(word => word[position]==letter);
}

function wrongPosition(letter,position){
    possibleGuesses = possibleGuesses.filter(word =>word[position]!=letter);
}

function showWarningMsg(text){
    if($("#warning-msg").hasClass("show")){
        $("#warning-msg").removeClass("show");
    }
    $("#warning-msg").text(text);
    $("#warning-msg").addClass("show");
}

async function hideWarningMsg(){
    if($("#warning-msg").hasClass("hide")) return;

    if($("#warning-msg").hasClass("show")){
        $("#warning-msg").removeClass("show");
        await sleep(0.00001);
        $("#warning-msg").addClass("hide");
        await sleep(250);
        $("#warning-msg").removeClass("hide");

    }
}

async function shakeRow(rowN){
    var row = $(".row[data-row=" + rowN + "]")[0];
    $(row).addClass("shake");
    await sleep(750);
    $(row).removeClass("shake");

}