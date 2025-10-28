# 🛍️ Ecommerce Theme

A **modern, responsive theme builder** for e-commerce webshops built on the **Frappe Framework**.
This theme provides web templates, custom pages, and utilities to create beautiful online stores effortlessly.

---

## ✨ Features

### 🌐 Web Templates
- 🧭 **E-Commerce Navbar** — Customizable navigation bar with logo, search, and cart
- 🦶 **E-Commerce Footer** — Multi-column footer with social media integration
- 🦸 **Hero Section** — Beautiful hero banners for your homepage
- 🛒 **Product Grid** — Responsive product listing with filters
- 🧩 **Product Card** — Reusable product cards with redirect actions
- 🗂️ **Category Group** — Organize products by category
- ⏰ **Timer Section** — Countdown timer for flash sales and promotions
- 🧱 **Tabs Section** — Tabbed interface for structured e-commerce content

### 🧭 Custom Pages
- **All Products** → `/all-products`
- **Shop by Category** → `/shop-by-category`
- **Shopping Cart** → `/cart`
- **Orders** → `/order`
- **User Profile** → `/me`
- **Contact** → `/contact`
- **Custom 404** → Custom branded error page

### 🎨 Styling & Assets
- ⚡ **Tailwind CSS** — Utility-first modern CSS framework
- 🧠 **Material Design Icons** and **Feather Icons**
- 🖼️ **Tobii Lightbox** — Image gallery support
- 🌗 **Dark Mode** — Built-in light/dark toggle

### ⚙️ Utilities
- Product filtering with discounts
- Price and stock availability tracking
- Wishlist management
- Product reviews
- Variant price comparison (lowest variant detection)
- Cart and checkout integration

---

## 🧩 Requirements
- **Python:** 3.10+
- **Frappe Framework:** 15.x+
- **Required Apps:**
  - `frappe`
  - `erpnext` (for product and sales functionality)
  - `webshop` (for cart & e-commerce management)
  - `payments` (for payment gateway integration)

---

## 🚀 Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch main
bench install-app ecommerce_theme
```

After installation, clear and rebuild assets:

```bash
bench clear-cache
bench build --app ecommerce_theme
```

---

## ⚡ Setup Process

Follow these steps to apply and configure the Ecommerce Theme on your website:

### 1️⃣ Apply the Theme
1. Go to **Website > Website Settings**.
2. Under **Website Theme**, select **Ecommerce Theme**.
3. Save the settings.

### 2️⃣ Configure Navbar & Footer
1. Go to **Website > Web Template**.
2. Create or edit templates:
   - **Navbar:** Choose **E-Commerce Navbar**
   - **Footer:** Choose **E-Commerce Footer**
3. Add your logo, navigation links, and social media URLs.

### 3️⃣ Create Homepage
1. Go to **Website > Web Page**.
2. Create a new page with the title **Home** and route `/`.
3. Add sections:
   - Hero Section
   - Category Group
   - Product Grid
   - Timer Section (optional for promotions)
4. Publish the page.

### 4️⃣ Check on Frontend
Visit your site’s homepage — it should now display your e-commerce theme with dynamic content.

---

## 🧠 Using Jinja Methods

You can use these helper methods inside your templates:

```python
# Get webshop settings
{{ get_webshop_settings() }}

# Get cart products
{{ get_cart_products() }}

# Get product info with pricing
{{ get_product_info(item_code) }}

# Get product reviews
{{ get_product_reviews(web_item) }}
```

---

## 🧰 Troubleshooting

### 🎨 Theme not appearing
- Ensure all dependencies are installed:
  `bench install-app webshop erpnext payments`
- Clear cache:
  `bench clear-cache`
- Rebuild assets:
  `bench build --app ecommerce_theme`

### 🖼️ Assets not loading
- Run: `bench build --app ecommerce_theme`
- Check public folder permissions
- Verify NGINX/Apache static file config

### 💰 Product prices not showing
- Make sure Item Prices are set in ERPNext
- Check Webshop Settings for price list configuration

---

## 📜 License
**AGPL-3.0**
Copyright (C) 2024 **Md Omar Faruk**

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation.

---

## 💎 Credits
- 👨‍💻 **Author:** Md Omar Faruk (omfsakib@gmail.com)
- 🧱 **Framework:** Frappe Framework
- 🛍️ **E-commerce:** Built with ERPNext & Webshop
- 🧩 **Icons:** Material Design Icons, Feather Icons
- 🎨 **CSS:** Tailwind CSS

---

## 📞 Support
For any issues, feature requests, or collaboration:
📧 Email: **omfsakib@gmail.com**
🌐 Visit: [omfsakib.pythonanywhere.com](https://omfsakib.pythonanywhere.com)
