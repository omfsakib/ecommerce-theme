app_name = "ecommerce_theme"
app_title = "Ecommerce Theme"
app_publisher = "Md Omar Faruk"
app_description = "A theme builder for e-commerce webshop"
app_email = "omfsakib@gmail.com"
app_license = "agpl-3.0"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "ecommerce_theme",
# 		"logo": "/assets/ecommerce_theme/logo.png",
# 		"title": "Ecommerce Theme",
# 		"route": "/ecommerce_theme",
# 		"has_permission": "ecommerce_theme.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/ecommerce_theme/css/ecommerce_theme.css"
# app_include_js = "/assets/ecommerce_theme/js/ecommerce_theme.js"

# include js, css files in header of web template
# web_include_css = [
# 	"/assets/ecommerce_theme/css/e_commerce_theme_style.css",
# 	"/assets/ecommerce_theme/libs/tobii/css/tobii.min.css",
# 	"/assets/ecommerce_theme/libs/@mdi/font/css/materialdesignicons.min.css"
# ]
# web_include_js = [
# 	"/assets/ecommerce_theme/js/app.js",
# 	"/assets/ecommerce_theme/js/plugins.init.js",
# 	"/assets/ecommerce_theme/libs/feather-icons/feather.min.js",
# 	"/assets/ecommerce_theme/libs/tobii/js/tobii.min.js",
# ]

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "ecommerce_theme/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "ecommerce_theme/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
jinja = {
	"methods": [
		"ecommerce_theme.utils.get_webshop_settings",
		"ecommerce_theme.utils.get_cart_products",
		"ecommerce_theme.utils.get_product_info",
		"ecommerce_theme.utils.get_product_reviews",
	],
}

# Installation
# ------------

# before_install = "ecommerce_theme.install.before_install"
# after_install = "ecommerce_theme.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "ecommerce_theme.uninstall.before_uninstall"
# after_uninstall = "ecommerce_theme.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "ecommerce_theme.utils.before_app_install"
# after_app_install = "ecommerce_theme.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "ecommerce_theme.utils.before_app_uninstall"
# after_app_uninstall = "ecommerce_theme.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "ecommerce_theme.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"ecommerce_theme.tasks.all"
# 	],
# 	"daily": [
# 		"ecommerce_theme.tasks.daily"
# 	],
# 	"hourly": [
# 		"ecommerce_theme.tasks.hourly"
# 	],
# 	"weekly": [
# 		"ecommerce_theme.tasks.weekly"
# 	],
# 	"monthly": [
# 		"ecommerce_theme.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "ecommerce_theme.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "ecommerce_theme.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "ecommerce_theme.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["ecommerce_theme.utils.before_request"]
# after_request = ["ecommerce_theme.utils.after_request"]

# Job Events
# ----------
# before_job = ["ecommerce_theme.utils.before_job"]
# after_job = ["ecommerce_theme.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"ecommerce_theme.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }
