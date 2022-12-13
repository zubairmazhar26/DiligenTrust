from erpnext.accounts.doctype.payment_request.payment_request import PaymentRequest
from frappe.model.document import Document


class Pay(document):
    def on_submit(self):
        if self.payment_request_type == "Outward":
			self.db_set("status", "Initiated")
			return
		elif self.payment_request_type == "Inward":
			self.db_set("status", "Requested")

		send_mail = self.payment_gateway_validation() if self.payment_gateway else None
		ref_doc = frappe.get_doc(self.reference_doctype, self.reference_name)

		# if (
		# 	hasattr(ref_doc, "order_type") and getattr(ref_doc, "order_type") == "Shopping Cart"
		# ) or self.flags.mute_email:
		# 	send_mail = False

		# if send_mail and self.payment_channel != "Phone":
		# 	self.set_payment_request_url()
		# 	self.send_email()
		# 	self.make_communication_entry()

		# elif self.payment_channel == "Phone":
		# 	self.request_phone_payment()