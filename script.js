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
        var $name = $node.find('.half-row .name');
        var $incBtn = $node.find('.half-row .group.center .inc');
        var $decBtn = $node.find('.half-row .group.center .dec');
        
        $name.text(name);
        
        // TODO add delete logic here
        
        $buylist.append($node);
        console.log($incBtn);
        $incBtn.addClass('muted-green');
        $decBtn.addClass('muted-red');
    }
    
    $addBtn.click(function (e) {
        e.preventDefault();
        addItem($textField.val());
    });
    
    
    // default items
    addItem('Помідори');
    addItem('Печиво');
    addItem('Сир');
});