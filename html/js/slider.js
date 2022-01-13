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
	/* UI-SJN-13-002U */
	infoNotesSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 10,
	},
  merge : function(key){
    let merged = {...this.default, ...this[key]}
		return merged;
	}
}




/* 
	UI-SJN-04-012 
	- 썸네일 있는 Swipe 별도 관리
*/
function gallerySlide() {
	const gThumb = document.querySelector('.galleryThumb');
	const gView = document.querySelector('.galleryView');
	const galleryThumb = new Swiper(gThumb, {
		slidesPerView: 'auto',
		spaceBetween: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	const galleryView = new Swiper(gView, {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		thumbs: {
			swiper: galleryThumb,
		},
	});
}
