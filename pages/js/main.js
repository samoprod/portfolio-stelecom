//@prepros-append jq-start.js
//@prepros-append forms.js
//@prepros-append responsive.js
//@prepros-append sliders.js
//@prepros-append script.js
//@prepros-append jq-end.js
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//FORMS
function forms() {
	//SELECT
	if ($('select').length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}
			var opt = {
				cursorcolor: "#2078e5",
				cursorwidth: "3px",
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "0px",
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select() {
			$.each($('select'), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent('.select-block').length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
				} else {
					$(this).parent('.select-block').find('.select').remove();
				}
				var milti = '';
				var check = '';
				var sblock = $(this).parent('.select-block');
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr('multiple') == 'multiple') {
					milti = 'multiple';
					check = 'check';
				}
				$.each($(this).find('option'), function (index, val) {
					if ($(this).attr('value') != '') {
						soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
					} else if ($(this).parent().attr('data-label') == 'on') {
						if (sblock.find('.select__label').length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr('data-type') == 'search') {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
						"</div>" +
						soptions +
						"</div>");
					$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
						parentSectionClass: 'select-options_' + ind,
						parentLookupClass: 'select-options__value_' + ind,
						childBlockClass: 'select-options__value_' + ind
					});
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
						"</div>" +
						soptions +
						"</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != '') {
					sblock.find('.select').addClass('focus');
				}
				if ($(this).attr('data-req') == 'on') {
					$(this).addClass('req');
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
			});
		}
		select();

		$('body').on('keyup', 'input.select-title__value', function () {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50, function () {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click', '.select', function () {
			if (!$(this).hasClass('disabled')) {
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr('data-type') == 'search') {
					if (!$(this).hasClass('active')) {
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});
		$('body').on('click', '.select-options__value', function () {
			if ($(this).parents('.select').hasClass('multiple')) {
				if ($(this).hasClass('active')) {
					if ($(this).parents('.select').find('.select-title__value span').length > 0) {
						$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
					} else {
						$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				} else {
					$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
					if ($(this).parents('.select').find('.select-title__value span').length == 0) {
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
				}
				return false;
			}

			if ($(this).parents('.select').attr('data-type') == 'search') {
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
			} else {
				$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

			$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if ($.trim($(this).data('value')) != '') {
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
			} else {
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
			}


			if ($(this).parents('.select-block').find('select').val() != '') {
				$(this).parents('.select-block').find('.select').addClass('focus');
			} else {
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if (!$(this).parents('.select').data('tags') != "") {
				if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if ($(this).parents('.select-block').find('select').data('update') == 'on') {
				select();
			}
		});
		$(document).on('click touchstart', function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			};
		});
		$(document).on('keydown', function (e) {
			if (e.which == 27) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});


	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+7(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});
	$.each($('input.num'), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function (event) {
		maskclear($(this));
	});
	//CHECK
	$.each($('.check'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$('body').off('click', '.check', function (event) { });
	$('body').on('click', '.check', function (event) {
		if (!$(this).hasClass('disable')) {
			var target = $(event.target);
			if (!target.is("a")) {
				$(this).toggleClass('active');
				if ($(this).hasClass('active')) {
					$(this).find('input').prop('checked', true);
				} else {
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function (index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function (event) {
		if (!$(this).hasClass('disable')) {
			if ($(this).hasClass('active') && $(this).hasClass('order')) {
				$(this).toggleClass('orderactive');
			}
			$(this).parents('.options').find('.option').removeClass('active');
			$(this).toggleClass('active');
			$(this).children('input').prop('checked', true);
		}
	});
	//RATING
	$('.rating.edit .star').hover(function () {
		var block = $(this).parents('.rating');
		block.find('.rating__activeline').css({ width: '0%' });
		var ind = $(this).index() + 1;
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	}, function () {
		var block = $(this).parents('.rating');
		block.find('.star').removeClass('active');
		var ind = block.find('input').val();
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$('.rating.edit .star').click(function (event) {
		var block = $(this).parents('.rating');
		var re = $(this).index() + 1;
		block.find('input').val(re);
		var linew = re / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$.each($('.rating'), function (index, val) {
		var ind = $(this).find('input').val();
		var linew = ind / $(this).parent().find('.star').length * 100;
		setrating($(this), linew);
	});
	function setrating(th, val) {
		th.find('.rating__activeline').css({ width: val + '%' });
	}
	//QUANTITY
	$('.quantity__input').change(function () {
		var price = parseInt($(this).parents(".item-with-price").find(".item-price").text());
		var totalItem = 0;
		var quantity = $(this).val();
		var totalAll = 0;
		totalItem = quantity * price;
		$(this).parents('.item-with-price').find(".item-total .rub").text(totalItem);

		$('.item-total').each(function () {
			totalAll += parseInt($(this).find(".rub").text());
		});

		$(".total-price").find(".rub").text(totalAll);

	});

	$('.quantity__btn').click(function (event) {
		var n = parseInt($(this).parent().find('.quantity__input').val());

		if ($(this).hasClass('dwn')) {
			n = n - 1;
			if (n < 1) { n = 1; }
		} else {
			n = n + 1;
		}
		if (isNaN(n)) { n = 1 }
		$(this).parent().find('.quantity__input').val(n).trigger("change");
		return false;
	});
	//RANGE
	if ($("#range").length > 0) {
		$("#range").slider({
			range: true,
			min: $("#range").data("min"),
			max: $("#range").data("max"),
			values: [$("#range").data("min"), $("#range").data("max")],
			slide: function (event, ui) {
				$("#amount_min").val(ui.values[0]);
				$("#amount_max").val(ui.values[1]);
			}
		});
		$("#amount_min").val($("#range").slider("values", 0));
		$("#amount_max").val($("#range").slider("values", 1));
		$("#amount_min").change(function () {
			$("#range").slider("values", 0, $(this).val());
			if ($(this).val() < $("#range").data("min")) { $(this).val($("#range").data("min")) }
			if ($(this).val() > $("#range").data("max")) { $(this).val($("#range").data("max")) }
		});
		$("#amount_max").change(function () {
			$("#range").slider("values", 1, $(this).val());
			if ($(this).val() < $("#range").data("min")) { $(this).val($("#range").data("min")) }
			if ($(this).val() > $("#range").data("max")) { $(this).val($("#range").data("max")) }
		});


	}
	//ADDFILES
	$('.form-addfile__input').change(function (e) {
		if ($(this).val() != '') {
			var ts = $(this);
			ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function (index, val) {
				if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
				}
			});
		}
	});
}
forms();

function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function (e) {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);

		//ОПТРАВКА ФОРМЫ ТОЛЬКО ДЛЯ ТЕХ ФОРМ У КОТОРЫХ ЕСТЬ ДАТА АТРИБУТ <ms> [ПРИМЕР: <form action="" data-ms="success"></form>]
		function showResponse(html) {
			if (!form.hasClass('nomessage')) {
				showMessage(messagehtml);
			}
			if (!form.hasClass('noclear')) {
				clearForm(form);
			}
		}
		// Form plugin: http://jquery.malsup.com/form/
		var options = {
			success: showResponse
		};
		form.ajaxForm(options);

		setTimeout(function () {
			if (!form.hasClass('nomessage')) {
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if (!form.hasClass('noclear')) {
				clearForm(form);
			}
		}, 0);

		return false;
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen(ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find('select');
		if ($(this).find('.select-options__value:visible').length == 1) {
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
		} else if (select.val() == '') {
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
		}
	});
}
//Adaptive functions
$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	var headerCart = $(".header-cart");
	var headerTop = $(".header-top");
	var headerBottom = $(".header-bottom");
	var headerBottomMenu = $(".header-bottom__list");
	var headerLogo = $(".header-logo");
	var headerTopLogoLi = $(".header-top__logo");
	var headerTopMenu = $(".header-top__menu");
	var headerInfo = $(".header-info");
	var headerInfoPhone = $(".header .phone-info");
	var headerInfoBtn = $(".header-info__btn");
	if (w < 993) {
		if (!headerBottomMenu.hasClass('done')) {
			headerBottomMenu.addClass('done').appendTo($("#fixed-menu-main"));
		}
		if (!headerCart.hasClass('done')) {
			headerCart.addClass('done').appendTo(headerTop);
		}
		if (!headerLogo.hasClass('done')) {
			headerLogo.addClass('done').appendTo(headerTop);
			headerTopLogoLi.toggle(false);
		}
		if (!headerTopMenu.hasClass('done')) {
			headerTopMenu.addClass('done').appendTo($("#fixed-menu-info"));
		}
		if (!headerInfoPhone.hasClass('done')) {
			headerInfoPhone.addClass('done').appendTo($("#fixed-menu-contacts"));
		}
		if (!headerInfoBtn.hasClass('done')) {
			headerInfoBtn.addClass('done').appendTo($("#fixed-menu-contacts"));
		}
		if (!headerTop.hasClass('done')) {
			headerTop.addClass('done');
			headerTop.children().wrapAll("<div class='container' />");
		}

	} else {
		if (headerBottomMenu.hasClass('done')) {
			headerBottomMenu.removeClass('done').appendTo(headerBottom);
		}
		if (headerCart.hasClass('done')) {
			headerCart.removeClass('done').appendTo(headerBottom);
		}
		if (headerLogo.hasClass('done')) {
			headerLogo.removeClass('done').appendTo(headerTopLogoLi);
			headerTopLogoLi.toggle(true);
		}
		if (headerTopMenu.hasClass('done')) {
			headerTopMenu.removeClass('done').appendTo(headerTop);
		}
		if (headerInfoPhone.hasClass('done')) {
			headerInfoPhone.removeClass('done').prependTo(headerInfo);
		}
		if (headerInfoBtn.hasClass('done')) {
			headerInfoBtn.removeClass('done').appendTo(headerInfo);
		}
		if (headerTop.hasClass('done')) {
			headerTop.removeClass('done');
			headerTop.find(".container").children().unwrap();
		}
	}

	if (w < 600) {
		if (!$(".news .news-item").hasClass('done')) {
			$(".news .news-item").addClass('done').removeClass("news-item--horizontal");
		}
	} else {
		if ($(".news .news-item").hasClass('done')) {
			$(".news .news-item").removeClass('done').addClass("news-item--horizontal");
		}
	}


	if (w < 768) {
		if ($(".catalog-items__wrap").hasClass('view--list')) {
			$(".product-item").each(function () {
				if (!$(this).find(".product-item__price").parent().hasClass('product-item__content-wrap'))
					$(this).find(".product-item__price, .product-item__btn, .product-item__oneclickbuy").unwrap();
			});
		}
	} else {
		if ($(".catalog-items__wrap").hasClass('view--list')) {
			$(".product-item").each(function () {
				if ($(this).find(".product-item__price").parent().hasClass('product-item__content-wrap'))
					$(this).find(".product-item__price, .product-item__btn, .product-item__oneclickbuy").wrapAll("<div class='product-item__btns' />");
			});
		}
	}

}


function adaptive_table(w, h) {
	if ($('.adaptive-table').length > 0) {
		$('.adaptive-table').each(function (index) {

			var that = $(this);

			var columns = that.find(".adaptive-table__headings").children().length;
			var columnWidth = 100 / columns;


			if (that.find("[data-width-multiply]").attr("data-width-multiply") > 1) {
				that.find(".adaptive-table__title, .adaptive-table__item").css({
					maxWidth: (columnWidth - (20 / (columns - 1))) + "%",
					flex: "0 0 " + (columnWidth - (20 / (columns - 1))) + "%"
				});
				$("[data-width-multiply]").filter(function () {
					return $(this).attr("data-width-multiply") > 1;
				}).css({
					maxWidth: (columnWidth + 20) + "%",
					flex: "0 0 " + (columnWidth + 20) + "%"
				});
			} else {
				that.find(".adaptive-table__title, .adaptive-table__item").css({
					maxWidth: columnWidth + "%",
					flex: "0 0 " + columnWidth + "%"
				});
			}

			that.find(".adaptive-table__row").each(function (ind) {
				if ($(this).children(".adaptive-table__item").length > columns) {
					var i = $(this).children(".adaptive-table__item").length - columns;
					while (i < $(this).children(".adaptive-table__item").length) {
						$(this).find(".adaptive-table__item").last().remove();
						console.log("aaa");
						i++;
					}
				}
			});


			if (w < 768) {
				if (!that.hasClass('done')) {
					that.addClass('done');
					that.find(".adaptive-table__row").each(function (ind) {
						$(this).find(".adaptive-table__item").each(function (i) {
							that.find(".adaptive-table__title").eq(i).clone().insertBefore($(this));
						});
					});
				}
			} else {
				if (that.hasClass('done')) {
					that.removeClass('done');
					that.find(".adaptive-table__row .adaptive-table__title").remove();
				}
			}


		});
	}
}

function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
	adaptive_table(w, h);
}
adaptive_function();
//SLIDERS
if ($('.top-slider').length > 0) {
	$('.top-slider').slick({
		//autoplay: true,
		//infinite: false,
		dots: true,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.top-slider-arrows .container'),
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}


$('.slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.slider-for',
	dots: false,
	centerMode: true,
	focusOnSelect: true,
	arrows: true,
	nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="#right-arrow"></use></svg></button>',
	prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="#left-arrow"></use></svg></button>',
	centerPadding: 0
});


//SLICK FIX
if ($('.products-slider').length > 0) {
	var slider = $('.products-slider');
	slider.slick({
		//autoplay: true,
		infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		speed: 500,
		nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="#right-arrow"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="#left-arrow"></use></svg></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 530,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}]
	});
	var sltoshow = slider.get(0).slick.options.slidesToShow;
	var all = slider.find('.slick-slide').length;
	var allactive = slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (nextSlide == 0) {
			var ind = all - allactive;
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(ind).addClass('active');
			} else {
				sliderfix(slider, ind);
			}
		}
		if (nextSlide == allactive - 1) {
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(0).addClass('active');
			} else {
				sliderfix(slider, sltoshow - 1);
			}
		}

		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0)) {
			direction = 'next';
		} else {
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function (event, slick, currentSlide) {
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider, v) {
		for (var i = 0; i < sltoshow; i++) {
			var n = v + i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}
}


if ($('.partners-slider').length > 0) {
	var slider = $('.partners-slider');
	slider.slick({
		//autoplay: true,
		infinite: true,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		speed: 500,
		nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="#right-arrow"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="#left-arrow"></use></svg></button>',
		responsive: [
			{
				breakpoint: 1170,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 530,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			}
		]
	});
	var sltoshow = slider.get(0).slick.options.slidesToShow;
	var all = slider.find('.slick-slide').length;
	var allactive = slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (nextSlide == 0) {
			var ind = all - allactive;
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(ind).addClass('active');
			} else {
				sliderfix(slider, ind);
			}
		}
		if (nextSlide == allactive - 1) {
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(0).addClass('active');
			} else {
				sliderfix(slider, sltoshow - 1);
			}
		}

		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0)) {
			direction = 'next';
		} else {
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function (event, slick, currentSlide) {
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider, v) {
		for (var i = 0; i < sltoshow; i++) {
			var n = v + i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}
}

if ($('.newsmodule-slider').length > 0) {
	$('.newsmodule-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade: true,
		dots: false,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.top-slider-arrows .container'),
		nextArrow: '<button type="button" class="slick-next fa fa-angle-right"></button>',
		prevArrow: '<button type="button" class="slick-prev fa fa-angle-left"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function (event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo', $(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);

	$('.newsmodule-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.newsmodule-navigator-info span').eq(0).html(nextSlide + 1);
	});
	$('.newsmodule-slider').on('afterChange', function (event, slick, currentSlide) {
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide + 1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function (event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function (event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

$('.header-menu__icon').click(function (event) {
	$(this).toggleClass('active');
	$('.header-menu-fixed').stop().fadeToggle(300);
	$('.header-menu-fixed').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
	$('body').toggleClass('lock');
});
$('.header-menu-fixed__bg').click(function (event) {
	$('.header-menu__icon').removeClass('active');
	$('.header-menu-fixed').stop().fadeOut(300);
	$('.header-menu-fixed').removeClass('active');
	$('body').removeClass('lock');
	if (!$('.header-menu__icon').hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
	if ($('.header-menu__icon').hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
});

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}

/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.header-menu').hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.header-menu').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.header-menu').hasClass('active')) {
		$('.header-menu,.header-menu__icon').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});

function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});



function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {
} else {
	if ($('.scroll-body').length > 0) { scroll(); }
}

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/


if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	})
	/* .on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
	*/
}


$(".cart__next-step").click(function (e) {
	e.preventDefault();
	$('.cart').fadeOut();
	$('.cart-second').fadeIn();
	$(".cart-second-list").empty();
	$(".cart-second__total .rub").text($(".total-price .rub").text());

	$(".item-with-price").each(function (i) {
		var th = $(this);
		var elem = "<li>" +
			"<h4 class='cart-second-list__title'>" + th.find(".cart-item__title").text() + "</h4>" +
			"<div class='cart-second-list__quantity'>" + th.find(".quantity__input").val() + "</div>" +
			"<div class='cart-second-list__price'><span class='rub'>" + th.find(".item-total .rub").text() + "</span></div>" +
			"</li>";
		$(".cart-second-list").append(elem);
	});

});

$(".cart-second__backtocart").click(function (e) {
	e.preventDefault();
	$('.cart').fadeIn();
	$('.cart-second').fadeOut();
	$('body, html').scrollTop(0);
});

$(".filter-item__content").each(function () {
	if ($(this).find(".check").length > 4) {
		$(this).find(".check:nth-child(n+5)").toggle(false);
		$(this).append("<div class='filter-item__more'>Показать все</div>")
	}
});

$(".filter-item__more").on("click", function () {
	if ($(this).hasClass("is-active")) {
		$(this).parent().find(".check:nth-child(n+5)").toggle(false);
		$(this).text("Показать все");
		$(this).removeClass("is-active");
	} else {
		$(this).parent().find(".check").toggle(true);
		$(this).addClass("is-active");
		$(this).text("Скрыть все");
	}
});

$(".catalog-filter__link").on("click", function () {
	$(this).parents("form").find(".check").removeClass("active").find("input").prop("checked", false);
	$("#range").slider("values", 0, $("#range").data("min"));
	$("#range").slider("values", 1, $("#range").data("max"));
	$("#amount_min").val($("#range").data("min"));
	$("#amount_max").val($("#range").data("max"));
});


$(".gridview").on("click", function () {
	$(".gridview").removeClass("active");
	$(this).addClass("active");
});
$(".gridview--grid").on("click", function () {
	$(".catalog-items__wrap").removeClass("view--list");
	$(".catalog-items__wrap").addClass("view--grid");
	$(".product-item").each(function () {
		$(this).find(".product-item__price, .product-item__btn, .product-item__oneclickbuy").unwrap();
	});
});
$(".gridview--list").on("click", function () {
	$(".catalog-items__wrap").removeClass("view--grid");
	$(".catalog-items__wrap").addClass("view--list");
	$(".product-item").each(function () {
		$(this).find(".product-item__price, .product-item__btn, .product-item__oneclickbuy").wrapAll("<div class='product-item__btns' />");
	});
});


$(".catalog-filter-btn").click(function () {
	$(".catalog-filter").addClass("active");
	$(".catalog-filter-close").addClass("active");
	$("body").addClass("lock");
});

$(".catalog-filter-close").click(function () {
	$(".catalog-filter").removeClass("active");
	$(".catalog-filter-close").removeClass("active");
	$("body").removeClass("lock");
});


$(window).scroll(function () {
	var sc = $(this).scrollTop();
	var w = $(window).outerWidth();


	function stickySide() {
		if (w < 992 && w > 768) {
			if (sc - $(".single-nav").outerHeight() < 0) {
				$(".single-nav").css("top", 0);
			} else {
				$(".single-nav").css("top", sc - $(".single-nav").outerHeight() + 150);
			}
		} else if (w > 768) {
			if (sc - $(".single-nav").outerHeight() < 0) {
				$(".single-nav").css("top", 0);
			} else {
				$(".single-nav").css("top", sc - $(".single-nav").outerHeight());
			}
		}
	}

	if ($(".single-nav").length > 0) {
		if (w < 992 & w > 768) {
			if ((sc > ($(".info-section").offset().top - 250)) && sc < ($(".single").next().offset().top - $(".single-nav").outerHeight() - 50)) {
				stickySide();
			}
		} else if (w > 768) {
			if (sc > $(".info-section").offset().top && sc < ($(".single").next().offset().top - $(".single-nav").outerHeight())) {
				stickySide();
			}
		}
	}

});

if ($('.not-available').length > 0) {
	$('.not-available').find(".quantity__input").prop("disabled", true);
	$('.not-available').find(".addtocart-btn").addClass("disabled").text("Нет в наличии");
}


$(".addtocart-btn").click(function (e) {
	if ($(this).hasClass('disabled')) {
		e.preventDefault();
		e.stoppropagation();
		return false;
	}
});

$("a[href='#oneclickbuy'").click(function () {
	$(".popup-oneclickbuy").find(".input-item").val($(this).closest(".product-item").find('.product-item__title').text())
});
$("a[href='#rent'").click(function () {
	$(".popup-rent").find(".input-item").val($(this).parents().find('.single-info__title').text())
});
});
