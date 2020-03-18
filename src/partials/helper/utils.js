/** @module utils */

/**
 * Taken from https://davidwalsh.name/function-debounce
 *
 * @param  {function} func
 * @param  {number} wait
 * @param  {boolean} immediate
 * @return void
 * @exports {function} debounce
 * @module utils.debounce
 */
export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		const context = this,
			args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
}

/**
 *
 * @param {htmlString} html
 * @return {htmlString}
 * @exports {function} htmlEscape
 * @module utils.htmlEscape
 */
export function htmlEscape(html) {
	html = document
		.createElement('a')
		.appendChild(document.createTextNode(html)).parentNode.innerHTML;
	return html;
}

/**
 *
 * @param {htmlString} encode
 * @return {htmlString}
 * @exports {function} htmlEncode
 * @module utils.htmlEncode
 */
export function htmlEncode(encode) {
	let str = '';
	const map = {
		'&': '&amp;',
		"'": '&#39;',
		'"': '&quot;',
		'<': '&lt;',
		'>': '&gt;',
	};

	for (let i = 0, l = encode.length; i < l; ++i) {
		const c = encode[i];
		str += c in map ? map[c] : c;
	}

	return str;
}
