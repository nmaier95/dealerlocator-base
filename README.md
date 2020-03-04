## Classes

<dl>
<dt><a href="#DealerLocator">DealerLocator</a></dt>
<dd></dd>
<dt><a href="#GoogleMap">GoogleMap</a></dt>
<dd></dd>
<dt><a href="#MapsDataService">MapsDataService</a></dt>
<dd></dd>
<dt><a href="#MapsDataSource">MapsDataSource</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#defaultConfig">defaultConfig</a> ⇒ <code>Object</code></dt>
<dd><p>returns default parameters for DealerLocator:constructor
overwrite it with your settings in DealerLocator:constructor(config)</p>
<p>mapContainer: required
resultEl: required
resultsContainer: required
apiKey: required
computeDistanceBetweenPoints: required
mapOptions: required
urlGenerator: optional
hasCluster: optional
mapsDataSource: optional {MapsDataSource}
mapsDataService: optional {MapsDataService}
googleMap: optional {GoogleMap}</p>
</dd>
<dt><a href="#clientLatLong">clientLatLong</a></dt>
<dd></dd>
<dt><a href="#clientLatLong">clientLatLong</a> ⇒ <code>google.maps.LatLng</code></dt>
<dd></dd>
<dt><a href="#isLoaded">isLoaded</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#markers">markers</a> ⇒ <code>array.&lt;google.maps.Marker&gt;</code></dt>
<dd></dd>
<dt><a href="#maxResults">maxResults</a></dt>
<dd></dd>
<dt><a href="#data">data</a> ⇒ <code>null</code> | <code>array</code></dt>
<dd></dd>
<dt><a href="#requestOptions">requestOptions</a></dt>
<dd><p>requestOptions can contain following keys: method, acceptType, body, formData, transformer</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setData">setData(data)</a> ⇒</dt>
<dd><p>calls MapsDataSource to set data if no urlGenerator is passed</p>
</dd>
<dt><a href="#setRequestOptions">setRequestOptions(requestOptions)</a> ⇒</dt>
<dd><p>set requestOptions used in MapsDataSource to fetch data
requestOptions can contain following keys: method, acceptType, body, formData, transformer</p>
</dd>
<dt><a href="#initializeMap">initializeMap()</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>load mapsAPI and update views with data afterwards</p>
</dd>
<dt><a href="#showAll">showAll()</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>resets all filters, geolocation/radius + properties and displays all tupels cached or to be loaded</p>
</dd>
<dt><a href="#searchFor">searchFor(address, resultRadius)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>geolocating an address or plz, centers map to result and adds radius-filter as well as showing its results</p>
</dd>
<dt><a href="#mapIsLoaded">mapIsLoaded()</a> ⇒ <code>boolean</code></dt>
<dd><p>mapsAPI loaded/ready or not</p>
</dd>
<dt><a href="#getCurrentLocation">getCurrentLocation()</a> ⇒ <code>google.maps.Latlng</code></dt>
<dd><p>get current center of gmap</p>
</dd>
<dt><a href="#locateUser">locateUser(resultRadius, zoom)</a> ⇒ <code>Promise.&lt;(undefined|Object)&gt;</code></dt>
<dd><p>locates client on gmap and sets class-prop this.clientLatLong for later calculations to show marker near client
sets zoomlevel of gmap</p>
</dd>
<dt><a href="#setMapZoom">setMapZoom(zoom)</a> ⇒</dt>
<dd><p>set zoom-level of gmap</p>
</dd>
<dt><a href="#setMaxResults">setMaxResults(max)</a> ⇒</dt>
<dd><p>set a limit to the result-set</p>
<p>use it before using updateView() to apply the behaviour
set it to undefined if no limit is needed</p>
</dd>
<dt><a href="#updateView">updateView()</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>updates map and custom-results views, for example after a filter has been applied</p>
</dd>
<dt><a href="#closeInfoWindow">closeInfoWindow()</a> ⇒</dt>
<dd><p>closes currently opened infowindow on gmap</p>
</dd>
<dt><a href="#addFilterFor">addFilterFor(key, value)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>add filter for property-key and -value</p>
</dd>
<dt><a href="#removeFilter">removeFilter(key, value)</a> ⇒ <code>Promise</code></dt>
<dd><p>remove previously added filter-option</p>
</dd>
<dt><a href="#addRadiusFilterFor">addRadiusFilterFor(radius)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>removes old radius-filter and adds passed radius as new radius-filter</p>
</dd>
<dt><a href="#removeFilterType">removeFilterType(type)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>reset filter for specific type: radius or property</p>
</dd>
<dt><a href="#load">load()</a> ⇒</dt>
<dd><p>initialize gmap api load and callbacks</p>
</dd>
<dt><a href="#parseInfoWindow">parseInfoWindow(marker, template)</a> ⇒ <code>Promise</code></dt>
<dd><p>parses data and template into google.maps.infowindow</p>
</dd>
<dt><a href="#parseTemplate">parseTemplate(templateContainer)</a> ⇒ <code>htmlString</code></dt>
<dd><p>template for popup when clicked on position on gmap
 !! distance and id are properties which cannot change their name/key !!</p>
</dd>
<dt><a href="#replaceTemplateVar">replaceTemplateVar(tmpl, templateVar, delimiters, properties)</a> ⇒ <code>htmlString</code></dt>
<dd><p>Replaces template vars in passed template.
Escapes html to prevent xss and tries to replace html encoded templatevars as well</p>
</dd>
<dt><a href="#closeInfoWindow">closeInfoWindow()</a> ⇒</dt>
<dd><p>closes currently opened infowindow on gmap</p>
</dd>
<dt><a href="#setZoom">setZoom(zoom)</a> ⇒</dt>
<dd><p>sets zoom-level of gmap</p>
</dd>
<dt><a href="#updateView">updateView()</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd></dd>
<dt><a href="#getMarkers">getMarkers()</a> ⇒ <code>Promise.&lt;array.&lt;google.maps.marker&gt;&gt;</code></dt>
<dd><p>generates marker-objects from a dataSource</p>
</dd>
<dt><a href="#searchFor">searchFor(address)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>searches by address
sets this.clientLatLong to result pos</p>
</dd>
<dt><a href="#debounce">debounce(func, wait, immediate)</a> ⇒ <code>void</code></dt>
<dd><p>Taken from <a href="https://davidwalsh.name/function-debounce">https://davidwalsh.name/function-debounce</a></p>
</dd>
<dt><a href="#htmlEscape">htmlEscape(html)</a> ⇒ <code>htmlString</code></dt>
<dd></dd>
<dt><a href="#htmlEncode">htmlEncode(encode)</a></dt>
<dd></dd>
<dt><a href="#applyFilters">applyFilters(data)</a> ⇒ <code>*</code></dt>
<dd><p>filters data for previous applied filter-options
sorts by distance for radius-filter as well
applies maxResults limit if maxResults isset</p>
</dd>
<dt><a href="#applyMaxResult">applyMaxResult(data)</a> ⇒ <code>array</code></dt>
<dd><p>if class-property maxResults isset (!= undefined), the passed data gets sliced down to maxResults number and returned
else a copy of the data-param-object gets returned</p>
</dd>
<dt><a href="#getItems">getItems()</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>returns filtered data</p>
</dd>
<dt><a href="#setData">setData(data)</a> ⇒</dt>
<dd><p>prefills data of maps data source if no urlGenerator is passed</p>
</dd>
<dt><a href="#addFilterFor">addFilterFor(propName, propValue)</a> ⇒</dt>
<dd><p>add filter-option, does not apply them to data yet</p>
</dd>
<dt><a href="#removeFilterFor">removeFilterFor(propName, propValue)</a> ⇒</dt>
<dd><p>remove a specific previously added filter-option, does not apply to data yet</p>
</dd>
<dt><a href="#addRadiusFilterFor">addRadiusFilterFor(center, radius)</a> ⇒</dt>
<dd><p>add filter for radius search</p>
</dd>
<dt><a href="#removeFilterType">removeFilterType(type)</a> ⇒</dt>
<dd><p>remove filter of type &quot;radius&quot; or &quot;property&quot;</p>
</dd>
<dt><a href="#resetFilters">resetFilters()</a> ⇒</dt>
<dd><p>reset all previously applied filters</p>
</dd>
<dt><a href="#ensureDetailsFor">ensureDetailsFor(ids)</a> ⇒ <code>Promise.&lt;array&gt;</code></dt>
<dd><p>use to check if tuple/s has/have extended properties already loaded, if not it´ll be loaded</p>
</dd>
<dt><a href="#hasActiveRadiusFilter">hasActiveRadiusFilter()</a> ⇒ <code>boolean</code></dt>
<dd><p>checks if any of the active filters is a radius filter, return true or false</p>
</dd>
<dt><a href="#buildResult">buildResult(event, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Formats request-response data</p>
</dd>
<dt><a href="#request">request(url, options)</a> ⇒ <code><a href="#buildResult">Promise.&lt;buildResult&gt;</a></code></dt>
<dd><p>Requests a json document</p>
</dd>
<dt><a href="#setData">setData(data)</a> ⇒</dt>
<dd></dd>
<dt><a href="#mergeData">mergeData(data)</a> ⇒ <code>null</code> | <code>array</code></dt>
<dd><p>Merges the given array into the current data</p>
</dd>
<dt><a href="#fetchDataFor">fetchDataFor(extended, ids)</a> ⇒ <code>Promise.&lt;undefined&gt;</code></dt>
<dd><p>Fetches data via the api and merges it</p>
</dd>
<dt><a href="#fetch">fetch()</a> ⇒ <code>Promise.&lt;array&gt;</code></dt>
<dd><p>Fetch all locations.
Will use cached data on subsequent calls.</p>
</dd>
<dt><a href="#ensureDetailsFor">ensureDetailsFor(ids)</a> ⇒ <code>Promise.&lt;array&gt;</code></dt>
<dd><p>Ensures that all given id&#39;s contain all detail information.
This may trigger a api request.</p>
</dd>
</dl>

<a name="DealerLocator"></a>

## DealerLocator
**Kind**: global class  
<a name="new_DealerLocator_new"></a>

### new DealerLocator()
controller-class, providing functionality used by the ui

<a name="GoogleMap"></a>

## GoogleMap
**Kind**: global class  
<a name="new_GoogleMap_new"></a>

### new GoogleMap()
exposing api's to interact with google.map instance

<a name="MapsDataService"></a>

## MapsDataService
**Kind**: global class  
<a name="new_MapsDataService_new"></a>

### new MapsDataService()
provides logic for MapsDataSource, primarily filtering data

<a name="MapsDataSource"></a>

## MapsDataSource
**Kind**: global class  
<a name="new_MapsDataSource_new"></a>

### new MapsDataSource()
loads and caches data for maps

<a name="defaultConfig"></a>

## defaultConfig ⇒ <code>Object</code>
returns default parameters for DealerLocator:constructor
overwrite it with your settings in DealerLocator:constructor(config)

mapContainer: required
resultEl: required
resultsContainer: required
apiKey: required
computeDistanceBetweenPoints: required
mapOptions: required
urlGenerator: optional
hasCluster: optional
mapsDataSource: optional {MapsDataSource}
mapsDataService: optional {MapsDataService}
googleMap: optional {GoogleMap}

**Kind**: global variable  
<a name="clientLatLong"></a>

## clientLatLong
**Kind**: global variable  

| Param | Type |
| --- | --- |
|  | <code>Object.&lt;(lat\|lng), number&gt;</code> | 

<a name="clientLatLong"></a>

## clientLatLong ⇒ <code>google.maps.LatLng</code>
**Kind**: global variable  
<a name="isLoaded"></a>

## isLoaded ⇒ <code>boolean</code>
**Kind**: global variable  
<a name="markers"></a>

## markers ⇒ <code>array.&lt;google.maps.Marker&gt;</code>
**Kind**: global variable  
<a name="maxResults"></a>

## maxResults
**Kind**: global variable  

| Param | Type |
| --- | --- |
| max | <code>number</code> | 

<a name="data"></a>

## data ⇒ <code>null</code> \| <code>array</code>
**Kind**: global variable  
<a name="requestOptions"></a>

## requestOptions
requestOptions can contain following keys: method, acceptType, body, formData, transformer

**Kind**: global variable  

| Param | Type |
| --- | --- |
| requestOptions | <code>Object</code> | 

<a name="setData"></a>

## setData(data) ⇒
calls MapsDataSource to set data if no urlGenerator is passed

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="setRequestOptions"></a>

## setRequestOptions(requestOptions) ⇒
set requestOptions used in MapsDataSource to fetch data
requestOptions can contain following keys: method, acceptType, body, formData, transformer

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| requestOptions | <code>Object</code> | 

<a name="initializeMap"></a>

## initializeMap() ⇒ <code>Promise.&lt;undefined&gt;</code>
load mapsAPI and update views with data afterwards

**Kind**: global function  
<a name="showAll"></a>

## showAll() ⇒ <code>Promise.&lt;undefined&gt;</code>
resets all filters, geolocation/radius + properties and displays all tupels cached or to be loaded

**Kind**: global function  
<a name="searchFor"></a>

## searchFor(address, resultRadius) ⇒ <code>Promise.&lt;undefined&gt;</code>
geolocating an address or plz, centers map to result and adds radius-filter as well as showing its results

**Kind**: global function  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| resultRadius | <code>number</code> | 

<a name="mapIsLoaded"></a>

## mapIsLoaded() ⇒ <code>boolean</code>
mapsAPI loaded/ready or not

**Kind**: global function  
<a name="getCurrentLocation"></a>

## getCurrentLocation() ⇒ <code>google.maps.Latlng</code>
get current center of gmap

**Kind**: global function  
<a name="locateUser"></a>

## locateUser(resultRadius, zoom) ⇒ <code>Promise.&lt;(undefined\|Object)&gt;</code>
locates client on gmap and sets class-prop this.clientLatLong for later calculations to show marker near client
sets zoomlevel of gmap

**Kind**: global function  

| Param | Type |
| --- | --- |
| resultRadius | <code>number</code> | 
| zoom | <code>number</code> | 

<a name="setMapZoom"></a>

## setMapZoom(zoom) ⇒
set zoom-level of gmap

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| zoom | <code>number</code> | 

<a name="setMaxResults"></a>

## setMaxResults(max) ⇒
set a limit to the result-set

use it before using updateView() to apply the behaviour
set it to undefined if no limit is needed

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| max | <code>number</code> | 

<a name="updateView"></a>

## updateView() ⇒ <code>Promise.&lt;undefined&gt;</code>
updates map and custom-results views, for example after a filter has been applied

**Kind**: global function  
<a name="closeInfoWindow"></a>

## closeInfoWindow() ⇒
closes currently opened infowindow on gmap

**Kind**: global function  
**Returns**: void  
<a name="addFilterFor"></a>

## addFilterFor(key, value) ⇒ <code>Promise.&lt;undefined&gt;</code>
add filter for property-key and -value

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| value | <code>any</code> | 

<a name="removeFilter"></a>

## removeFilter(key, value) ⇒ <code>Promise</code>
remove previously added filter-option

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| value | <code>any</code> | 

<a name="addRadiusFilterFor"></a>

## addRadiusFilterFor(radius) ⇒ <code>Promise.&lt;undefined&gt;</code>
removes old radius-filter and adds passed radius as new radius-filter

**Kind**: global function  

| Param | Type |
| --- | --- |
| radius | <code>number</code> | 

<a name="removeFilterType"></a>

## removeFilterType(type) ⇒ <code>Promise.&lt;undefined&gt;</code>
reset filter for specific type: radius or property

**Kind**: global function  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="load"></a>

## load() ⇒
initialize gmap api load and callbacks

**Kind**: global function  
**Returns**: void  
<a name="parseInfoWindow"></a>

## parseInfoWindow(marker, template) ⇒ <code>Promise</code>
parses data and template into google.maps.infowindow

**Kind**: global function  

| Param | Type |
| --- | --- |
| marker | <code>google.maps.Marker</code> | 
| template | <code>string</code> | 

<a name="parseTemplate"></a>

## parseTemplate(templateContainer) ⇒ <code>htmlString</code>
template for popup when clicked on position on gmap
 !! distance and id are properties which cannot change their name/key !!

**Kind**: global function  

| Param | Type |
| --- | --- |
| templateContainer | <code>string</code> | 
|  | <code>Object.&lt;(properties.&lt;Object&gt;\|id)&gt;</code> | 

<a name="replaceTemplateVar"></a>

## replaceTemplateVar(tmpl, templateVar, delimiters, properties) ⇒ <code>htmlString</code>
Replaces template vars in passed template.
Escapes html to prevent xss and tries to replace html encoded templatevars as well

**Kind**: global function  
**Returns**: <code>htmlString</code> - tmpl  

| Param | Type |
| --- | --- |
| tmpl | <code>htmlString</code> | 
| templateVar | <code>string</code> | 
| delimiters | <code>array</code> | 
| properties | <code>object</code> | 

<a name="closeInfoWindow"></a>

## closeInfoWindow() ⇒
closes currently opened infowindow on gmap

**Kind**: global function  
**Returns**: void  
<a name="setZoom"></a>

## setZoom(zoom) ⇒
sets zoom-level of gmap

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| zoom | <code>number</code> | 

<a name="updateView"></a>

## updateView() ⇒ <code>Promise.&lt;undefined&gt;</code>
**Kind**: global function  
<a name="getMarkers"></a>

## getMarkers() ⇒ <code>Promise.&lt;array.&lt;google.maps.marker&gt;&gt;</code>
generates marker-objects from a dataSource

**Kind**: global function  
<a name="searchFor"></a>

## searchFor(address) ⇒ <code>Promise.&lt;any&gt;</code>
searches by address
sets this.clientLatLong to result pos

**Kind**: global function  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="debounce"></a>

## debounce(func, wait, immediate) ⇒ <code>void</code>
Taken from https://davidwalsh.name/function-debounce

**Kind**: global function  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 
| wait | <code>Number</code> | 
| immediate | <code>Boolean</code> | 

<a name="htmlEscape"></a>

## htmlEscape(html) ⇒ <code>htmlString</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| html | <code>htmlString</code> | 

<a name="htmlEncode"></a>

## htmlEncode(encode)
**Kind**: global function  

| Param | Type |
| --- | --- |
| encode | <code>\*</code> | 

<a name="applyFilters"></a>

## applyFilters(data) ⇒ <code>\*</code>
filters data for previous applied filter-options
sorts by distance for radius-filter as well
applies maxResults limit if maxResults isset

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="applyMaxResult"></a>

## applyMaxResult(data) ⇒ <code>array</code>
if class-property maxResults isset (!= undefined), the passed data gets sliced down to maxResults number and returned
else a copy of the data-param-object gets returned

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="getItems"></a>

## getItems() ⇒ <code>Promise.&lt;undefined&gt;</code>
returns filtered data

**Kind**: global function  
<a name="setData"></a>

## setData(data) ⇒
prefills data of maps data source if no urlGenerator is passed

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="addFilterFor"></a>

## addFilterFor(propName, propValue) ⇒
add filter-option, does not apply them to data yet

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| propName | <code>string</code> | 
| propValue | <code>any</code> | 

<a name="removeFilterFor"></a>

## removeFilterFor(propName, propValue) ⇒
remove a specific previously added filter-option, does not apply to data yet

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| propName | <code>string</code> | 
| propValue | <code>any</code> | 

<a name="addRadiusFilterFor"></a>

## addRadiusFilterFor(center, radius) ⇒
add filter for radius search

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| center | <code>number</code> | 
| radius | <code>number</code> | 

<a name="removeFilterType"></a>

## removeFilterType(type) ⇒
remove filter of type "radius" or "property"

**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="resetFilters"></a>

## resetFilters() ⇒
reset all previously applied filters

**Kind**: global function  
**Returns**: void  
<a name="ensureDetailsFor"></a>

## ensureDetailsFor(ids) ⇒ <code>Promise.&lt;array&gt;</code>
use to check if tuple/s has/have extended properties already loaded, if not it´ll be loaded

**Kind**: global function  

| Param | Type |
| --- | --- |
| ids | <code>any</code> | 

<a name="hasActiveRadiusFilter"></a>

## hasActiveRadiusFilter() ⇒ <code>boolean</code>
checks if any of the active filters is a radius filter, return true or false

**Kind**: global function  
<a name="buildResult"></a>

## buildResult(event, options) ⇒ <code>Object</code>
Formats request-response data

**Kind**: global function  

| Param | Type |
| --- | --- |
| event | <code>XMLHttpRequestEventTarget</code> | 
| options | <code>Object</code> | 

<a name="request"></a>

## request(url, options) ⇒ [<code>Promise.&lt;buildResult&gt;</code>](#buildResult)
Requests a json document

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| options | <code>Object</code> | 

<a name="setData"></a>

## setData(data) ⇒
**Kind**: global function  
**Returns**: void  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="mergeData"></a>

## mergeData(data) ⇒ <code>null</code> \| <code>array</code>
Merges the given array into the current data

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="fetchDataFor"></a>

## fetchDataFor(extended, ids) ⇒ <code>Promise.&lt;undefined&gt;</code>
Fetches data via the api and merges it

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| extended | <code>boolean</code> | <code>false</code> | 
| ids | <code>array</code> |  | 

<a name="fetch"></a>

## fetch() ⇒ <code>Promise.&lt;array&gt;</code>
Fetch all locations.
Will use cached data on subsequent calls.

**Kind**: global function  
<a name="ensureDetailsFor"></a>

## ensureDetailsFor(ids) ⇒ <code>Promise.&lt;array&gt;</code>
Ensures that all given id's contain all detail information.
This may trigger a api request.

**Kind**: global function  

| Param | Type |
| --- | --- |
| ids | <code>array</code> | 

