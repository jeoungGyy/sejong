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