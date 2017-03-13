const docReadyCallbacks = [];
let docReady = false;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

document.addEventListener("DOMContentLoaded", () => {
  docReady = true;
  docReadyCallbacks.forEach( (cb) => cb() );
  document.getElementById("word-search").addEventListener("submit", lookup);
  document.getElementById("add-word").addEventListener("submit", addWord);
  document.getElementById("add-letter").addEventListener("click", addLetter);
  document.getElementById("remove-letter").addEventListener("click", removeLetter);
  document.getElementById("empty-word-list").addEventListener("click", emptyWordList);
});

const addLetter = () => {
  let lastLetter = $l('.letter-list').children().nodes.slice(-1)[0].innerHTML;
  if (lastLetter === "Z") { return; }
  let nextLetter = ALPHABET[ALPHABET.findIndex((letter) => letter === lastLetter) + 1];
  $l('.letter-list').append(`<li>${nextLetter}</li>`);
};

const removeLetter = () => {
  $l('.letter-list').children().nodes.slice(-1)[0].remove();
};

const emptyWordList = () => {
  $l('.word-list').empty();
};

const addWord = (e) => {
  e.preventDefault();
  let newWord = $l("#new-word").nodes[0];
  $l('.word-list').append(`<li id=${newWord.value}>${newWord.value}</li>`);
  newWord.value = "";
};

const lookup = e =>   {
  e.preventDefault();
  let word = $l("#search-term").nodes[0].value;
  $l.ajax({
    method: "GET",
    url: `http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC`,
    success: displayDef,
    error: displayError
  });
};

const displayDef = def => {
  $l('#dictionary').append('<img></img>')
};

const displayError = error => {
  $l('#dictionary').append("Invalid search");
};
