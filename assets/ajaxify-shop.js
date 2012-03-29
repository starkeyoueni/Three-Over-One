/**
 * Shopify Ajaxify Shop. 
 * 
 * @uses Modified Shopify jQuery API (link to it)
 *
 */

jQuery(document).ready(function() { 
//Begin Wrapper

var jQ = jQuery;

/**
 * Collection of Selectors for various pieces on the page we need to update 
 *
 * I've tried to keep these as general and flexible as possible, but 
 * if you are doing your own markup, you may find you need to change some of these.
 *
 */
var selectors = {
    // Any elements(s) with this selector will have the total item count put there on add to cart.
    TOTAL_ITEMS: '.cart-total-items', 
    TOTAL_PRICE: '.cart-total-price',

    SUBMIT_ADD_TO_CART: 'input[type=image], input.submit-add-to-cart',
    
    FORM_ADD_TO_CART: 'form[action*=/cart/add]',
    
    FORM_UPDATE_CART: 'form[name=cartform]',
    //The actual Update Button
    FORM_UPDATE_CART_BUTTON: 'form[name=cartform] input[name=update]',
    //All the buttons on the form
    FORM_UPDATE_CART_BUTTONS: 'input[type=image], input.button-update-cart',

    LINE_ITEM_ROW: '.cart-line-item',
    LINE_ITEM_QUANTITY_PREFIX: 'input#updates_',
    LINE_ITEM_PRICE_PREFIX: '.cart-line-item-price-',

    LINE_ITEM_REMOVE: '.remove a',
    
    EMPTY_CART_MESSAGE: '#empty'
};


/**
 * Collection of text strings. This is where you would change for a diff language, for example. 
 *
 */
var text = {
    ITEM: 'Item', 
    ITEMS: 'Items'
};


//Attach Submit Handler to all forms with the /cart/add action. 
jQ(selectors.FORM_ADD_TO_CART).submit(function(e) {
    e.preventDefault();
    //Disable the Add To Cart button, add a disabled class. 
    jQ(e.target).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', true).addClass('disabled');

    //Can't use updateCartFromForm since you need the item added before you can update (otherwise, would have been more convenient)
    //So, in onItemAdded, we Shopify.getCart() to force the repaint of items in cart. 
    Shopify.addItemFromForm(jQ(this).attr('id'));
});


//We only want to interrupt the UPDATE, not the CHECKOUT process
jQ(selectors.FORM_UPDATE_CART_BUTTON).click(function(e) {
    e.preventDefault();
    jQ(e.target.form).find(selectors.FORM_UPDATE_CART_BUTTONS).attr('disabled', true).addClass('disabled');
    Shopify.updateCartFromForm(jQ(this).parents('form').attr('id'));
});

//Delegate the Remove Link functionality on the cart page.
jQ(selectors.FORM_UPDATE_CART).delegate(selectors.LINE_ITEM_REMOVE, 'click', function(e) {
    e.preventDefault();
    //Get the variant ID from the URL
    var vid = this.href.split('/').pop().split('?').shift();
    Shopify.removeItem(vid);
    jQ(this).parents(selectors.LINE_ITEM_ROW).remove();
});

/**
 * Shopify.onItemAdded
 * 
 * Triggered by the response when something is added to the cart via the add to cart button.
 * This is where you would want to put any flash messaging, for example.
 * 
 * @param object line_item
 * @param HTMLelement/String Form HTMLElement, or selector
 */
Shopify.onItemAdded = function(line_item, form) {
    //Default behaviour for this modification:
    //When a Add To Cart form is clicked, we disable the button and apply a class of disabled. 
    //Here is where we remove the disabled class, and reactivate the button.
    jQ(form).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', false).removeClass('disabled');

    //You can add any extra messaging you would want here. 

    //Get the state of the cart, which will trigger onCartUpdate
    Shopify.getCart();
};

/**
 * This updates the N item/items left in your cart
 * 
 * It's setup to match the HTML used to display the Cart Count on Load. If you change that (in your theme.liquid) 
 * you will probably want to change the message html here. 
 * This will update the HTML in ANY element with the class defined in selectors.TOTAL_ITEMS
 *
 * @param object the cart object. 
 * @param HTMLElement form. If included, we know its an Update of the CART FORM, which will trigger additional behaviour. 
 */
Shopify.onCartUpdate = function(cart, form) {
    
    // Total Items Update
    var message = '<span class="count">'+cart.item_count+'</span> ' + ((cart.item_count == 1) ? text.ITEM : text.ITEMS ) + ' (';
    
    if ((typeof Currency === 'object') && (typeof Currency.convertAll === 'function')) {
        // If there has been some conversion done on the page already.
        message += Shopify.formatMoney(Currency.convert(cart.total_price, Shopify.currency, Currency.currentCurrency), Currency.money_with_currency_format[Currency.currentCurrency]) + ')';
    }
    else {
        message +=Shopify.formatMoney(cart.total_price) + ')';
    }
    
    jQ(selectors.TOTAL_ITEMS).html(message);
    
    var width = jQ("#add-to-cart").outerWidth();
    jQ("#add-to-cart").css({'width': width+'px'});
    
    
    window.setTimeout(function() {
      jQ("#add-to-cart").val("Add to Cart").animate({
        
        color: '#ffffff',
        backgroundColor: '#F5EFE5'
        
      }, 400);
    }, 2200);
    
    //jQ("#add-to-cart").delay(2000).val("Add to Cart");
    jQ("#cart-updated").html("<a href='/cart'>Added to Cart</a>");
    var tempwidth = jQ(".cart-summary").outerWidth();
    jQ('#cart-updated').css({'left': '100%', 'margin-left':'-'+ tempwidth +'px', 'width': tempwidth+'px'})
    jQ('#cart-updated').fadeIn(200).delay(2000).fadeOut(400);
    
    // Price update - any element matching the selector will have their contents updated with the cart price.
    if ((typeof Currency === 'object') && (typeof Currency.convertAll === 'function')) {
        // If there has been some conversion done on the page already.
        var price = Shopify.formatMoney(Currency.convert(cart.total_price, Shopify.currency, Currency.currentCurrency), Currency.money_with_currency_format[Currency.currentCurrency]);
    }
    else {
        var price = Shopify.formatMoney(cart.total_price);
    }
    jQ(selectors.TOTAL_PRICE).html(price);

    //If the EMPTY_CART_MESSAGE element exists, we should show it, and hide the form. 
    if( (jQ(selectors.EMPTY_CART_MESSAGE).length > 0) &&  cart.item_count == 0) {
        jQ(selectors.FORM_UPDATE_CART).hide();
        jQ(selectors.EMPTY_CART_MESSAGE).show();
    }

    // A form was passed in?
    form = form || false;
    //so it's the cart page form update, trigger behaviours for that page
    if(form) {
        //Nothing left in cart, we reveal the Nothing in cart content, hide the form.
        if(cart.item_count > 0) {
            //Loops through cart items, update the prices.
            jQ.each(cart.items, function(index, cartItem) {
                if ((typeof Currency === 'object') && (typeof Currency.convertAll === 'function')) {
                    // If there has been some conversion done on the page already.
                    jQ(selectors.LINE_ITEM_PRICE_PREFIX + cartItem.id).html(Shopify.formatMoney(Currency.convert(cart.total_price, Shopify.currency, Currency.currentCurrency), Currency.money_with_currency_format[Currency.currentCurrency]));
                }
                else {
                    jQ(selectors.LINE_ITEM_PRICE_PREFIX + cartItem.id).html(Shopify.formatMoney(cartItem.line_price));
                }
                jQ(selectors.LINE_ITEM_QUANTITY_PREFIX + cartItem.id).val(cartItem.quantity);
            });

            //And remove any line items with 0
            jQ(form).find('input[value=0]').parents(selectors.LINE_ITEM_ROW).remove();

            //Since we are on the cart page, reenable the buttons we disabled
            jQ(form).find(selectors.FORM_UPDATE_CART_BUTTONS).attr('disabled', false).removeClass('disabled');

        }    
        //You can add any extra messaging you would want here. 
        //successMessage('Cart Updated.');
    }
};

//End Wrapper    
});