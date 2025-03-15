// script.js
let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

// Currency Converter Functionality
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("conversionResult");

async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

async function convertCurrency() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let fromRate = data.rates[fromCurrency.value];
        let toRate = data.rates[toCurrency.value];
        let convertedAmount = (amount.value / fromRate) * toRate;
        result.textContent = `${amount.value} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
    } catch (error) {
        result.textContent = "Conversion failed!";
    }
}

document.addEventListener("DOMContentLoaded", loadCurrencies);
