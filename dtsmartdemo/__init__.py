from __future__ import unicode_literals
import frappe

__version__ = '0.0.2'

if frappe.conf and frappe.conf.get("app_logo_url"):
    __logo__ = frappe.conf.get("app_logo_url") or '/assets/dtsmartdemo/images/dtsmartdemo.png'
else:
    __logo__ = '/assets/dtsmartdemo/images/dtsmartdemo.png'