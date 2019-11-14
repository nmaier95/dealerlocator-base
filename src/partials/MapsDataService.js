/**
 * provides logic for MapsDataSource, primarily filtering data
 * @export
 * @class MapsDataService
 */
export default class MapsDataService {
	/* Properties ------------------------------------------------------------------------------ */

	set maxResults(max) {
		this._maxResults = max;
	}

	/* Initialize ------------------------------------------------------------------------------ */

	/**
	 * Creates an instance of MapsDataService.
	 * @param {MapsDataSource} mapsDataSource
	 * @param {GoogleMap} googleMap
	 * @memberof MapsDataService
	 */
	constructor(mapsDataSource, computeDistanceBetweenPoints) {
		this.mapsDataSource = mapsDataSource;
		this.filters = [];
		this.computeDistanceBetweenPoints = computeDistanceBetweenPoints;
		this._maxResults = undefined;
	}

	/* Private -------------------------------------------------------------------------------- */

	/**
	 * filters data for previous applied filter-options
	 * sorts by distance for radius-filter as well
	 * applies maxResults limit if maxResults isset
	 *
	 * @returns {Promise}
	 */
	applyFilters(data) {
		if (!this.filters.length) {
			//trim data-set to max results, if set
			return this.applyMaxResult(data);
		}

		let result = data.slice();
		for (const filter of this.filters) {
			// Category filter?
			if (filter.type == 'property') {
				result = result.filter((item) => {
					if (Array.isArray(item.properties[filter.propName])) {
						return (
							item.properties[filter.propName].indexOf(
								filter.propValue,
							) > -1
						);
					} else {
						return (
							item.properties[filter.propName] == filter.propValue
						);
					}
				});
			}
			// Radius filter?
			if (filter.type == 'radius') {
				result = result.filter((item) => {
					item.distance = this.computeDistanceBetweenPoints(
						filter.center,
						item.geometry,
					);

					//if distance is less than 1km away, round it to 1km
					if (item.distance < 1000) {
						item.distance = 1; //in km
					} else {
						item.distance = Math.round(item.distance / 1000); //in km
					}

					//save calculated distance to dataSource
					this.mapsDataSource.mergeData([
						{
							id: item.id,
							properties: {
								distance: item.distance,
							},
						},
					]);
					return item.distance <= filter.radius;
				});
				result = result.sort((a, b) => a.distance - b.distance);
			}
		}

		//trim result-set to max results, if set
		return this.applyMaxResult(result);
	}

	/**
	 * if class-property maxResults isset (!= undefined), the passed data gets sliced down to maxResults number and returned
	 * else a copy of the data-param-object gets returned
	 *
	 * @param {any} data
	 * @returns {object}
	 * @memberof MapsDataService
	 */
	applyMaxResult(data) {
		return this._maxResults
			? data.slice(0, this._maxResults)
			: data.slice();
	}

	/* Public ---------------------------------------------------------------------------------- */

	/**
	 * returns filtered data
	 *
	 * @returns {Promise}
	 */
	getItems() {
		return new Promise((resolve, reject) => {
			this.mapsDataSource.fetch().then((data) => {
				const filteredData = this.applyFilters(data);
				resolve(filteredData);
			});
		});
	}

	/**
	 * add filter-option, does not apply them to data yet
	 *
	 * @param {any} propName
	 * @param {any} propValue
	 * @memberof MapsDataService
	 */
	addFilterFor(propName, propValue) {
		this.filters.push({
			type: 'property',
			propName: propName,
			propValue: propValue,
		});
	}

	/**
	 * remove a specific previously added filter-option, does not apply to data yet
	 *
	 * @param {any} propName
	 * @param {any} propValue
	 * @memberof MapsDataService
	 */
	removeFilterFor(propName, propValue) {
		this.filters = this.filters.filter(
			(item) =>
				item.type == 'property' &&
				(item.propValue != propValue && item.propName != propName),
		);
	}

	/**
	 * add filter for radius search
	 *
	 * @param {any} center
	 * @param {any} radius
	 * @memberof MapsDataService
	 */
	addRadiusFilterFor(center, radius) {
		this.filters.push({ type: 'radius', center: center, radius: radius });
	}

	/**
	 * remove filter of type "radius" or "property"
	 *
	 * @memberof MapsDataService
	 */
	removeFilterType(type) {
		this.filters = this.filters.filter((item) => item.type != type);
	}

	/**
	 * reset all previously applied filters
	 *
	 * @memberof MapsDataService
	 */
	resetFilters() {
		this.filters = [];
	}

	/**
	 * use to check if tuple/s has/have extended properties already loaded, if not it´ll be loaded
	 *
	 * @param {any} ids
	 * @returns {Promise}
	 * @memberof MapsDataService
	 */
	ensureDetailsFor(ids) {
		return new Promise((resolve, reject) => {
			this.mapsDataSource
				.ensureDetailsFor(ids)
				.then((extended) => resolve(extended), reject);
		});
	}

	/**
	 * checks if any of the active filters is a radius filter, return true or false
	 *
	 * @returns {boolean}
	 * @memberof MapsDataService
	 */
	hasActiveRadiusFilter() {
		let hasRadiusFilter = false;
		for (const filter of this.filters) {
			if (filter.type == 'radius') {
				hasRadiusFilter = true;
				break;
			}
		}
		return hasRadiusFilter;
	}
}
