import { debounce, htmlEncode, htmlEscape } from './helper/utils';
import MarkerClusterer from './MarkerClusterer';
import { NodeArray } from './helper/NodeArray';

export default class GoogleMap {
	/* Properties ------------------------------------------------------------------------------ */

	set clientLatLong({ lat, lng }) {
		this._clientLatLong = new google.maps.LatLng({ lat: lat, lng: lng });
		this.map.setCenter(this._clientLatLong);
	}

	get clientLatLong() {
		return this._clientLatLong;
	}

	get isLoaded() {
		return this._isLoaded;
	}

	get markers() {
		return this._markers;
	}

	/* Initialize ------------------------------------------------------------------------------ */

	constructor(
		apiKey,
		mapContainer,
		hasCluster,
		mapsDataService,
		resultEl,
		resultsContainer,
		configOptions,
	) {
		/**@type {google.maps.Map} **/
		this.map = null;

		//saves the center-pos of gmap on resize
		/**@type {google.maps.LatLng} **/
		this.centerPos = null;

		//includes passed get-parameters
		this.defaultMapConfig = configOptions;

		//html el wich is supposed to contain gmap
		this.mapContainer = mapContainer;

		this.markerCluster = null;

		//is-loaded prop, signals if map api is loaded
		this._isLoaded = false;

		//decides if gmap clustering should be used or not
		this.hasCluster = hasCluster;

		/**@type {google.maps.InfoWindow} **/
		this.infowindow = null;

		/**@type {MapsDataService} */
		this.mapsDataService = mapsDataService;

		this.$resultsContainer = new NodeArray(resultsContainer);

		this.resultEl = resultEl;

		this._markers = [];

		this.apiKey = apiKey;

		//re-center map on browser resize
		window.addEventListener(
			'resize',
			debounce(this._reCenter.bind(this), 100),
		);
	}

	/**
	 * initialize gmap api load and callbacks
	 *
	 * @param {any} apiUrl
	 * @memberof ClientGoogleMap
	 */
	load(resolve, reject) {
		return new Promise((resolve, reject) => {
			//kick off googleMaps API + map
			const self = this,
				s = document.createElement('script');
			s.type = 'text/javascript';
			s.src =
				'https://maps.googleapis.com/maps/api/js?key=' +
				this.apiKey +
				'&callback=onGoogleApiLoaded&libraries=geometry';
			window.onGoogleApiLoaded = function() {
				self._onGoogleMapsLoad();
				self._isLoaded = true;
				resolve();
			};
			document.querySelector('head').appendChild(s);
		});
	}

	/**
	 * triggered when GoogleApi has been loaded
	 * inits Map and loads json with locations
	 * adds event-listener to show info-vindow on gmap-position-click
	 *
	 * @memberof ClientGoogleMap
	 */
	_onGoogleMapsLoad() {
		this._clientLatLong = new google.maps.LatLng(
			this.defaultMapConfig.center.lat,
			this.defaultMapConfig.center.lng,
		);

		// init map
		this.map = new google.maps.Map(
			document.getElementById(this.mapContainer),
			{
				// multiple google maps config properties can passed by the dealerlocator
				...this.defaultMapConfig,
				center: this._clientLatLong,
			},
		);

		this._initCustomSetStyle();
	}

	/**
	 * custom setStyle function, which binds a feature property from geojson to visible-state of a feature
	 * needed to hide markers when clustered
	 *
	 * @memberof ClientGoogleMap
	 */
	_initCustomSetStyle() {
		this.map.data.setStyle(function(feature) {
			return /** @type {google.maps.Data.StyleOptions} */ {
				visible: feature.getProperty('active'),
			};
		});
	}

	/**
	 * inits gmap cluster on current map and markers
	 *
	 * @memberof ClientGoogleMap
	 */
	_initClusterer() {
		this.markerCluster = new MarkerClusterer(this.map, this._markers, {
			imagePath: this.defaultMapConfig.clusterIconPath + '/m',
			//the smaller maxZoom, the further zoomed out markers will become clustered
			maxZoom: this.defaultMapConfig.maxClusterZoom,
		});
	}

	/**
	 * bind click event to custom results-view-items
	 *
	 * @memberof ClientGoogleMap
	 */
	_bindCustomResultClick() {
		// event-handler when clicked on a result-item to show equal popup on gmap
		this.$resultsContainer
			.find(this.resultEl)
			.on('click', this._onResultClick.bind(this));
	}

	/* Eventhandler ---------------------------------------------------------------------------- */

	/**
	 * sets center of map on re-size to center-pos from previous resize if not changed
	 *
	 * @memberof ClientGoogleMap
	 */
	_reCenter() {
		const currCenter = this.map.getCenter();

		if (!this.centerPos) this.centerPos = this.map.getCenter();

		if (
			currCenter.lat() != this.centerPos.lat() &&
			currCenter.lng() != this.centerPos.lng()
		) {
			this.centerPos = this.map.getCenter();
		}

		this.map.setCenter(this.centerPos);
	}

	/**
	 * when clicked onto an position on gmap, to show infopopup
	 *
	 * @param {any} event
	 * @memberof Component
	 */
	_onMarkerClick(marker) {
		if (this.defaultMapConfig.clickableIcons === false) {
			this.map.setCenter(marker.getPosition());
			return;
		}

		if (!this.infowindow) {
			this.infowindow = new google.maps.InfoWindow();
		}

		this.mapsDataService
			.ensureDetailsFor([marker.id])
			.then((extendedMarker) => {
				const template = this.parseTemplate(
					'.gmapInfoTemplate',
					marker,
				);

				this.parseInfoWindow(marker, template);
			});
	}

	/**
	 * when clicked on an result in custom result container
	 * element click handler
	 *
	 * @param {any} e
	 * @memberof GoogleMap
	 */
	_onResultClick(e) {
		const currentTarget = new NodeArray(e.currentTarget);
		new NodeArray(this.resultEl).removeClass('is-active');
		currentTarget.addClass('is-active');

		this.getMarkers().then((markers) => {
			const marker = markers.filter(
				(marker) =>
					parseInt(marker.id) ==
					parseInt(currentTarget.attribute('data-id')),
			);

			this._onMarkerClick(marker[0]);
		});
	}

	/* Templates ------------------------------------------------------------------------------- */

	/**
	 * parses data and template into google.maps.infowindow
	 *
	 * @param {any} marker
	 * @param {any} template
	 * @returns {Promise}
	 * @memberof GoogleMap
	 */
	parseInfoWindow(marker, template) {
		return new Promise((resolve, reject) => {
			google.maps.event.addListener(this.infowindow, 'domready', resolve);

			this.infowindow.setContent(template);
			this.infowindow.setPosition(marker.getPosition());

			this.infowindow.setOptions({
				pixelOffset: new google.maps.Size(0, -30),
			});
			this.infowindow.open(this.map);
			this.map.setCenter(marker.getPosition());
			this.setZoom(13);
		});
	}

	/**
	 * template for popup when clicked on position on gmap
	 *  !! distance and id are properties which cannot change their name/key !!
	 *
	 * @param {any} {feature}
	 * @returns template
	 * @memberof Component
	 */
	parseTemplate(templateContainer, { properties, id }) {
		const delimiters = this.defaultMapConfig.templateDelimiters;
		let tmpl = document.querySelector(templateContainer).innerHTML;

		for (const templateVar of this.defaultMapConfig.templateVars) {
			tmpl = this.replaceTemplateVar(
				tmpl,
				templateVar,
				delimiters,
				properties,
			);

			if (
				this.defaultMapConfig.templateVars.indexOf('distance') > -1 &&
				properties.distance &&
				templateVar == 'distance' &&
				this.mapsDataService.hasActiveRadiusFilter() == true
			) {
				//only replace distance in template when it's been calculated before and actually set in defaultMapConfig
				tmpl = tmpl
					.replace(/{distance}/g, properties.distance)
					.replace(/is-hidden/g, '');
			}
		}

		// tmpl = tmpl.replace(new RegExp(delimiters[0] + 'id' + delimiters[1], 'g'), id);
		tmpl = this.replaceTemplateVar(tmpl, 'id', delimiters, { id: id });

		return tmpl;
	}

	/**
	 * Replaces template vars in passed template.
	 * Escapes html to prevent xss and tries to replace html encoded templatevars as well
	 *
	 * @param {htmlString} tmpl
	 * @param {string} templateVar
	 * @param {array} delimiters
	 * @param {object} properties
	 * @return {htmlString} tmpl
	 */
	replaceTemplateVar(tmpl, templateVar, delimiters, properties = {}) {
		const replace = (tmpl, templateVar, data, delimiters) => {
			return tmpl.replace(
				new RegExp(delimiters[0] + templateVar + delimiters[1], 'g'),
				data,
			);
		};

		const escapedData = htmlEscape(properties[templateVar]),
			encodedDelimiters = [
				htmlEncode(delimiters[0]),
				htmlEncode(delimiters[1]),
			];

		tmpl = replace(tmpl, templateVar, escapedData, delimiters);
		tmpl = replace(tmpl, templateVar, escapedData, encodedDelimiters);

		return tmpl;
	}

	/* Public ---------------------------------------------------------------------------------- */

	/**
	 * closes currently opened infowindow on gmap
	 *
	 * @returns void
	 * @memberof GoogleMap
	 */
	closeInfoWindow() {
		if (this.infowindow) {
			this.infowindow.close();
		}
	}

	/**
	 * sets zoom-level of gmap
	 *
	 * @param {any} zoom
	 * @memberof GoogleMap
	 */
	setZoom(zoom) {
		this.map.setZoom(zoom);
	}

	/**
	 *
	 *
	 * @returns {Promise}
	 * @memberof GoogleMap
	 */
	updateView() {
		return new Promise((resolve, reject) => {
			let tmpl = '';

			if (this._markers.length > 0) {
				this._markers.forEach((marker) => marker.setMap(null));
			}

			this.getMarkers().then((markers) => {
				//init custom resultview
				markers.forEach((marker) => {
					tmpl += this.parseTemplate(
						'.customSearchResultItemTemplate',
						marker,
					);
					marker.setMap(this.map);
				});

				if (this.hasCluster) {
					this.markerCluster
						? this.markerCluster.clearMarkers()
						: null;
					this._initClusterer();
				}

				this.$resultsContainer[0].innerHTML = '';
				this.$resultsContainer.append(tmpl);

				// event-handler when clicked on a result-item to show equal popup on gmap
				this._bindCustomResultClick();

				resolve();
			}, reject);
		});
	}

	/**
	 * generates marker-objects from a dataSource
	 *
	 * @returns {Promise}
	 * @memberof GoogleMap
	 */
	getMarkers() {
		return new Promise((resolve, reject) => {
			this.mapsDataService.getItems().then((items) => {
				this._markers = items.map((item) => {
					const marker = new google.maps.Marker({
						position: {
							lng: item.geometry.lng,
							lat: item.geometry.lat,
						},
						properties: item.properties,
						icon: this.defaultMapConfig.iconConfig
							? {
									scaledSize: new google.maps.Size(
										this.defaultMapConfig.iconConfig.width,
										this.defaultMapConfig.iconConfig.height,
									),
									url: this.defaultMapConfig.iconConfig.url,
							  }
							: null,
						id: item.id,
					});

					google.maps.event.addListener(
						marker,
						'click',
						((marker) => {
							return () => this._onMarkerClick(marker);
						})(marker),
					);

					return marker;
				});
				resolve(this._markers);
			});
		});
	}

	/**
	 * searches by address
	 * sets this.clientLatLong to result pos
	 *
	 * @param {any} value
	 * @param {any} type
	 * @returns {Promise}
	 * @memberof ClientGoogleMap
	 */
	searchFor(address) {
		return new Promise((resolve, reject) => {
			this._geocode({ address: address }).then(({ results, status }) => {
				if (status === 'OK') {
					const resultLocation = results[0].geometry.location;
					this.map.setCenter(resultLocation);

					//clientLatLong : google.maps.LatLng
					this._clientLatLong = new google.maps.LatLng({
						lat: resultLocation.lat(),
						lng: resultLocation.lng(),
					});

					resolve();
				} else {
					reject({
						code: status,
						message: 'geocoding error',
					});
				}
			});
		});
	}

	/**
	 * in preparation of reverse geocoding where user gets located on page load, this location is a latLng and has to be transfered into
	 * a location/country
	 *
	 * resources:
	 * https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=de
	 * https://developers.google.com/maps/documentation/geocoding/intro?hl=de#Viewports
	 *
	 * {'address': address} | {'location': latlng}
	 * @param {object} parameters
	 */
	_geocode(parameters) {
		return new Promise((resolve, reject) => {
			const geocoder = new google.maps.Geocoder();

			geocoder.geocode(parameters, (results, status) => {
				resolve({ results, status });
			});
		});
	}
}
