## Modules

<dl>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
<dt><a href="#utils.module_debounce">debounce</a> ⇒</dt>
<dd><p>Taken from <a href="https://davidwalsh.name/function-debounce">https://davidwalsh.name/function-debounce</a></p>
</dd>
<dt><a href="#utils.module_htmlEscape">htmlEscape</a> ⇒ <code>htmlString</code></dt>
<dd></dd>
<dt><a href="#utils.module_htmlEncode">htmlEncode</a> ⇒ <code>htmlString</code></dt>
<dd></dd>
</dl>

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

<a name="module_utils"></a>

## utils
<a name="utils.module_debounce"></a>

## debounce ⇒
Taken from https://davidwalsh.name/function-debounce

**Returns**: void  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 
| wait | <code>number</code> | 
| immediate | <code>boolean</code> | 

<a name="utils.module_htmlEscape"></a>

## htmlEscape ⇒ <code>htmlString</code>

| Param | Type |
| --- | --- |
| html | <code>htmlString</code> | 

<a name="utils.module_htmlEncode"></a>

## htmlEncode ⇒ <code>htmlString</code>

| Param | Type |
| --- | --- |
| encode | <code>htmlString</code> | 

<a name="DealerLocator"></a>

## DealerLocator
**Kind**: global class  

* [DealerLocator](#DealerLocator)
    * [new DealerLocator()](#new_DealerLocator_new)
    * [.module.exports](#DealerLocator.module.exports)
        * [new module.exports(config)](#new_DealerLocator.module.exports_new)
    * [.defaultConfig](#DealerLocator.defaultConfig) ⇒ <code>Object</code>
    * [.setData(data)](#DealerLocator.setData) ⇒
    * [.setRequestOptions(requestOptions)](#DealerLocator.setRequestOptions) ⇒
    * [.initializeMap()](#DealerLocator.initializeMap) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.showAll()](#DealerLocator.showAll) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.searchFor(address, resultRadius)](#DealerLocator.searchFor) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.mapIsLoaded()](#DealerLocator.mapIsLoaded) ⇒ <code>boolean</code>
    * [.getCurrentLocation()](#DealerLocator.getCurrentLocation) ⇒ <code>google.maps.Latlng</code>
    * [.locateUser(resultRadius, zoom)](#DealerLocator.locateUser) ⇒ <code>Promise.&lt;(undefined\|Object)&gt;</code>
    * [.setMapZoom(zoom)](#DealerLocator.setMapZoom) ⇒
    * [.setMaxResults(max)](#DealerLocator.setMaxResults) ⇒
    * [.updateView()](#DealerLocator.updateView) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.closeInfoWindow()](#DealerLocator.closeInfoWindow) ⇒
    * [.addFilterFor(key, value)](#DealerLocator.addFilterFor) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.removeFilter(key, value)](#DealerLocator.removeFilter) ⇒ <code>Promise</code>
    * [.addRadiusFilterFor(radius)](#DealerLocator.addRadiusFilterFor) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.removeFilterType(type)](#DealerLocator.removeFilterType) ⇒ <code>Promise.&lt;undefined&gt;</code>

<a name="new_DealerLocator_new"></a>

### new DealerLocator()
controller-class, providing functionality used by the ui

<a name="DealerLocator.module.exports"></a>

### DealerLocator.module.exports
**Kind**: static class of [<code>DealerLocator</code>](#DealerLocator)  
<a name="new_DealerLocator.module.exports_new"></a>

#### new module.exports(config)
Creates an instance of DealerLocator.
!! 'distance' and 'id' (items of key templateVars in mapOptions) are properties which cannot change their name/key !!


| Param | Type |
| --- | --- |
| config | <code>defaultConfig</code> | 

<a name="DealerLocator.defaultConfig"></a>

### DealerLocator.defaultConfig ⇒ <code>Object</code>
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

**Kind**: static property of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.setData"></a>

### DealerLocator.setData(data) ⇒
calls MapsDataSource to set data if no urlGenerator is passed

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="DealerLocator.setRequestOptions"></a>

### DealerLocator.setRequestOptions(requestOptions) ⇒
set requestOptions used in MapsDataSource to fetch data
requestOptions can contain following keys: method, acceptType, body, formData, transformer

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| requestOptions | <code>Object</code> | 

<a name="DealerLocator.initializeMap"></a>

### DealerLocator.initializeMap() ⇒ <code>Promise.&lt;undefined&gt;</code>
load mapsAPI and update views with data afterwards

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.showAll"></a>

### DealerLocator.showAll() ⇒ <code>Promise.&lt;undefined&gt;</code>
resets all filters, geolocation/radius + properties and displays all tupels cached or to be loaded

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.searchFor"></a>

### DealerLocator.searchFor(address, resultRadius) ⇒ <code>Promise.&lt;undefined&gt;</code>
geolocating an address or plz, centers map to result and adds radius-filter as well as showing its results

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 
| resultRadius | <code>number</code> | 

<a name="DealerLocator.mapIsLoaded"></a>

### DealerLocator.mapIsLoaded() ⇒ <code>boolean</code>
mapsAPI loaded/ready or not

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.getCurrentLocation"></a>

### DealerLocator.getCurrentLocation() ⇒ <code>google.maps.Latlng</code>
get current center of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.locateUser"></a>

### DealerLocator.locateUser(resultRadius, zoom) ⇒ <code>Promise.&lt;(undefined\|Object)&gt;</code>
locates client on gmap and sets class-prop this.clientLatLong for later calculations to show marker near client
sets zoomlevel of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| resultRadius | <code>number</code> | 
| zoom | <code>number</code> | 

<a name="DealerLocator.setMapZoom"></a>

### DealerLocator.setMapZoom(zoom) ⇒
set zoom-level of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| zoom | <code>number</code> | 

<a name="DealerLocator.setMaxResults"></a>

### DealerLocator.setMaxResults(max) ⇒
set a limit to the result-set

use it before using updateView() to apply the behaviour
set it to undefined if no limit is needed

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| max | <code>number</code> | 

<a name="DealerLocator.updateView"></a>

### DealerLocator.updateView() ⇒ <code>Promise.&lt;undefined&gt;</code>
updates map and custom-results views, for example after a filter has been applied

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  
<a name="DealerLocator.closeInfoWindow"></a>

### DealerLocator.closeInfoWindow() ⇒
closes currently opened infowindow on gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
**Access**: public  
<a name="DealerLocator.addFilterFor"></a>

### DealerLocator.addFilterFor(key, value) ⇒ <code>Promise.&lt;undefined&gt;</code>
add filter for property-key and -value

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| value | <code>any</code> | 

<a name="DealerLocator.removeFilter"></a>

### DealerLocator.removeFilter(key, value) ⇒ <code>Promise</code>
remove previously added filter-option

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| value | <code>any</code> | 

<a name="DealerLocator.addRadiusFilterFor"></a>

### DealerLocator.addRadiusFilterFor(radius) ⇒ <code>Promise.&lt;undefined&gt;</code>
removes old radius-filter and adds passed radius as new radius-filter

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| radius | <code>number</code> | 

<a name="DealerLocator.removeFilterType"></a>

### DealerLocator.removeFilterType(type) ⇒ <code>Promise.&lt;undefined&gt;</code>
reset filter for specific type: radius or property

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Access**: public  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="GoogleMap"></a>

## GoogleMap
**Kind**: global class  

* [GoogleMap](#GoogleMap)
    * [new GoogleMap()](#new_GoogleMap_new)
    * [.module.exports](#GoogleMap.module.exports)
        * [new module.exports(apiKey, mapContainer, hasCluster, hasCustomResults, mapsDataService, resultEl, resultsContainer, configOptions)](#new_GoogleMap.module.exports_new)
    * [.clientLatLong](#GoogleMap.clientLatLong)
    * [.clientLatLong](#GoogleMap.clientLatLong) ⇒ <code>google.maps.LatLng</code>
    * [.isLoaded](#GoogleMap.isLoaded) ⇒ <code>boolean</code>
    * [.markers](#GoogleMap.markers) ⇒ <code>array.&lt;google.maps.Marker&gt;</code>
    * [.load()](#GoogleMap.load) ⇒
    * [.parseInfoWindow(marker, template)](#GoogleMap.parseInfoWindow) ⇒ <code>Promise</code>
    * [.parseTemplate(templateContainer)](#GoogleMap.parseTemplate) ⇒ <code>htmlString</code>
    * [.replaceTemplateVar(tmpl, templateVar, delimiters, properties)](#GoogleMap.replaceTemplateVar) ⇒ <code>htmlString</code>
    * [.closeInfoWindow()](#GoogleMap.closeInfoWindow) ⇒
    * [.setZoom(zoom)](#GoogleMap.setZoom) ⇒
    * [.updateView()](#GoogleMap.updateView) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.getMarkers()](#GoogleMap.getMarkers) ⇒ <code>Promise.&lt;array.&lt;google.maps.marker&gt;&gt;</code>
    * [.searchFor(address)](#GoogleMap.searchFor) ⇒ <code>Promise.&lt;any&gt;</code>
    * [._geocode(parameters)](#GoogleMap._geocode) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_GoogleMap_new"></a>

### new GoogleMap()
exposing api's to interact with google.map instance

<a name="GoogleMap.module.exports"></a>

### GoogleMap.module.exports
**Kind**: static class of [<code>GoogleMap</code>](#GoogleMap)  
<a name="new_GoogleMap.module.exports_new"></a>

#### new module.exports(apiKey, mapContainer, hasCluster, hasCustomResults, mapsDataService, resultEl, resultsContainer, configOptions)

| Param | Type |
| --- | --- |
| apiKey | <code>string</code> | 
| mapContainer | <code>string</code> | 
| hasCluster | <code>boolean</code> | 
| hasCustomResults | <code>boolean</code> | 
| mapsDataService | [<code>MapsDataService</code>](#MapsDataService) | 
| resultEl | <code>string</code> | 
| resultsContainer | <code>string</code> | 
| configOptions | <code>Object</code> | 

<a name="GoogleMap.clientLatLong"></a>

### GoogleMap.clientLatLong
**Kind**: static property of [<code>GoogleMap</code>](#GoogleMap)  

| Param | Type |
| --- | --- |
|  | <code>Object.&lt;(lat\|lng), number&gt;</code> | 

<a name="GoogleMap.clientLatLong"></a>

### GoogleMap.clientLatLong ⇒ <code>google.maps.LatLng</code>
**Kind**: static property of [<code>GoogleMap</code>](#GoogleMap)  
<a name="GoogleMap.isLoaded"></a>

### GoogleMap.isLoaded ⇒ <code>boolean</code>
**Kind**: static property of [<code>GoogleMap</code>](#GoogleMap)  
<a name="GoogleMap.markers"></a>

### GoogleMap.markers ⇒ <code>array.&lt;google.maps.Marker&gt;</code>
**Kind**: static property of [<code>GoogleMap</code>](#GoogleMap)  
<a name="GoogleMap.load"></a>

### GoogleMap.load() ⇒
initialize gmap api load and callbacks

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Returns**: void  
**Access**: public  
<a name="GoogleMap.parseInfoWindow"></a>

### GoogleMap.parseInfoWindow(marker, template) ⇒ <code>Promise</code>
parses data and template into google.maps.infowindow

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  

| Param | Type |
| --- | --- |
| marker | <code>google.maps.Marker</code> | 
| template | <code>string</code> | 

<a name="GoogleMap.parseTemplate"></a>

### GoogleMap.parseTemplate(templateContainer) ⇒ <code>htmlString</code>
template for popup when clicked on position on gmap
 !! distance and id are properties which cannot change their name/key !!

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  

| Param | Type |
| --- | --- |
| templateContainer | <code>string</code> | 
|  | <code>Object.&lt;(properties.&lt;Object&gt;\|id)&gt;</code> | 

<a name="GoogleMap.replaceTemplateVar"></a>

### GoogleMap.replaceTemplateVar(tmpl, templateVar, delimiters, properties) ⇒ <code>htmlString</code>
Replaces template vars in passed template.
Escapes html to prevent xss and tries to replace html encoded templatevars as well

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Returns**: <code>htmlString</code> - tmpl  
**Access**: public  

| Param | Type |
| --- | --- |
| tmpl | <code>htmlString</code> | 
| templateVar | <code>string</code> | 
| delimiters | <code>array</code> | 
| properties | <code>object</code> | 

<a name="GoogleMap.closeInfoWindow"></a>

### GoogleMap.closeInfoWindow() ⇒
closes currently opened infowindow on gmap

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Returns**: void  
**Access**: public  
<a name="GoogleMap.setZoom"></a>

### GoogleMap.setZoom(zoom) ⇒
sets zoom-level of gmap

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| zoom | <code>number</code> | 

<a name="GoogleMap.updateView"></a>

### GoogleMap.updateView() ⇒ <code>Promise.&lt;undefined&gt;</code>
**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  
<a name="GoogleMap.getMarkers"></a>

### GoogleMap.getMarkers() ⇒ <code>Promise.&lt;array.&lt;google.maps.marker&gt;&gt;</code>
generates marker-objects from a dataSource

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  
<a name="GoogleMap.searchFor"></a>

### GoogleMap.searchFor(address) ⇒ <code>Promise.&lt;any&gt;</code>
searches by address
sets this.clientLatLong to result pos

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  

| Param | Type |
| --- | --- |
| address | <code>string</code> | 

<a name="GoogleMap._geocode"></a>

### GoogleMap.\_geocode(parameters) ⇒ <code>Promise.&lt;Object&gt;</code>
in preparation of reverse geocoding where user gets located on page load, this location is a latLng and has to be transfered into
a location/country

resources:
https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=de
https://developers.google.com/maps/documentation/geocoding/intro?hl=de#Viewports

{'address': address} | {'location': latlng}

**Kind**: static method of [<code>GoogleMap</code>](#GoogleMap)  
**Access**: public  

| Param | Type |
| --- | --- |
| parameters | <code>object</code> | 

<a name="MapsDataService"></a>

## MapsDataService
**Kind**: global class  

* [MapsDataService](#MapsDataService)
    * [new MapsDataService()](#new_MapsDataService_new)
    * [.module.exports](#MapsDataService.module.exports)
        * [new module.exports(mapsDataSource, computeDistanceBetweenPoints)](#new_MapsDataService.module.exports_new)
    * [.maxResults](#MapsDataService.maxResults)
    * [.getItems()](#MapsDataService.getItems) ⇒ <code>Promise.&lt;undefined&gt;</code>
    * [.setData(data)](#MapsDataService.setData) ⇒
    * [.addFilterFor(propName, propValue)](#MapsDataService.addFilterFor) ⇒
    * [.removeFilterFor(propName, propValue)](#MapsDataService.removeFilterFor) ⇒
    * [.addRadiusFilterFor(center, radius)](#MapsDataService.addRadiusFilterFor) ⇒
    * [.removeFilterType(type)](#MapsDataService.removeFilterType) ⇒
    * [.resetFilters()](#MapsDataService.resetFilters) ⇒
    * [.ensureDetailsFor(ids)](#MapsDataService.ensureDetailsFor) ⇒ <code>Promise.&lt;array&gt;</code>
    * [.hasActiveRadiusFilter()](#MapsDataService.hasActiveRadiusFilter) ⇒ <code>boolean</code>

<a name="new_MapsDataService_new"></a>

### new MapsDataService()
provides logic for MapsDataSource, primarily filtering data

<a name="MapsDataService.module.exports"></a>

### MapsDataService.module.exports
**Kind**: static class of [<code>MapsDataService</code>](#MapsDataService)  
<a name="new_MapsDataService.module.exports_new"></a>

#### new module.exports(mapsDataSource, computeDistanceBetweenPoints)
Creates an instance of MapsDataService.


| Param | Type |
| --- | --- |
| mapsDataSource | [<code>MapsDataSource</code>](#MapsDataSource) | 
| computeDistanceBetweenPoints | <code>function</code> \| <code>undefined</code> | 

<a name="MapsDataService.maxResults"></a>

### MapsDataService.maxResults
**Kind**: static property of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| max | <code>number</code> | 

<a name="MapsDataService.getItems"></a>

### MapsDataService.getItems() ⇒ <code>Promise.&lt;undefined&gt;</code>
returns filtered data

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Access**: public  
<a name="MapsDataService.setData"></a>

### MapsDataService.setData(data) ⇒
prefills data of maps data source if no urlGenerator is passed

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="MapsDataService.addFilterFor"></a>

### MapsDataService.addFilterFor(propName, propValue) ⇒
add filter-option, does not apply them to data yet

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| propName | <code>string</code> | 
| propValue | <code>any</code> | 

<a name="MapsDataService.removeFilterFor"></a>

### MapsDataService.removeFilterFor(propName, propValue) ⇒
remove a specific previously added filter-option, does not apply to data yet

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| propName | <code>string</code> | 
| propValue | <code>any</code> | 

<a name="MapsDataService.addRadiusFilterFor"></a>

### MapsDataService.addRadiusFilterFor(center, radius) ⇒
add filter for radius search

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| center | <code>number</code> | 
| radius | <code>number</code> | 

<a name="MapsDataService.removeFilterType"></a>

### MapsDataService.removeFilterType(type) ⇒
remove filter of type "radius" or "property"

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="MapsDataService.resetFilters"></a>

### MapsDataService.resetFilters() ⇒
reset all previously applied filters

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Returns**: void  
**Access**: public  
<a name="MapsDataService.ensureDetailsFor"></a>

### MapsDataService.ensureDetailsFor(ids) ⇒ <code>Promise.&lt;array&gt;</code>
use to check if tuple/s has/have extended properties already loaded, if not it´ll be loaded

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Access**: public  

| Param | Type |
| --- | --- |
| ids | <code>any</code> | 

<a name="MapsDataService.hasActiveRadiusFilter"></a>

### MapsDataService.hasActiveRadiusFilter() ⇒ <code>boolean</code>
checks if any of the active filters is a radius filter, return true or false

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
**Access**: public  
<a name="MapsDataSource"></a>

## MapsDataSource
**Kind**: global class  

* [MapsDataSource](#MapsDataSource)
    * [new MapsDataSource()](#new_MapsDataSource_new)
    * [.module.exports](#MapsDataSource.module.exports)
        * [new module.exports(urlGenerator, requestOptions)](#new_MapsDataSource.module.exports_new)
    * [.data](#MapsDataSource.data) ⇒ <code>null</code> \| <code>array</code>
    * [.requestOptions](#MapsDataSource.requestOptions)
    * [.mergeData(data)](#MapsDataSource.mergeData) ⇒ <code>null</code> \| <code>array</code>
    * [.setData(data)](#MapsDataSource.setData) ⇒
    * [.fetch()](#MapsDataSource.fetch) ⇒ <code>Promise.&lt;array&gt;</code>
    * [.ensureDetailsFor(ids)](#MapsDataSource.ensureDetailsFor) ⇒ <code>Promise.&lt;array&gt;</code>

<a name="new_MapsDataSource_new"></a>

### new MapsDataSource()
loads and caches data for maps

<a name="MapsDataSource.module.exports"></a>

### MapsDataSource.module.exports
**Kind**: static class of [<code>MapsDataSource</code>](#MapsDataSource)  
<a name="new_MapsDataSource.module.exports_new"></a>

#### new module.exports(urlGenerator, requestOptions)

| Param | Type |
| --- | --- |
| urlGenerator | <code>function</code> | 
| requestOptions | <code>Object</code> | 

<a name="MapsDataSource.data"></a>

### MapsDataSource.data ⇒ <code>null</code> \| <code>array</code>
**Kind**: static property of [<code>MapsDataSource</code>](#MapsDataSource)  
**Access**: public  
<a name="MapsDataSource.requestOptions"></a>

### MapsDataSource.requestOptions
requestOptions can contain following keys: method, acceptType, body, formData, transformer

**Kind**: static property of [<code>MapsDataSource</code>](#MapsDataSource)  
**Access**: public  

| Param | Type |
| --- | --- |
| requestOptions | <code>Object</code> | 

<a name="MapsDataSource.mergeData"></a>

### MapsDataSource.mergeData(data) ⇒ <code>null</code> \| <code>array</code>
Merges the given array into the current data

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
**Access**: public  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="MapsDataSource.setData"></a>

### MapsDataSource.setData(data) ⇒
**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
**Returns**: void  
**Access**: public  

| Param | Type |
| --- | --- |
| data | <code>array</code> | 

<a name="MapsDataSource.fetch"></a>

### MapsDataSource.fetch() ⇒ <code>Promise.&lt;array&gt;</code>
Fetch all locations.
Will use cached data on subsequent calls.

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
**Access**: public  
<a name="MapsDataSource.ensureDetailsFor"></a>

### MapsDataSource.ensureDetailsFor(ids) ⇒ <code>Promise.&lt;array&gt;</code>
Ensures that all given id's contain all detail information.
This may trigger a api request.

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
**Access**: public  

| Param | Type |
| --- | --- |
| ids | <code>array</code> | 

