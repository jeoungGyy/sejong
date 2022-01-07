const header = {
	top: 0,
	currentTop : 0,
	set : () => {
		header.scrollAct();
	},
  /* 헤더 className 추가 */
	scrollAct : () => {
		let headerWrap = document.querySelector('.header');
		window.addEventListener('scroll', function(){
			if(header.currentTop > window.scrollY && window.scrollY+window.innerHeight < document.body.offsetHeight) {
				if(headerWrap.classList.contains('scrollDown')) headerWrap.classList.remove('scrollDown');
			} else {
				if(window.scrollY > 0) {
					if(!headerWrap.classList.contains('scrollDown')) headerWrap.classList.add('scrollDown');
				}
			}
			header.currentTop = window.scrollY;
			if(header.top < window.scrollY) {
				if(!headerWrap.classList.contains('stickyHeader')) headerWrap.classList.add('stickyHeader');
			} else {
				if(headerWrap.classList.contains('stickyHeader')) headerWrap.classList.remove('stickyHeader');
			}
		})
	}
}

if(typeof _lazy === 'undefined' || _lazy !== true) {
  window.addEventListener('DOMContentLoaded', function () {
    _lazyLoad();
  });
}

function _lazyLoad() {
  header.set();
}