// google places
if ($('.search-places__field').length != 0) {
	$(function(){
		var autocomplete,
			geocoder,
			input = document.querySelector('.search-places__field'),
			autocomplete = new google.maps.places.Autocomplete(input, {
				componentRestrictions: {'country':'ru'}, // страны
				types: ['geocode']
			}),
			autocompleteLsr = google.maps.event.addListener(autocomplete, 'place_changed', handleAutocomplete);
		
		$('.ordering__fields._delivery-address input:radio').change(function() {
			$('.search-places__field').val('');
			$('#postal').val('');

			google.maps.event.removeListener(autocompleteLsr);
			google.maps.event.clearInstanceListeners(autocomplete);
			$('.pac-container').remove();
			autocomplete = new google.maps.places.Autocomplete(input, {
				componentRestrictions: {'country': $(this).data('code') ? $(this).data('code') : null}, 
				types: ['geocode']
			});
			autocompleteLsr = google.maps.event.addListener(autocomplete, 'place_changed', handleAutocomplete);
		});

		function handleAutocomplete() {
			var location = autocomplete.getPlace(); // получаем место
			geocoder = new google.maps.Geocoder();
			lat = location['geometry']['location'].lat();
			lng = location['geometry']['location'].lng();

			var latlng = new google.maps.LatLng(lat, lng);
			
			geocoder.geocode({'latLng': latlng}, function(results) {
				for (i = 0; i < results.length; i++) {
					for (var j = 0; j < results[i].address_components.length; j++) {
						for (var k = 0; k < results[i].address_components[j].types.length; k++) {
							if (results[i].address_components[j].types[k] == 'postal_code') {
								
								console.log(results[i].address_components[j].short_name)

								$('#postal').next().addClass('_notEmpty');
								document.getElementById('postal').value = results[i].address_components[j].short_name;
							}
						}
					}
				}
			});
		}
	});
}
// google places
