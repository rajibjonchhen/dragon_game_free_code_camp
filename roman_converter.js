const convertBtn = document.getElementById("convert-btn")
const result = document.getElementById("output")
const input = document.getElementById("number");

const conversionTable = {
  M:1000,
  CM:900,
  D:500,
  CD:400,
  C:100,
  XC:90,
  L:50,
  XL:40,
  X:10,
  IX:9,
  V:5,
  IV:4,
  I:1
}

let roman = ""

const getInput = (e) => {
  e.preventDefault()
  const inputInt = parseInt(input.value)
    result.style.color = "red"
  if(!input.value){
    result.innerText = "Please enter a valid number"
  } else if( inputInt < 0){
    result.innerText = "Please enter a number greater than or equal to 1"
  }else if(inputInt > 3999){
    result.innerText= "Please enter a number less than or equal to 3999"
  }else{
    result.style.color = "black"
    convertToRoman(inputInt)
  }
}
  convertBtn.addEventListener("click", getInput);

  const convertToRoman = (numb) => {
   for ( let i in conversionTable ) {
    while ( numb >= conversionTable[i] ) {
      roman += i
      numb -= conversionTable[i];
    }
  }
  result.innerText =  roman
   roman = "";
  }