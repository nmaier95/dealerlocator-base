## Classes

<dl>
<dt><a href="#DealerLocator">DealerLocator</a></dt>
<dd></dd>
<dt><a href="#MapsDataService">MapsDataService</a></dt>
<dd></dd>
<dt><a href="#MapsDataSource">MapsDataSource</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#clusters_">clusters_</a> : <code><a href="#new_Cluster_new">Array.&lt;Cluster&gt;</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setData">setData(data)</a></dt>
<dd><p>calls MapsDataSource to set data if no urlGenerator is passed</p>
</dd>
<dt><a href="#replaceTemplateVar">replaceTemplateVar(tmpl, templateVar, delimiters, properties)</a> ⇒ <code>htmlString</code></dt>
<dd><p>Replaces template vars in passed template.
Escapes html to prevent xss and tries to replace html encoded templatevars as well</p>
</dd>
<dt><a href="#_geocode">_geocode(parameters)</a></dt>
<dd><p>in preparation of reverse geocoding where user gets located on page load, this location is a latLng and has to be transfered into
a location/country</p>
<p>resources:
<a href="https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=de">https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=de</a>
<a href="https://developers.google.com/maps/documentation/geocoding/intro?hl=de#Viewports">https://developers.google.com/maps/documentation/geocoding/intro?hl=de#Viewports</a></p>
<p>{&#39;address&#39;: address} | {&#39;location&#39;: latlng}</p>
</dd>
<dt><a href="#debounce">debounce(func, wait, immediate)</a> ⇒ <code>void</code></dt>
<dd><p>Taken from <a href="https://davidwalsh.name/function-debounce">https://davidwalsh.name/function-debounce</a></p>
</dd>
<dt><a href="#htmlEscape">htmlEscape(html)</a> ⇒ <code>htmlString</code></dt>
<dd></dd>
<dt><a href="#htmlEncode">htmlEncode(encode)</a></dt>
<dd></dd>
<dt><a href="#applyFilters">applyFilters()</a> ⇒ <code>Promise</code></dt>
<dd><p>filters data for previous applied filter-options
sorts by distance for radius-filter as well
applies maxResults limit if maxResults isset</p>
</dd>
<dt><a href="#getItems">getItems()</a> ⇒ <code>Promise</code></dt>
<dd><p>returns filtered data</p>
</dd>
<dt><a href="#setData">setData(data)</a></dt>
<dd><p>prefills data of maps data source if no urlGenerator is passed</p>
</dd>
<dt><a href="#buildResult">buildResult(url, options)</a></dt>
<dd><p>Requests a json document</p>
</dd>
<dt><a href="#request">request(url, options)</a></dt>
<dd><p>Requests a json document</p>
</dd>
<dt><a href="#setData">setData(data)</a></dt>
<dd></dd>
</dl>

<a name="DealerLocator"></a>

## DealerLocator
**Kind**: global class  

* [DealerLocator](#DealerLocator)
    * [new DealerLocator()](#new_DealerLocator_new)
    * [.module.exports](#DealerLocator.module.exports)
        * [new module.exports(config)](#new_DealerLocator.module.exports_new)
    * [.defaultConfig](#DealerLocator.defaultConfig) ⇒ <code>Object</code>
    * [.initializeMap()](#DealerLocator.initializeMap) ⇒ <code>Promise</code>
    * [.showAll()](#DealerLocator.showAll) ⇒ <code>Promise</code>
    * [.searchFor(address, resultRadius)](#DealerLocator.searchFor) ⇒ <code>Promise</code>
    * [.mapIsLoaded()](#DealerLocator.mapIsLoaded) ⇒ <code>boolean</code>
    * [.getCurrentLocation()](#DealerLocator.getCurrentLocation) ⇒ <code>google.maps.Latlng</code>
    * [.locateUser(resultRadius, zoom)](#DealerLocator.locateUser) ⇒ <code>Promise</code>
    * [.setMapZoom(zoom)](#DealerLocator.setMapZoom)
    * [.setMaxResults(max)](#DealerLocator.setMaxResults)
    * [.updateView()](#DealerLocator.updateView) ⇒ <code>Promise</code>
    * [.closeInfoWindow()](#DealerLocator.closeInfoWindow) ⇒
    * [.addFilterFor(key, value)](#DealerLocator.addFilterFor) ⇒ <code>Promise</code>
    * [.removeFilter(key, value, type)](#DealerLocator.removeFilter) ⇒ <code>Promise</code>
    * [.addRadiusFilterFor(radius)](#DealerLocator.addRadiusFilterFor) ⇒ <code>Promise</code>
    * [.removeFilterType(type)](#DealerLocator.removeFilterType) ⇒ <code>Promise</code>

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
| config | <code>Object</code> | 

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
**Read only**: true  
<a name="DealerLocator.initializeMap"></a>

### DealerLocator.initializeMap() ⇒ <code>Promise</code>
load mapsAPI and update views with data afterwards

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
<a name="DealerLocator.showAll"></a>

### DealerLocator.showAll() ⇒ <code>Promise</code>
resets all filters, geolocation/radius + properties and displays all tupels cached or to be loaded

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
<a name="DealerLocator.searchFor"></a>

### DealerLocator.searchFor(address, resultRadius) ⇒ <code>Promise</code>
geolocating an address or plz, centers map to result and adds radius-filter as well as showing its results

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| address | <code>any</code> | 
| resultRadius | <code>integer</code> | 

<a name="DealerLocator.mapIsLoaded"></a>

### DealerLocator.mapIsLoaded() ⇒ <code>boolean</code>
mapsAPI loaded/ready or not

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
<a name="DealerLocator.getCurrentLocation"></a>

### DealerLocator.getCurrentLocation() ⇒ <code>google.maps.Latlng</code>
get current center of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
<a name="DealerLocator.locateUser"></a>

### DealerLocator.locateUser(resultRadius, zoom) ⇒ <code>Promise</code>
locates client on gmap and sets class-prop this.clientLatLong for later calculations to show marker near client
sets zoomlevel of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| resultRadius | <code>int</code> | 
| zoom | <code>int</code> | 

<a name="DealerLocator.setMapZoom"></a>

### DealerLocator.setMapZoom(zoom)
set zoom-level of gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| zoom | <code>any</code> | 

<a name="DealerLocator.setMaxResults"></a>

### DealerLocator.setMaxResults(max)
set a limit to the result-set

use it before using updateView() to apply the behaviour
set it to undefined if no limit is needed

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| max | <code>any</code> | 

<a name="DealerLocator.updateView"></a>

### DealerLocator.updateView() ⇒ <code>Promise</code>
updates map and custom-results views, for example after a filter has been applied

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
<a name="DealerLocator.closeInfoWindow"></a>

### DealerLocator.closeInfoWindow() ⇒
closes currently opened infowindow on gmap

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  
**Returns**: void  
<a name="DealerLocator.addFilterFor"></a>

### DealerLocator.addFilterFor(key, value) ⇒ <code>Promise</code>
add filter for property-key and -value

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| key | <code>any</code> | 
| value | <code>any</code> | 

<a name="DealerLocator.removeFilter"></a>

### DealerLocator.removeFilter(key, value, type) ⇒ <code>Promise</code>
remove previously added filter-option

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| key | <code>any</code> | 
| value | <code>any</code> | 
| type | <code>any</code> | 

<a name="DealerLocator.addRadiusFilterFor"></a>

### DealerLocator.addRadiusFilterFor(radius) ⇒ <code>Promise</code>
removes old radius-filter and adds passed radius as new radius-filter

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| radius | <code>integer</code> | 

<a name="DealerLocator.removeFilterType"></a>

### DealerLocator.removeFilterType(type) ⇒ <code>Promise</code>
reset filter for specific type: radius or property

**Kind**: static method of [<code>DealerLocator</code>](#DealerLocator)  

| Param | Type |
| --- | --- |
| type | <code>any</code> | 

<a name="MapsDataService"></a>

## MapsDataService
**Kind**: global class  

* [MapsDataService](#MapsDataService)
    * [new MapsDataService()](#new_MapsDataService_new)
    * [.module.exports](#MapsDataService.module.exports)
        * [new module.exports(mapsDataSource, googleMap)](#new_MapsDataService.module.exports_new)
    * [.applyMaxResult(data)](#MapsDataService.applyMaxResult) ⇒ <code>object</code>
    * [.addFilterFor(propName, propValue)](#MapsDataService.addFilterFor)
    * [.removeFilterFor(propName, propValue)](#MapsDataService.removeFilterFor)
    * [.addRadiusFilterFor(center, radius)](#MapsDataService.addRadiusFilterFor)
    * [.removeFilterType()](#MapsDataService.removeFilterType)
    * [.resetFilters()](#MapsDataService.resetFilters)
    * [.ensureDetailsFor(ids)](#MapsDataService.ensureDetailsFor) ⇒ <code>Promise</code>
    * [.hasActiveRadiusFilter()](#MapsDataService.hasActiveRadiusFilter) ⇒ <code>boolean</code>

<a name="new_MapsDataService_new"></a>

### new MapsDataService()
provides logic for MapsDataSource, primarily filtering data

<a name="MapsDataService.module.exports"></a>

### MapsDataService.module.exports
**Kind**: static class of [<code>MapsDataService</code>](#MapsDataService)  
<a name="new_MapsDataService.module.exports_new"></a>

#### new module.exports(mapsDataSource, googleMap)
Creates an instance of MapsDataService.


| Param | Type |
| --- | --- |
| mapsDataSource | [<code>MapsDataSource</code>](#MapsDataSource) | 
| googleMap | <code>GoogleMap</code> | 

<a name="MapsDataService.applyMaxResult"></a>

### MapsDataService.applyMaxResult(data) ⇒ <code>object</code>
if class-property maxResults isset (!= undefined), the passed data gets sliced down to maxResults number and returned
else a copy of the data-param-object gets returned

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 

<a name="MapsDataService.addFilterFor"></a>

### MapsDataService.addFilterFor(propName, propValue)
add filter-option, does not apply them to data yet

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| propName | <code>any</code> | 
| propValue | <code>any</code> | 

<a name="MapsDataService.removeFilterFor"></a>

### MapsDataService.removeFilterFor(propName, propValue)
remove a specific previously added filter-option, does not apply to data yet

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| propName | <code>any</code> | 
| propValue | <code>any</code> | 

<a name="MapsDataService.addRadiusFilterFor"></a>

### MapsDataService.addRadiusFilterFor(center, radius)
add filter for radius search

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| center | <code>any</code> | 
| radius | <code>any</code> | 

<a name="MapsDataService.removeFilterType"></a>

### MapsDataService.removeFilterType()
remove filter of type "radius" or "property"

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
<a name="MapsDataService.resetFilters"></a>

### MapsDataService.resetFilters()
reset all previously applied filters

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
<a name="MapsDataService.ensureDetailsFor"></a>

### MapsDataService.ensureDetailsFor(ids) ⇒ <code>Promise</code>
use to check if tuple/s has/have extended properties already loaded, if not it´ll be loaded

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  

| Param | Type |
| --- | --- |
| ids | <code>any</code> | 

<a name="MapsDataService.hasActiveRadiusFilter"></a>

### MapsDataService.hasActiveRadiusFilter() ⇒ <code>boolean</code>
checks if any of the active filters is a radius filter, return true or false

**Kind**: static method of [<code>MapsDataService</code>](#MapsDataService)  
<a name="MapsDataSource"></a>

## MapsDataSource
**Kind**: global class  

* [MapsDataSource](#MapsDataSource)
    * [new MapsDataSource()](#new_MapsDataSource_new)
    * [.mergeData(data)](#MapsDataSource.mergeData) ⇒ <code>any</code>
    * [.fetchDataFor([extended], [ids])](#MapsDataSource.fetchDataFor) ⇒ <code>Promise</code>
    * [.fetch()](#MapsDataSource.fetch) ⇒ <code>Promise</code>
    * [.ensureDetailsFor(ids)](#MapsDataSource.ensureDetailsFor) ⇒ <code>Promise</code>

<a name="new_MapsDataSource_new"></a>

### new MapsDataSource()
loads and caches data for maps

<a name="MapsDataSource.mergeData"></a>

### MapsDataSource.mergeData(data) ⇒ <code>any</code>
Merges the given array into the current data

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
**Returns**: <code>any</code> - this._data  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 

<a name="MapsDataSource.fetchDataFor"></a>

### MapsDataSource.fetchDataFor([extended], [ids]) ⇒ <code>Promise</code>
Fetches data via the api and merges it

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  

| Param | Type | Default |
| --- | --- | --- |
| [extended] | <code>boolean</code> | <code>false</code> | 
| [ids] | <code>any</code> | <code>[]</code> | 

<a name="MapsDataSource.fetch"></a>

### MapsDataSource.fetch() ⇒ <code>Promise</code>
Fetch all locations.
Will use cached data on subsequent calls.

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  
<a name="MapsDataSource.ensureDetailsFor"></a>

### MapsDataSource.ensureDetailsFor(ids) ⇒ <code>Promise</code>
Ensures that all given id's contain all detail information.
This may trigger a api request.

**Kind**: static method of [<code>MapsDataSource</code>](#MapsDataSource)  

| Param | Type |
| --- | --- |
| ids | <code>any</code> | 

<a name="clusters_"></a>

## clusters\_ : [<code>Array.&lt;Cluster&gt;</code>](#new_Cluster_new)
**Kind**: global variable  
<a name="setData"></a>

## setData(data)
calls MapsDataSource to set data if no urlGenerator is passed

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>Array</code> | 

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

<a name="_geocode"></a>

## \_geocode(parameters)
in preparation of reverse geocoding where user gets located on page load, this location is a latLng and has to be transfered into
a location/country

resources:
https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=de
https://developers.google.com/maps/documentation/geocoding/intro?hl=de#Viewports

{'address': address} | {'location': latlng}

**Kind**: global function  

| Param | Type |
| --- | --- |
| parameters | <code>object</code> | 

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

## applyFilters() ⇒ <code>Promise</code>
filters data for previous applied filter-options
sorts by distance for radius-filter as well
applies maxResults limit if maxResults isset

**Kind**: global function  
<a name="getItems"></a>

## getItems() ⇒ <code>Promise</code>
returns filtered data

**Kind**: global function  
<a name="setData"></a>

## setData(data)
prefills data of maps data source if no urlGenerator is passed

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 

<a name="buildResult"></a>

## buildResult(url, options)
Requests a json document

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| options | <code>Object</code> | 

<a name="request"></a>

## request(url, options)
Requests a json document

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| options | <code>Object</code> | 

<a name="setData"></a>

## setData(data)
**Kind**: global function  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 

