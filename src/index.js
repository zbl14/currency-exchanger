import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { ExchangeService } from './services/exchange-service.js';


let exchangeList = (response) => {
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
  } else {
    $('.showErrors').show().text(`There was an error processing your request: ${response}`);
  }
};

// let exchange = (response, toCurrency, amount) => {
//   if (response.conversion_rates) {
//     let toCurrencyAmount = `${response.conversion_rates[toCurrency]}` * amount;
//     $(".fromCurrencyAmount").val(`${amount} ${response.base_code}`);
//     $(".toCurrencyAmount").val(`${toCurrencyAmount} ${toCurrency}`);
//   } else if (response["error-type"]) {
//     $('.showErrors').show().text(`${response["error-type"]}. The currency in question doesn't exist.`);
//   } else {
//     $('.showErrors').show().text(`There was an error processing your request: ${response}`);
//   }
// };

async function makeApiCallList(query) {
  const response = await ExchangeService.getExchangeRate(query);
  exchangeList (response);
}

// async function makeApiCall(fromCurrency, toCurrency, amount) {
//   const response = await ExchangeService.getExchangeRate(fromCurrency);
//   exchange(response, toCurrency, amount);
// }

let exchange = (fromCurrency, toCurrency, amount) => {
  let data = JSON.parse(sessionStorage.rate);
  let x = amount / data[fromCurrency] * data[toCurrency]
  $(".fromCurrencyAmount").val(`${amount} ${fromCurrency}`);
  $(".toCurrencyAmount").val(x);
}

$(document).ready(function() {
  makeApiCallList("USD");
  $('#submit').click(function() {
    let fromCurrency = $('#fromCurrency').val();
    let toCurrency = $('#toCurrency').val();
    let amount = $('#amount').val();
    exchange(fromCurrency, toCurrency, amount)
    // makeApiCall(fromCurrency, toCurrency, amount);
  });
}); 