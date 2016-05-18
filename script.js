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
    
    var PLACEHOLDER = 'Назва товару';
    
    var $buylist = $('.buylist');
    var $addBtn = $('input[type="submit"]');
    var $textField = $('input[name="item-name"]');
    
    $textField.focusin(function (e) {
        $(this).val('');
    });
    
    $textField.focusout(function (e) {
        $(this).val(PLACEHOLDER);
    });
    
    function addItem(name) {
        var $node = $(ITEM_TEMPLATE);
        var $name = $node.find('.half-row .name');
        var $incBtn = $node.find('.half-row .group.center .inc');
        var $decBtn = $node.find('.half-row .group.center .dec');
        var $num = $node.find('.half-row .group.center input[name="num-of-items"]');
        
        $name.text(name);
        
        // TODO add delete logic here
        
        $incBtn.addClass('muted-green');
        $decBtn.addClass('muted-red');
        
        $incBtn.click(function (e) {
            if ($incBtn.hasClass('muted-green'))
               $incBtn.removeClass('muted-green');
            if ($decBtn.hasClass('muted-red'))
               $decBtn.removeClass('muted-red');
            $num.val(parseInt($num.val()) + 1);
        });
        
        $decBtn.click(function (e) {
            var n = parseInt($num.val()) - 1;
            if (n < 1) return;
            $num.val(n);
            if (n <= 1) {
               $incBtn.addClass('muted-green');
               $decBtn.addClass('muted-red');  
            }
        });
        
        $buylist.append($node);
    
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