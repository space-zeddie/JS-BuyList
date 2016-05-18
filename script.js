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
    
    var CHECK_TEMPLATE =
        '<span class="item">' +
            'Name' +
            '<span class="number">0</span>' +
        '</span>';
    
    var PLACEHOLDER = 'Назва товару';
    var id = 0;
    
    var $buylist = $('.buylist');
    var $addBtn = $('input[type="submit"]');
    var $textField = $('input[name="item-name"]');
    
    $textField.focusin(function (e) {
        if ($(this).val() === PLACEHOLDER)
            $(this).val('');
    });
    
    $textField.focusout(function (e) {
        if ($(this).val() === '')
            $(this).val(PLACEHOLDER);
    });
    
    function checkItem(name, quantity, $where) {
        var $node = $(CHECK_TEMPLATE);
        $node.text(name);
        $node.find('.number').text(quantity);
        $where.append($node);
    }
    
    function addItem(name) {
        var $node = $(ITEM_TEMPLATE);
        var $name = $node.find('.half-row .name');
        var $incBtn = $node.find('.half-row .group.center .inc');
        var $decBtn = $node.find('.half-row .group.center .dec');
        var $boughtBtn = $node.find('.group.right .bought-btn');
        var $remBtn = $node.find('.group.right .remove-btn');
        var $num = $node.find('.half-row .group.center input[name="num-of-items"]');
        var ID = ++id;
        
        $name.text(name);
        $node.attr('id', ID+'');
        
        $incBtn.addClass('muted-green');
        $decBtn.addClass('muted-red');
        
        $remBtn.click(function (e) {
            $('#' + ID).remove();
        });
        
        $boughtBtn.click(function (e) {
            if ($(this).text() === 'Куплено') {
                $(this).text('Не куплено');
                $name.css('text-decoration', 'line-through');
                $remBtn.css('display', 'none');
                $incBtn.css('visibility', 'hidden');
                $decBtn.css('visibility', 'hidden');
            } else {
                $(this).text('Куплено');
                $name.css('text-decoration', 'none');
                $remBtn.css('display', 'initial');
                $incBtn.css('visibility', 'visible');
                $decBtn.css('visibility', 'visible');
            }
        });
        
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