function addProject() {
    var project = $('#project_name').val();
    var code = $('#code_name').val();
    var account = $('#account_id').val();

    var dt = { project_name: project, code_name: code,account_id:account };
    $.ajax({
        url: baseUrl() + 'project/PostProject',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function addUserToProject(pKey,pValue) {
    
    var dt = { Id: pKey, Value: ""+pValue };
    $.ajax({
        url: baseUrl() + 'project/AddUserToProject',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            alert("User added to project");
            //window.location.reload(true);
        }
    });
}