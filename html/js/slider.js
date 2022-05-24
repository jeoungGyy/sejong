const slider = {
	obj : {},
	active : (id, opt) => {
		let sliderObj = '#'+id;
		let option = slideOpt.merge(id);
		if(opt) option = {...option, initialSlide: opt}
		if(document.querySelector(sliderObj)) slider.obj[id] = new Swiper(sliderObj + ' .slideContainer', option);
	},
	destroy : (id, opt) => {
		let sliderObj = id;



		slider.popularSwiper.destroy();
		
	},
}

const slideOpt = {
	default: {
		speed: 500,
		autoplay: false,
		// observer: true,
		// observeParents: true,
	},
	mainTest: {
    slidesPerView: 'auto',
		autoHeight: true,
		spaceBetween: 50,
		on: {
			setTranslate: function() {
				const headerClear = document.querySelector(".headerClear");
				headerClear.style.transform = `translateX(${this.translate}px)`;
			},
			touchStart: function() {
				const headerClear = document.querySelector(".headerClear");
				headerClear.classList.remove('add');
			},
			touchEnd: function() {
				const headerClear = document.querySelector(".headerClear");
				headerClear.classList.add('add');
			},
		},
	},
	/* UI-SJN-01-001U */
	homeNavSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 12,
	},
	mainNewsSwiper: {
		spaceBetween: 16,
		pagination: {
			el: ".swiper-pagination",
		},
	},
	mainNewsPieceSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	mainRollingSwiper: {
    direction: "vertical",
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		autoplay: {
			delay: 300000,
			disableOnInteraction: false
		},
	},
	mainPromotionSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 12,
		pagination: {
			el: ".swiper-pagination",
		},
	},
	/* UI-SJN-03-001U */
	infoNavSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 4,
	},
	infoNavSwiper2: {
    slidesPerView: 'auto',
		spaceBetween: 50,
	},
	/* UI-SJN-03-005U */
	infoToVisitSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
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
		slidesPerView: 1,
		on: {
			init : function () {
			},
			slideChange: function() {
				console.log(this.slides[this.activeIndex].innerText);
			}
		},
	},
	timeHourSwiper: {
		direction: "vertical",
		slidesPerView: 1,
		on: {
			init : function () {
			},
			slideChange: function() {
				console.log(this.slides[this.activeIndex].innerText);
			}
		},
	},
	timeMinuteSwiper: {
    direction: "vertical",
		slidesPerView: 1,
		on: {
			init : function () {
			},
			slideChange: function() {
				console.log(this.slides[this.activeIndex].innerText);
			}
		},
	},
	/* UI-SJN-04-012 */
	infoPictureSwiper: {
		autoplay: false,
    navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	},
	/* UI-SJN-09-001P */
	infoCalendarSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 4,
    slidesOffsetBefore : 20,
    slidesOffsetAfter: 20,
	},
	infoCalendarFestivalSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 20,
	},
	/* UI-SJN-13-002U */
	infoNotesSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 10,
	},
	/* UI-SJN-02-001U */
	popularSwiper: {
    direction: "vertical",
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false
		},
	},
	/* UI-SJN-20-001U */
	mapWordListSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	mapPlaceListSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	/* UI-SJN-32-020L */
	mapToVisitSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
		pagination: {
			el: ".swiper-pagination",
		},
	},
	/* UI-SJN-34-002 */
	mapParkingSpace: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	/* UI-SJN-41-001L */
	satelliteSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	/* UI-SJN-41-002L */
	transformNavSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
		slidesOffsetBefore : 20,
    slidesOffsetAfter: 20,
	},
	/* UI-SJN-42-002L */
	reportReviewSwiper: {
    slidesPerView: 'auto',
		spaceBetween: 8,
	},
	/* UI-SJN-50-003L - 윤사랑 추가*/
	tipSlideSwiper: {
		autoplay: false,
		pagination: {
			el: ".swiper-pagination",
		},
	},
	/* UI-SJN-50-002L - 윤사랑 추가*/
	popMSlideSwiper: {
		autoplay: false,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
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
