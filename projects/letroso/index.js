
var currentRow = 0;
var currentCol = 0;

var createdRows = 6;

var possibleGuesses = null;

var canTouch = -1;

var dicionario = [];
var allLetters = "abcdefghijklmnopqrstuvwxyz";

const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
	// return;
}

$(document).ready(async function() {
    await appStart();
    closeLoaderDiv();


    $(".cell").click(onClickCell);
    $(".cell").on("selectstart", false);
    $(".cell").on("mousedown", false);
    $("#guess").on("keypress", checkInputKeyPress);
    $("#guess").on('input',onInputChange);

    $(".key").click(keyTouch);

    document.addEventListener ('keydown', onKeyPress);

    // refreshPossibleGuesses();
    setHelpText("");
    var row = $(".row[data-row=" + currentRow + "]")[0];
    $(row).removeClass("locked");
});

async function appStart(){
    setAppStatus("Carregando dicionário...");
    dicionario = await carregarDicionario();
}

async function carregarDicionario() {
    const response = await fetch('https://raw.githubusercontent.com/fserb/pt-br/refs/heads/master/dicio');
    
    const texto = await response.text();
    const palavras = texto
      .split('\n')
      .map(p => p.trim().toLowerCase())
      .filter(p => p.length <=10);
    return palavras;
}

function setAppStatus(string){
    $("#app-status").append(string);
}

function closeLoaderDiv(){
    $(".loader-div").hide();
}

function addRowToMatrix(){
    var newRow = $('<div></div>')
        .addClass('row')
        .attr('data-row', currentRow)
        .addClass('locked');

    $("#matrix").append(newRow);
    $(".row[data-row=" + currentRow + "] .cell").click(onClickCell);
}

function keyTouch(e){
    hideWarningMsg();
    var key = $(e.target).attr("key-value");
    if(key=="backspace"){
        if(currentCol==0){
            showWarningMsg("sem letra para apagar");
            return;
        }
        delLetter(currentRow);
        return;
    }
    if(key=="enter"){
        var typed = getWordFromRow(currentRow);
        if (dicionario.indexOf(typed)>-1){
            currentRow++;
            currentCol=0;
            addRowToMatrix();
            var row = $(".row[data-row=" + currentRow + "]")[0];
            $(row).removeClass("locked");
            canTouch++;
            return;
        }else{
            showWarningMsg("essa palavra não é aceita");
            return;
        }


    }
    if(currentCol==9) return;
    addLetter(key,currentRow,currentCol++);

}

// function setAllRowWrong(row){
//     var row = $(".row[data-row=" + row + "] .cell").attr("place",3);
//     refreshPossibleGuesses();
// }

function onKeyPress(e){
    hideWarningMsg();
    if(allLetters.includes(e.key)){
        if(currentCol==9) return;
        addLetter(e.key,currentRow,currentCol++);
        return;
    }
    if(e.key=="Enter"){
        var typed = getWordFromRow(currentRow);
        if (dicionario.indexOf(typed)>-1){
            // setAllRowWrong(currentRow);
            currentRow++;
            currentCol=0;
            addRowToMatrix();
            if(currentRow==createdRows){
                addRow(createdRows++);
                showWarningMsg("linha adicionada");
                // $(".cell").click(onClickCell);
                // $(".cell").on("selectstart", false);
                // $(".cell").on("mousedown", false);
            }
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
        delLetter(currentRow);
        return;
    }


}

function addLetter(letter, row, col){
    var row = $(".row[data-row=" + row + "]")[0];
    var cell = $('<div></div>')
        .addClass('cell')
        .attr('index', col)
        .html(letter);
    $(row).append(cell);
}

function delLetter(row){
    var row = $(".row[data-row=" + row + "]")[0];
    $(row).children().last().remove();
    currentCol--;
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
    return true;
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
        return;
    }
    if(parent.hasClass("locked")){
        return;
    }
    var currentPlace = parseInt($(this).attr("place"));
    if(currentPlace==3){
        $(this).attr("place", 1);
    }else{
        $(this).attr("place", currentPlace+1);
    }
    // refreshPossibleGuesses();
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

// function refreshPossibleGuesses(){
//     possibleGuesses = dicionario;
    
//     var rows = $(".row").not(".locked");
    
//     // Analisando uma linha por vez
//     for(i=0;i<rows.length;i++){
//         var processedRight = [];
//         var processedPlace = [];
//         var processedWrong = [];
//         var word = getWordFromRow(i);

//         // Células com letras na posição correta
//         var rightCells = $(rows[i]).children(".cell[place=1]");
//         for (j=0;j<rightCells.length;j++){
//             var content = $(rightCells[j]).html();
//             processedRight.push(content);
//             rightPosition(content,$(rightCells[j]).attr("index"));
//         }
        
//         // Células com letras na posição incorreta
//         var placeCells = $(rows[i]).children(".cell[place=2]");
//         for (j=0;j<placeCells.length;j++){
//             var content = $(placeCells[j]).html();
//             countRight = countInArray(processedRight,content);
//             countPlace = countInArray(processedPlace,content);
//             hasAtLeast(content, countRight+countPlace+1);
//             processedPlace.push(content);
//             wrongPosition(content,$(placeCells[j]).attr("index"));
//         }

//         // Células com letras erradas
//         var placeCells = $(rows[i]).children(".cell[place=3]");
//         for (j=0;j<placeCells.length;j++){
//             var content = $(placeCells[j]).html();
//             countRight = countInArray(processedRight,content);
//             countPlace = countInArray(processedPlace,content);
//             hasExactly(content, countRight+countPlace);
//             processedWrong.push(content);
//         }
        
//     }
//     refreshOutput();

// }

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

function addRow(dataRow){
    var div = '<div class="row locked" data-row=' + dataRow + '><div class="cell" index=0 place=0></div><div class="cell" index=1 place=0></div><div class="cell" index=2 place=0></div><div class="cell" index=3 place=0></div><div class="cell" index=4 place=0></div></div>'

    $("#matrix").append(div);
    $(".row[data-row="+dataRow+"] .cell").click(onClickCell);
}