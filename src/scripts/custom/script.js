 $(function() {

	$('._phone-mask').mask('+9 (999) 999-99-99');

	$('.change-password__eye').click(function() {
		var field = $(this).closest('.change-password__field').find('input');
		
		(field.attr('type') == 'password') ? field.prop('type', 'text') : field.prop('type', 'password');
		$(this).toggleClass('_js-visible');
	});

	$('.burger-menu').click(function() {
		$(this).toggleClass('js-active');
		$('.footer-menu').toggleClass('_active');

		if( $('html').hasClass('mobile') && $('.catalog-menu').hasClass('active') ) {
			$('.catalog-menu__toggle').removeClass('active');
			$('.catalog-menu').removeClass('active');
		}

		$('.catalog-menu__toggle').toggleClass('_hide');
	});

	$('.footer-menu__section-title').click(function() {
		if( $('html').hasClass('mobile') ) {
			$('.footer-menu__section-title').removeClass('_active');
			$(this).toggleClass('_active');
			$('.footer-menu__list').stop().slideUp();
			$(this).next('.footer-menu__list').stop().slideToggle();
		}
	});

	// input search

		$('.search__field').focus(function(event) {
			event.stopPropagation();
			$(this).parent('.search').addClass('_focused');
		});

		$('.search__field').keyup(function() {
			var	iValue = $(this).val();
			
			if (!iValue) {
				$(this).parent('.search').removeClass('notEmpty');

			} else {
				$(this).parent('.search').addClass('notEmpty');
			}
		});

		$('.search__clear').click(function() {
			$('.search__field').val('');
			$(this).parent('.search').removeClass('notEmpty');
		});

		$(document).click(function(event) {
			if ($(event.target).closest('.search').length === 0) {
				$('.search').removeClass('_focused');
			}
		});

	// input search

	// snap svg	

	var snapTest = (function() {

		$('.circle-svg-snap').each(function() {
			var svg = Snap($(this).find('svg.circle-animation')[0]),
				moving_line = svg.select('.moving-line'),
				curr_pos = 310;

			moving_line.attr({'stroke-dasharray': curr_pos + ',' + 560});

			$(this).closest('.js-hover-svg').hover(function() {
				if ($(this).hasClass('js-hover-svg')) {
					Snap.animate(curr_pos, 560, function(value) {
						curr_pos = value;
						moving_line.attr({'stroke-dasharray': value + ',' + 560});
					}, 400);
				}
			}, function() {
				if ($(this).hasClass('js-hover-svg')) {
					Snap.animate(curr_pos, 310, function(value) {
						curr_pos = value;
						moving_line.attr({'stroke-dasharray': value + ',' + 560});
					}, 400);
				}
			});
		});
	})();

	// snap svg end

	$('.services').owlCarousel({
		dots: false,
		loop: true,
		lazyLoad: true,
		autoplay: false,
		autoplayTimeout: 3500,
		center: true,

		responsive : {
			// breakpoint from 0 up
			0 : {
				autoWidth: true
			},
			// breakpoint from 768 up
			769 : {
				items: 2.5,
				autoWidth: false,
				center: false
			},

			1025 : {
				nav: true,
				items: 3,
				smartSpeed: 1000
			}
		}
		
	});

	// $('.product-card__preview').owlCarousel();

	$('.demonstration-goods').owlCarousel({
		dots: true,
		items: 1,
		loop: true,
		autoplay: false,
		nav: true
	});

	$('.promo-goods__slider').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		infinite: true,
		focusOnSelect: true,
		arrows: false,
		dots: false,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3
			}
		},
			{
				breakpoint: 768,
				settings: {
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		]
	});

	$('.banner').owlCarousel({
		dots: true,
		items: 1,
		loop: true,
		autoplay: false,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',

		responsive : {
			// breakpoint from 1025 up
			1025 : {
				nav: true,
				dots: false
			}
		}
	});


	$('[data-toggle]').toggleItem();


	 Stickyfill.add($('.sticky'));
////////////////////////////////////////////////////////////////
////////////// catalog-menu tab script /////////////////////////
////////////////////////////////////////////////////////////////

	var prevj = 0;
	$('.catalog-controls__link').click(function() {
		if ($('html').hasClass('mobile')) return true;
		var parent = $(this).parent();
		var j = parent.index(),
			tab = $('.catalog-tab').eq(j);

		$('.catalog-controls__item').removeClass('active');
		parent.addClass('active');
		$('.catalog-tab').eq(prevj).fadeOut(150, function () {
			$('.catalog-tab').hide();
			tab.fadeIn(150);
		});

		prevj = j;
		return false;
	}).eq(0).trigger('click');

////////////////////////////////////////////////////////////////
////////////// catalog-menu tab script end /////////////////////
////////////////////////////////////////////////////////////////

	var regexp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;

	$('.header-basket__cost').text($('.header-basket__cost').text().replace(regexp, '$1 '));


//sly-slider to owl v.2.0 start
	$('.sly-slider').each(function () {
		var wrap = $(this),
			scrollbar = wrap.find('.scrollbar'),
			slider = wrap.find('.sly-content'),
			slider_type,
			thumbsOwl = $('.thumbs-owl');

		var sly = new Sly(slider, {
			horizontal: 1,
			itemNav: 'centered',
			smart: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			startAt: 0,
			scrollBar: scrollbar,
			scrollBy: 0,
			activatePageOn: 'click',
			speed: 300,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
			minHandleSize: 10,

		});

		if ($(window).width() < 960 && $('html').hasClass('mobile')) {
			thumbsOwl.owlCarousel({
				dots: true,
				items: 1,
				loop: true,
				responsive : {
					480 : {
						items: 1.5,
						autoWidth: false
					},
					650 : {
						items: 2.5,
						autoWidth: false
					}
				}
			});
			slider_type = 'owl';
		} else {
			sly.init();
			slider_type = 'sly';
		}

		$(window).resize(function(event) {
			if ($(window).width() < 960 && $('html').hasClass('mobile')) {
				if (slider_type == 'sly') {
					slider.sly(false);
					thumbsOwl.owlCarousel({
						dots: true,
						items: 1,
						loop: true,
						responsive : {
							480 : {
								items: 1.5,
								autoWidth: false
							},
							650 : {
								items: 2.5,
								autoWidth: false
							}
						}
					});
					slider_type = 'owl';
				}
			} else {
				if (slider_type == 'owl') {
					thumbsOwl.owlCarousel('destroy');
					sly.init()
					slider_type = 'sly';
				} else {
					sly.reload();
				}
			}
		});
	});
//sly-slider to owl v.2.0 happy end

	var thumb_links = $('.product-card__thumbs a'),
	big_links = $('.product-card__preview a');

	thumb_links.click(function() {
		if ($(window).width() >= 768 && !$('html').hasClass('mobile')) {
			thumb_links.removeClass('_active');
			$(this).addClass('_active');

			big_links.removeClass('active');
			big_links.filter('[href="' + $(this).attr('href') + '"]').addClass('active');
		}
		return false;
	}).eq(0).trigger('click');

	// orders-remove card
	$('.basket__item-del').on('click', function() {
		$(this).closest('.basket__item').remove();
	});

	// counter start
	$('[name=counter]').keypress(function(event) {
		return event.charCode >= 48 && event.charCode <= 57;
	});

	$('[name=counter]').keyup(function(event) {
		var input = $(this),
			min = input.attr('data-min'),
			max = input.attr('data-max');
		if (parseInt(input.val()) < min) {
			input.val(min)
		}
		if (parseInt(input.val()) > max) {
			input.val(max)
		}
	});

	$('.counter').each(function() {
		var item = $(this),
		minus = item.find('a.counter__minus'),
		plus = item.find('a.counter__plus'),
		input = item.find('input');

		minus.click(function() {
			var curr_val = parseInt(input.val());
			if (curr_val > parseInt(input.attr('data-min'))) {
				curr_val--;
				input.val(curr_val);
			}
			return false;
		});

		plus.click(function() {
			var curr_val = parseInt(input.val());
			if (curr_val < parseInt(input.attr('data-max'))) {
				curr_val++;
				input.val(curr_val);
			}
			return false;
		});
	});

	// counter end

	var sum = 0;
	$('[data-price]').each(function() {
		var price = $(this).data('price');
		sum += price;
		$(this).text(parseInt(price).toLocaleString().replace(',', ' '));
	});

	$('#total-sum').text(sum.toLocaleString().replace(',', ' '));

	// страница Контактов

	$('.contact-withus__field input, .personal-area__field input, .ordering__field input, .callback__field input').on('change', function() {
		if ($(this).val()) {
			$(this).next().addClass('_notEmpty');
		} else {
			$(this).next().removeClass('_notEmpty');
		}
	});

	$('.map-info__tab').click(function() {
		var moving_line = $('.map-info__tab.js-hover-svg .moving-line'),
			moving_line2 = $(this).find('svg.circle-animation .moving-line');
		Snap.animate(560, 310, function(value) {
			moving_line.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);
		$('.map-info__tab').removeClass('js-hover-svg js-active');
		$(this).addClass('js-hover-svg js-active');
		$('[data-tab="tab"]').removeClass('active');
		$(this).closest('.contacts__map').find('[data-tab="tab"]').eq($(this).index()).addClass('active');
		moving_line2.removeAttr('style');
		Snap.animate(310, 560, function(value) {
			moving_line2.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);
	}).eq(0).trigger('click');

	$('.agreement input').change(function() {
		$(this).parent().toggleClass('js-hover-svg');
	});
	// страница Контактов конец

	$('.orders__item-title').on('click', function() {
		if ($(window).width() < 768) {
			$(this).toggleClass('js-active');
			$(this).closest('.orders__item-info').find('.orders__item-content').stop().slideUp();
			$(this).next('.orders__item-content').stop().slideToggle();
		}
	}).eq(0).trigger('click');

	$('.delivery-method__field').change(function() {
		var moving_line = $('.delivery-method__field.js-hover-svg .moving-line'),
			moving_line2 = $(this).find('svg.circle-animation .moving-line');

		Snap.animate(560, 310, function(value) {
			moving_line.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);

		$('.delivery-method__field').removeClass('js-hover-svg');
		$(this).addClass('js-hover-svg');
		moving_line2.removeAttr('style');

		Snap.animate(310, 560, function(value) {
			moving_line2.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);

	}).eq(0).trigger('change');

	$('.payment-method__field').change(function() {
		var moving_line = $('.payment-method__field.js-hover-svg .moving-line'),
			moving_line2 = $(this).find('svg.circle-animation .moving-line');

		Snap.animate(560, 310, function(value) {
			moving_line.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);

		$('.payment-method__field').removeClass('js-hover-svg');
		$(this).addClass('js-hover-svg');
		moving_line2.removeAttr('style');

		Snap.animate(310, 560, function(value) {
			moving_line2.attr({'stroke-dasharray': value + ',' + 560});
		}, 400);

	}).eq(0).trigger('change');

	// orders page start

	$('.orders__recipient-info').on('click', '.orders__edit-btn', function() {
		var info = $(this).parent(),
			text = info.find(':input'),
			btn = $('<button class="saveBtn" type="button">Сохранить</button>');

		text.each(function(index, el) {
			$(el).toggleClass('_edit').removeAttr('readonly');
			$(el).val($(el).val().replace(';', ''));
		}).eq(0).focus();

		$(this).remove();
		btn.appendTo(info);
	})

	$('.orders__recipient-info').on('click', '.saveBtn', function(event) {
		var info = $(this).parent(),
			text = info.find(':input'),
			btn = $('<button class="orders__edit-btn btn _edit" type="button">Изменить данные получателя</button>');

		$.ajax({
			url: $(this).attr('action'),
			data: $(this).serialize(),
		});

		text.each(function(index, el) {
			$(el).toggleClass('_edit').attr('readonly', true);
			$(el).val($(el).val() + ';');
		});

		$(this).remove();
		btn.appendTo(info);
	});

	// orders page end


	//settings page start

	$('.personal-information__fieldset').on('click', '.personal-information__edit', function() {
		var info = $(this).closest('.personal-information__fieldset'),
			text = info.find(':input:not(button)'),
			btn = $('.personal-information__save');

		text.each(function(index, el) {
			$(el).toggleClass('_edit').removeAttr('readonly');
			$(el).val($(el).val());
		}).eq(0).focus();

		$(this).remove();
		btn.addClass('_active').removeAttr('disabled');
	});

	$('.personal-information__fieldset').on('click', '.personal-information__save', function(event) {
		var info = $(this).closest('.personal-information__fieldset'),
			title = info.find('.personal-area__form-title'),
			text = info.find(':input:not(button)'),
			btn = $('.personal-information__save'),
			editBtn = $('<button class="personal-information__edit" type="button">изменить</button>')

		text.each(function(index, el) {
			$(el).toggleClass('_edit').attr('readonly', true);
			$(el).val($(el).val());
		});
		
		btn.removeClass('_active').attr('disabled', true);
		editBtn.appendTo(title);

	});

		//change input width

		if ($(window).width() > 480) {
			$('.personal-information__fields .personal-area__editable-field').each(function(el) {
				var fieldLength = ($(this).val().length + 1) * 9;
				
				$(this).css({width: fieldLength + 'px'})
			});
		}

		$('.personal-information__fields :input:not(button)').on('keyup keypress blur change', function(event) {
			var int = 9,
			contents = $(this).val(),
			customWidth = ((contents.length + 3) * int);

			$(this).css({width: customWidth + 'px'});
		});

		//change input width
	//settings page end

	// responsive accordion to tabs
	var accordion_control = $('.accordion__control'),
		accordion_content = $('.accordion__content');

	accordion_control.click(function() {
		accordion_control.removeClass('js-active');
		accordion_content.fadeOut('fast');
		$(this).addClass('js-active').next().fadeIn('fast');

		if ($(window).width() < 800) {
			$('html, body').animate({
				scrollTop: accordion_control.offset().top - 30
			}, 400);
		}
	}).eq(0).trigger('click');
	// responsive accordion to tabs

	$('.sidebar__search-field input').keyup(function() {
		var	iValue = $(this).val();
		
		if (!iValue) {
			$(this).parent('.sidebar__search-field').removeClass('notEmpty');

		} else {
			$(this).parent('.sidebar__search-field').addClass('notEmpty');
		}
	});

	$('.sidebar__search-clear').click(function() {
		$('.sidebar__search-field input').val('');
		$(this).parent('.sidebar__search-field').removeClass('notEmpty');
	});

	$('.search-places__field').keyup(function() {
		var	iValue = $(this).val();
		
		if (!iValue) {
			$(this).parent('.search-places').removeClass('notEmpty');

		} else {
			$(this).parent('.search-places').addClass('notEmpty');
		}
	});

	$('.search-places__clear').click(function() {
		$('.search-places__field').val('');
		$(this).parent('.search-places').removeClass('notEmpty');
	});

	// Перелет товаров в корзину
	$('.catalog-list__item__buy').on('click', function(){
		var $this = $(this).closest('.catalog-list__item').find('.catalog-list__item-img img'),
			basket = $('.header-basket'),
			elW = $this.width();

		$this.clone()
			.css({
				'width': elW,
				'position': 'absolute',
				'z-index': '9',
				top: $this.offset().top,
				left: $this.offset().left
			})
			.appendTo('body')
			.animate({
				opacity: .05,
				left: basket.offset()['left'],
				top: basket.offset()['top'] + 75,
				width: 20}, 250, function() {
				$(this).remove();
			});
	});
	// Перелет товаров в корзину 


	$('.modal-button').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		var $popup = $($(this).attr('href')),
			$overlay = $('<div class="overlay"></div>');

		$overlay.appendTo('body');
		$popup.addClass('_show');
	});

	$(document).on('click', '.overlay', function() {
		$(this).remove();
		$('.modal').removeClass('_show');
	});

	$('.modal__close, .successful__btn').click(function() {
		$('.overlay').remove();
		$('.modal').removeClass('_show');

		return false;
	});



	// Этот скрипт для примера:
		$('.callback__submit').click(function() {
			$('#successful').addClass('_show');
		return false;
		});
	// Этот скрипт для примера.

});