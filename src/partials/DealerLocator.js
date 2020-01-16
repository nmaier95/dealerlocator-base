import MapsDataService from './MapsDataService';
import MapsDataSource from './MapsDataSource';
import GoogleMap from './GoogleMap';

/**
 * controller-class, providing functionality used by the ui
 *
 * @export
 * @class DealerLocator
 */
export default class DealerLocator {
	/* Properties ------------------------------------------------------------------------------ */

	/**
	 * returns default parameters for DealerLocator:constructor
	 * overwrite it with your settings in DealerLocator:constructor(config)
	 *
	 * mapContainer: required
	 * resultEl: required
	 * resultsContainer: required
	 * apiKey: required
	 * computeDistanceBetweenPoints: required
	 * mapOptions: required
	 * urlGenerator: optional
	 * hasCluster: optional
	 * mapsDataSource: optional {MapsDataSource}
	 * mapsDataService: optional {MapsDataService}
	 * googleMap: optional {GoogleMap}
	 *
	 * @readonly
	 * @memberof DealerLocator
	 * @returns {Object}
	 */
	get defaultConfig() {
		return {
			mapContainer: '',
			resultEl: '',
			resultsContainer: '',
			apiKey: '',
			hasCluster: true,
			hasCustomResults: true,
			cumputeDistanceBetweenPoints: () => {
				return;
			},
			mapOptions: {
				zoom: 8,
				center: {
					//Frankfurt a. M.
					lat: 50.110924,
					lng: 8.682127,
				},
				clickableIcons: true, // optional property
				clusterConfig: {
					maxZoom: 8,
					imagePath: './resources/images/google-cluster',
				},
				// visit https://developers.google.com/maps/documentation/javascript/markers for more config options
				iconConfig: {
					url: '',
				},
				// 'distance' in templateVars cannot change its name/key for example to calculatedDistance, it can only be set or not
				templateVars: [],
				templateDelimiters: [],
			},
			urlGenerator: () => undefined,
			requestOptions: {
				method: 'GET',
				payload: null,
			},
			mapsDataSource: MapsDataSource,
			mapsDataService: MapsDataService,
			googleMap: GoogleMap,
		};
	}

	/* Initialize ------------------------------------------------------------------------------ */

	/**
	 * Creates an instance of DealerLocator.
	 * !! 'distance' and 'id' (items of key templateVars in mapOptions) are properties which cannot change their name/key !!
	 *
	 * @param {Object} config
	 * @memberof DealerLocator
	 */
	constructor(config) {
		const Service = config.mapsDataService
				? config.mapsDataService
				: this.defaultConfig.mapsDataService,
			Source = config.mapsDataSource
				? config.mapsDataSource
				: this.defaultConfig.mapsDataSource,
			Map = config.googleMap
				? config.googleMap
				: this.defaultConfig.googleMap,
			urlGenerator = config.urlGenerator
				? config.urlGenerator
				: undefined,
			requestOptions =
				config.requestOptions || this.defaultConfig.requestOptions;

		this.mapsDataSource = new Source(urlGenerator, requestOptions);
		this.mapsDataService = new Service(
			this.mapsDataSource,
			config.computeDistanceBetweenPoints,
		);

		this.googleMap = new Map(
			config.apiKey,
			config.mapContainer,
			config.hasCluster
				? config.hasCluster
				: this.defaultConfig.hasCluster,
			config.hasCustomResults === false
				? false
				: this.defaultConfig.hasCustomResults,
			this.mapsDataService,
			config.resultEl,
			config.resultsContainer,
			config.mapOptions,
		);
	}

	/* Private --------------------------------------------------------------------------------- */

	/* Public ---------------------------------------------------------------------------------- */

	/**
	 * calls MapsDataSource to set data if no urlGenerator is passed
	 * @param {Array} data
	 */
	setData(data) {
		this.mapsDataService.setData(data);
	}

	/**
	 * set requestOptions used in MapsDataSource to fetch data
	 * requestOptions can contain: method, payload, formData
	 * @param {Object} requestOptions
	 */
	setRequestOptions(requestOptions) {
		this.mapsDataSource.requestOptions = requestOptions;
	}

	/**
	 * load mapsAPI and update views with data afterwards
	 *
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	initializeMap() {
		return new Promise((resolve, reject) => {
			this.googleMap.load().then(() => {
				resolve();
			}, reject);
		});
	}

	/**
	 * resets all filters, geolocation/radius + properties and displays all tupels cached or to be loaded
	 *
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	showAll() {
		return new Promise((resolve, reject) => {
			this.mapsDataService.resetFilters();
			this.googleMap.updateView().then(() => resolve(), reject);
		});
	}

	/**
	 * geolocating an address or plz, centers map to result and adds radius-filter as well as showing its results
	 *
	 * @param {any} address
	 * @param {integer} resultRadius
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	searchFor(address, resultRadius) {
		return new Promise((resolve, reject) => {
			this.googleMap.searchFor(address).then(() => {
				this.mapsDataService.removeFilterType('radius');
				this.mapsDataService.addRadiusFilterFor(
					this.googleMap.clientLatLong,
					resultRadius,
				);
				resolve();
			}, reject);
		});
	}

	/**
	 * mapsAPI loaded/ready or not
	 *
	 * @returns {boolean}
	 * @memberof DealerLocator
	 */
	mapIsLoaded() {
		return this.googleMap.isLoaded;
	}

	/**
	 * get current center of gmap
	 *
	 * @returns {google.maps.Latlng}
	 * @memberof DealerLocator
	 */
	getCurrentLocation() {
		return this.googleMap.clientLatLong;
	}

	/**
	 * locates client on gmap and sets class-prop this.clientLatLong for later calculations to show marker near client
	 * sets zoomlevel of gmap
	 *
	 * @param {int} resultRadius
	 * @param {int} zoom
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	locateUser(resultRadius, zoom) {
		if (this.mapIsLoaded()) {
			return new Promise((resolve, reject) => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							this.googleMap.clientLatLong = {
								lat: position.coords.latitude,
								lng: position.coords.longitude,
							};

							this.mapsDataService.removeFilterType('radius');
							this.mapsDataService.addRadiusFilterFor(
								this.googleMap.clientLatLong,
								resultRadius,
							);

							this.setMapZoom(zoom);

							resolve();
						},
						(e) => reject(e),
					);
				} else {
					// Browser doesn't support Geolocation
					reject();
				}
			});
		}
	}

	/**
	 * set zoom-level of gmap
	 *
	 * @param {any} zoom
	 * @memberof DealerLocator
	 */
	setMapZoom(zoom) {
		this.googleMap.setZoom(zoom);
	}

	/**
	 * set a limit to the result-set
	 *
	 * use it before using updateView() to apply the behaviour
	 * set it to undefined if no limit is needed
	 *
	 * @param {any} max
	 * @memberof DealerLocator
	 */
	setMaxResults(max) {
		this.mapsDataService.maxResults = max;
	}

	/**
	 * updates map and custom-results views, for example after a filter has been applied
	 *
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	updateView() {
		return new Promise((resolve, reject) => {
			this.googleMap.updateView().then(() => resolve(), reject);
		});
	}

	/**
	 * closes currently opened infowindow on gmap
	 *
	 * @returns void
	 * @memberof DealerLocator
	 */
	closeInfoWindow() {
		this.googleMap.closeInfoWindow();
	}

	/* Filters --------------------------------------------------------------------------------- */

	/**
	 * add filter for property-key and -value
	 *
	 * @param {any} key
	 * @param {any} value
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	addFilterFor(key, value) {
		return new Promise((resolve, reject) => {
			this.mapsDataService.addFilterFor(key, value);
			resolve();
		});
	}

	/**
	 * remove previously added filter-option
	 *
	 * @param {any} key
	 * @param {any} value
	 * @param {any} type
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	removeFilter(key, value) {
		return new Promise((resolve, reject) => {
			this.mapsDataService.removeFilterFor(key, value);
			resolve();
		});
	}

	/**
	 * removes old radius-filter and adds passed radius as new radius-filter
	 *
	 * @param {integer} radius
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	addRadiusFilterFor(radius) {
		return new Promise((resolve, reject) => {
			this.mapsDataService.removeFilterType('radius');
			this.mapsDataService.addRadiusFilterFor(
				this.googleMap.clientLatLong,
				radius,
			);
			resolve();
		});
	}

	/**
	 * reset filter for specific type: radius or property
	 *
	 * @param {any} type
	 * @returns {Promise}
	 * @memberof DealerLocator
	 */
	removeFilterType(type) {
		return new Promise((resolve, reject) => {
			this.mapsDataService.removeFilterType(type);
			resolve();
		});
	}
}
