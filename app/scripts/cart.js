$(document).ready(function(){
    Cart.refresh_the_cart();
    var cart = Cart.get_cart(), item_detail;
    _(_(cart.bought_items).keys()).each(function(item_name){
        item_detail = item_detail_generator(cart.bought_items[item_name]);
        item_detail.appendTo($('table'));
    });

});


var item_detail_generator = function(item){
    var item_detail =$('<tr><td>'+item.kind+'</td><td>'
        +item.name+'</td><td>'+
        item.price+'</td><td>'+
        item.unit+'</td><td><div class="btn-group">' +
        '<button type="button" class="btn btn-default">-</button>' +
        '<button type="button" class="btn btn-default">'+item.count+'</button>' +
        '<button type="button" class="btn btn-default">+</button></div></td>'+
        '<td>'+(item.price*item.count)+'</td>'
    );
    return item_detail;
};
