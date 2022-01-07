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

if(typeof _lazy === 'undefined' || _lazy !== true) {
  window.addEventListener('DOMContentLoaded', function () {
    _lazyLoad();
  });
}

function _lazyLoad() {
  header.set();
  container.set();
}