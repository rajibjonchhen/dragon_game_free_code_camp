const convertBtn = document.getElementById("convert-btn")
const result = document.getElementById("output")
const input = document.getElementById("number");

const conversionTable = [{1000:M},
{900:CM},
{500:D},
{400:CD},
{100:C},
{90:XC},
{50:L},
{40:XL},
{10:X},
{9:IX},
{5:V},
{4:IV},
{1:I}
]

const getInput = (e) => {
  e.preventDefault()
  const inputInt = parseInt(input.value)
  if(!input.value){
    alert("Please enter a valid number")
  } else if( inputInt < 0){
    alert("Please enter a number greater than or equal to 1")
  }else if(inputInt > 3999){
    alert("Please enter a number less than or equal to 3999")
  }else{
    convertToRoman(inputInt)
  }
}
  convertBtn.addEventListener("click", getInput);

  const convertToRoman = (numb) => {
    console.log("convertToRoman", numb)
    
  }