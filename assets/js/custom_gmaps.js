/***
* Envoc customized gmaps script.
*/
(function () {
	var GLatLng = google.maps.LatLng,
		delay = 0, // time between geocoding calls, milliseconds
		overQueryLimitAttempts = 0, // number of OVER_QUERY_LIMIT requests
		MAX_OVER_QUERY_LIMIT_ATTEMPTS = 3, // number of consecutive failed requests before aborting the Geocoding
		firstOverQueryLimitStatus = false;

	var CMS = {
		Maps: {
			LAT: 0,
			LON: 1,
			INDEX: 2,
			TITLE: 3,
			DESCRIPTION: 4,
			ADDRESS: 5,

			geocoder: new google.maps.Geocoder(),
			points: [],
			markers:[],
			map: null,
			popupWidth: 0,
			prevWindow: null,

			CreateMarker: function (latLng, index, title, description, address) {
				var marker = new google.maps.Marker({
					position: latLng,
					map: this.map,
					icon: "/Utilities/gmapmarker.png?number=" + index,
					shadow: {
						url: "http://www.google.com/mapfiles/shadow50.png",
						anchor: new google.maps.Point(10, 35)
					}
				});

				var infoHtml = "<span class='obnw webappmap title'>" + title + "</span><br/>";

				if (address)
					infoHtml += "<span class='obnw webappmap address'>" + address + "</span><br/>";

				infoHtml += "<span class='obnw webappmap description'>" + description + "</span>";

				var infoWindow = new google.maps.InfoWindow({
					content: infoHtml,
					size: new google.maps.Size(this.popupWidth, 0)
				});

				var map = this.map,
					self = this;
				google.maps.event.addListener(marker, 'click', function () {
					if (self.prevWindow) self.prevWindow.close();
					infoWindow.open(map, marker);
					self.prevWindow = infoWindow;
				});

				this.markers.push(marker);

				return marker;
			},

			CreateMarkerFromPoint: function (latLng, point) {
				var index = point[CMS.Maps.INDEX];
				var title = point[CMS.Maps.TITLE];
				var desc = point[CMS.Maps.DESCRIPTION];
				var address = point[CMS.Maps.ADDRESS];

				return this.CreateMarker(latLng, index, title, desc, address)
			},

			Geocode: function (pointIndex) {
				var instance = this;

				this.geocoder.geocode(
					{
						address: this.points[pointIndex][CMS.Maps.ADDRESS]
					},
					function (results, status) {
						var point = instance.points[pointIndex];

						if (status == google.maps.GeocoderStatus.OK || status == google.maps.GeocoderStatus.ZERO_RESULTS) {
							// reset the failed attempts counter
							overQueryLimitAttempts = 0;

							var latLng = false;
							if (status == google.maps.GeocoderStatus.OK) {
								// use the location provided by the Google Geocoding API
								latLng = results[0].geometry.location;
							} else {
								// use the location from DB
								var dbLat = point[CMS.Maps.LAT];
								var dbLng = point[CMS.Maps.LON];

								// don't add marker for (0,0) coords
								if (dbLat != 0 && dbLng != 0) {
									latLng = new GLatLng(dbLat, dbLng);
								}
							}

							if (latLng) {
								instance.mapBounds.extend(latLng);
								instance.CreateMarkerFromPoint(latLng, point);

								// Re-center map now and then
								if (pointIndex % 10 == 0) {
									instance.map.fitBounds(instance.mapBounds);
								}
							}

							if (instance.points.length > pointIndex + 1) {
								// plot the next point
								instance.GeocodeDelayed(pointIndex + 1, delay);
							} else {
								// Re-center map after all pinpoints have been set
								instance.map.fitBounds(instance.mapBounds);
							}

						} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {

							if (!firstOverQueryLimitStatus) {
								// this is the first OVER_QUERY_LIMIT status
								firstOverQueryLimitStatus = true;

								// plot now all points having DB coordinates
								var pointsForGeocoding = [];
								for (var latLng, point, i = pointIndex; i < instance.points.length; i++) {
									point = instance.points[i];

									if (point[CMS.Maps.LAT] != 0 && point[CMS.Maps.LON] != 0) {
										latLng = new GLatLng(point[CMS.Maps.LAT], point[CMS.Maps.LON]);
										instance.CreateMarkerFromPoint(latLng, point);
									} else {
										pointsForGeocoding.push(point);
									}
								}

								// restart throttled Geocoding for the remaining points that have (0, 0) coords in DB
								instance.points = pointsForGeocoding;

								if (instance.points.length) {
									instance.GeocodeDelayed(0, 2000);
								}

							} else {
								// increase delay between requests
								delay += 100;

								overQueryLimitAttempts++;
								if (overQueryLimitAttempts <= MAX_OVER_QUERY_LIMIT_ATTEMPTS) {
									// retry point delayed
									instance.GeocodeDelayed(pointIndex, 2000);
								} else {
									/* stop after 3 consecutive failed attempts */
								}
							}

						} else {
							/* stop, status is one of: ERROR, INVALID_REQUEST, REQUEST_DENIED, UNKNOWN_ERROR */
						}
					}
				);
			},

			GeocodeDelayed: function(pointIndex, delay) {
				var instance = this;
				setTimeout(function() {
					instance.Geocode(pointIndex);
				}, delay);
			},

			Initialize: function (mapData) {
				if (mapData.points.length == 0) return;

				this.points = mapData.points;
				this.popupWidth = mapData.width * 0.6;

				this.map = new google.maps.Map(document.getElementById(mapData.id), {
					zoomControl: true,
					panControl: true,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.SMALL
					},
					disableDefaultUI: true,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});

				this.mapBounds = new google.maps.LatLngBounds();
				for (var latLng, point, i = 0; i < mapData.points.length; i++) {
					point = mapData.points[i];
					if (point[this.LAT] != 0 && point[this.LON] != 0) {
						latLng = new GLatLng(point[this.LAT], point[this.LON]);
						this.mapBounds.extend(latLng);
					}
				}
				this.map.fitBounds(this.mapBounds);

				this.Geocode(0);

				var markerClusterer = new MarkerClusterer(this.map);

				return this.map;
			}
		}
	};

	window.CMS = CMS;
})();