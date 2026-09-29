function addVenue() {
    var name = $('#venue').val();
    var address = $('#address').val();
    var lat = $('#latitude').val();
    var longitude = $('#longitude').val();
    var state = $('#state').val();
    var lga = $('#lga').val();
    var account = $('#account_id').val();
    var dt = { venue_name: name, address: address, latitude: lat, longitude: longitude, state_id: state, lga_id: lga,account_id:account};
    $.ajax({
        url: baseUrl() + 'venue/post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function() {
            window.location.reload(true);
        }
    });
}

function getVenue(id) {
    $.ajax({
        url: baseUrl() + 'venue/get/'+id,
        type: 'GET',
        success: function (data) {
            $('#venue_name').val(data.venue_name);
            $('#venue_address').val(data.address);
            $('#venue_latitude').val(data.latitude);
            $('#venue_longitude').val(data.longitude);
            $('#venue_state').val(data.state_id);
            $('#venue_lga').val(data.lga_id);
            $('#venue_id').val(data.id);
            //window.location.reload(true);
        }
    });
}

function updateVenue() {
    var name = $('#venue_name').val();
    var address = $('#venue_address').val();
    var lat = $('#venue_latitude').val();
    var longitude = $('#venue_longitude').val();
    var state = $('#venue_state').val();
    var lga = $('#venue_lga').val();
    var venue_id = $('#venue_id').val();
    var account = $('#account_id').val();
    var dt = { venue_name: name, address: address, latitude: lat, longitude: longitude, state_id: state, lga_id: lga ,id:venue_id,account_id:account};
    $.ajax({
        url: baseUrl() + 'venue/Put',
        type: 'PUT',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function deleteVenue(id) {
    $.ajax({
        url: baseUrl() + "Venue/Delete/" + id,
        type: "DELETE",
        success: function () {
            window.location.reload(true);
        }
    });
}

