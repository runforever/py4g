require(['gitbook', 'jQuery'], function (gitbook, $) {

    var apiHost = 'http://pyshell.daoapp.io',
        runShellApi = apiHost + '/run/shell',
        runSourceApi = apiHost + '/run/source';

    function insertPyShell() {
        var toggleBtnHtml = [
            '<p id="py-shell-toggle-btn"><span>$ python</span><span id="py-shell-btn-cursor">&nbsp;&nbsp;</span></p>'
        ]
        var pyShellHtml = [
            '<div id="py-shell-modal" style="display: none;" class="pure-g">',

            '<div id="py-shell-left" class="pure-u-1-2 py-shell-container">',
            '<p>',
            'Python 解释器 REPL，使用 Enter 运行代码，只能运行一行代码',
            '<textarea id="py-shell-ipython" class="pure-u-1" rows="16"></textarea>',
            '</p>',
            '</div>',

            '<div id="py-shell-right" class="pure-u-1-2 py-shell-container">',
            '<p id="py-shell-file-frame">',
            'Python 代码编辑器，点击运行按钮运行代码',
            '<textarea id="py-shell-editor" class="pure-u-1 py-shell-editor-molokai" rows="10"></textarea>',
            '</p>',

            '<p id="py-shell-btn-frame">',
            '<button id="py-shell-run-btn" class="pure-button pure-button-primary">运行</button>',
            '<button id="py-shell-clean-btn" class="pure-button pure-button-warning">清空</button>',
            '</p>',

            '<p>',
            '<textarea id="py-shell-ret-display" class="pure-u-1 py-shell-editor-molokai" rows="3" readonly></textarea>',
            '</p>',
            '</div>',

            '</div>'
        ]
        $('.page-inner section.normal:last').after(toggleBtnHtml.join(''));
        $('.book.with-summary').after(pyShellHtml.join(''));
    }

    function initIpython() {
        $('#py-shell-ipython').val('>>> ');
    }

    function initPythonEditor() {
        $('.py-shell-editor-molokai').val('');
    }

    $('body').on('click', '#py-shell-toggle-btn', function() {
        $('#py-shell-modal').toggle();
        initIpython();
        initPythonEditor();
    }).on('keydown', '#py-shell-ipython', function(event) {
        var keyCode = event.keyCode ? event.keyCode : event.keyCode;
        if (keyCode === 13) {
            var $textarea = $(this);
            var sourceCode = $textarea.val();
            var sourceCodeArray = sourceCode.split('\n');
            var lastLineCode = sourceCodeArray.pop().slice(4);

            $.ajax({
                type: 'POST',
                url: runShellApi,
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({code: lastLineCode}),
                success: function(data) {
                    var ret = data.ret,
                        shellDisplay = sourceCode + '\n' + ret + '>>> ';
                    $textarea.val(shellDisplay);
                }
            });
        }
    }).on('click', '#py-shell-run-btn', function() {
        var $textarea = $('#py-shell-editor'),
            sourceCode = $textarea.val();

        $.ajax({
            type: 'POST',
            url: runSourceApi,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({code: sourceCode}),
            success: function(data) {
                $('#py-shell-ret-display').val(data.ret);
            }
        })
    }).on('click', '#py-shell-clean-btn', function() {
        $('.py-shell-editor-molokai').val('');
    });

    gitbook.events.bind('page.change', function(event, config) {
        insertPyShell();
    });
});
