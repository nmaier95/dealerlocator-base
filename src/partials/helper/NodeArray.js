export class NodeArray extends Array {
	constructor(nodes, root) {
		super();

		// determine root
		this.root = root || window.document;

		// add nodes
		if (typeof nodes == 'string') {
			// A css selecter
			this.push(...this.root.querySelectorAll(nodes).values());
		} else {
			// A nodeList or a single element
			if (typeof nodes.values == 'function') {
				this.push(...nodes.values());
			}
			// A array
			if (window.Array.isArray(nodes)) {
				this.push(...nodes);
			} else {
				// a single element
				this.push(nodes);
				// If root is undefined use the node as the root
				if (!root) {
					this.root = nodes;
				}
			}
		}
	}

	find(selector) {
		return new NodeArray(selector, this.root);
	}

	get(index) {
		return new NodeArray(this[index], this.root);
	}

	first() {
		return new NodeArray(this[0], this.root);
	}

	last() {
		return new NodeArray(this[this.length - 1], this.root);
	}

	innerHtml(content) {
		if (content) {
			for (const element of this) {
				element.innerHTML = content;
			}
			return this;
		} else {
			return this[0].innerHTML;
		}
	}

	outerHtml(content) {
		if (content) {
			for (const element of this) {
				element.outerHTML = content;
			}
			return this;
		} else {
			return this[0].outerHTML;
		}
	}

	append(html) {
		for (const element of this) {
			element.insertAdjacentHTML('beforeend', html);
		}
		return this;
	}

	remove() {
		for (const element of this) {
			element.parentNode.removeChild(element);
		}
		return this;
	}

	style(values) {
		for (const element of this) {
			for (const key in values) {
				element.style[key] = values[key];
			}
		}
		return this;
	}

	addClass(classes) {
		const classNames = Array.isArray(classes)
			? classes
			: classes.split(' ');
		for (const element of this) {
			for (const className of classNames) {
				element.classList.add(className);
			}
		}
		return this;
	}

	hasClass(classes) {
		const classNames = Array.isArray(classes)
			? classes
			: classes.split(' ');
		for (const element of this) {
			for (const className of classNames) {
				if (!element.classList.contains(className)) {
					return false;
				}
			}
		}
		return true;
	}

	removeClass(classes) {
		const classNames = Array.isArray(classes)
			? classes
			: classes.split(' ');
		for (const element of this) {
			for (const className of classNames) {
				element.classList.remove(className);
			}
		}
		return this;
	}

	toggleClass(classes) {
		const classNames = Array.isArray(classes)
			? classes
			: classes.split(' ');

		for (const element of this) {
			for (const className of classNames) {
				element.classList.toggle(classes);
			}
		}
	}

	attribute(name, value) {
		if (this.length) {
			if (typeof value == 'undefined') {
				return this[0].getAttribute(name);
			} else {
				for (const element of this) {
					element.setAttribute(name, value);
				}
			}
		}
		return this;
	}

	on(events, handler, useCapture) {
		const eventNames = Array.isArray(events) ? events : events.split(' ');
		for (const element of this) {
			for (const eventName of eventNames) {
				element.addEventListener(eventName, handler, useCapture);
			}
		}
		return this;
	}

	off(events, handler) {
		const eventNames = Array.isArray(events) ? events : events.split(' ');
		for (const element of this) {
			for (const eventName of eventNames) {
				element.removeEventListener(eventName, handler);
			}
		}
		return this;
	}

	trigger(event) {
		const e = typeof event == 'string' ? new Event(event) : event;
		for (const element of this) {
			element.dispatchEvent(e);
		}
		return this;
	}

	data(name, value) {
		if (this.length) {
			this[0].__data__ = this[0].__data__ || {};
			if (typeof value == 'undefined') {
				return this[0].__data__[name];
			} else {
				this[0].__data__[name] = value;
			}
		}
		return this;
	}

	children() {
		const result = [];
		for (const child of this[0].children) {
			result.push(new NodeArray(child, this.root));
		}
		return result;
	}

	/**
	 *
	 * @param {boolean} alignToTop
	 * @returns {*|void}
	 */
	scrollIntoView(alignToTop) {
		return this[0].scrollIntoView(alignToTop);
	}
}
