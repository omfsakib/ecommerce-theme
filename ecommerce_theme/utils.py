import frappe
from frappe.utils import flt
from webshop.webshop.doctype.item_review.item_review import get_item_reviews
from webshop.webshop.product_data_engine.query import ProductQuery
from webshop.webshop.shopping_cart.product_info import get_product_info_for_website


def get_webshop_settings():
	try:
		settings = frappe.get_doc("Webshop Settings")
		return settings
	except frappe.DoesNotExistError:
		return None


def get_cart_products():
	query = ProductQuery()
	return query.get_cart_items()


def get_price_discount_info(price_object):
	"""Return price details including discount information."""
	price_details = {}
	fields = ["formatted_mrp", "formatted_price", "price_list_rate"]

	# Fetch price details
	for field in fields:
		price_details[field] = price_object.get(field)

	# Check for discount and add to price details
	if price_object.get("discount_percent"):
		price_details["discount_percent"] = flt(price_object["discount_percent"])
		price_details["discount_amount"] = price_object.get("formatted_discount_rate") or \
										   price_object.get("formatted_discount_percent")

	return price_details


def get_product_info(item_code):
	"""
	Fetch product information including pricing and discount details.

	Args:
		item_code (str): Code of the product

	Returns:
		dict: Contains product pricing details including discount
	"""
	product_info = get_product_info_for_website(item_code, skip_quotation_creation=True).get(
		"product_info"
	)

	if product_info and product_info.get("price"):
		# Fetch price and discount information
		price_details = get_price_discount_info(product_info["price"])
		return price_details

	return {}


def get_product_reviews(web_item):
	return get_item_reviews(web_item)
