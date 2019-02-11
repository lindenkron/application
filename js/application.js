var mm = {
    dark: {
        d: "Light Mode",
        m: "sun"
    },
    light: {
        d: "Dark Mode",
        m: "moon"
    }
};

function updateSyntax() {
    var char = $('#char-field').val();
    var age = $('#age-field').val();
    var short = $('#short-field').val();
    var long = $('#long-field').val();
    var days = '';
    var apptext = '';
    var short_words = $("#short-field").val().trim().split(/\s+/).length;

    for (var i = 0; i <= 6; i++) {
        var checkbox = document.getElementById('d' + i + '-field');
        var day = $('#d' + i + '-field').val();
        if (checkbox.checked) {
            days = days + ' ' + day;
        }
    }
    if (char && days && (short_words == 3) && (long.length > 0 && long.length < 1001) && (age > 15 && age < 81 )) {
        days = days.substring(1);
        apptext = '-apply "' + char + '" "' + age + '" "' + days + '" "' + short + '" "' + long + '"';
    }
    $('#syntax').text(apptext);
    $('#lrg-rep').toggleClass('hidden', long.length <= 1000);
    $('#threewords').toggleClass('hidden', short_words <= 3);
}

function pageLoad(page) {
    window.sct = 1;
    var cb_btn = '';
    var st = '';
    switch (page) {
        case "create":
            $('div#content').on('input', 'input[id*="-field"]', updateSyntax);
            $('div#content').on('input', 'checkbox[id*="-field"]', updateSyntax);
            $('div#content').on('input', 'textarea[id*="-field"]', updateSyntax);
            cb_btn = '#copy-btn';
            st = '#syntax';
            break;
    }
    var cb = new ClipboardJS(cb_btn, {
        text: function(trigger) {
            return $(st).text();
        }
    });
    cb.on('success', function(e) {
        $(e.trigger).html('Copied');
        setTimeout(function() {
        $(e.trigger).html('Copy');
        }, 2000);
    });
    $('body').on('click', 'a[id*="switch-"]', switchMode);
    if (loadTheme()) {
        switchMode();
    }
}

function loadTheme() {
    var light = false;
    if (typeof(Storage) !== 'undefined') {
        light = (localStorage.getItem('light') == 'true');
    }
    return light;
}

function setTheme() {
    if (typeof(Storage) !== 'undefined') {
        var light = false;
        if ($('body').attr('class') == 'light') {
            light = true;
        }
        localStorage.setItem('light', light.toString());
    }
}

function switchMode() {
    var bc = $('body').toggleClass('light')[0].className;
    if (bc == '') {
        bc = 'dark';
    }
    $('#switch-mobile').html('<i class="far fa-' + mm[bc].m + '"></i>');
    $('#switch-desktop').html('<i class="far fa-' + mm[bc].m + '"></i> ' + mm[bc].d);
    setTheme();
}
