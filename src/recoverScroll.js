let preventPageScroll = e => e.preventDefault();

export default {
	prevent () { //禁止滑动
		document.addEventListener('touchmove', preventPageScroll, false);
	},
	recover () {
		document.removeEventListener('touchmove', preventPageScroll, false);
	}
}