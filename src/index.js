import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { ExchangeService } from './services/exchange-service.js';

let exchange = (from, to) => {
  let to = to
  if (from.conversion_rates) {
    $(".toCurrency").val(`${from.conversion_rates.to}`)
  }
}