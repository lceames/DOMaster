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
  let lastLetterEl = $l('.letter-list').children().nodes.slice(-1)[0];

  if (!lastLetterEl) {
    $l('.letter-list').append(`<li>A</li>`);
    return;
  }
  else if (lastLetterEl.innerHTML === "M") { return; }

  let lastIndex = ALPHABET.findIndex((letter) => letter === lastLetterEl.innerHTML);

  $l('.letter-list').append(`<li>${ALPHABET[lastIndex + 1]}</li>`);
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
  let searchTerm = $l("#search-term").nodes[0].value.split(" ").join("+");
  $l.ajax({
    method: "GET",
    url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`,
    success: displayGif,
    error: displayError
  });
};

const displayGif = gifData => {
  let gif = JSON.parse(gifData).data[0];
  let gifUrl = gif.images.fixed_height.url;
  document.getElementById('gif').innerHTML = `<img src=${gifUrl}>`;
  document.getElementById('search-term').value = "";
};

const displayError = error => {
  $l('#dictionary').append("Invalid search");
};
