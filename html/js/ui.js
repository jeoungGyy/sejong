const header = {
	set : () => {
		header.textCopy();
	},
	/* header 제목 넣기 */
	textCopy : () => {
		let headerClone = document.querySelector('.headerClone');
		const subHeading = document.querySelector('.subHeader h2');

		if(headerClone) {
			let headerCloneText = headerClone.cloneNode(true);
			subHeading && subHeading.appendChild(headerCloneText);
			return;
		}
	},
}

const container = {
	top: 0,
	currentTop : 0,
	set : () => {
		container.scrollAct();
	},
  /* Container 스크롤에 따른 클래스명 추가 */
	scrollAct : () => {
		let containerWrap = document.querySelector('.container');
		const infoNav = document.querySelector('.infoNav');
		const recentService = document.querySelector('.infoWrap .recentService');
		window.addEventListener('scroll', function(){
			/* 생활정보 메인 메뉴 고정을 하기 위해 사용 */
			// if(infoNav) {
			// 	if(window.scrollY > 56) {
			// 		infoNav.classList.add('active');
			// 	} else {
			// 		infoNav.classList.remove('active');
			// 	}
			// }

			if(container.currentTop > window.scrollY && window.scrollY+window.innerHeight < document.body.offsetHeight) {
				if(containerWrap.classList.contains('scrollDown')) containerWrap.classList.remove('scrollDown');
			} else {
				if(window.scrollY > 0) {
					if(!containerWrap.classList.contains('scrollDown')) containerWrap.classList.add('scrollDown');
				}
			}
			container.currentTop = window.scrollY;
			if(container.top < window.scrollY) {
				if(!containerWrap.classList.contains('stickyHeader')) containerWrap.classList.add('stickyHeader');
			} else {
				if(containerWrap.classList.contains('stickyHeader')) containerWrap.classList.remove('stickyHeader');
			}
		})
	},
}

const mapInfo = {
	startY: null,
	moveY: null,
	endY: null,
	showEl: false,
	locationPosition: null,
	touch : () => {
		if(!tooltip.showEl) {
			const startTouch = document.querySelector(".mapIHead");
			const mapInfoLayer = document.querySelector(".mapInfoLayer");

			startTouch.addEventListener('touchstart', mapInfo.start);
			// mapInfoLayer.addEventListener("mousedown", mapInfo.start);

			mapInfo.locationPosition = Math.floor(mapInfoLayer.getBoundingClientRect().height);

			const myLocation = document.querySelector(".myLocation");
			const scaleBtn = document.querySelector(".scaleBtn");

			if(myLocation) {
				myLocation.style.bottom = (mapInfo.locationPosition/10)+1+'rem';
				scaleBtn.style.bottom = (mapInfo.locationPosition/10)+1+'rem';
			}





			const naverMap = document.querySelector("#naver-map");
			naverMap.style.transform = `translateY(-${(mapInfo.locationPosition/2)/10}rem)`;



		}
	},
	click : (division) => {
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		const location = document.querySelector(".mapIcons .location");
		const mapArea = document.querySelector(".mapArea");
		const btnView = document.querySelector(".btnView");

		mapInfoLayer.classList.add('open');
		btnView && btnView.classList.add('open');
		location && location.classList.add('default');

		if(division === 'sub') {
			mapArea.classList.add('subStyle');
		}
		
		mapInfo.showEl = true;
		mapInfo.touch();
	},
	start : (event) => {
		// event.preventDefault()
		const startTouch = document.querySelector(".mapIHead");
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		mapInfoLayer.classList.add('easeNone');
		mapInfo.startY = event.clientY ?? event.touches[0].pageY;

		startTouch.addEventListener('touchmove', mapInfo.move);
		// mapInfoLayer.addEventListener("mousemove", mapInfo.move);
	},
	move : (event) => {
		// event.preventDefault()
		const startTouch = document.querySelector(".mapIHead");
		const mapInfoLayer = document.querySelector(".mapInfoLayer");

		mapInfo.moveY = event.clientY ?? event.changedTouches[0].pageY;
		var vh = mapInfo.startY - mapInfo.moveY;
		mapInfoLayer.style.setProperty('--vh', vh+'px');

		startTouch.addEventListener('touchend', mapInfo.end);
		// mapInfoLayer.addEventListener("mouseup", mapInfo.end);
	},
	end : (event) => {
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		mapInfoLayer.classList.remove('easeNone');
	
		mapInfo.endY = event.clientY ?? event.changedTouches[0].pageY;
		mapInfo.active();
	},
	active : (act) => {
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		const btnView = document.querySelector(".btnView");
		const location = document.querySelector(".mapIcons .location");
		const myLocation = document.querySelector(".myLocation");
		const scaleBtn = document.querySelector(".scaleBtn");
		const startTouch = document.querySelector(".mapIHead");

		if(mapInfo.endY <= mapInfo.startY || act === 'infoUp') {
			if(mapInfo.startY - mapInfo.endY > 30) {
				mapInfoLayer.classList.add('up');
				btnView && btnView.classList.add('up');
			}
		} else {
			if(mapInfo.startY - mapInfo.endY < -30) {
				if (mapInfoLayer.classList.contains('up')) {
					infoBottom();
				} else {
					infoDown();
				}
			}
		}
		if(act === 'close') {
			const naverMap = document.querySelector("#naver-map");
			naverMap.style.transform = `translateY(0rem)`;

			mapInfoLayer.classList.remove('up', 'open');
			btnView.classList.remove('up', 'open');
			location && location.classList.remove('default');
			myLocation && myLocation.removeAttribute('style');
			scaleBtn && scaleBtn.removeAttribute('style');
			mapInfo.showEl = false;
		}
		if(act === 'infoUp') {
			mapInfoLayer.classList.add('up');
			btnView && btnView.classList.add('up');
			mapInfoLayer.classList.remove('easeNone');
		}
		if(act === 'infoDown') {
			infoDown();
		}
		if(act === 'infoBottom') {
			infoBottom();
		}

		function infoDown() {
			const naverMap = document.querySelector("#naver-map");
			naverMap.style.transform = `translateY(0rem)`;

			mapInfoLayer.classList.remove('open');
			btnView && btnView.classList.remove('open');
			location && location.classList.remove('default');
			myLocation && myLocation.removeAttribute('style');
			scaleBtn && scaleBtn.removeAttribute('style');
			mapInfo.showEl = false;
		};
		function infoBottom() {
			mapInfoLayer.classList.remove('up');
			btnView && btnView.classList.remove('up');
		};
		
		setTimeout(()=>{
			startTouch.removeEventListener("touchmove", mapInfo.move);
			// mapInfoLayer.removeEventListener("mousemove", mapInfo.move);
			mapInfoLayer.style.setProperty('--vh', '0px');
		},10);
	},
}

const layerPopup = {
	obj : {},
	init: (id) => {
		layerPopup.obj[id] = {}

		let layer = layerPopup.obj[id];
		layer['wrap'] = document.querySelector('#'+id);
		layer['box'] = layer.wrap.querySelector('.layerWrap');
		layer['body'] = layer.wrap.querySelector('.popupBody');
		if(event !== undefined) layer['btn'] = event.currentTarget;
		if(layer['wrap'].querySelector('.btnClose')) {
			layer['close'] = layerPopup.obj[id]['wrap'].querySelector('.btnClose');
			layer.wrap.addEventListener('focus', ()=>{
				layer.box.focus();
			});
		}
	},
	open : (id) => {
		if(!layerPopup.obj[id]) {
			layerPopup.init(id);
			let layer = layerPopup.obj[id];
			layer.wrap.addEventListener('click', (e)=>{
				if(event.target.classList.contains('layerPopup')) layerPopup.close(id);
			});
		}

		let layer = layerPopup.obj[id];
		layer.wrap.classList.add('ready');
		document.querySelector('html').classList.add('scrollLock');

		setTimeout(()=>{
			layer.wrap.classList.add('show');
			layer.wrap.focus();
		},1)
	},
	close : (id) => {
		let layer;
		if(!id) {
			let parent = findEl.parent(event.target, 'layerPopup');
			id = parent.getAttribute('id');
		}
		layer = layerPopup.obj[id];
		layer.wrap.classList.remove('show');
		setTimeout(()=>{
			if(layer.btn && layer.btn.tagName) layer.btn.focus();
			layer.wrap.classList.remove('ready');
			document.querySelector('html').classList.remove('scrollLock');

			if(layer.loadState == true) {
				setTimeout(function(){
					layer.wrap.parentNode.removeChild(layer.wrap);
					delete layerPopup.obj[id];
				},1);
			}
		},500);
	},
}

const layerAlert = {
	obj : {},
	init: (id) => {
		layerAlert.obj[id] = {}
		let layer = layerAlert.obj[id];
		layer['wrap'] = document.querySelector('#'+id);
	},
	open : (id) => {
		if(!layerAlert.obj[id]) {
			layerAlert.init(id);
			let layer = layerAlert.obj[id];
		}

		let layer = layerAlert.obj[id];
		layer.wrap.classList.add('ready');

		setTimeout(()=>{
			layer.wrap.classList.add('show');
		},1)
		setTimeout(()=>{
			layer.wrap.classList.remove('show');
			setTimeout(()=>{
				layer.wrap.classList.remove('ready');
			},300)
		},1500)
	},
}

const tooltip = {
	winClose : false,
	showEl : null,
	show : (id, dir) => {
		event.stopPropagation();
		let scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
		let _this = event.currentTarget.getBoundingClientRect();
		let _thisTarget = event.currentTarget;
		let top = _this.top + scrollTop;
		let left = _this.left + _this.width;

		_thisTarget.classList.add('active');
		
		// event.currentTarget.setAttribute("title", "도움말 열림");
		if(tooltip.showEl) tooltip.showEl.classList.remove('show');
		tooltip.showEl = document.querySelector('#'+id);

		if(tooltip.showEl) {
			tooltip.showEl.classList.add('show');
			let elWidth = tooltip.showEl.getBoundingClientRect().width;

			switch (dir) {
				case 'right' :
					left =  _this.left - 170;
					// left =  _this.left - (elWidth/2);
					top = _this.top + scrollTop - 100;
					tooltip.showEl.style.cssText = `left: ${left}px; top: ${top}px;`
					break;
				case 'bottom' :
					top = _this.top + scrollTop + 38;
					tooltip.showEl.style.cssText = `top: ${top}px;`
					break;
				case 'top' :
					top = _this.top + scrollTop - _this.height;
					tooltip.showEl.style.cssText = `top: ${top}px;`
					break;
			}
			
			tooltip.showEl.addEventListener('click',()=>{
				event.stopPropagation();
			});
		
			let btnClose = tooltip.showEl.querySelector('.btnClose');
			btnClose.addEventListener('click',()=>{
				if(tooltip.showEl) tooltip.showEl.classList.remove('show');
			}, {once : true});
		}
		if(id == 'layerTooltip') {
			window.addEventListener('resize', ()=>{
				if(tooltip.showEl) tooltip.showEl.classList.remove('show');
			});
			window.addEventListener('scroll', ()=>{
				if(tooltip.showEl) tooltip.showEl.classList.remove('show');
			});
			tooltip.winClose = true;
		} else {
			if(tooltip.winClose === false) {
				window.addEventListener('click', (e)=>{
					if(tooltip.showEl) tooltip.showEl.classList.remove('show');
				});
				window.addEventListener('resize', ()=>{
					if(tooltip.showEl) tooltip.showEl.classList.remove('show');
				});
				window.addEventListener('scroll', ()=>{
					if(tooltip.showEl) tooltip.showEl.classList.remove('show');
				});
				tooltip.winClose = true;
			}
		}
	}
}

const moreBtn = {
	idx : null,
	show : () => {
		let more = document.querySelectorAll('.more');
		let text = document.querySelectorAll('.headTitle .text');
		let reviewLi = document.querySelectorAll('.items-review li');
		let els = Array.prototype.slice.call( document.getElementsByClassName('more'), 0 );
		let target = reviewLi[els.indexOf(event.currentTarget)];

		moreBtn.idx = els.indexOf(event.currentTarget);

		if(target.getElementsByClassName('text')[0].classList.contains('lineBreake')) {
			more[moreBtn.idx].classList.add('active');
			text[moreBtn.idx].classList.remove('lineBreake');
		} else {
			more[moreBtn.idx].classList.remove('active');
			text[moreBtn.idx].classList.add('lineBreake');
		}
	},
}

const comparison = {
	active : () => {
		document.querySelectorAll(".comparisonSlider").forEach((element) => {
			const slider = element.querySelector(".gesture");
			const resizeElement = element.querySelector(".conBefore");
			if (!resizeElement) return;
	
			let ticking = false;
	
			const slide = (event) => {
				if (!ticking) {
					ticking = true;
					requestAnimationFrame(() => {
						ticking = false;

						const clientY = event.clientY ?? event.touches[0].clientY;
						const y = clientY - element.offsetTop;
						let percentage = ((y / element.offsetHeight) * 10000) / 100;

						if (percentage >= 100) {
							percentage = 100;
						}
						if (percentage <= 0) {
							percentage = 0;
						}
						if(y >= 54) {
							slider.style.top = `${percentage}%`;
							resizeElement.style.clipPath = `polygon(0 ${percentage}% , 100% ${percentage}%, 100% 100%, 0 100%)`;
						}
					});
				}
			};
			const dragStart = () => {
				element.addEventListener("mousemove", slide, { passive: true });
				element.addEventListener("touchmove", slide, { passive: true });
				element.classList.add("dragging");
			};
			const dragDone = () => {
				element.removeEventListener("mousemove", slide);
				element.removeEventListener("touchmove", slide);
				element.classList.remove("dragging");
			};
	
			slider.addEventListener("mousedown", dragStart, { passive: true });
			slider.addEventListener("touchstart", dragStart, { passive: true });
	
			document.addEventListener("mouseup", dragDone, { passive: true });
			document.addEventListener("touchend", dragDone, { passive: true });
			document.addEventListener("touchcancel", dragDone, { passive: true });
		});
	},
}


const mainWeather = {
	weatherBoxY : null,
	weatherBoxHeight : null,
	init : () => {
		const weatherBox = document.querySelector(".weatherBox");
		const weatherLink = document.querySelector(".weatherLink");

		mainWeather.weatherBoxHeight = weatherBox.clientHeight;

		weatherLink.addEventListener('click', ()=>{
			weatherBox.classList.add('active');

			window.scrollBy({
				top: weatherBox.getBoundingClientRect().top - mainWeather.weatherBoxHeight,
				behavior: 'smooth'
			});
		});

		window.scrollTo(0, window.scrollY + 1);
		window.addEventListener('scroll', function(){
			mainWeather.scroll();
		});
	},
	scroll : () => {
		const weatherBox = document.querySelector(".weatherBox");
		const weatherLink = document.querySelector(".weatherLink");
		
		if(window.scrollY > mainWeather.weatherBoxHeight) {
			weatherBox.classList.add('active');
			weatherLink.setAttribute("title", "");
		} else {
			weatherBox.classList.remove('active');
			weatherLink.setAttribute("title", "도움말 열림");
		}
	},
}

class Tab {
	constructor(props) {
		this.tabWrap = props;
		this.menu;
		this.btn;
		this.tabContWrap;
		this.tabCont;
		this.selType;
		this.slideWrap;
		this.slide;
		this.act;
		this.set();
	}
	set() {
		this.menu = this.tabWrap.querySelector('.btnTab');
		this.btn = this.menu.querySelectorAll('button');

		if(this.tabWrap.querySelector('.tabContent')) {
			this.tabContWrap = this.tabWrap.querySelector('.tabContent');
			this.tabCont = findEl.child(this.tabContWrap, 'div');
		}

		this.addEvent(this.btn);

		if(this.menu.classList.contains('swiper-wrapper')) this.addSwiper();
	}
	addSwiper() {
		let list = this.menu.querySelectorAll('.itemBtn');

		[].forEach.call(list, _this => {
			_this.classList.add('swiper-slide');
		});

		this.slideWrap = document.createElement('div');

		this.slideWrap.classList.add('slideContainer');
		this.slideWrap.appendChild(this.menu);

		this.tabWrap.prepend(this.slideWrap);

		this.slide = new Swiper(this.slideWrap, {
			slidesPerView: 'auto',
			observeParents: true,
			observer: true,
		});
	}
	addEvent() {
		this.act = () => {
			let _this = event.currentTarget;
			let idx = 0;
			this.btn.forEach((btn,current)=>{
				if(btn === _this) idx = current;
			});
			(this.selType) ? this.active(idx, _this.getAttribute('aria-controls')) : this.active(idx);
		}
		[].forEach.call(this.btn, (_this, idx)=>{
			if(_this.getAttribute('aria-controls')) this.selType = true;
			_this.addEventListener('click', this.act);
		});
	}
	removeEvent() {
		for(let i = 0 ; i < this.btn.length ; i++ ) {
			this.btn[i].removeEventListener('click', this.act);
		}
	}
	active(idx, aria) {
		[].forEach.call(this.btn, (_this)=>{
			_this.classList.remove('active');
			_this.querySelector('.invisible') && _this.querySelector('.invisible').remove();
			
		});
		this.btn[idx].classList.add('active');
    const tag = document.createElement('span')
		tag.classList.add('invisible');
		const tagText = document.createTextNode("현재메뉴");
		tag.appendChild(tagText);
		this.btn[idx].appendChild(tag);

		if(this.tabCont) {
			if(this.selType) {
				[].forEach.call(this.tabCont, (_this)=>{
					console.log(_this)
					_this.classList.remove('active');
					if(_this.getAttribute('id') == aria) {
						_this.classList.add('active');
					}
				});
			} else {
				[].forEach.call(this.tabCont, (_this)=>{
					_this.classList.remove('active');
				});
				this.tabCont[idx].classList.add('active');
				if(this.slide) {this.slide.slideTo(idx);}
			}
		}
	}
	add(arg) {
		this.menu.insertAdjacentHTML('beforeend', arg.btn);
		this.btn = this.menu.querySelectorAll('button');
		let idx = this.btn.length - 1;

		this.addEvent(this.btn[idx], idx);

		this.tabContWrap.insertAdjacentHTML('beforeend', arg.cont);
		this.tabCont = findEl.child(this.tabContWrap, 'div');
	}
	update() {
		let list = this.menu.querySelectorAll('.itemBtn');
		this.btn = this.menu.querySelectorAll('button');
		this.removeEvent();
		this.addEvent();
		if(this.slide) {
			[].forEach.call(list, _this => {
				_this.classList.add('swiper-slide');
			});
			this.slide = new Swiper(this.slideMenu, {
				slidesPerView: 'auto',
				observeParents: true,
				observer: true,
			});
		}
	}
}
const tab = {
	obj : {},
	idx : null,
	active : function() {
		
		let tabs = document.querySelectorAll('.boxTab');

		if(tab.idx == null) {
			[].forEach.call(tabs, (_this, idx)=>{
				this.set(_this, idx);
			});
		} else {
			[].forEach.call(tabs, (_this, idx)=>{
				let state = true;
				for (const key in tab.obj) {
					if(tab.obj[key].tabWrap == _this) {
						state = false;
						return false;
					}
				}
				if (state == false) {
					return;
				} else {
					tab.set(_this, idx);
				}
			});
		}
	},
	set : function(_this, idx) {
		if(idx >= 0) {
			tab.idx = idx;
		} else {
			tab.idx += 1;
		}
		if(!_this.getAttribute('id')) {
			this.obj['tab'+idx] = new Tab(_this);
		} else {
			let id = _this.getAttribute('id');
			this.obj[id] = new Tab(_this);
		}
	},
	reset : () => {
		tab.obj = {};
		tab.active();
	}
}

const parkingTip = {
	winClose : false,
	showEl : null,
	idx : null,
	locationPosition: null,
	open : (id) => {
		const location = document.querySelector(".location");
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		const btnParking = document.querySelectorAll(".btnParking");
		const myLocation = document.querySelector(".myLocation");
		const scaleBtn = document.querySelector(".scaleBtn");
		
		parkingTip.locationPosition = Math.floor(mapInfoLayer.getBoundingClientRect().height);

		if(parkingTip.idx == null) {
			[].forEach.call(btnParking, (_this, idx)=>{
				if(_this.classList.contains('active')) {
					_this.classList.remove('active');
				}
			});
		}
		event.currentTarget.classList.add('active');
		parkingTip.showEl = document.querySelector('#'+id);

		if(parkingTip.showEl) {
			// let _target = event.currentTarget.getBoundingClientRect();
			let _targetLeft = Math.floor(event.currentTarget.offsetLeft - 2);
			let _targetTop = Math.floor(event.currentTarget.offsetTop - 2);
			// let mapMenuLayerWidth = parkingTip.showEl.clientWidth;
			// let mapMenuLayerHeight = parkingTip.showEl.clientHeight;

			
			parkingTip.showEl.classList.remove('show');
			// parkingTip.showEl.classList.remove('show', 'ready');

			setTimeout(()=>{
				// let top = _targetTop - (mapMenuLayerHeight);
				// let left = _targetLeft - (mapMenuLayerWidth);

				parkingTip.showEl.style.cssText = `left: ${_targetLeft}px; top: ${_targetTop}px;`
				
				parkingTip.showEl.classList.add('ready');
				location.classList.add('parkingDefault');
				mapInfoLayer.classList.add('open');
				myLocation.style.bottom = (parkingTip.locationPosition/10)+2+'rem';
				scaleBtn.style.bottom = (parkingTip.locationPosition/10)+2+'rem';

				setTimeout(()=>{
					parkingTip.showEl.classList.add('show');
					
					parkingTip.showEl.focus();
				},500);
			},500);

			const test = document.querySelectorAll(".mapMenuLayer .btn");

			test.forEach((element) => {
				const stopProp = () => {
					event.stopPropagation();
				};
				element.addEventListener("click", stopProp, false);
			});

			// parkingTip.showEl.addEventListener('click',()=>{
			// 	event.stopPropagation();
			// });
			mapInfoLayer.addEventListener('click',()=>{
				event.stopPropagation();
			});
			location.addEventListener('click',()=>{
				event.stopPropagation();
			});
		}

		if(parkingTip.winClose === false) {
			window.addEventListener('click', (e)=>{
				if(parkingTip.showEl) {

					mapInfoLayer.classList.remove('open');

					parkingTip.showEl.classList.remove('show');
					myLocation.removeAttribute('style');
					scaleBtn.removeAttribute('style');
				}
			});
			parkingTip.winClose = true;
		}
	},
}

const findEl = {
	obj: null,
	parent: (el, str) => {
		let tag = el.parentNode.tagName.toLowerCase();
		let cls = el.parentNode.classList;
		let id = el.parentNode.getAttribute('id');
		findEl.obj = el.parentNode;
		if (str !== tag && !cls.contains(str) && str != id) {
			if (tag != 'body') {
				findEl.parent(findEl.obj, str);
			} else {
				findEl.obj = null;
			}
		}
		return findEl.obj;
	},
	child: (el, str) => {
		let arr = [];
		[].forEach.call(el.childNodes, function (obj) {
			if (obj.nodeType == 1) {
				let tag = obj.tagName.toLowerCase();
				let cls = obj.classList;
				let id = obj.getAttribute('id');
				if (str === tag || cls.contains(str) || str === id) {
					arr.push(obj);
				}
			}
		});
		if (arr.length > 0) {
			return arr;
		} else {
			return null;
		}
	},
	prevNode: (str) => {
		if (str.previousSibling == null) {
			findEl.obj = null;
			return false;
		} else {
			if (str.previousSibling.nodeType == 1) {
				findEl.obj = str.previousSibling;
			} else {
				findEl.prevNode(str.previousSibling);
			}
			return findEl.obj;
		}
	},
	nextNode: (str) => {
		if (str.nextSibling == null) {
			findEl.obj = null;
			return false;
		} else {
			if (str.nextSibling.nodeType == 1) {
				findEl.obj = str.nextSibling;
			} else {
				findEl.nextNode(str.nextSibling);
			}
			return findEl.obj;
		}
	}
}

const slide = {
	open : (el, time, cls) => {
		let wrap = el;
		let wrapH = 0;
		wrap.style.cssText = 'position:absolute;display:block;opacity:0';
		wrapH = wrap.clientHeight;
		wrap.style.cssText = 'display:block;overflow:hidden;height:0;transition:height '+(time * 0.001)+'s';
		setTimeout(() => {
			wrap.style.height = wrapH + 'px';
		},10);
		setTimeout(() => {
			wrap.removeAttribute('style');
			if(cls) wrap.classList.add(cls);
		},time);
	},
	close : (el, time, cls) => {
		let wrap = el;
		let wrapH = el.clientHeight;
		wrap.style.cssText = 'overflow:hidden;height:'+wrapH+'px;transition:height '+(time * 0.001)+'s';
		setTimeout(() => {
			wrap.style.height = '0';
		},10);
		setTimeout(() => {
			wrap.removeAttribute('style');
			if(cls) wrap.classList.remove(cls);
		},time);
	},
	toggle : (el, time, cls) => {
		(el.classList.contains(cls)) ? slide.close(el, time, cls) : slide.open(el, time, cls);
	}
}

class Accordion {
	constructor(props) {
		this.wrap = props;
		this.list;
		this.set();
	}
	set() {
		this.list = findEl.child(this.wrap, 'row');
		this.list.forEach((_this, idx)=>{
			let btn = _this.querySelector('.selectBtn');
			this.addEvent(btn, idx);
		});
	}
	addEvent(btns, idx) {
		btns.addEventListener('click', ()=>{
			this.active(idx);
		});
	}
	active(idx) {
		let _this = this.list[idx];
		let cont = _this.querySelector('.cont');
		_this.classList.toggle('active');
		slide.toggle(cont, 300, 'open');
	}
}
const accordion = {
	obj : {},
	idx : null,
	active : function() {
		let acco = document.querySelectorAll('.accordion');
		if(accordion.idx == null) {
			[].forEach.call(acco, (_this, idx)=>{
				this.set(_this, idx);
			});
		} else {
			[].forEach.call(acco, (_this, idx)=>{
				let state = true;
				for (const key in accordion.obj) {
					if(accordion.obj[key].accoWrap == _this) {
						state = false;
						return false;
					}
				}
				if (state == false) {
					return;
				} else {
					accordion.set(_this, idx);
				}
			});
		}
	},
	set : function(_this, idx) {
		if(idx >= 0) {
			accordion.idx = idx;
		} else {
			accordion.idx += 1;
		}
		if(!_this.getAttribute('id')) {
			this.obj['acco'+idx] = new Accordion(_this);
		} else {
			let id = _this.getAttribute('id');
			this.obj[id] = new Accordion(_this);
		}
	}
}

//아코디언
function openCurrAccordion(e) {
	var headers = document.querySelectorAll('.accordionContainer .accordionMenu');
	for(var i = 0; i < headers.length; i++) {
		headers[i].addEventListener('click', openCurrAccordion);
	}
	
	for(var i = 0; i < headers.length; i++) {
		var parent = headers[i].parentElement;
		var article = headers[i].nextElementSibling;

		if (this === headers[i] && !parent.classList.contains('open')) {
			parent.classList.add('open');
			article.style.minHeight = article.scrollHeight + 'px';
		}
		else {
			parent.classList.remove('open');
			article.style.minHeight = '0px';
		}
	}
}

// function setScreenSize() {
// 	let zh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty('--vh', `${zh}px`);
// }
// setScreenSize();
// window.addEventListener('resize', () => setScreenSize());


if(typeof _lazy === 'undefined' || _lazy !== true) {
  window.addEventListener('DOMContentLoaded', function () {
    _lazyLoad();
  });
}

function _lazyLoad() {
  header.set();
  container.set();
	accordion.active();
	tab.active();
	openCurrAccordion();
}