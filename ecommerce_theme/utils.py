import frappe
import json
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

class ExtendedProductQuery(ProductQuery):
	def __init__(self):
		super().__init__()


	def add_display_details(self, result, discount_list, cart_items):
		"""Add price and availability details in result."""
		for item in result:
			item_code = item.item_code
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
					product_info = get_product_info_for_website(variant,
																skip_quotation_creation=True).get(
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
			product_info = get_product_info_for_website(item_code, skip_quotation_creation=True).get(
				"product_info"
			)

			if product_info and product_info["price"]:
				# update/mutate item and discount_list objects
				self.get_price_discount_info(item, product_info["price"], discount_list)

			if self.settings.show_stock_availability:
				self.get_stock_availability(item)

			item.in_cart = item.item_code in cart_items

			item.wished = False
			if frappe.db.exists(
				"Wishlist Item", {"item_code": item.item_code, "parent": frappe.session.user}
			):
				item.wished = True

		return result, discount_list

@frappe.whitelist(allow_guest=True)
def get_product_filter_data(query_args=None):
	"""
	Returns filtered products and discount filters.

	Args:
		query_args (dict): contains filters to get products list

	Query Args filters:
		search (str): Search Term.
		field_filters (dict): Keys include item_group, brand, etc.
		attribute_filters(dict): Keys include Color, Size, etc.
		start (int): Offset items by
		item_group (str): Valid Item Group
		from_filters (bool): Set as True to jump to page 1
	"""
	if isinstance(query_args, str):
		query_args = json.loads(query_args)

	query_args = frappe._dict(query_args)

	if query_args:
		search = query_args.get("search")
		field_filters = query_args.get("field_filters", {})
		attribute_filters = query_args.get("attribute_filters", {})
		start = cint(query_args.start) if query_args.get("start") else 0
		item_group = query_args.get("item_group")
		from_filters = query_args.get("from_filters")
	else:
		search, attribute_filters, item_group, from_filters = None, None, None, None
		field_filters = {}
		start = 0

	# if new filter is checked, reset start to show filtered items from page 1
	if from_filters:
		start = 0

	sub_categories = []
	if item_group:
		sub_categories = get_child_groups_for_website(item_group, immediate=True)

	engine = ExtendedProductQuery()

	try:
		result = engine.query(
			attribute_filters,
			field_filters,
			search_term=search,
			start=start,
			item_group=item_group,
		)
	except Exception:
		frappe.log_error("Product query with filter failed")
		return {"exc": "Something went wrong!"}

	# discount filter data
	filters = {}
	discounts = result["discounts"]

	if discounts:
		filter_engine = ProductFiltersBuilder()
		filters["discount_filters"] = filter_engine.get_discount_filters(discounts)

	return {
		"items": result["items"] or [],
		"filters": filters,
		"settings": engine.settings,
		"sub_categories": sub_categories,
		"items_count": result["items_count"],
	}
