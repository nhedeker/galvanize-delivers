(function() {
  'use strict';

  $(".button-collapse").sideNav();

  var total = 0.00;
  var subtotal = 0.00;
  var tax = 0.00;
  var items = 0;

  //add submission event listener to place order button
  $('#placeOrder').click(function(event){
     submitOrder(event);
  });

  //adds order event listener to meal choices
  $('.cards').on('click','.addOrder', function(event){
     addMeal(event);
  });

  //calculates subtotal based on order price
  var calculateSubtotal = function(price){
     subtotal += price;
  };

  //calculates tax based on subtotal
  var calculateTax = function(){
     tax = (subtotal * .10).toFixed(2);
     tax = parseFloat(tax);
  };

  //caluates total based on subtotal & tax
  var calculateTotal = function(price){
     calculateSubtotal(price);
     calculateTax();
     total = subtotal + tax;

     //for debugging purposes
     if (total < 0){
        console.log("There was an error - this should NEVER happen");
        total = 0.00;
        subtotal = 0.00;
        tax = 0.00;
     }
  };

  //displays order total
  var displayTotal = function(){
     $('#subtotal').text(`\$${subtotal.toFixed(2)}`);
     $('#tax').text(`\$${tax.toFixed(2)}`);
     $('#total').text(`\$${total.toFixed(2)}`);
  };

  //caluates and displays order total
  var changeOrder = function(price) {
     calculateTotal(price);
     displayTotal();
  }

  //adds meal to order
  var addMeal = function(event){
     //get all info from cards for table
     var $target = $(event.target);
     var $card = $target.parents('.cards');
     var price = $card.find('.price').text();
     var mealName = $card.find('.mealName').text();

     //get table elements ready
     var $tbody = $('tbody');
     var $tr = $('<tr></tr>');
     var $mealName = $('<td></td>');
     var $price = $('<td></td>');

     //add all table data to cells
     $mealName.text(mealName);
     $price.text(price);
     $price.addClass('right-align');
     $tr.append($mealName);
     $tr.append('<td></td>');
     $tr.append($price);

     //add remove meal event option
     var $i = $('<i class="material-icons small">remove_shopping_cart</i>');
     var $tdRemove = $('<td></td>');
     $tdRemove.append($i);
     $i.click(function(event){
        removeMeal(event);
     });
     $tr.append($tdRemove);

     //add order to the table
     $tbody.append($tr);

     //get price info from order & update table
     price = parseFloat(price.substring(1));
     changeOrder(price);

     //increase item counter
     items++;
  };

  //removes meal from order
  var removeMeal = function(event){
     var $target = $(event.target);
     var $tr = $target.parents('tr');
     var $orderInfo = $tr.children();
     var mealPrice = $orderInfo.get(2).textContent;
     mealPrice = mealPrice.substring(1);
     mealPrice = parseFloat(mealPrice);
     mealPrice *= -1;
     changeOrder(mealPrice);
     $tr.remove();
     items--;
  };

  var submitOrder = function(event){
     //if no meals send error
     if (items <= 0){
        Materialize.toast("Your shopping cart is empty", 5000, 'right');
        return false;
     }

     //if no name send error
     var customerName = document.getElementById('name').value;
     if (/^\s+?/.test(customerName) || '' === customerName){
        Materialize.toast("Please enter your name", 5000);
        return false;
     }

     //if no phone send error
     var customerPhone = document.getElementById('phone').value;
     if (/^\s+?/.test(customerPhone) || '' === customerPhone){
        Materialize.toast("Please enter a valid phone number", 5000);
        return false;
     }

     //if no address send error
     var customerAddr = document.getElementById('address').value;
     if (/^\s+?/.test(customerAddr) || '' === customerAddr){
        Materialize.toast("Please enter a valid address", 5000);
        return false;
     }

     //send order complete message
     Materialize.toast("Your order was submitted!", 5000, 'right');
  };
})();
