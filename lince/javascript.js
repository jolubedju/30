var cols;

function loadFunc() {
    var puzzle = '<div id="slidingpuzzleContainer3x3">';
    cols=3;
    for (var i = 0; i <= 8; ++i) {
        puzzle = puzzle + '<img src="images/blank.jpg" alt="blank" width="150" height="150" />';
    }
    puzzle = puzzle + '</div>';
    showSlidingpuzzle(puzzle);
}


function changeFormat(x, y) {
    var puzzlepieces = [];
    var finalValue = x * y - 2;

    for (var i = 0; i <= finalValue; ++i) {
        puzzlepieces.push(i);
    }

    puzzlepieces.push('blank')
    createSlidingpuzzle(puzzlepieces, x, y);
}

//this function will shuffle the puzzlePieces array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function createSlidingpuzzle(puzzlepieces, x, y) {

    var puzzle = '<div id="slidingpuzzleContainer' + x + 'x' + y + '">';
    cols=x;
    puzzlepieces=shuffle(puzzlepieces);
    for (var puzzleNr = 0; puzzleNr < puzzlepieces.length; ++puzzleNr) {
        puzzle += '<img src="images/' + puzzlepieces[puzzleNr] + '.jpg" class="puzzlepiece" id="position' + puzzlepieces[puzzleNr] + '" alt="' + puzzlepieces[puzzleNr] + '" onclick="shiftPuzzlepieces(this);" width="150" height="150" />';
    }
    puzzle += '</div>';

    showSlidingpuzzle(puzzle);
}


function showSlidingpuzzle(puzzle) {
    document.getElementById('slidingpuzzleContainer').innerHTML = puzzle;
}


function shiftPuzzlepieces(el) {
    var elIndex=0;
    var child=el;
    while((child=child.previousSibling)!=null) elIndex++;
    
    //position of el is stored in elIndex
    var blankIndex=0;
    var blank = document.getElementById("positionblank");
    child=blank;
    while((child=child.previousSibling)!=null) blankIndex++;
    //position of blank is stored in blankIndex
    //Now the number of columns is needed to compare between positions of el and blank. 
    //I have stored this in global variable cols

    //Now check if el and blank are adjacent
    if((((elIndex==blankIndex-1) || (elIndex==blankIndex+1) )
       && ((Math.floor(elIndex/cols))==(Math.floor(blankIndex/cols)))
       ) || (elIndex==blankIndex+cols) || (elIndex==blankIndex-cols) ){
     var temp = el.parentNode.insertBefore(document.createElement('a'), el);
    el.parentNode.insertBefore(el, blank);
    el.parentNode.insertBefore(blank, temp);
    el.parentNode.removeChild(temp);
    }

}