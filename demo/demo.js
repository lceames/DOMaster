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
  let newWord = document.getElementById("new-word").value;
  $l('.word-list').append(`<li>${newWord}</li>`);
};

const lookup = word =>   {
  $l.ajax({
    method: "GET",
    url: `https://od-api.oxforddictionaries.com/api/v1/en/${word}`,
    success: displayDef,
    error: displayError,
    headers: {
      "app_id": "ca7530c5",
      "app_key": "b612c55092620dfb9dcd3fd4ec3cf1d0"
    },
    withCredentials: true
  });
};

const displayDef = def => {
  debugger
};

const displayError = error => {
  debugger
};
