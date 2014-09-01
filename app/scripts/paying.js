$(document).ready(function(){
    Cart.refresh_the_cart();
    Cart.show_paying_items();
    Cart.show_promotion_items();
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
            '<td>'+(item.price*item.count)+'元</td>'
    );
    return item_detail;
};

var paying_item_detail_generator_promotion = function(item){
    var item_detail =$('<tr><td>'+item.kind+'</td><td>'
            +item.name+'</td><td>'+
            item.price+'</td><td>'+
            item.unit+'</td><td>' +
            item.count+'</td>'+
            '<td>'+(item.price*(item.count-item.free_number))+'元（原价：'+(item.price*item.count)+'元）</td>'
    );
    return item_detail;
};