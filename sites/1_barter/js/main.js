document.addEventListener("DOMContentLoaded", function(event) { 
	// menu
	let menuList = document.querySelector('.menu__list');
	let burger = document.querySelector('.header__burger');
	let close = document.querySelector('.menu__close');
	let menu = document.querySelector('.menu');
	let body = document.querySelector('body');
	let html = document.querySelector('html');
	burger.onclick = function(){
		menu.classList.add('menu--open');
		body.classList.add('overflow-hidden');
		html.classList.add('overflow-hidden');
	}
	close.onclick = function(){
		menu.classList.remove('menu--open');
		body.classList.remove('overflow-hidden');
		html.classList.remove('overflow-hidden');
	}
	menuList.onclick = function(){
		menu.classList.remove('menu--open');
		body.classList.remove('overflow-hidden');
		html.classList.remove('overflow-hidden');
	}
	// simplebar
	document.querySelectorAll('.adv__box-wrap').forEach(el => {
		new SimpleBar(el)
	});

	document.querySelectorAll('.fift__box-wrap').forEach(el => {
		new SimpleBar(el)
	});

	document.querySelectorAll('.steps__box-wrap').forEach(el => {
		new SimpleBar(el)
	});
	// swiper
	const swiper = new Swiper('.comments__slider', {
		// Optional parameters
		loop: true,
		slidesPerView: 1,
	  
		// Navigation arrows
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
	});
	// spoilers
	const accordions = document.querySelectorAll('.qa__item');
	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget;
			const content = self.querySelector('.qa__item-content');
			const icon = self.querySelector('.qa__item-status');

			self.classList.toggle('qa__item--open');

			// если открыт аккордеон
			if (self.classList.contains('qa__item--open')) {
				content.setAttribute('aria-hidden', false);
				content.style.maxHeight = content.scrollHeight + 'px';
				icon.style.transform = 'rotate(45deg)';
				icon.style.color = '#0042FF';
			} else {
				content.setAttribute('aria-hidden', true);
				content.style.maxHeight = null;
				icon.style.transform = 'rotate(0)';
				icon.style.color = '#A2A9B4';
			}
		});
	});
	// modals
	const modals = document.querySelectorAll('[data-modal]');
	modals.forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			const modal = document.getElementById(trigger.dataset.modal);
			modal.classList.add('open');
			const exits = modal.querySelectorAll('.modal-exit');
			exits.forEach(function (exit) {
			exit.addEventListener('click', function (event) {
				event.preventDefault();
				modal.classList.remove('open');
			});
			});
		});
	});
});

// document.addEventListener("DOMContentLoaded", function(event) {
// 	// preloader
// 	document.querySelector('#preloader').style.display = 'none';
// 	document.querySelector('.main__phone1').classList.add('moveFromBottom');
// 	document.querySelector('.main__phone2').classList.add('moveFromBottom');
// })

window.onload = function() {
	// preloader
	document.querySelector('#preloader').style.display = 'none';
	document.querySelector('.main__phone1').classList.add('moveFromBottom');
	document.querySelector('.main__phone2').classList.add('moveFromBottom');
}