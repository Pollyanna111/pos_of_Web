$(document).ready(function(){
    Cart.refresh_the_cart();
    Cart.show_cart_items();
    Cart.show_the_total_cost();
    $('.cut').on('click',function(){
        Cart.cut_item_from_cart($(this).closest('td').prev('td').prev('td').prev('td').text(),this);
        Cart.show_the_total_cost();
        if(Cart.get_the_cart_number() === 0){
            console.log('aaa');
            window.location.href='item_list.html';
        }
    });
    $('.add').on('click',function(){
        Cart.add_item_number($(this).closest('td').prev('td').prev('td').prev('td').text(),this);
        Cart.show_the_total_cost();
    });
});


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

