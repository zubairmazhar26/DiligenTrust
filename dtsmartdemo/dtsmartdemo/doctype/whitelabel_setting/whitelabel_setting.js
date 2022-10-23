// Copyright (c) 2022, Muhammad Zubair and contributors
// For license information, please see license.txt

frappe.ui.form.on('Whitelabel Setting', {
	// refresh: function(frm) {

	// }
	after_save: function(frm) {
		frappe.ui.toolbar.clear_cache();
	}
});
