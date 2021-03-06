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
            '<span class="iname">Name</span>' +
            '<span class="number">0</span>' +
        '</span>';
    var CHANGE_NAME_TEMPLATE = '<input type="text" name="change-name" value="Name">';
    
    var PLACEHOLDER = 'Назва товару';
    var id = 0;
    
    var $buylist = $('.buylist');
    var $addBtn = $('input[type="submit"]');
    var $textField = $('input[name="item-name"]');
    var $boughtCheck = $('.items.row.bought');
    var $leftCheck = $('.items.row.left');
    
    $textField.focusin(function (e) {
        if ($(this).val() === PLACEHOLDER)
            $(this).val('');
    });
    
    $textField.focusout(function (e) {
        if ($(this).val() === '')
            $(this).val(PLACEHOLDER);
    });
    
    function uncheckItem(name, quantity, id) {
        var $node = $(CHECK_TEMPLATE);
        $node.attr('id', 'i' + id);
        $node.find('.iname').text(name);
        $node.find('.number').text(quantity);
        
        var $checkedItem = $('#i' + id);
        if ($checkedItem) 
            $checkedItem.remove();
        
        $leftCheck.append($node);
    }
    
    function checkItem(name, quantity, id) {
        var $node = $(CHECK_TEMPLATE);
        $node.attr('id', 'i' + id);
        $node.find('.iname').text(name);
        $node.css('text-decoration', 'line-through');
        $node.find('.number').text(quantity);
        
        var $uncheckedItem = $('#i' + id);
        if ($uncheckedItem) 
            $uncheckedItem.remove();
        
        $boughtCheck.append($node);
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
        
        $name.click(function (e) {
            if ($(this).hasClass('changing')) return;
            $(this).addClass('changing');            
            var currentName = $name.text();
            $(this).text('');
            var $change = $(CHANGE_NAME_TEMPLATE);
            $change.val(currentName);
            
            function saveChanges () {
                var newName = $change.val() === '' ? currentName : $change.val();
                $change.remove();
                $name.text(newName);
                $('#i' + ID + ' .iname').text(newName);
                $name.removeClass('changing');
            }
            
            $change.bind('keyup', function (e) {                
                if (e.keyCode == 13) 
                    saveChanges();
            });
            $change.blur(saveChanges);
            
            $(this).append($change);
            $change.focus();
        });
        
        $remBtn.click(function (e) {
            $node.slideUp('slow', function (e) {
                $('#' + ID).remove();
                $('#i' + ID).remove();
            });
        });
        
        $boughtBtn.click(function (e) {
            $node.fadeOut('slow', function (e) {
                if ($boughtBtn.text() === 'Куплено') {
                    $boughtBtn.text('Не куплено');
                    $name.css('text-decoration', 'line-through');
                    $remBtn.css('display', 'none');
                    $incBtn.css('visibility', 'hidden');
                    $decBtn.css('visibility', 'hidden');
                    checkItem($name.text(), $num.val(), ID);
                } else {
                    $boughtBtn.text('Куплено');
                    $name.css('text-decoration', 'none');
                    $remBtn.css('display', 'initial');
                    $incBtn.css('visibility', 'visible');
                    $decBtn.css('visibility', 'visible');
                    uncheckItem($name.text(), $num.val(), ID);
                }
                $node.fadeIn('slow');
            });            
        });
        
        $incBtn.click(function (e) {
            if ($incBtn.hasClass('muted-green'))
               $incBtn.removeClass('muted-green');
            if ($decBtn.hasClass('muted-red'))
               $decBtn.removeClass('muted-red');
            $num.val(parseInt($num.val()) + 1);
            $('#i' + ID + ' .number').text($num.val());
        });
        
        $decBtn.click(function (e) {
            var n = parseInt($num.val()) - 1;
            if (n < 1) return;
            $num.val(n);
            $('#i' + ID + ' .number').text($num.val());
            if (n <= 1) {
               $incBtn.addClass('muted-green');
               $decBtn.addClass('muted-red');  
            }
        });
        
        $node.hide();
        $buylist.append($node);
        $node.slideDown('slow');
        uncheckItem(name, '1', ID);
    }
    
    $addBtn.click(function (e) {
        e.preventDefault();
        if ($textField.val() === '' || $textField.val() === PLACEHOLDER) return;
        addItem($textField.val());
        $textField.val('');
    });
    
    // default items
    addItem('Помідори');
    addItem('Печиво');
    addItem('Сир');
});