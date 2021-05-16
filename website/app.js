
/* Global Variables */
const apiKey ="&appid=81cffbaaa07db1a05201672ec5db3d65&units=imperial"
const appUrl = "http://localhost:4800/";
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = parseInt(d.getMonth())+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const generate = document.querySelector("#generate")
generate.addEventListener("click", async () => {
    const zipCode = document.querySelector("#zip").value
    const content = document.querySelector("#feelings").value

      //check if user not enter zipcode
    if (!zipCode) {
        alert("Please enter zip")
    }
    else {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)
    console.log(res);
        if (!res.ok) {
            alert("Sorry, City NOT found");
            console.log(res.statusText)
        }
    else {
        
    const data = await res.json() 
    console.log(data);
    const temp = data.main.temp
    const obj = {
        date: newDate,
        temp,
        content
    }
    console.log(obj)

    if (!content) {
        alert("Enter your feelings")
    }


    else{
    await fetch('/savingData', {
        method: "POST",
        credentials: "same-origin",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const serverRes = await fetch ('/gettingData', { credentials: "same-origin"});
    console.log(serverRes)
    const serverData = await serverRes.json();
    console.log(serverData);
    if (serverRes.ok = true) {
        updateUI()
    }
    return serverData;
    }}}
})
async function updateUI() {
    let req = await fetch ('/gettingData');
    try {
      const allDate = req.json().then(data => {
            dateElement.innerHTML= `Date : ${data.date}`;
            tempElement.innerHTML= `temp : ${data.temp}`;
            contentElement.innerHTML= `Feeling : ${data.content}`

        })
    } catch (error) {
       console.log('erroe is ', error);
    }
}
