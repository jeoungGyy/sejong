const header = {
	set : () => {
		header.textCopy();
	},
	/* header 제목 넣기 */
	textCopy : () => {
		let headerClone = document.querySelector('.headerClone');
		const subHeading = document.querySelector('.subHeader h2');

		if(headerClone) {
			let headerCloneText = headerClone.innerHTML;
			subHeading.innerText = headerCloneText;
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
	open : (id, callBack) => {
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
			if(callBack) callBack();
		},1)
	},
	close : (id, callBack) => {
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
			if(callBack) callBack();
		},500);
	},
	loadOpen : (id, url, callBack) => {
		let target = document.querySelector('.container');
		let btn = event.currentTarget;

		let httpRequest = new XMLHttpRequest();

		httpRequest.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200) {
				target.insertAdjacentHTML('beforeend', this.responseText);
				layerPopup.open(id);
				layerPopup.obj[id]['loadState'] = true;
				if(btn) layerPopup.obj[id]['btn'] = btn;

				tab.active();

				if(callBack) callBack();
			}
		}
		httpRequest.open('GET', url, true);
		httpRequest.send();
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
	open : (el, time, cls, callBack) => {
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
			if(typeof callBack != 'undefined' && callBack){
				if(typeof callBack == 'function'){
					callBack();
				} else {
					if(callBack) { eval( callBack ); }
				}
			}
		},time);
	},
	close : (el, time, cls, callBack) => {
		let wrap = el;
		let wrapH = el.clientHeight;
		wrap.style.cssText = 'overflow:hidden;height:'+wrapH+'px;transition:height '+(time * 0.001)+'s';
		setTimeout(() => {
			wrap.style.height = '0';
		},10);
		setTimeout(() => {
			wrap.removeAttribute('style');
			if(cls) wrap.classList.remove(cls);
			if(typeof callBack != 'undefined' && callBack){
				if(typeof callBack == 'function'){
					callBack();
				} else {
					if(callBack) { eval( callBack ); }
				}
			}
		},time);
	},
	toggle : (el, time, cls, callBack) => {
		(el.classList.contains(cls)) ? slide.close(el, time, cls, callBack) : slide.open(el, time, cls, callBack);
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

if(typeof _lazy === 'undefined' || _lazy !== true) {
  window.addEventListener('DOMContentLoaded', function () {
    _lazyLoad();
  });
}

function _lazyLoad() {
  header.set();
  container.set();
	accordion.active();
}