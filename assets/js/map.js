var geocoder = new google.maps.Geocoder();
		var address = "10000 Perkins Rowe, Baton Rouge, Lousisiana, 70810";
		
		geocoder.geocode( { 'address': address}, function(results, status) {
		
		if (status == google.maps.GeocoderStatus.OK) {
			window.latitude = results[0].geometry.location.lat();
			window.longitude = results[0].geometry.location.lng();
			} 
		}); 
		
		
            // When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
				
				var contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h5 id="firstHeading" class="firstHeading">{{mapPinName}}</h5>'+
					'<div id="bodyContent">'+
					'<p>{{mapAddressFull}}</p>'+
					'</div>'+
					'</div>';
		
				var infowindow = new google.maps.InfoWindow({
				  content: contentString
				});
				
				
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(latitude, longitude), // New York
					scrollwheel: false,
					navigationControl: false,
					mapTypeControl: false,
					scaleControl: false,
					draggable: true,
					disableDefaultUI: true,
                    styles: [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#0a2f41"
            },
            {
                "lightness": "35"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": "12"
            },
            {
                "saturation": "-5"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": "20"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-18"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-16"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "-9"
            },
            {
                "weight": "0.64"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "-28"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-23"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": "8"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-62"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0a2f41"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-31"
            }
        ]
    }
]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    map: map,
                    title: '{{mapName}}',
					icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
                });
				marker.addListener('click', function() {
				  infowindow.open(map, marker);
				});
            }