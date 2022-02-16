function inputLetter(letter){
    const row = document.querySelector("div.row.empty");
    const column = row.querySelector("div.letter.empty");
    if(!column) return;
    column.textContent = letter.toUpperCase();
    column.setAttribute("id",`${letter.toUpperCase()}`)
    column.classList.remove("empty");
    column.classList.add("full");
}
function removeLetter(){
    const row = document.querySelector("div.row.empty");
    const column = row.querySelectorAll("div.full")[row.querySelectorAll("div.full").length-1];
    if(!column) return;
    column.textContent = "";
    column.classList.remove("full");
    column.classList.add("empty");
}
function submitWord(){
    const row = document.querySelector("div.row.empty");
    const letters = Array.from(row.querySelectorAll("div.full"));
    if(letters.length<5) return;
    const userWord = letters.map(letter => {
        return letter.textContent;
    }).join('');
    const validateWord = words.findIndex(word => word === userWord.toLocaleLowerCase())
    if(validateWord>=0){
        findLetters(userWord.toLowerCase())
        }
    else{
        alert("Nie ma takiego słowa w bazie")
    }
}
function findLetters(userWord){
    letters = userWord.split('')
    const result = [];
    let tryPass = password.split('')
    letters.forEach((letter, index) => {
        if(letters[index] === tryPass[index]){
            result.push("correct")
            const clearTryPassIndex = tryPass.findIndex(char => char === letter);
            tryPass[clearTryPassIndex] = '';
        }
        else if(tryPass.includes(letter)){
            result.push("present");
            const clearTryPassIndex = tryPass.findIndex(char => char === letter);
            tryPass[clearTryPassIndex] = '';
        }
        else result.push("absent");
    })
    console.log(result);

}