$(document).ready(function(){
    Cart.refresh_the_cart();
    Cart.show_paying_items();
    Cart.show_promotion_items();
    Cart.show_the_cost();
    $('.text-right').find('.btn').on('click',function(){
        Cart.save_cart(new Cart());
    });
    show_time();
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

var show_time = function(){
    var time = $('<p class="pull-left">'+get_the_current_time()+'</p>');
    time.prependTo($(".panel-body"));
};

var get_the_current_time = function(){
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        text = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return text;
};

var dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
};