/* Template Name: Cartzio - Fashion Store eCommerce Tailwind CSS Landing Template
   Author: Shreethemes
   Email: support@shreethemes.in
   Website: https://shreethemes.in
   Version: 1.0.0
   Created: March 2023
   File Description: Common JS file of the template(plugins.init.js)
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Tiny Slider          *
 *     02.  Data Counter         *
 *     03.  Tobii lightbox       * (For Portfolio pages)
 *     04.  Back Button          *
 *     05.  Components           *
 *          1. Navtabs           *
 *          2. Accordions        *
 *     06.  Maintenance Js       * (For Maintenance Page)
 *     07.  Countdown Js         * (For Comingsoon Page)
 *     08.  Upload Profile       *
 *     09.  Custom Dropdown      *
 *     10.  Swiper SLider Js     *
 ================================*/

//=========================================//
/*            01) Tiny slider              */
//=========================================//

if (document.getElementsByClassName('tiny-single-item').length > 0) {
	var slider = tns({
		container: '.tiny-single-item',
		items: 1,
		controls: false,
		mouseDrag: true,
		loop: true,
		rewind: true,
		autoplay: true,
		autoplayButtonOutput: false,
		autoplayTimeout: 3000,
		navPosition: "bottom",
		speed: 400,
		gutter: 16,
	});
}
;

//=========================================//
/*/*            02) Data Counter           */
//=========================================//

try {
	const counter = document.querySelectorAll('.counter-value');
	const speed = 2500; // The lower the slower

	counter.forEach(counter_value => {
		const updateCount = () => {
			const target = +counter_value.getAttribute('data-target');
			const count = +counter_value.innerText;

			// Lower inc to slow and higher to slow
			var inc = target / speed;

			if (inc < 1) {
				inc = 1;
			}

			// Check if target is reached
			if (count < target) {
				// Add inc to count and output in counter_value
				counter_value.innerText = (count + inc).toFixed(0);
				// Call function every ms
				setTimeout(updateCount, 1);
			} else {
				counter_value.innerText = target;
			}
		};

		updateCount();
	});
} catch (err) {

}


//=========================================//
/*/*            03) Tobii lightbox         */
//=========================================//

try {
	const tobii = new Tobii()
} catch (err) {

}

//=========================================//
/*/*            04) Back Button            */
//=========================================//
document.getElementsByClassName("back-button")[0]?.addEventListener("click", (e) => {
	if (document.referrer !== "") {
		e.preventDefault();
		window.location.href = document.referrer;
	}
})

//=========================================//
/*            05) Components               */
//=========================================//

//============= 01) Navtabs ===============//
try {
	const Default = {
		defaultTabId: null,
		activeClasses: 'text-white bg-orange-500',
		inactiveClasses: 'hover:text-orange-500 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800',
		onShow: () => {
		}
	}

	class Tabs {
		constructor(items = [], options = {}) {
			this._items = items
			this._activeTab = options ? this.getTab(options.defaultTabId) : null
			this._options = {...Default, ...options}
			this._init()
		}

		_init() {
			if (this._items.length) {
				// set the first tab as active if not set by explicitly
				if (!this._activeTab) {
					this._setActiveTab(this._items[0])
				}

				// force show the first default tab
				this.show(this._activeTab.id, true)

				// show tab content based on click
				this._items.map(tab => {
					tab.triggerEl.addEventListener('click', () => {
						this.show(tab.id)
					})
				})
			}
		}

		getActiveTab() {
			return this._activeTab
		}

		_setActiveTab(tab) {
			this._activeTab = tab
		}

		getTab(id) {
			return this._items.filter(t => t.id === id)[0]
		}

		show(id, forceShow = false) {
			const tab = this.getTab(id)

			// don't do anything if already active
			if (tab === this._activeTab && !forceShow) {
				return
			}

			// hide other tabs
			this._items.map(t => {
				if (t !== tab) {
					t.triggerEl.classList.remove(...this._options.activeClasses.split(" "));
					t.triggerEl.classList.add(...this._options.inactiveClasses.split(" "));
					t.targetEl.classList.add('hidden')
					t.triggerEl.setAttribute('aria-selected', false)
				}
			})

			// show active tab
			tab.triggerEl.classList.add(...this._options.activeClasses.split(" "));
			tab.triggerEl.classList.remove(...this._options.inactiveClasses.split(" "));
			tab.triggerEl.setAttribute('aria-selected', true)
			tab.targetEl.classList.remove('hidden')

			this._setActiveTab(tab)

			// callback function
			this._options.onShow(this, tab)
		}

	}

	window.Tabs = Tabs;

	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('[data-tabs-toggle]').forEach(triggerEl => {

			const tabElements = []
			let defaultTabId = null
			triggerEl.querySelectorAll('[role="tab"]').forEach(el => {
				const isActive = el.getAttribute('aria-selected') === 'true'
				const tab = {
					id: el.getAttribute('data-tabs-target'),
					triggerEl: el,
					targetEl: document.querySelector(el.getAttribute('data-tabs-target'))
				}
				tabElements.push(tab)

				if (isActive) {
					defaultTabId = tab.id
				}
			})
			new Tabs(tabElements, {
				defaultTabId: defaultTabId
			})
		})
	})
} catch (error) {

}

//********2) Accordions********/
try {
	const Default = {
		alwaysOpen: false,
		activeClasses: 'bg-gray-50 dark:bg-slate-800 text-orange-500',
		inactiveClasses: 'text-dark dark:text-white',
		onOpen: () => {
		},
		onClose: () => {
		},
		onToggle: () => {
		}
	}

	class Accordion {
		constructor(items = [], options = {}) {
			this._items = items
			this._options = {...Default, ...options}
			this._init()
		}

		_init() {
			if (this._items.length) {
				// show accordion item based on click
				this._items.map(item => {

					if (item.active) {
						this.open(item.id)
					}

					item.triggerEl.addEventListener('click', () => {
						this.toggle(item.id)
					})
				})
			}
		}

		getItem(id) {
			return this._items.filter(item => item.id === id)[0]
		}

		open(id) {
			const item = this.getItem(id)

			// don't hide other accordions if always open
			if (!this._options.alwaysOpen) {
				this._items.map(i => {
					if (i !== item) {
						i.triggerEl.classList.remove(...this._options.activeClasses.split(" "))
						i.triggerEl.classList.add(...this._options.inactiveClasses.split(" "))
						i.targetEl.classList.add('hidden')
						i.triggerEl.setAttribute('aria-expanded', false)
						i.active = false

						// rotate icon if set
						if (i.iconEl) {
							i.iconEl.classList.remove('rotate-180')
						}
					}
				})
			}

			// show active item
			item.triggerEl.classList.add(...this._options.activeClasses.split(" "))
			item.triggerEl.classList.remove(...this._options.inactiveClasses.split(" "))
			item.triggerEl.setAttribute('aria-expanded', true)
			item.targetEl.classList.remove('hidden')
			item.active = true

			// rotate icon if set
			if (item.iconEl) {
				item.iconEl.classList.add('rotate-180')
			}

			// callback function
			this._options.onOpen(this, item)
		}

		toggle(id) {
			const item = this.getItem(id)

			if (item.active) {
				this.close(id)
			} else {
				this.open(id)
			}

			// callback function
			this._options.onToggle(this, item)
		}

		close(id) {
			const item = this.getItem(id)

			item.triggerEl.classList.remove(...this._options.activeClasses.split(" "))
			item.triggerEl.classList.add(...this._options.inactiveClasses.split(" "))
			item.targetEl.classList.add('hidden')
			item.triggerEl.setAttribute('aria-expanded', false)
			item.active = false

			// rotate icon if set
			if (item.iconEl) {
				item.iconEl.classList.remove('rotate-180')
			}

			// callback function
			this._options.onClose(this, item)
		}

	}

	window.Accordion = Accordion;

	document.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('[data-accordion]').forEach(accordionEl => {

			const alwaysOpen = accordionEl.getAttribute('data-accordion')
			const activeClasses = accordionEl.getAttribute('data-active-classes')
			const inactiveClasses = accordionEl.getAttribute('data-inactive-classes')

			const items = []
			accordionEl.querySelectorAll('[data-accordion-target]').forEach(el => {
				const item = {
					id: el.getAttribute('data-accordion-target'),
					triggerEl: el,
					targetEl: document.querySelector(el.getAttribute('data-accordion-target')),
					iconEl: el.querySelector('[data-accordion-icon]'),
					active: el.getAttribute('aria-expanded') === 'true' ? true : false
				}
				items.push(item)
			})

			new Accordion(items, {
				alwaysOpen: alwaysOpen === 'open' ? true : false,
				activeClasses: activeClasses ? activeClasses : Default.activeClasses,
				inactiveClasses: inactiveClasses ? inactiveClasses : Default.inactiveClasses
			})
		})
	})
} catch (error) {

}

//=========================================//
/*/*            06) Maintenance js         */
//=========================================//

try {
	if (document.getElementById("maintenance")) {
		var seconds = 3599;

		function secondPassed() {
			var minutes = Math.round((seconds - 30) / 60);
			var remainingSeconds = seconds % 60;
			if (remainingSeconds < 10) {
				remainingSeconds = "0" + remainingSeconds;
			}
			document.getElementById('maintenance').innerHTML = minutes + ":" + remainingSeconds;
			if (seconds == 0) {
				clearInterval(countdownTimer);
				document.getElementById('maintenance').innerHTML = "Buzz Buzz";
			} else {
				seconds--;
			}
		}

		var countdownTimer = setInterval('secondPassed()', 1000);
	}
} catch (err) {

}


//=========================================//
/*            07) Countdown Js             */
//=========================================//
try {
	if (document.getElementById("days")) {
		// The data/time we want to countdown to
		date = document.getElementById('date')
		if (date) {
			var eventCountDown = new Date(date.innerText + " 00:00:00").getTime();

			// Run myfunc every second
			var myfunc = setInterval(function () {

				var now = new Date().getTime();
				var timeleft = eventCountDown - now;

				// Calculating the days, hours, minutes and seconds left
				var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
				var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

				// Result is output to the specific element
				document.getElementById("days").innerHTML = days + "<p class='count-head'>Days</p> "
				document.getElementById("hours").innerHTML = hours + "<p class='count-head'>Hours</p> "
				document.getElementById("mins").innerHTML = minutes + "<p class='count-head'>Mins</p> "
				document.getElementById("secs").innerHTML = seconds + "<p class='count-head'>Secs</p> "

				// Display the message when countdown is over
				if (timeleft < 0) {
					clearInterval(myfunc);
					document.getElementById("days").innerHTML = ""
					document.getElementById("hours").innerHTML = ""
					document.getElementById("mins").innerHTML = ""
					document.getElementById("secs").innerHTML = ""
					document.getElementById("end").innerHTML = "00:00:00:00";
				}
			}, 1000);

		}
	}
} catch (err) {

}

//=========================================//
/*            08) Upload Profile           */
//=========================================//
try {
	var loadFile = function (event) {

		var image = document.getElementById(event.target.name);
		image.src = URL.createObjectURL(event.target.files[0]);
	};

} catch (error) {

}

//=========================================//
/*            09) Custom Dropdown          */
//=========================================//

document.querySelectorAll(".dropdown").forEach(function (item) {
	item.querySelectorAll(".dropdown-toggle").forEach(function (subitem) {
		subitem.addEventListener("click", function (event) {
			subitem.classList.toggle("block");
			if (subitem.classList.contains("block") != true) {
				item.querySelector(".dropdown-menu").classList.remove("block")
				item.querySelector(".dropdown-menu").classList.add("hidden")
			} else {
				dismissDropdownMenu()
				item.querySelector(".dropdown-menu").classList.add("block")
				item.querySelector(".dropdown-menu").classList.remove("hidden")
				if (item.querySelector(".dropdown-menu").classList.contains("block")) {
					subitem.classList.add("block")
				} else {
					subitem.classList.remove("block")
				}
				event.stopPropagation();
			}
		});
	});
});

function dismissDropdownMenu() {
	document.querySelectorAll(".dropdown-menu").forEach(function (item) {
		item.classList.remove("block")
		item.classList.add("hidden")
	});
	document.querySelectorAll(".dropdown-toggle").forEach(function (item) {
		item.classList.remove("block")
	});
}

window.addEventListener('click', function (e) {
	dismissDropdownMenu();
});


//=========================================//
/*            10) Swiper slider            */
//=========================================//
try {
	var menu = [];
	var interleaveOffset = 0.5;
	var swiperOptions = {
		loop: true,
		speed: 1000,
		parallax: true,
		autoplay: {
			delay: 6500,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
			},
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		on: {
			progress: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(".slide-inner").style.transform =
						"translate3d(" + innerTranslate + "px, 0, 0)";
				}
			},

			touchStart: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},

			setTransition: function (speed) {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".slide-inner").style.transition =
						speed + "ms";
				}
			}
		}
	};

	// DATA BACKGROUND IMAGE
	var swiper = new Swiper(".swiper-container", swiperOptions);

	let data = document.querySelectorAll(".slide-bg-image")
	data.forEach((e) => {
		e.style.backgroundImage =
			`url(${e.getAttribute('data-background')})`;
	})
} catch (err) {

}
