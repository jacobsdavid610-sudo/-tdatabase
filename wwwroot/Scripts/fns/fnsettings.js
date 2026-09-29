function updateSetting(sId) {
    
    var code = $('#'+sId).val();
    var dt = { id: sId, config_value: code };
    
    $.ajax({
        url: baseUrl() + 'Config/Post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            alert("Changes made successfully.");
        }
    });
}

function addUserToRole(user,roles) {
    var dt = { Id: user, Value: "" + roles };
    $.ajax({
        url: baseUrl() + 'Config/AddUserToRole',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            alert("Changes made successfully.");
        }
    });
}