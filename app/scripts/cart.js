$(document).ready(function(){
    Cart.refresh_the_cart();
    Cart.recompute_it_with_promotion();
    show_cart_items();
    $('.cut').on('click',function(){
        Cart.cut_item_from_cart($(this).closest('td').prev('td').prev('td').prev('td').text(),this);
//        if(Cart.get_the_cart_number() === {}){
//
//        }怎么实现跳转功能
    });
    $('.add').on('click',function(){
        Cart.add_item_number($(this).closest('td').prev('td').prev('td').prev('td').text(),this);
    });
});

var show_cart_items = function(){
    var cart = Cart.get_cart(), item_detail;
    _(_(cart.bought_items).keys()).each(function(item_name) {
        console.log(cart.bought_items[item_name].free_number);
        if(cart.bought_items[item_name].free_number === 0){
            item_detail = item_detail_generator(cart.bought_items[item_name]);
        }else{
            item_detail = item_detail_generator_promotion(cart.bought_items[item_name]);
        }
        item_detail.appendTo($('table'));
    });
};

var item_detail_generator = function(item){
    var item_detail =$('<tr><td>'+item.kind+'</td><td>'
        +item.name+'</td><td>'+
        item.price+'</td><td>'+
        item.unit+'</td><td><div class="btn-group">' +
        '<button type="button" class="btn btn-default cut">-</button>' +
        '<button type="button" class="btn btn-default">'+item.count+'</button>' +
        '<button type="button" class="btn btn-default add">+</button></div></td>'+
        '<td>'+(item.price*item.count)+'元</td>'
    );
    return item_detail;
};

var item_detail_generator_promotion = function(item){
    var item_detail =$('<tr><td>'+item.kind+'</td><td>'
            +item.name+'</td><td>'+
            item.price+'</td><td>'+
            item.unit+'</td><td><div class="btn-group">' +
            '<button type="button" class="btn btn-default cut">-</button>' +
            '<button type="button" class="btn btn-default">'+item.count+'</button>' +
            '<button type="button" class="btn btn-default add">+</button></div></td>'+
            '<td>'+(item.price*(item.count-item.free_number))+'元（原价：'+(item.price*item.count)+'元）</td>'
    );
    return item_detail;
};
