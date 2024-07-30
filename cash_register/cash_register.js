const keyboard = document.querySelector(".keyboard")
const bill = document.querySelector(".bill")
const items = document.querySelector(".items")





for(let i=49; i<99; i++){
    const key = document.createElement("div")
    key.innerText = String.fromCharCode(i)
    key.classList.add("key")
    console.log("keyboard")
    keyboard.appendChild(key)
}
for(let i=0; i<6; i++){
    const item = document.createElement("div")
    item.innerText = String.fromCharCode(i)
    item.classList.add("item")
    items.appendChild(item)
}
for(let i=0; i<4; i++){
    const billItem = document.createElement("li")
    billItem.innerText = `apple juice  1bt  1.10  1.10`
    billItem.classList.add("billItem")
    bill.appendChild(billItem)
}
bill.appendChild(`<li>Total     ....</li>`)