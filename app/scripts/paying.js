$(document).ready(function(){
    Cart.refresh_the_cart();
    Cart.show_paying_items();
    Cart.show_promotion_items();
    Cart.show_the_cost();
    $('.text-right').find('.btn').on('click',function(){
        Cart.save_cart(new Cart());
    });
});

var paying_item_detail_generator = function(item){
    var item_detail =$('<tr><td>'+item.kind+'</td><td>'
            +item.name+'</td><td>'+
            item.price+'</td><td>'+
            item.unit+'</td><td>'+
            item.count+'</td>'+
            '<td>'+Cart.show_the_promotion_price(item.name)+'</td>'
    );
    return item_detail;
};
