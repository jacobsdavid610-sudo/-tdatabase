function addOrganization() {
    var name = $('#organization').val();
    var address = $('#address').val();
    var lat = $('#latitude').val();
    var longitude = $('#longitude').val();
    var state = $('#state').val();
    var lga = $('#lga').val();
    var tp = $('#tp').val();
    var cat = $('#category').val();
    var dt = { organization_name: name, address: address, latitude: lat, longitude: longitude, state_id: state, lga_id: lga,type:tp,category:cat };
    $.ajax({
        url: baseUrl() + 'organization/post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function addFacility() {
    var isValid = document.forms['newFacilityForm'].checkValidity();

    if (!isValid) { return false;}

    var facility_id = $('#facility_id').val();
    var facility = $('#facility').val();
    var province = $('#province').val();
    var district = $('#district').val();
    var area = $('#area').val();
    var level = $('#level').val();
    var type = $('#type').val();
    var usCode = $('#usCode').val();
    var usClassification = $('#usClassification').val();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();

    var dt = { facility_id: facility_id, facility: facility, province: province, district: district, area: area, level: level, type: type, US_Code: usCode, US_Classification_id: usClassification, latitude: latitude, longitude: longitude};
    $.ajax({
        url: baseUrl() + 'organization/post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}