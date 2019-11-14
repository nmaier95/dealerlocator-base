/**
 * loads and caches data for maps
 *
 * @export
 * @class MapsDataSource
 */
export default class MapsDataSource {
	get data() {
		return this._data;
	}

	/* Initialize ------------------------------------------------------------------------------ */

	constructor(urlGenerator) {
		this._urlGenerator = urlGenerator || window.defaultUrlGenerator;
		this._data = null;
	}

	/* Private --------------------------------------------------------------------------------- */

	/**
	 * Requests a json document
	 *
	 * @param {String} url
	 * @param {Object}
	 */
	buildResult(event, options) {
		const result = {
			success: [204, 202, 201, 200].indexOf(event.target.status) > -1,
			status: event.target.status,
			data: false,
			error: undefined,
			errorCode: 0,
		};

		// Try to extract json
		if (event.target.responseText) {
			try {
				result.data = JSON.parse(event.target.responseText);
				if (options && options.transformer) {
					options.transformer(result);
				}
			} catch (e) {
				result.success = false;
				result.data = false;
			}
		}

		// Set error
		if (event.type != 'load') {
			result.error = event.type;
		}

		// Get error code?
		return result;
	}

	/**
	 * Requests a json document
	 *
	 * @param {String} url
	 * @param {Object}
	 */
	request(url, options) {
		const scope = this;
		const promise = new Promise((resolve, reject) => {
			const opts = options || {};
			const xmlRequest = new XMLHttpRequest();
			xmlRequest.addEventListener('load', (event) => {
				resolve(scope.buildResult(event, options));
			});
			xmlRequest.addEventListener('abort', (event) => {
				resolve(scope.buildResult(event, options));
			});
			xmlRequest.addEventListener('error', (event) => {
				resolve(scope.buildResult(event, options));
			});
			xmlRequest.addEventListener('timeout', (event) => {
				resolve(scope.buildResult(event, options));
			});
			xmlRequest.open(opts.method || 'GET', url);
			if (typeof options.acceptType != 'undefined') {
				if (options.acceptType) {
					xmlRequest.setRequestHeader('accept', options.acceptType);
				}
			} else {
				xmlRequest.setRequestHeader(
					'accept',
					'application/vnd.collection+json',
				);
			}
			if (options.body) {
				if (typeof options.body == 'object') {
					xmlRequest.setRequestHeader(
						'content-type',
						opts.contentType || 'application/json',
					);
					xmlRequest.send(JSON.stringify(options.body, null, 4));
				} else {
					xmlRequest.send(options.body);
				}
			} else if (options.formData) {
				xmlRequest.send(options.formData);
			} else {
				xmlRequest.send();
			}
		});
		return promise;
	}

	/**
	 *
	 * @param  {any} data
	 */
	setData(data) {
		this._data = data;
	}

	/**
	 * Merges the given array into the current data
	 *
	 * @param {any} data
	 * @returns {any} this._data
	 * @memberof MapsDataSource
	 */
	mergeData(data) {
		if (!this._data) {
			this._data = data;
		} else {
			for (const item of data) {
				const localItem = this._data.find((i) => i.id == item.id);
				if (localItem) {
					Object.assign(localItem.properties, item.properties);
				}
			}
		}
		return this._data;
	}

	/**
	 * Fetches data via the api and merges it
	 *
	 * @param {boolean} [extended=false]
	 * @param {any} [ids=[]]
	 * @returns {Promise}
	 * @memberof MapsDataSource
	 */
	fetchDataFor(extended = false, ids = []) {
		if (this._urlGenerator === undefined) {
			return this._data;
		} else {
			return new Promise((resolve, reject) => {
				const apiUrl = this._urlGenerator({
					extended: extended,
					ids: ids,
				});

				this.request(apiUrl, {})
					.then((result) => {
						if (result.success && result.data.success) {
							resolve(this.mergeData(result.data.results));
						}
					})
					.catch((e) => reject(e));
			});
		}
	}

	/* Public ---------------------------------------------------------------------------------- */

	/**
	 * Fetch all locations.
	 * Will use cached data on subsequent calls.
	 *
	 * @returns {Promise}
	 * @memberof MapsDataSource
	 */
	fetch() {
		return new Promise((resolve, reject) => {
			if (!this._data) {
				this.fetchDataFor().then((data) => resolve(data), reject);
				return;
			}
			resolve(this._data);
		});
	}

	/**
	 * Ensures that all given id's contain all detail information.
	 * This may trigger a api request.
	 *
	 * @param {any} ids
	 * @returns {Promise}
	 * @memberof MapsDataSource
	 */
	ensureDetailsFor(ids) {
		return new Promise((resolve, reject) => {
			this.fetch().then((data) => {
				// find missing ids
				const missingIds = [];
				data.filter((item) => {
					if (!item.properties.city && ids.indexOf(item.id) != -1) {
						missingIds.push(item.id);
					}
				});
				// do we need to load details?
				if (!missingIds.length) {
					resolve(data);
				} else {
					this.fetchDataFor(true, missingIds).then(
						(data) => resolve(data),
						reject,
					);
				}
			}, reject);
		});
	}
}
