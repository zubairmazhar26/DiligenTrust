$(window).on('load', function() {
    frappe.after_ajax(function () {
        console.log("Helpppp Menu", frappe.boot.whitelabel_setting.show_help_menu)
        if (frappe.boot.whitelabel_setting.show_help_menu) {
            
            // $('.dropdown-help').css('display','block');
            $('.dropdown-help').attr('style', 'display: block !important');
        } else {
            $('.dropdown-help').attr('style', 'display: none !important');
        }
        if (frappe.boot.whitelabel_setting.logo_width) {
            $('.app-logo').css('width',frappe.boot.whitelabel_setting.logo_width+'px');
        }
        if (frappe.boot.whitelabel_setting.logo_height) {
            $('.app-logo').css('height',frappe.boot.whitelabel_setting.logo_height+'px');
            $('.app-logo').css('max-height',frappe.boot.whitelabel_setting.logo_height+'px');
        }else {}

    })
})


