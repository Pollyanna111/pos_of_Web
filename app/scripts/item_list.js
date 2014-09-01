$(document).ready(function(){
    Cart.refresh_the_cart();
    $('.btn').on('click',function(){
        var name = $(this).closest('td').prev('td').prev('td').prev('td').text();
        Cart.add_item_to_cart(name);
        Cart.refresh_the_cart();
    });
});







