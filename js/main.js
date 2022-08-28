//array of words
const words = [
  "Hello",
  "Programming",
  "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "parading",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Rust",
    "Test",
    "Playing",
];

// setting levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

//default level
let defaultLevelName = "Easy";
let defaultLevelSeconds = lvls[defaultLevelName];

//catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let lvlSecondsSpan = document.querySelector(".message .seconds");
let theword = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

//setting level name second score
lvlNameSpan.innerHTML = defaultLevelName;
lvlSecondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//disable paste event
input.onpaste = function () {
  return false;
};

//start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  //generate word function
  genWords();
};

function genWords() {
  //get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //get word index
  let wordIndex = words.indexOf(randomWord);
  //remove word from array
  words.splice(wordIndex, 1);
  //show the random word
  theword.innerHTML = randomWord;
  // empty upcoming word
  upcomingWords.innerHTML = "";
  //generate words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //call start play function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML == "0") {
      //stop timer
      clearInterval(start);
      //compare words
      if (theword.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty input field
        input.value = "";
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          //remove upcoming words
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
