function Cart(){
    this.bought_items = {};
}

Cart.add_item_to_cart = function(name){
    var items = Item.get_all_item();
    var item = new Item(items[name].kind,name,items[name].unit,items[name].price);
    item.put_to_order();
    Cart.save_cart_number(+Cart.get_the_cart_number()+1);
};

Cart.refresh_the_cart = function(){
    var cart_number = Cart.get_the_cart_number();
    $('.navbar').find('span').last().text('购物车（'+cart_number+'）');
};

Cart.get_the_cart_number = function(){
    return localStorage.getItem('cart_number') || '0';
};

Cart.save_cart_number = function(number){
    localStorage.setItem('cart_number',number);
};

Cart.get_cart = function(){
    return JSON.parse(localStorage.getItem('cart')) || new Cart();
};

Cart.save_cart = function(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
};