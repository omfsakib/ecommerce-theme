import frappe
import frappe.www.list
from erpnext.controllers.website_list_for_contact import get_transaction_list
from frappe import _
from webshop.templates.pages.wishlist import get_wishlist_items, set_stock_price_details
from webshop.webshop.doctype.webshop_settings.webshop_settings import get_shopping_cart_settings
from webshop.webshop.shopping_cart.cart import _set_price_list

no_cache = 1


def get_context(context):
	if frappe.session.user == "Guest":
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)

	context.current_user = frappe.get_doc("User", frappe.session.user)
	context.show_sidebar = False
	is_guest = frappe.session.user == "Guest"

	settings = get_shopping_cart_settings()
	items = get_wishlist_items() if not is_guest else []
	selling_price_list = _set_price_list(settings) if not is_guest else None

	items = set_stock_price_details(items, settings, selling_price_list)
	context.items = items
	context.sales_orders = (
		get_transaction_list(doctype="Sales Order")
		if settings.enable_checkout
		else get_transaction_list(doctype="Quotation")
	)
