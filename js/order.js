(function() {
  'use strict';

  $(".button-collapse").sideNav();

  var total = 0.00;
  var subtotal = 0.00;
  var tax = 0.00;
  var $table = $('table');
  var hasItems = false;

  $('#placeOrder').click(function(event){
     submitOrder(event);
  });

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

     $('#subtotal').text(`\$${subtotal.toFixed(2)}`);
     $('#tax').text(`\$${tax.toFixed(2)}`);
     $('#total').text(`\$${total.toFixed(2)}`);

     hasItems = true;
  }

  var submitOrder = function(event){
     if (!hasItems){
        Materialize.toast("Your shopping cart is empty", 5000, 'right');
        return false;
     }
     var customerName = document.getElementById('name').value;
     if (/^\s+?/.test(customerName) || '' === customerName){
        Materialize.toast("Please enter your name", 5000);
        return false;
     }
     var customerPhone = document.getElementById('phone').value;
     if (/^\s+?/.test(customerPhone) || '' === customerPhone){
        Materialize.toast("Please enter a valid phone number", 5000);
        return false;
     }
     var customerAddr = document.getElementById('address').value;
     if (/^\s+?/.test(customerAddr) || '' === customerAddr){
        Materialize.toast("Please enter a valid address", 5000);
        return false;
     }
     Materialize.toast("Your order was submitted!", 5000, 'right');
  }
})();
