const password = "góral";

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
        const clearTryPassIndex = tryPass.findIndex(char => char === letter);
        if(letters[index] === tryPass[index]){
            result.push("correct")
            tryPass[clearTryPassIndex] = '';
        }
        else if(tryPass.includes(letter) && letters.filter(char=>char===letter).length === 1){
            result.push("present");
            
            tryPass[clearTryPassIndex] = '';
        }

        //w takiej sytuacji
        // _ _ X _ _ 
        // _ X _ X _
        //oba dolne X były present, zamiast wyłącznie pierwszego
        // ten elseif temu zaradza

        else if(tryPass.includes(letter) && letters.filter(char=>char===letter).length > 1){
            const foundOn = tryPass.indexOf(char => char === letter);
            if(tryPass[foundOn]===letters[index])result.push("correct");
            else {
                result.push("present");
                tryPass[clearTryPassIndex] = '';
            }
        }
        else result.push("absent");
    })
    changeColors(result);
    changeKeys()
}

function changeColors(array){
    const row = document.querySelector("div.row.empty");
    const letters = row.querySelectorAll("div.letter");
    const keyLetters = Array.from(document.querySelectorAll("div.key"));
    letters.forEach((letter,index) => {
        letter.classList.add(array[index]); 
    })
    row.classList.remove("empty");
    row.classList.add("full");
    setSearchRequirements();
}

function changeKeys(){
    const letters = Array.from(document.querySelectorAll("div.letter.full"));
    const keys = Array.from(document.querySelectorAll("div.key"));
    letters.forEach(letter => {
        const keyIndex = keys.findIndex(key => key.id === letter.id)
        if(letter.classList.contains("absent")) keys[keyIndex].classList.add("absent")
        if(letter.classList.contains("present")) keys[keyIndex].classList.add("present")
        if(letter.classList.contains("correct")) keys[keyIndex].classList.add("correct")
        
    })
}

