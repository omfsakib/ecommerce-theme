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

	If item_code is a template item, find the variant with the lowest price
	and use that variant's item_code.

	Args:
		item_code (str): Code of the product

	Returns:
		dict: Contains product pricing details including discount
	"""
	# Check if the item is a template item (variant_of will be None if the item is a template)
	template_item_code = frappe.db.get_value("Item", item_code, "variant_of")

	if template_item_code is None:
		# The given item_code is a template, fetch all variants
		variant_item_codes = frappe.get_all(
			"Item",
			filters={"variant_of": item_code},
			pluck="name"
		)

		lowest_price = None
		lowest_price_variant_code = None

		# Iterate through each variant to get the price
		for variant in variant_item_codes:
			product_info = get_product_info_for_website(variant, skip_quotation_creation=True).get(
				"product_info"
			)
			if product_info and product_info.get("price"):
				current_price = product_info["price"].get("price_list_rate", 0)
				if lowest_price is None or current_price < lowest_price:
					lowest_price = current_price
					lowest_price_variant_code = variant

		# Use the variant with the lowest price if found
		if lowest_price_variant_code:
			item_code = lowest_price_variant_code

	# Fetch product info using the (possibly updated) item_code
	product_info = get_product_info_for_website(item_code, skip_quotation_creation=True).get(
		"product_info"
	)

	if product_info and product_info.get("price"):
		# Fetch price and discount information
		price_details = get_price_discount_info(product_info["price"])
		return price_details

	return {}


@frappe.whitelist(allow_guest=True)
def get_product_reviews(web_item):
	return get_item_reviews(web_item)
