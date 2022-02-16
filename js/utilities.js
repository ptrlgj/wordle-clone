const password = "śledź";

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
    // console.log(correctLetters,presentLetters,absentLetters)
    createRegex(correctLetters,presentLetters,absentLetters)
}

function createRegex(correct, present, absent){
    const singleRegexs = ['','','','',''];
    let presentPositions = [];
    const absentLetters = absent.join("").toLowerCase();
    //problem z regexem, ciągle uwzględniał tylko ostatnią zaznaczoną 'present' litere z tej pozycji
    Object.keys(present).forEach(letter => {
        present[letter].forEach(position => {;
            if(!presentPositions.includes(parseInt(position)))presentPositions.push(parseInt(position))
            //tu 'present' litery z tej samej pozycji sie sumują
            singleRegexs[parseInt(position)] += `${letter.toLowerCase()}`;
        })
    })
    Object.keys(correct).forEach(letter => {
        correct[letter].forEach(position => {
            //jeżeli litera jest 'correct' powinna na stałe być przypisana do tej pozycji
            if(presentPositions.includes(parseInt(position))) {
                const index = presentPositions.indexOf(parseInt(position));
                presentPositions.splice(index,1);
            }
            singleRegexs[parseInt(position)] = letter.toLowerCase();
        })
    })
    singleRegexs.forEach((elem,index) => {
        if(!elem) singleRegexs[index] = `[^${absentLetters}]`
    })
    //tutaj są zamykane w [^]
    presentPositions.forEach(position => {
        singleRegexs[position] = `[^${singleRegexs[position]}${absentLetters}]`
    })
    const finalRegex = new RegExp(singleRegexs.join(''),"ig")
    // console.log(finalRegex)
    searchForMatch(finalRegex, Object.keys(present))
}

function searchForMatch(regex, present) {
    const result = words.filter(word => {
        let flag = false;
        flag = !!(word.match(regex));
        present.forEach(letter => {
            if(!word.includes(letter.toLowerCase())) flag = false;
        })
        return flag;
    })
    console.log(result);
}