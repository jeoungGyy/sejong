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
		window.addEventListener('scroll', function(){
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
	showEl : false,
	touch : () => {
		if(!tooltip.showEl) {
			const startTouch = document.querySelector(".mapIHead");
			startTouch.addEventListener('touchstart', mapInfo.start);
			startTouch.addEventListener('touchmove', mapInfo.move);
			startTouch.addEventListener('touchend', mapInfo.end);
		}
	},
	click : () => {
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		const location = document.querySelector(".mapIcons .location");
		mapInfoLayer.classList.add('open');
		location.classList.add('default');
		
		mapInfo.showEl = true;
		mapInfo.touch();
	},
	start : (event) => {
		mapInfo.startY = event.touches[0].pageY;
	},
	move : (event) => {
		mapInfo.moveY = event.changedTouches[0].pageY;

		var vh = mapInfo.startY - mapInfo.moveY;
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		mapInfoLayer.style.setProperty('--vh', vh+'px');
	},
	end : (event) => {
		mapInfo.endY = event.changedTouches[0].pageY;
		mapInfo.active();
	},
	active : () => {
		const mapInfoLayer = document.querySelector(".mapInfoLayer");
		const location = document.querySelector(".mapIcons .location");
		if(mapInfo.endY <= mapInfo.startY) {
			if(mapInfo.startY - mapInfo.endY > 30) {
				mapInfoLayer.classList.add('up');
			}
		} else {
			if(mapInfo.startY - mapInfo.endY < -30) {
				if (mapInfoLayer.classList.contains('up')) {
					mapInfoLayer.classList.remove('up');
				} else {
					mapInfoLayer.classList.remove('open');
					location.classList.remove('default');
					mapInfo.showEl = false;
				}
			}
		}
		mapInfoLayer.style.setProperty('--vh', '1px');
	},
}

const layerPopup = {
	obj : {},
	init: (id) => {
		layerPopup.obj[id] = {}

		let layer = layerPopup.obj[id];
		layer['wrap'] = document.querySelector('#'+id);
		layer['box'] = layer.wrap.querySelector('.popupWrap');
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
			layer.wrap.addEventListener('click', ()=>{
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


const tooltip = {
	winClose : false,
	showEl : null,
	show : (id, dir) => {
		event.stopPropagation();
		let scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
		let _this = event.currentTarget.getBoundingClientRect();
		let top = _this.top + scrollTop;
		let left = _this.left + _this.width;

		if(tooltip.showEl) tooltip.showEl.classList.remove('show');
		tooltip.showEl = document.querySelector('#'+id);

		if(tooltip.showEl) {
			tooltip.showEl.classList.add('show');
			let elWidth = tooltip.showEl.getBoundingClientRect().width;

			switch (dir) {
				case 'right' :
					left =  _this.left - elWidth;
					break;
				case 'bottom' :
					top = _this.top + scrollTop + 38;	
					break;
			}
			tooltip.showEl.style.cssText = `top: ${top}px;`

			tooltip.showEl.addEventListener('click',()=>{
				event.stopPropagation();
			});
		
			let btnClose = tooltip.showEl.querySelector('.btnClose');
			btnClose.addEventListener('click',()=>{
				if(tooltip.showEl) tooltip.showEl.classList.remove('show');
			}, {once : true});
		}

		if(tooltip.winClose === false) {
			window.addEventListener('click', ()=>{
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
		});
		this.btn[idx].classList.add('active');

		if(this.tabCont) {
			if(this.selType) {
				[].forEach.call(this.tabCont, (_this)=>{
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

if(typeof _lazy === 'undefined' || _lazy !== true) {
  window.addEventListener('DOMContentLoaded', function () {
    _lazyLoad();
  });
}

function _lazyLoad() {
  header.set();
  container.set();
	// mapInfo.set();
	accordion.active();
	tab.active();
	openCurrAccordion();
}