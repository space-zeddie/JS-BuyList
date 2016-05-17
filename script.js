$(function () {
    var ITEM_TEMPLATE =
        '<div class="buy-item row">' +
                '<div class="half-row">' +
                    '<div class="name">Name</div>' +
                    '<span class="group center">' +
                        '<button class="dec">-</button>' +
                        '<input type="text" name="num-of-items" value="1" readonly>' +
                        '<button class="inc">+</button>' +
                    '</span>' +
                '</div>' +
                '<span class="group right">' +
                    '<button class="bought-btn">Куплено</button>' +
                    '<button class="remove-btn">x</button>' +
                '</span>' +
        '</div>';
    
    var $buylist = $('.buylist');
    var $addBtn = $('input[type="submit"]');
    var $textField = $('input[name="item-name"]');
    
    function addItem(name) {
        var $node = $(ITEM_TEMPLATE);
        var $name = $node.find('.half-row').find('.name');
        
        console.log($name.text());
        
       // $name.val(name);
        $name.text(name);
        
        // TODO add delete logic here
        
        $buylist.append($node);
    }
    
    $addBtn.click(function (e) {
        e.preventDefault();
        addItem($textField.val());
    });
});