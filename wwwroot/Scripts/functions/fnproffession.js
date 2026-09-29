function addProffession() {
    var isValid = document.forms['newProffessionForm'].checkValidity();

    if (!isValid) { return false; }

    var pname = $('#proffession_name').val();
    var pdesc = $('#proffession_desc').val();

    var dt = { ProfessionName: pname, Desription: pdesc};
    console.log(dt);
    $.ajax({
        url: 'proffessions/create',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function (data) {
            window.location.reload(true);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function LoadProffession(Id) {
    $.ajax({
        url: 'proffessions/GetById/'+Id,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
           // console.log(data);
            $('#uproffession_name').val(data.professionName);
            $('#uproffession_desc').val(data.desription);
            $('#uproffession_id').val(data.Id);
            //console.log(data.id);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function EditProffession() {
    var isValid = document.forms['editProffessionForm'].checkValidity();

    if (!isValid) { return false; }

    var pname = $('#uproffession_name').val();
    var pdesc = $('#uproffession_desc').val();
    var id = $('#uproffession_id').val();

    var dt = {Id: id, ProfessionName: pname, Desription: pdesc };
    console.log(dt);
    $.ajax({
        url: 'proffessions/edit',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function (data) {
            window.location.reload(true);
        },
        error: function (e) {
            console.log(e);
        },
    });
}