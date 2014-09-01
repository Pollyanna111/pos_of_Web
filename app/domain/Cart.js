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
    $(element).closest('td').next('td').text(cart.bought_items[name].price*cart.bought_items[name].count+'元');
    Cart.save_cart(cart);
    $(element).next('button').text(+$(element).next('button').text()-1);
    Cart.refresh_the_cart();
};


Cart.add_item_number = function(name,element){
    Cart.add_item_to_cart(name);
    var cart = Cart.get_cart();
    $(element).closest('td').next('td').text(cart.bought_items[name].price*cart.bought_items[name].count+'元');
    $(element).prev('button').text(+$(element).prev('button').text()+1);
    Cart.refresh_the_cart();
};


Cart.recompute_it_with_promotion = function(){
    var buy_two_get_one_free = loadPromotions();
    var cart = Cart.get_cart();
    if(buy_two_get_one_free){
        _(buy_two_get_one_free).each(function(name) {
            if(cart.bought_items[name]){
                cart.bought_items[name].free_number = Math.floor(cart.bought_items[name].count / 3);
            }
        });
    }
    Cart.save_cart(cart);
};

