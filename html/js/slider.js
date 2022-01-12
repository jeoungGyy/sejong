const slider = {
	obj : {},
	active : (id, opt) => {
		let sliderObj = '#'+id;
		let option = slideOpt.merge(id);
		if(opt) option = {...option, ...opt}
		if(document.querySelector(sliderObj)) slider.obj[id] = new Swiper(sliderObj + ' .slideContainer', option);
	}
}

const slideOpt = {
	default: {
		autoplay: {
			delay: 5000,
		},
		speed: 500,
		autoplay: false,
		// observer: true,
		// observeParents: true,
	},
	/* UI-SJN-04-* */
	infoMenuSwiper: {
    slidesPerView: 'auto',
    spaceBetween: 20,
    slidesOffsetBefore : 20,
    slidesOffsetAfter: 20,
	},
	/* UI-SJN-04-005 */
	infoStoreSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
		slidesPerView: 2,
	},
	/* UI-SJN-04-009 */
	infoReviewSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 4,
		slidesPerView: 3,
	},
	/* UI-SJN-04-012 */
	infoPictureSwiper: {
    navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	},
	/* UI-SJN-04-101L */
	timeApmSwiper: {
    direction: "vertical",
		slidesPerView: 2,
	},
	timeHourSwiper: {
		direction: "vertical",
		slidesPerView: 3,
	},
	timeMinuteSwiper: {
    direction: "vertical",
		slidesPerView: 3,
	},
	/* UI-SJN-09-001P */
	infoCalendarSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 4,
    slidesOffsetBefore : 20,
    slidesOffsetAfter: 20,
	},
  merge : function(key){
    let merged = {...this.default, ...this[key]}
		return merged;
	}
}
