window.addEventListener("keypress", e => {
    const reg = new RegExp("[a-zę€óąśłżźćń]",'ig');
    const key = `${e.key}`;
    const result = key.match(reg);
    if(result && result.length === 1) inputLetter(key)
})
window.addEventListener("keydown", e => {
    if(e.key === "Backspace"){
        removeLetter()
    }
    else if(e.key === "Enter"){
        submitWord();
    }
})
document.querySelector("div.keyboard").addEventListener("click", e => {
    if(e.target.matches("div.row") || e.target === e.currentTarget) return
    if(e.target.textContent === "⏎"){
        submitWord()
    }else if(e.target.textContent === "⌫"){
        removeLetter()
    }else{
        inputLetter(e.target.textContent)
    }
})

document.querySelector("div.board").addEventListener("mousedown",setStatus);
document.querySelector("div.options").addEventListener("input",toggleCheckboxes)