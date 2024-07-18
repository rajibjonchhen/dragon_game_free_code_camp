const checkBtn = document.getElementById("check-btn")
console.log(checkBtn);
const inputText = document.getElementById("text-input")
const result = document.getElementById("result")

let isPalindrom = true;

const checkPalindrom = (e) => {  
  e.preventDefault()
   isPalindrom = true;
  
  if(inputText.value.length === 0){
  alert("Please input a value")
  return;
  }

  const cleanText = inputText.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  const reverseText = cleanText.split("").reverse().join("")
  
    if( cleanText !== reverseText){
      isPalindrom = false;
    }
  showResult()
}

checkBtn.addEventListener("click", checkPalindrom)

const showResult =() =>{
result.innerHTML = `<strong>${inputText.value}</strong> is ${isPalindrom? "":" not "} a palindrome`
}