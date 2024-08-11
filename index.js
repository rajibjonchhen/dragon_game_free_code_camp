import {Routes} from "./routes.js"
const myMain = document.querySelector(".myMain")

Routes.map(route => {
    myMain.innerHTML += `<a class = "my-button" href="${route.path}">${route.buttonText.toUpperCase()}</a>`

})