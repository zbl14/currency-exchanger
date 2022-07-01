import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { ExchangeService } from './services/exchange-service.js';

let exchange = (response, toCurrency, amount) => {
  if (response.conversion_rates) {
    let toCurrencyAmount = `${response.conversion_rates[toCurrency]}` * amount;
    $(".fromCurrencyAmount").val(`${amount} ${response.base_code}`);
    $(".toCurrencyAmount").val(`${toCurrencyAmount} ${toCurrency}`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
};

async function makeApiCall(fromCurrency, toCurrency, amount) {
  const response = await ExchangeService.getExchangeRate(fromCurrency);
  console.log(response);
  exchange(response, toCurrency, amount);
}

$(document).ready(function() {
  $('#submit').click(function() {
    let fromCurrency = $('.fromCurrency').val();
    let toCurrency = $('.toCurrency').val();
    let amount = $('#amount').val();
    makeApiCall(fromCurrency, toCurrency, amount);
  });
}); 