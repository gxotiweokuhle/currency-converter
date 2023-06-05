/*const randsinput = document.getElementById('rands');
const dollarsinput = document.getElementById('dollars');
const eurosinput = document.getElementById('euros');
const poundsinput = document.getElementById('pounds')



randsinput.oninput = function () {

    let dollar = (parseFloat(randsinput.value) * 0.051173)
    dollarsinput.value = parseFloat(dollar.toFixed(2))

    let euro = (parseFloat(randsinput.value) * 0.047796)
    eurosinput.value = parseFloat(euro.toFixed(2))

    let pounds = (parseFloat(randsinput.value) * 0.041177)
    poundsinput.value = parseFloat(pounds.toFixed(2))

}

dollarsinput.oninput = function () {
    
    let rands = (parseFloat(dollarsinput.value) * 19.553975 )
    randsinput.value = parseFloat(rands.toFixed(2))

    let euro = (parseFloat(dollarsinput.value) * 0.932352)
    eurosinput.value = parseFloat(euro.toFixed(2))

    let pounds = (parseFloat(dollarsinput.value) * 0.805461)
    poundsinput.value = parseFloat(pounds.toFixed(2))
}

eurosinput.oninput = function(){
    let rands = (parseFloat(eurosinput.value) * 20.895716)
    randsinput.value = parseFloat(rands.toFixed(2))

    let dollar = (parseFloat(eurosinput.value) * 1.069416)
    dollarsinput.value = parseFloat(dollar.toFixed(2))

    let pounds = (parseFloat(eurosinput.value) * 0.860268)
    poundsinput.value = parseFloat(pounds.toFixed(2))
}

poundsinput.oninput = function(){
    let rands = (parseFloat(poundsinput.value) * 24.291366)
    randsinput.value = parseFloat(rands.toFixed(2))

    let dollar = (parseFloat(poundsinput.value) * 1.24292)
    dollarsinput.value = parseFloat(dollar.toFixed(2))

    let euro = (parseFloat(poundsinput.value) * 1.162487)
    eurosinput.value = parseFloat(euro.toFixed(2))
}*/

const apiKey = "18cf1fdefafb492143034c73";//my key

// fetch currency options

fetch(`https://v6.exchangerate-api.com/v6/18cf1fdefafb492143034c73/codes`)//use the fetch function to get the https request from my api key
  .then((response) => response.json())//.then to handles the response from the request and converts the response to a json object
  .then((data) => {
    const { supported_codes } = data;//all the codes are now data
    const selectElements = document.querySelectorAll("select");//target the select as a parent 

    supported_codes.forEach((code) => {//looping through the code 
      const optionElement = document.createElement("option");//creating a child named option which will have a value and text 
      optionElement.value = code;//the value has a 3 character code 
      optionElement.text = code;//the text in the html must be the same as the value (characters)

      selectElements.forEach((select) => {
        select.appendChild(optionElement.cloneNode(true));//while looping through the option element to prevent them from being a one long string 
      });//set the clonenode to true for each value to appear on a new line
    });
  })
  .catch((error) => {
    console.log("Error fetching currency options:", error);//handles errors that occur during the request of data and sends error message to the developer
  });


function convert() {
    const amountInput = document.getElementById("userinput");//dom manipulation for each element in the html
    const fromCurrency = document.getElementById("fromAmount").value;
    const toCurrency =document.getElementById("toAmount").value;
    const resultElement = document.getElementById("results");

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)//fetch the request for the api in 
    .then(response => response.json())
    .then(data => {
        const {conversion_rate} = data;
        const convertedAmount = (amountInput.value * conversion_rate).toFixed(2);

        resultElement.innerHTML = `${amountInput.value} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
    })

    .catch(error => {
        console.log("Error fetching exchange rate:", error);
    })
}


const convertBtn = document.getElementById("convertBtn")
convertBtn.addEventListener('click', convert)