/*
 * Javascript code for Game
 */

/*
 * All important variables and array are defined here
 */
const cardList = ["python", "php", "go", "c", "swift", "java", "javascript", "ruby"];
let gameStart = false;
let visibleCards = [];
let moves = 0;
let timePassed = 0;
let isComplete = 0;
let timerReset;
let onestar;
let twostar;
let totalPairs;
var cardPairsValue = 0;
ncardList = [];

/*
 * Common values that are needed for reset
 */
function resetValues(){
    moves = -1;
    incrementMove();
    gameStart = false;
    visibleCards = [];
    timePassed = 0;
    isComplete = 0;
    clearTimeout(timerReset);
    $("#timer").html(0);
}

/*
 * Defines the level of the Game
 */
function level(lev){
    const cardPairs = document.getElementById(lev).value;
    $('#platform').html("");
    resetValues();
    if(cardPairs == "easy"){
        cardPairsValue = 4;
        onestar = 6;
        twostar = 9;
        totalPairs = 4;
    }
    else if(cardPairs == "medium"){
        cardPairsValue = 6;
        onestar = 9;
        twostar = 12;
        totalPairs = 6;
    }
    else if(cardPairs == "hard"){
        cardPairsValue = 8;
        onestar = 14;
        twostar = 20;
        totalPairs = 8;
    }
    ncardList = shuffle(cardList).slice(0,cardPairsValue);

}

/*
 * Code to shuffle array so that random values can be shown to user 
 * Source: https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
 */
function shuffle(array) {
    return array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}

/*
 * Checks if the open cards are same or different
 */
function checkvisibleCards(){
    if (visibleCards[0][0].firstChild.className === visibleCards[1][0].firstChild.className){
        isComplete++;
        //animation if card are same
        visibleCards.forEach(function(card){
            card.animateCss('rubberBand', function(){
                card.toggleClass("open visible found");
            });
        });
    } else {
        // animation if card are different
        visibleCards.forEach(function(card){
            card.animateCss('swing', function(){
                card.toggleClass("open visible");
            });
        });
    }
    visibleCards = [];
    incrementMove();
    // if all the pairs are complete end game
    if (isComplete === totalPairs){
        endGame();
    }
}

/*
 * Timer for the game
 */
function startTimer(){
    timePassed += 1;
    $("#timer").html(timePassed);
    timerReset = setTimeout(startTimer, 600);
}

/*
 * counts the no. of moves made
 */
function incrementMove(){
    moves += 1;
    $("#moves").html(moves);
    // check the no. of moves and reduce the rating as per condition
    if (moves === onestar || moves === twostar){
        let stars = $(".fa-star");
        $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
    }
}

/*
 * what to do when card is clicked
 */
function cardClick(event){
    // check card if open or matched
    let classes = $(this).attr("class");
    if (classes.search('open') * classes.search('found') !== 1){
        // value must be -1 for both of them
        return;
    }
    // start game if already not started
    if (!gameStart) {
        gameStart = true;
        timePassed = 0;
        timerReset = setTimeout(startTimer, 600);
    }
    if (visibleCards.length < 2){
        $(this).toggleClass("open visible");
        visibleCards.push($(this));
    }
    // check if cards match using above defined function
    if (visibleCards.length === 2){
        checkvisibleCards();
    }
}

/*
 * Create array of all the cards that are to be shown to user
 */
function createList(cardName){
    $("ul.platform").append(`<li class="card"><i class="devicon-${cardName}-plain"></i></li>`);
}

/*
 * Populate the Dom with data to be displayed
 */
function fillDom(){
    $("ul.platform").html("");
    shuffle(ncardList.concat(ncardList)).forEach(createList);
}

/*
 * resets the game when button is clicked
 */
function resetGame(){
    $("ul.platform").html("");
    resetValues();
    initGame();
}

/*
 * runs when game has been won
 */
function endGame(){
    // stop timer
    clearTimeout(timerReset);
    // show dialog box with data
    // Source : https://sweetalert.js.org/
    let stars = $(".fa-star").length;
    swal(" Congratulation! ",`Time: ${timePassed} Stars: ${stars}`, {
        buttons: "Play Again",
      }).then(resetGame());
}

/*
 * Create the stars
 */
function createStars(){
    $('.stars').html('');
    for (let i=0; i<3; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

// init game
function initGame(){
    fillDom();
    createStars();
    $(".card").click(cardClick);
}


// load animateCss
// taken from https://github.com/daneden/animate.css/#usage
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});
