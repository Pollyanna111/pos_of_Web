$(document).ready(function(){
    Cart.refresh_the_cart();
    $('.text-right').find('.btn').on('click',function(){
        Cart.save_cart(new Cart());
        Cart.save_cart_number('0');
    });
});