/* Template Name: Cartzio - Fashion Store eCommerce Tailwind CSS Landing Template
   Author: Shreethemes
   Email: support@shreethemes.in
   Website: https://shreethemes.in
   Version: 1.0.0
   Created: March 2023
   File Description: Main JS file of the template
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Menu Sticky          *
 *     06.  Back to top          *
 *     07.  Active Sidebar Menu  *
 *     08.  Feather icon         *
 *     09.  Small Menu           *
 *     10.  Contact JS           *
 *     11.  Light & Dark Theme   *
 *     12.  LTR & RTL Mode       *
 ================================*/

window.addEventListener('load', fn, false)

//  window.onload = function loader() {
function fn() {
	// Preloader
	if (document.getElementById('preloader')) {
		setTimeout(() => {
			document.getElementById('preloader').style.visibility = 'hidden';
			document.getElementById('preloader').style.opacity = '0';
		}, 350);
	}
	// Menus
	activateMenu();
}

//Menu
/*********************/
/* Toggle Menu */

/*********************/
function toggleMenu() {
	document.getElementById('isToggle').classList.toggle('open');
	var isOpen = document.getElementById('navigation')
	if (isOpen.style.display === "block") {
		isOpen.style.display = "none";
	} else {
		isOpen.style.display = "block";
	}
};
/*********************/
/*    Menu Active    */

/*********************/
function getClosest(elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) {
			}
			return i > -1;
		};
	}

	// Get the closest matching element
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (elem.matches(selector)) return elem;
	}
	return null;

};

function activateMenu() {
	var menuItems = document.getElementsByClassName("sub-menu-item");
	if (menuItems) {

		var matchingMenuItem = null;
		for (var idx = 0; idx < menuItems.length; idx++) {
			if (menuItems[idx].href === window.location.href) {
				matchingMenuItem = menuItems[idx];
			}
		}

		if (matchingMenuItem) {
			matchingMenuItem.classList.add('active');


			var immediateParent = getClosest(matchingMenuItem, 'li');

			if (immediateParent) {
				immediateParent.classList.add('active');
			}

			var parent = getClosest(immediateParent, '.child-menu-item');
			if (parent) {
				parent.classList.add('active');
			}

			var parent = getClosest(parent || immediateParent, '.parent-menu-item');

			if (parent) {
				parent.classList.add('active');

				var parentMenuitem = parent.querySelector('.menu-item');
				if (parentMenuitem) {
					parentMenuitem.classList.add('active');
				}

				var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
				if (parentOfParent) {
					parentOfParent.classList.add('active');
				}
			} else {
				var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
				if (parentOfParent) {
					parentOfParent.classList.add('active');
				}
			}
		}
	}
}

/*********************/
/*  Clickable manu   */
/*********************/
if (document.getElementById("navigation")) {
	var elements = document.getElementById("navigation").getElementsByTagName("a");
	for (var i = 0, len = elements.length; i < len; i++) {
		elements[i].onclick = function (elem) {
			if (elem.target.getAttribute("href") === "javascript:void(0)") {
				var submenu = elem.target.nextElementSibling.nextElementSibling;
				submenu.classList.toggle('open');
			}
		}
	}
}
/*********************/
/*   Menu Sticky     */

/*********************/
function windowScroll() {
	const navbar = document.getElementById("topnav");
	if (navbar != null) {
		if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
			navbar.classList.add("nav-sticky");
		} else {
			navbar.classList.remove("nav-sticky");
		}
	}
}

window.addEventListener('scroll', (ev) => {
	ev.preventDefault();
	windowScroll();
})
/*********************/
/*    Back To TOp    */
/*********************/

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	var mybutton = document.getElementById("back-to-top");
	if (mybutton != null) {
		if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
			mybutton.classList.add("flex");
			mybutton.classList.remove("hidden");
		} else {
			mybutton.classList.add("hidden");
			mybutton.classList.remove("flex");
		}
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

/*********************/
/*  Active Sidebar   */
/*********************/
(function () {
	var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
	;
	if (current === "") return;
	var menuItems = document.querySelectorAll('.sidebar-nav a');
	for (var i = 0, len = menuItems.length; i < len; i++) {
		if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
			menuItems[i].parentElement.className += " active";
		}
	}
})();

/*********************/
/*   Feather Icons   */
/*********************/
feather.replace();

/*********************/
/*     Small Menu    */
/*********************/
try {
	var spy = new Gumshoe('#navmenu-nav a');
} catch (err) {

}


/*********************/
/*     Contact Form  */
/*********************/

try {
	function validateForm() {
		var name = document.forms["myForm"]["name"].value;
		var email = document.forms["myForm"]["email"].value;
		var subject = document.forms["myForm"]["subject"].value;
		var comments = document.forms["myForm"]["comments"].value;
		document.getElementById("error-msg").style.opacity = 0;
		document.getElementById('error-msg').innerHTML = "";
		if (name == "" || name == null) {
			document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
			fadeIn();
			return false;
		}
		if (email == "" || email == null) {
			document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
			fadeIn();
			return false;
		}
		if (subject == "" || subject == null) {
			document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
			fadeIn();
			return false;
		}
		if (comments == "" || comments == null) {
			document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
			fadeIn();
			return false;
		}
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("simple-msg").innerHTML = this.responseText;
				document.forms["myForm"]["name"].value = "";
				document.forms["myForm"]["email"].value = "";
				document.forms["myForm"]["subject"].value = "";
				document.forms["myForm"]["comments"].value = "";
			}
		};
		xhttp.open("POST", "php/contact.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
		return false;
	}

	function fadeIn() {
		var fade = document.getElementById("error-msg");
		var opacity = 0;
		var intervalID = setInterval(function () {
			if (opacity < 1) {
				opacity = opacity + 0.5
				fade.style.opacity = opacity;
			} else {
				clearInterval(intervalID);
			}
		}, 200);
	}
} catch (error) {

}

/*********************/
/* Dark & Light Mode */
/*********************/
try {
	// Function to apply theme based on the mode
	function applyTheme(theme) {
		const htmlTag = document.getElementsByTagName("html")[0];
		htmlTag.className = theme;
		localStorage.setItem('theme', theme);
	}

	// Function to change theme on user interaction
	function changeTheme(e) {
		e.preventDefault();
		const htmlTag = document.getElementsByTagName("html")[0];
		const currentTheme = htmlTag.className.includes("dark") ? 'light' : 'dark';
		applyTheme(currentTheme);
	}

	// Initialize theme on page load
	function initializeTheme() {
		const savedTheme = localStorage.getItem('theme') || 'light';
		applyTheme(savedTheme);
	}

	// Event listeners for the theme toggle elements
	const switcher = document.getElementById("theme-mode");
	switcher?.addEventListener("click", changeTheme);

	const chk = document.getElementById('chk');
	chk?.addEventListener('change', changeTheme);

	// Set the initial theme when the page loads
	initializeTheme();

} catch (err) {
	console.error("Error in theme switcher: ", err);
}


/*********************/
/* LTR & RTL Mode */
/*********************/
try {
	const htmlTag = document.getElementsByTagName("html")[0]

	function changeLayout(e) {
		e.preventDefault()
		const switcherRtl = document.getElementById("switchRtl")
		if (switcherRtl.innerText === "LTR") {
			htmlTag.dir = "ltr"
		} else {
			htmlTag.dir = "rtl"
		}

	}

	const switcherRtl = document.getElementById("switchRtl")
	switcherRtl?.addEventListener("click", changeLayout)
} catch (err) {
}

const OriginalProductSearch = webshop.ProductSearch;
webshop.ProductSearch = class CustomProductSearch extends OriginalProductSearch {
	constructor(opts) {
		super(opts);
	}

	setupSearchResultContainer() {
		this.search_dropdown = this.search_area.append(`
			<div class="overflow-hidden shadow dropdown-menu w-100 hidden px-3"
				id="search-results-container"
				aria-labelledby="dropdownMenuSearch"
				style="display: flex; flex-direction: column;">
			</div>
		`).find("#search-results-container");

		this.setupCategoryContainer();
		this.setupProductsContainer();
		this.setupRecentsContainer();
	}

	setupProductsContainer() {
		this.products_container = this.search_dropdown.append(`
			<div id="product-results mt-2">
				<div class="flex flex-col space-y-1" id="product-scroll" style="overflow: scroll; max-height: 300px">
				</div>
			</div>
		`).find("#product-scroll");
	}


	populateRecentSearches() {
		let recents = this.getRecentSearches();

		if (!recents.length) {
			this.recents_container.html(`<span class=""text-muted">No searches yet.</span>`);
			return;
		}

		let html = "";
		recents.forEach((key) => {
			html += `
				<div class="recent-search flex space-x-1 items-center" style="font-size: 13px">
					<span class="mr-1">
						<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M8.00027 5.20947V8.00017L10 10" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
					<span>${key}</span>
				</div>
			`;
		});

		this.recents_container.html(html);
		this.attachEventListenersToChips();
	}

	populateResults(product_results) {
		if (!product_results || product_results.length === 0) {
			let empty_html = ``;
			this.products_container.html(empty_html);
			return;
		}

		let html = "";

		product_results.forEach((res) => {
			let thumbnail = res.thumbnail || '/assets/webshop/images/cart-empty-state.png';
			html += `
				<div class="dropdown-item flex space-x-1">
					<img class="item-thumb col-2" src=${encodeURI(thumbnail)} />
					<div class="col-9" style="white-space: normal;">
						<a class="hover:text-orange-500 lg:text-sm md:text-sm text-xs font-medium" href="/${res.route}">${res.web_item_name}</a>
					</div>
				</div>
			`;
		});

		this.products_container.html(html);
	}

	populateCategoriesList(category_results) {
		if (!category_results || category_results.length === 0) {
			let empty_html = `
				<div class="category-container mt-2">
					<div class="category-chips">
					</div>
				</div>
			`;
			this.category_container.html(empty_html);
			return;
		}

		let html = `
			<div class="mb-2">
				<b>${__("Categories")}</b>
			</div>
		`;

		category_results.forEach((category) => {
			html += `
				<a href="/${category.route}" class="btn btn-sm text-base text-center rounded-md px-2.5 bg-orange-500/10 border border-orange-500 mr-2 mb-2"
					role="button">
				${category.name}
				</button>
			`;
		});

		this.category_container.html(html);
	}
}
$(document).ready(function () {
	new webshop.ProductSearch({
		search_box_id: "#search-box"
	});
});

const OriginalProductView = webshop.ProductView;
webshop.ProductView = class CustomProductView extends OriginalProductView {
	constructor(options) {
		super(options);
	}

	get_item_filter_data(from_filters = false) {
		// Get and render all Product related views
		let me = this;
		this.from_filters = from_filters;
		let args = this.get_query_filters();

		this.disable_view_toggler(true);

		frappe.call({
			method: "ecommerce_theme.utils.get_product_filter_data",
			args: {
				query_args: args
			},
			callback: function (result) {
				if (!result || result.exc || !result.message || result.message.exc) {
					me.render_no_products_section(true);
				} else {
					// Sub Category results are independent of Items
					if (me.item_group && result.message["sub_categories"].length) {
						me.render_item_sub_categories(result.message["sub_categories"]);
					}

					if (!result.message["items"].length) {
						// if result has no items or result is empty
						me.render_no_products_section();
					} else {
						// Add discount filters
						me.re_render_discount_filters(result.message["filters"].discount_filters);

						// Render views
						me.render_list_view(result.message["items"], result.message["settings"]);
						me.render_grid_view(result.message["items"], result.message["settings"]);

						me.products = result.message["items"];
						me.product_count = result.message["items_count"];
					}

					// Bind filter actions
					if (!from_filters) {
						// If `get_product_filter_data` was triggered after checking a filter,
						// don't touch filters unnecessarily, only data must change
						// filter persistence is handle on filter change event
						me.bind_filters();
						me.restore_filters_state();
					}

					// Bottom paging
					me.add_paging_section(result.message["settings"]);
				}

				me.disable_view_toggler(false);
			}
		});
	}

	prepare_toolbar() {
		this.products_section.append(`
			<div class="toolbar flex justify-between items-center mb-6 h-8">
			</div>
		`);
		this.prepare_search();
		this.prepare_view_toggler();
	}

	prepare_search() {
		$(".toolbar").append(`
			<span class="py-1 px-2 font-medium tracking-wide align-middle duration-500 text-base text-center bg-orange-500/10 text-orange-500 rounded-md me-2 mt-2 md:hidden block show-filter">Show Filter</span>
			<span class="font-semibold md:block hidden"></span>
		`);
	}

	render_view_toggler() {
		$(".toolbar").append(`<div class="toggle-container md:flex items-center"></div>`);

		["btn-list-view", "btn-grid-view"].forEach(view => {
			let icon = view === "btn-list-view" ? "list" : "image-view";
			let svgIcon = icon === 'image-view' ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;

			$(".toggle-container").append(`
            <div class="py-1 px-2 inline-block font-medium tracking-wide align-middle duration-500 text-base text-center bg-orange-500/10 text-orange-500 rounded-md me-2 mt-2 flex items-center" id="toggle-view">
                <button id="${icon}" class="btn ${view}">
                    ${svgIcon}
                </button>
            </div>
        `);
		});
	}

	prepare_product_area_wrapper(view) {
		let class_name = view == "list" ? "grid grid-cols-1 gap-6" : "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-6";
		return this.products_section.append(`
			<div id="products-${view}-area" class="${class_name} w-100 products-list" itemscope itemtype="https://schema.org/Product"></div>
		`);
	}

	add_paging_section(settings) {
		$(".product-paging-area").remove();

		if (this.products) {
			let paging_html = `
			<div class="container mt-6 product-paging-area">
				<div class="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
				    <div class=""></div>
					<div class="lg:col-span-3 flex justify-between items-center">
			`;
			let query_params = frappe.utils.get_query_params();
			let start = query_params.start ? cint(JSON.parse(query_params.start)) : 0;
			let page_length = settings.products_per_page || 0;

			let prev_disable = start > 0 ? "" : "disabled";
			let next_disable = (this.product_count > page_length) ? "" : "disabled";

			paging_html += `
				<button class="py-1 px-2 inline-block font-medium tracking-wide align-middle duration-500 text-base text-center bg-orange-500/10 text-orange-500 rounded-md me-2 mt-2 btn-prev" data-start="${start - page_length}"
					${prev_disable}>
					${__("Prev")}
				</button>`;

			paging_html += `
				<button class="py-1 px-2 inline-block font-medium tracking-wide align-middle duration-500 text-base text-center bg-orange-500/10 text-orange-500 rounded-md me-2 mt-2 btn-next" data-start="${start + page_length}"
					${next_disable}>
					${__("Next")}
				</button>
			`;

			paging_html += `</div></div></div>`;

			$(".page_content").append(paging_html);
			this.bind_paging_action();
		}
	}
}

const OriginalProductList = webshop.ProductList;
webshop.ProductList = class CustomProductList extends OriginalProductList {
	constructor(options) {
		super(options);
	}

	make() {
		let me = this;
		let html = ``;

		this.items.forEach(item => {
			let title = item.web_item_name || item.item_name || item.item_code || "";
			title = title.length > 200 ? title.substr(0, 200) + "..." : title;

			html += `<div class='group relative duration-500 w-full mx-auto'>
						<div class="md:flex items-center">`;
			html += me.get_image_html(item, title, me.settings);
			html += me.get_row_body_html(item, title, me.settings);
			html += `</div></div>`;
		});

		let $product_wrapper = this.products_section;
		$product_wrapper.append(html);
	}

	get_image_html(item, title, settings) {
		let image = item.website_image;
		let wishlist_enabled = !item.has_variants && settings.enable_wishlist;
		let image_html = ``;

		if (image) {
			image_html += `
				<div class="relative overflow-hidden md:shrink-0 shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
					<img itemprop="image" class="h-full w-full object-cover md:w-48 rounded-md group-hover:scale-110 duration-500" alt="${title}"
						src="${image}">
						<ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
							${wishlist_enabled ? this.get_wishlist_icon(item) : ''}
							<li class="mt-1"><a href="/${item.route || '#'}" class="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye size-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a></li>
						</ul>
						${item.discount ? `
							<ul class="list-none absolute top-[10px] start-4">
								<li><a href="javascript:void(0)" class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-${item.discount} Off</a></li>
							</ul>
						` : ''}
				</div>
			`;
		} else {
			image_html += `
				<div class="relative overflow-hidden md:shrink-0 shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500 list-image">
					<div class="card-img-top no-image-list">
						${frappe.get_abbr(title)}
					</div>
					${wishlist_enabled ? this.get_wishlist_icon(item) : ''}
				</div>
			`;
		}

		return image_html;
	}

	get_wishlist_icon(item) {
		return `
        <li>
			<a href="javascript:void(0)" class="${item.wished ? "like-action-wished" : ''} size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
			data-item-code="${item.item_code}">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart size-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
			</a>
		</li>
		`;
	}

	get_row_body_html(item, title, settings) {
		let body_html = `<div class='md:ms-6 md:mt-0 mt-4'>`;
		body_html += this.get_title_html(item, title, settings);
		body_html += this.get_item_details(item, settings);
		body_html += '<div class="mt-4">'
		body_html += this.get_primary_button(item, settings);
		body_html += `</div> </div>`;
		return body_html;
	}

	get_title_html(item, title, settings) {
		let title_html = `<a href="/${item.route || '#'}" class="hover:text-orange-500 text-lg font-medium">${title}</a>`;
		return title_html;
	}

	get_item_details(item, settings) {
		let details = `
			<p class="text-slate-400 md:block hidden mt-2">
				${item.item_group} | Item Code : ${item.item_code}
			</p>
			<p class="text-slate-400 md:block hidden mt-2">
				${item.short_description || ''}
			</p>
			<div class="mt-2" itemprop="offers" itemscope itemtype="https://schema.org/AggregateOffer">
				${item.formatted_price || ''}
		`;

		if (item.formatted_mrp) {
			details += `
				<small class="striked-price">
					<s>${item.formatted_mrp ? item.formatted_mrp.replace(/ +/g, "") : ""}</s>
				</small>
				<small class="ml-1 product-info-green">
					${item.discount} OFF
				</small>
			`;
		}

		details += this.get_stock_availability(item, settings);
		details += `</div>`;

		return details;
	}

	get_primary_button(item, settings) {
		if (item.has_variants) {
			return `
				<a href="/${item.route || '#'}">
					<div
					style="visibility: visible" class="btn-explore-variants py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white rounded-md">
						${__('Explore')}
					</div>
				</a>
			`;
		} else if (settings.enabled && (settings.allow_items_not_in_stock || item.in_stock)) {
			return `
				<div id="${item.name}" class="btn-add-to-cart-list py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white rounded-md
					${item.in_cart ? 'hidden' : ''}"
					data-item-code="${item.item_code}"
					style="visibility: visible"
					>
					${settings.enable_checkout ? __('Add to Cart') : __('Add to Quote')}
				</div>

				<a href="/cart">
					<div id="${item.name}" class="btn-add-to-cart-list py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white rounded-md
						${item.in_cart ? '' : 'hidden'}"
						data-item-code="${item.item_code}"
						style="padding: 0.25rem 1rem; min-width: 135px; visibility: visible">
						${settings.enable_checkout ? __('Go to Cart') : __('Go to Quote')}
					</div>
				</a>
			`;
		} else {
			return ``;
		}
	}
}

const OriginalProductGrid = webshop.ProductGrid;
webshop.ProductGrid = class CustomProductGrid extends OriginalProductGrid {
	constructor(options) {
		super(options);
	}

	make() {
		let me = this;
		let html = ``;

		this.items.forEach(item => {
			let title = item.web_item_name || item.item_name || item.item_code || "";
			title = title.length > 90 ? title.substr(0, 90) + "..." : title;

			html += `<div class="group"><div class="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">`;
			html += me.get_image_html(item, title);
			html += `<div class="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">`
			html += me.get_primary_button(item, me.settings);
			html += `</div>`
			html += me.get_hover_buttons(item, me.settings);
			html += `</div>`;
			html += me.get_card_body_html(item, title, me.settings);
			html += `</div>`;
		});

		let $product_wrapper = this.products_section;
		$product_wrapper.append(html);
	}

	get_image_html(item, title) {
		let image = item.website_image;

		if (image) {
			return `
				<div class="group-hover:scale-110 duration-500">
						<img itemprop="image" class="card-img" src="${image}" alt="${title}">
				</div>
			`;
		} else {
			return `
				<div class="group-hover:scale-110 duration-500">
					<a href="/${item.route || '#'}" style="text-decoration: none;">
						<div class="card-img-top no-image">
							${frappe.get_abbr(title)}
						</div>
					</a>
				</div>
			`;
		}
	}

	get_primary_button(item, settings) {
		if (item.has_variants) {
			return `
					<a style="visibility: visible" href="/${item.route || '#'}"  class="btn-explore-variants text-sm py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md">
						${__('Explore')}
					</a>
			`;
		} else if (settings.enabled && (settings.allow_items_not_in_stock || item.in_stock)) {
			return `
					<div id="${item.name}" class="btn-add-to-cart-list text-sm py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md
						${item.in_cart ? 'hidden' : ''}"
						data-item-code="${item.item_code}"
						style="visibility: visible">
						${settings.enable_checkout ? __('Add to Cart') : __('Add to Quote')}
					</div>

				<a href="/cart">
					<div id="${item.name}" class="btn-add-to-cart-list
						 py-2 px-5 inline-block text-sm font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md
						${item.in_cart ? '' : 'hidden'}"
						data-item-code="${item.item_code}"
						style="visibility: visible">
						${settings.enable_checkout ? __('Go to Cart') : __('Go to Quote')}
					</div>
				</a>
			`;
		} else {
			return ``;
		}
	}

	get_hover_buttons(item, settings) {
		let button_html = `<ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">`
		// get floating elements
		if (!item.has_variants) {
			if (settings.enable_wishlist) {
				button_html += this.get_wishlist_icon(item);
			}

		}
		button_html += `<li class="mt-1"><a href="/${item.route || '#'}" class="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye size-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a></li>`
		button_html += `</ul>`;
		if (item.discount) {
			button_html += `<ul class="list-none absolute top-[10px] start-4">
				<li><a href="javascript:void(0)"
				   class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">-${item.discount} Off
				</a></li>
			</ul>`
		}
		return button_html
	}

	get_wishlist_icon(item) {
		return `
			 <li>
				<a href="javascript:void(0)" class="${item.wished ? "like-action-wished" : ''} size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
				data-item-code="${item.item_code}">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart size-4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
				</a>
		</li>
		`;
	}

	get_card_body_html(item, title, settings) {
		let body_html = `
        <div class="mt-4">
    `;
		body_html += this.get_title(item, title);

		body_html += `<div class="flex justify-between items-center mt-1 flex-wrap price-section-${item.name}">`;
		if (item.formatted_price) {
			body_html += this.get_price_html(item);
		} else {
			body_html += `<p></p>`
		}
		frappe.call({
			method: "ecommerce_theme.utils.get_product_reviews", type: "GET", args: {
				web_item: item.name
			}, callback: (result) => {
				if (result.message) {
					let res = result.message;
					let average_rating = res.average_rating || 0;

					// Calculate the number of stars (full, half, and empty)
					let full_stars = Math.floor(average_rating);
					let has_half_star = (average_rating - full_stars) >= 0.5;
					let total_stars = 5;

					// Create stars HTML
					let stars_html = `<ul class="list-none inline-block text-orange-400">`;

					// Full stars
					for (let i = 0; i < full_stars; i++) {
						stars_html += `<li class="inline"><i class="mdi mdi-star lg:text-lg md:text-base text-xs"></i></li>`;
					}

					// Half star
					if (has_half_star) {
						stars_html += `<li class="inline"><i class="mdi mdi-star-half lg:text-lg md:text-base text-xs"></i></li>`;
					}

					// Empty stars
					for (let i = 0; i < total_stars - full_stars - (has_half_star ? 1 : 0); i++) {
						stars_html += `<li class="inline"><i class="mdi mdi-star-outline lg:text-lg md:text-base text-xs"></i></li>`;
					}

					// Append rating and review count
					stars_html += `</ul>`;
					$(`.price-section-${item.name}`).append(stars_html);
				}
			}
		});
		body_html += `</div>`;
		body_html += `</div>`;
		return body_html;
	}

	get_title(item, title) {
		let title_html = `
			<span class="hidden" itemprop="name">${title || ''}</span>
			<a href="/${item.route || '#'}" class="hover:text-orange-500 lg:text-lg md:text-base text-sm font-medium">
				${title || ''}
			</a>
		`;
		return title_html;
	}

	get_price_html(item) {
		let price_html = `
			<p itemprop="offers" itemscope itemtype="https://schema.org/AggregateOffer" class="lg:text-lg md:text-base text-xs">
				${item.formatted_price || ''}
		`;

		if (item.formatted_mrp) {
			price_html += `
					<del class="text-slate-400 text-xs">${item.formatted_mrp ? item.formatted_mrp.replace(/ +/g, "") : ""}</del>

			`;
		}
		price_html += `</p>`;
		return price_html;
	}
}


var shopping_cart = webshop.webshop.shopping_cart;
$.extend(shopping_cart, {
	shopping_cart_update: function ({item_code, qty, cart_dropdown, additional_notes}) {
		shopping_cart.update_cart({
			item_code, qty, additional_notes, with_items: 1, btn: this, callback: function (r) {
				if (!r.exc) {
					window.location.reload();
				}
			},
		});
	},
});

var wishlist = webshop.webshop.wishlist;
$.extend(wishlist, {
	set_wishlist_count: function (animate = false) {
		// set badge count for wishlist icon
		var wish_count = frappe.get_cookie("wish_count");
		if (frappe.session.user === "Guest") {
			wish_count = 0;
		}

		if (wish_count) {
			$(".wishlist").toggleClass('hidden', false);
		}

		var $wishlist = $('.wishlist-icon');
		var $badge = $wishlist.find("#wish-count");


		if (wish_count) {
			$badge.html(wish_count);
			if (animate) {
				$wishlist.addClass('cart-animate');
				setTimeout(() => {
					$wishlist.removeClass('cart-animate');
				}, 500);
			}
		} else {
			$badge.remove();
		}
	},
})

frappe.ready(function () {
	if (window.location.pathname !== "/me") {
		$(".wishlist").toggleClass('hidden', false);
		wishlist.set_wishlist_count();
	} else {
		wishlist.bind_move_to_cart_action();
		wishlist.bind_remove_action();
	}
});

$(document).ready(function () {
	$('.show-filter').on('click', function () {
		// Toggle the 'hidden' class on the #filter-section
		$('#filter-section').toggleClass('hidden');

		// Check if the #filter-section is visible (i.e., 'hidden' class is removed)
		if ($('#filter-section').hasClass('hidden')) {
			// If the filter section is hidden, change the button text to 'Show Filters'
			$(this).text('Show Filters');
		} else {
			// If the filter section is visible, change the button text to 'Hide Filters'
			$(this).text('Hide Filters');
		}
	});
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
	distance: '60px',
	duration: 1000,
	delay: 300,
	// reset: true
})

sr.reveal(`.hero__content`, {delay: 300})
//
sr.reveal(`.logo, `, {
	origin: 'top',
	interval: 100
})
// sr.reveal(`.specs__data, .discount__animate`, {origin: 'left', interval: 100})
sr.reveal(`.reveal__left`, {origin: 'top'})
sr.reveal(`.reveal__right`, {origin: 'bottom'})
sr.reveal(`.reveal__top`, {origin: 'top'})
sr.reveal(`.reveal__bottom`, {origin: 'bottom'})
// sr.reveal(`.case__img`, {origin: 'top'})
// sr.reveal(`.case__data`)
