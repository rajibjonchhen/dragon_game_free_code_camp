const input = document.getElementById("user-input")
const checkBtn = document.getElementById("check-btn")
const clearBtn = document.getElementById("clear-btn")
const result = document.getElementById("results-div")

clearBtn.onclick = (e) => {
    e.preventDefault()
    result.innerText = ""
    return
}

const checkNumber = (e) => {
    e.preventDefault();
    const numRegex = /^1?\s?(\(\d{3}\)|\d{3})([\-\s]?)\d{3}([\-\s]?)\d{4}$/
const phNumb = input.value
   
   const isNumber = numRegex.test(phNumb)
    let validity = ""

    if(!input.value){
        alert("Please provide a phone number")
        return
    }else if(isNumber){
        validity = "Valid"
    }else{
        validity = "Invalid"
    }
    
    const div = document.createElement("div")
    div.classList.add(validity)
    div.innerText = `${validity} US number: ${input.value}`
    result.appendChild(div)
}

checkBtn.onclick = checkNumber