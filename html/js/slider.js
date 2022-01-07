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
		// observer: true,
		// observeParents: true,
	},
	infoMenuSwiper: {
		autoplay: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    slidesOffsetBefore : 20,
    slidesOffsetAfter: 20,
	},
  merge : function(key){
    let merged = {...this.default, ...this[key]}
		return merged;
	}
}
