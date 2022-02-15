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