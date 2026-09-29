function baseUrl() {
    return '/api/';
}

function getLga() {
    var id = $('#state').val();
    $('#lga').empty();
    $('#lga').append('<option value="0">Select LGA</option>');
    $.ajax({
        url: baseUrl() + "Venue/GetLgas/" + id,
        type: "GET",
        success: function (data) {
            if (data.length > 0) {
                
                for (var i = 0; i < data.length; i++) {
                    $('#lga').append('<option value="' + data[i].id + '">' + data[i].lga_name + '</option>');
                }
            }
        }
    });
}


function get_organization() {
    var id = $('#state').val();
    var lga_id = $('#lga').val();
    $.ajax({
        url: baseUrl() + "organization/GetLOrganizations?state_id=" + id +"&lga_id="+lga_id,
        type: "GET",
        success: function (data) {
            if (data.length > 0) {
                $('#organizations').empty();
                $('#organizations').append('<option value="0">Select facility</option>');
                for (var i = 0; i < data.length; i++) {
                    $('#organizations').append('<option value="' + data[i].id + '">' + data[i].organization_name + '</option>');
                }
            }
        }
    });
}