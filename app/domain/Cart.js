function Cart(){
    this.bought_items = {};
}

Cart.add_item_to_cart = function(name){
    var items = Item.get_all_item();
    var item = new Item(items[name].kind,name,items[name].unit,items[name].price);
    item.put_to_order();
};

Cart.refresh_the_cart = function(){
    var cart_number = Cart.get_the_cart_number();
    $('.navbar').find('span').last().text('购物车（'+cart_number+'）');
};

Cart.get_the_cart_number = function(){
    var cart = Cart.get_cart(),num = 0;
    if(_(cart.bought_items).keys()){
        _(_(cart.bought_items).keys()).each(function(item_name){
            num += cart.bought_items[item_name].count;
        });
    }
    return num;
};

Cart.get_cart = function(){
    return JSON.parse(localStorage.getItem('cart')) || new Cart();
};

Cart.save_cart = function(cart){
    cart.bought_items = Cart.delete_item(cart);
    localStorage.setItem('cart',JSON.stringify(cart));
};

Cart.delete_item = function(cart){
    var skip;
    _(_(cart.bought_items).keys()).each(function(item){
        if(cart.bought_items[item].count === 0){
            skip = item;
        }
    });
    return _(cart.bought_items).omit(skip);
};

Cart.cut_item_from_cart = function(name,element){
    var cart = Cart.get_cart();
    if(!cart.bought_items[name]){
        return;
    }
    cart.bought_items[name].count--;
    Cart.save_cart(cart);
    Cart.recompute_it_with_promotion();
    Cart.display_cost(element,name);
    Cart.refresh_the_cart();
};

Cart.display_cost = function(element,name){
    var cart = Cart.get_cart();
    if(!cart.bought_items[name]){
        $(element).closest('td').next('td').text('0元');
        $(element).next('button').text(0);
        $(element).prev('button').text(0);
        return;
    }
    if(cart.bought_items[name].free_number === 0){
        $(element).closest('td').next('td').text(cart.bought_items[name].price*cart.bought_items[name].count+'元');
    }else {
        $(element).closest('td').next('td').text(cart.bought_items[name].price * (cart.bought_items[name].count - cart.bought_items[name].free_number) + '元(原价：' + cart.bought_items[name].price * cart.bought_items[name].count + '元)');
    }
    $(element).next('button').text(cart.bought_items[name].count);
    $(element).prev('button').text(cart.bought_items[name].count);
};

Cart.add_item_number = function(name,element){
    Cart.add_item_to_cart(name);
    Cart.recompute_it_with_promotion();
    Cart.display_cost(element,name);
    Cart.refresh_the_cart();
};

Cart.recompute_it_with_promotion = function(){
    var cart = Cart.get_cart();
    _(loadPromotions()).each(function(name) {
        if(cart.bought_items[name]){
            cart.bought_items[name].free_number = Math.floor(cart.bought_items[name].count / 3);
        }
    });
    Cart.save_cart(cart);
};

Cart.show_the_total_cost = function(){
    $('.font_weight').text('总计：'+Cart.total_cost());
};

Cart.total_cost = function(){
    var total_cost = 0, cart = Cart.get_cart();
    _(_(cart.bought_items).keys()).each(function(item_name){
        total_cost += (cart.bought_items[item_name].count-cart.bought_items[item_name].free_number)*cart.bought_items[item_name].price;
    });
    return total_cost;
};

Cart.show_cart_items = function(){
    var cart = Cart.get_cart(), item_detail;
    _(_(cart.bought_items).keys()).each(function(item_name) {
        item_detail = item_detail_generator(cart.bought_items[item_name]);
        if(cart.bought_items[item_name].free_number === 0){
            item_detail = item_detail_generator(cart.bought_items[item_name]);
        }else{
            item_detail = item_detail_generator_promotion(cart.bought_items[item_name]);
        }
        item_detail.appendTo($('table'));
    });

};

Cart.show_paying_items = function(){
    var cart = Cart.get_cart(), item_detail;
    _(_(cart.bought_items).keys()).each(function(item_name) {
        if(cart.bought_items[item_name].free_number === 0){
            item_detail = paying_item_detail_generator(cart.bought_items[item_name]);
        }else{
            item_detail = paying_item_detail_generator_promotion(cart.bought_items[item_name]);
        }
        item_detail.appendTo($('.bought_items'));
    });
};

Cart.show_promotion_items = function(){
    var cart = Cart.get_cart();
    _(_(cart.bought_items).keys()).each(function(item_name) {
        if(cart.bought_items[item_name]){

        }
    });
};