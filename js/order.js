(function() {
  'use strict';

  $(".button-collapse").sideNav();

  var total = 0.00;
  var subtotal = 0.00;
  var tax = 0.00;
  var $table = $('table');

  $('.cards').on('click','.addOrder', function(event){
     addMeal(event);
  });

  var calculateSubtotal = function(price){
     subtotal += price;
  }

  var calculateTax = function(){
     tax = (subtotal * .10).toFixed(2);
     tax = parseFloat(tax);
  }

  var calculateTotal = function(price){
     calculateSubtotal(price);
     calculateTax();

     total = subtotal + tax;
  }

  var addMeal = function(event){
     var $target = $(event.target);
     var $card = $target.parents('.cards');
     var price = $card.find('.price').text();
     var mealName = $card.find('.mealName:not(i)').text();

     var $tbody = $table.children('tbody');
     $tbody.append('<tr>');
     $tbody.find('tr:last-of-type').append('<td>');
     $tbody.find('td:last-of-type').text(mealName);
     $tbody.find('tr:last-of-type').append('<td>');
     $tbody.find('tr:last-of-type').append('<td>');
     $tbody.find('td:last-of-type').addClass('right-align');
     $tbody.find('td:last-of-type').text(price);
     price = parseFloat(price.substring(1));

     calculateTotal(price);

     var $tax = $table.find('#tax');
     console.log($tax);
     //displays "context: document" on console


     $table.find('#subtotal').text(`\$${subtotal.toFixed(2)}`);
     $table.find('#tax').text(`\$${tax.toFixed(2)}`);
     $table.find('#total').text(`\$${total.toFixed(2)}`);
  }
})();
