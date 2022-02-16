const password = randomWord();

function randomWord() {
    const rand = Math.floor(Math.random() * 500)
    return popular3000[rand];
}

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
    userLetters = userWord.split('')
    const result = ['absent','absent','absent','absent','absent'];
    let passLetters = password.split('');

    userLetters.forEach((userLet,index) => {
        if(userLet === passLetters[index]) {
            result[index] = 'correct';
            passLetters[index] = '.';
            userLetters[index] = '.';
        }
    })
    userLetters.forEach((userLet,index)=>{
        passLetters.forEach(passLet =>{
            if(passLet === userLet && !(passLet==='.')) result[index] = 'present';
        })
    })
    changeColors(result);
    changeKeys()
}

function changeColors(array){
    const row = document.querySelector("div.row.empty");
    const letters = row.querySelectorAll("div.letter");
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

function getColors() {
    const letters = Array.from(document.querySelectorAll("div.letter.full"));
    const colors = {};
    letters.forEach(letter => {
        colors[letter.id] = letter.classList[letter.classList.length-1]
    })
  
    return colors;
}