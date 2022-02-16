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
    resSort(result);
}

//na tyle ile mam liste frekwencyjna, na tyle proponuje "popularniejsze" słowo z pasujących
function resSort(result){
    let sorted = [];
    result.forEach(res => {
        if(popular[res]){
            sorted.push(res);
        }
    })
    sorted = sorted.sort((elA, elB) => {
        return popular[elB] - popular[elA]
    })
    result.forEach(missingRes => {
        if(!sorted.includes(missingRes)){
            sorted.push(missingRes)
        }
    })
    // proba innego sortowania
    const counedLetters = sortLettersByOccurance(sorted);
    const topPopular = sorted.slice(0,5);
    const sortedByValue = sorted.sort((a,b)=>{
        return valueWord(b,counedLetters) - valueWord(a,counedLetters)})
    // console.log(topPopular,sortedByValue);
    renderWords(topPopular,sortedByValue.slice(0,10))
}
function sortLettersByOccurance(array){
    const lettersCountInPopular = {};
    const singleWords = array;
    singleWords.forEach(word => {
        const letters = Array.from(word.split(''));
        //DODAC SUMOWANIE LITER NA DANEJ POZYCJI JAKO ARRAY A NIE JAKO JEDEN INTIGER
        letters.forEach((letter,index) => {
            if(!lettersCountInPopular[letter]) {
                lettersCountInPopular[letter] = [0,0,0,0,0];
                lettersCountInPopular[letter][index] += 1;

            }
            else{
                lettersCountInPopular[letter][index]++;
            }
        })
    })
    return lettersCountInPopular;
}
function valueWord(word,letterAmount){
    const letters = word.split("");
    const noDoubles = [...new Set(letters)];
    let value = 0;
    noDoubles.forEach((letter,index) => value += parseInt(letterAmount[letter][index]));
    return value;
}

function renderWords(mlw, mvw) {
    const mvwSection = document.querySelector("div.ranked section")
    const mlwSection = document.querySelector("div.potential section")
    mlwSection.textContent = '';
    mvwSection.textContent = ''
    mlw.forEach(word => {
        const wordSpan = `<span>${word}</span>`;
        mlwSection.insertAdjacentHTML("beforeend",wordSpan);
    })
    mvw.forEach(word => {
        const wordSpan = `<span>${word}</span>`;
        mvwSection.insertAdjacentHTML("beforeend",wordSpan);
    })
    const colors = getColors();
    // console.log(colors)
}