$(document).ready(function(){
    Cart.refresh_the_cart();
    $('.btn').on('click',function(){
        var name = $(this).closest('td').prev('td').prev('td').prev('td').text();
        Cart.add_item_to_cart(name);
        Cart.save_cart_number(+Cart.get_the_cart_number()+1);
        Cart.refresh_the_cart();
    });
});







