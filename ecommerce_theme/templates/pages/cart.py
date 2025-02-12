# Copyright (c) 2021, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt
import frappe

no_cache = 1

from webshop.webshop.shopping_cart.cart import get_cart_quotation


def get_context(context):
	context.body_class = "product-page"
	context.parents = [{"name": frappe._("Home"), "route": "/"}]
	context.update(get_cart_quotation())
