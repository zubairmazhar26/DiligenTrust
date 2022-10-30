// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

frappe.ready(function() {

	if(frappe.utils.get_url_arg('subject')) {
	  $('[name="subject"]').val(frappe.utils.get_url_arg('subject'));
	}

	$('.btn-send').off("click").on("click", function() {
		var user_name = $('[name="user_name"]').val();
		var email = $('[name="email"]').val();
		var mobile_no = $('[name="mobile_no"]').val();
		var company_name = $('[name="company_name"]').val();
		var message = $('[name="message"]').val();
		var subject = $('[name="subject"]').val();
		console.log("Details", "User Name", user_name, "Moble", mobile_no, "Company", company_name, "Message", message)

		if(!(email && message && user_name && mobile_no && company_name)) {
			frappe.msgprint('{{ _("Please enter all record so that we can get back to you. Thanks!") }}');
			return false;
		}

		if(!validate_email(email)) {
			frappe.msgprint('{{ _("You seem to have written your name instead of your email. Please enter a valid email address so that we can get back.") }}');
			$('[name="email"]').focus();
			return false;
		}

		$("#contact-alert").toggle(false);
		fetch('/api/method/dtsmartdemo.www.contact.send_message', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Frappe-CSRF-Token': frappe.csrf_token
			},
			body: JSON.stringify({
				subject: subject,
				sender: email,
				user_name: user_name,
				mobile_no: mobile_no,
				company_name: company_name,
				message: message,
			})
		})
		.then(r => r.json())
		.then(r => {
			if(r.message==="okay") {
				frappe.msgprint('{{ _("Thank you for your message") }}');
			} else {
				frappe.msgprint('{{ _("There were errors") }}');
				console.log(r.exc);
			}
		})

		fetch('/api/method/dtsmartdemo.templates.nutils.send_demo_message', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Frappe-CSRF-Token': frappe.csrf_token
			},
			body: JSON.stringify({
				subject: subject,
				sender: email,
				user_name: user_name,
				mobile_no: mobile_no,
				company_name: company_name,
				message: message,
			})
		})
		.then(r => r.json())
		.then(r => {
			if(r.message==="okay") {
				console.log("Lead")
			} else {
				frappe.msgprint('{{ _("There were errors") }}');
				console.log(r.exc);
			}
		})




		setTimeout(() => {
			fetch('/api/method/dtsmartdemo.www.contact.del_open', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-Frappe-CSRF-Token': frappe.csrf_token
				}
			})
			.then(r => r.json())
			.then(r => {
			})
		},4000)
	

		

	});

});

var msgprint = function(txt) {
	if(txt) $("#contact-alert").html(txt).toggle(true);
}
