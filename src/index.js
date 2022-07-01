import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { ExchangeService } from './services/exchange-service.js';

let exchange = (from, to) => {
  let to = to;
  if (from.conversion_rates) {
    $(".toCurrency").val(`${from.conversion_rates.to}`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCall(from, to) {
  const response = await ExchangeService.getExchangeRate(from);
  exchange(response, to);
}

$(document).ready(()=> {
  $('#submit').click(() => {
    let fromCurrency = $('.fromCurrency').val();
    let toCurrency = $('.toCurrency').val();
    makeApiCall(fromCurrency, toCurrency);
  })
}); 