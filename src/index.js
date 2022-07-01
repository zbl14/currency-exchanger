import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { ExchangeService } from './services/exchange-service.js';


let currencyList = (response) => {
  if (response.conversion_rates) {
    let currencyArr = Object.keys(response.conversion_rates);
    let currencylist = "";
    for (let i=0; i < currencyArr.length; i++) {
      currencylist += `<option>${currencyArr[i]}</option>`;
    }
    $('#fromCurrency').append(currencylist);
    $('#toCurrency').append(currencylist);
    const ratesStr = JSON.stringify(response.conversion_rates);
    sessionStorage.setItem("rate", ratesStr);
  } else if (response["error-type"]) {
    $('.showErrors').show().text(`${response["error-type"]}. The currency in question doesn't exist.`);
  } else {
    $('.showErrors').show().text(`There was an error processing your request: ${response}`);
  }
};

async function makeApiCall(query) {
  const response = await ExchangeService.getExchangeRate(query);
  currencyList (response);
}

let exchange = (fromCurrency, toCurrency, amount) => {
  let data = JSON.parse(sessionStorage.rate);
  let toCurrencyAmount = amount / data[fromCurrency] * data[toCurrency];
  $(".fromCurrencyAmount").val(`${parseFloat(amount).toFixed(2)} ${fromCurrency}`);
  $(".toCurrencyAmount").val(`${toCurrencyAmount.toFixed(2)} ${toCurrency}`);
};

$(document).ready(function() {
  makeApiCall("USD");
  $('#submit').click(function() {
    let fromCurrency = $('#fromCurrency').val();
    let toCurrency = $('#toCurrency').val();
    let amount = $('#amount').val();
    exchange(fromCurrency, toCurrency, amount);
  });
}); 