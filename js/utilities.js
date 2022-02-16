const password = "otwór";

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
        else if(tryPass.includes(letter) && letters.filter(char=>char===letter).length === 1){
            result.push("present");
            const clearTryPassIndex = tryPass.findIndex(char => char === letter);
            tryPass[clearTryPassIndex] = '';
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

function setSearchRequirements(){
    const usedLetters = document.querySelector("div.board").querySelectorAll("div.letter.full");
    const correctLetters = {}
    const presentLetters = {}
    const absentLetters = []
    usedLetters.forEach((letter, index) =>{
        if(letter.classList.contains("present")){
            if(presentLetters[letter.id]){
                if(!presentLetters[letter.id].includes(`${index%5}`)) presentLetters[letter.id].push(`${index%5}`);
            }
            else{
                presentLetters[letter.id] = Array.from(`${index%5}`)
            }
        }
        else if(letter.classList.contains("absent") && !Object.keys(presentLetters).includes(letter.id)){
            if(!absentLetters.includes(letter.id)) absentLetters.push(letter.id);
        } 
        else if(letter.classList.contains("correct")){
            if(correctLetters[letter.id]){
                if(!correctLetters[letter.id].includes(`${index%5}`)) correctLetters[letter.id].push(`${index%5}`);
            }
            else{
                correctLetters[letter.id] = Array.from(`${index%5}`)
            }
        }
    })
    console.log(correctLetters,presentLetters,absentLetters)
    // createRegex(correctLetters,presentLetters,absentLetters)
}