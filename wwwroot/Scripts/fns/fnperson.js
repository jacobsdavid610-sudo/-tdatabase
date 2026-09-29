function addperson() {
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var oname = $('#othernames').val();
    var gnder = $('#gender1').val();
    var tle = $('#titles1').val();
    var dob = $('#dob1').val();
    var phone = $('#phone_f').val();
    var dt = { first_name: fname, last_name: lname, other_names: oname, gender: gnder,title:tle,date_of_birth:dob,mobile:phone };
    $.ajax({
        url: baseUrl() + 'facilitator/postperson',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function populatePerson(id) {

    var id = $('#persons').val();
    
    $.ajax({
        url: baseUrl() + 'facilitator/getperson/' + id,
        type: 'GET',
        success: function (data) {
            $('#first_name').val(data.first_name);
            $('#last_name').val(data.last_name);
            $('#other_names').val(data.other_names);
            $('#gender').val(data.gender);
            $('#titles').val(data.title);
            var dt = data.date_of_birth;
            $('#dob').val(dt.substring(0, 10));
            $('#personId').val(data.id);
            $('#gender').change(data.gender);
            $('#titles').change(data.title);
            //$('#qualifications').val(data.tdb_person_qualifications[0].qualification_id);
            loadOrganisation(data.id);
            loadQualification(data.id);
            //window.location.reload(true);
        }
    });
    

    
    
}

function populatePerson(id) {

    $.ajax({
        url: baseUrl() + 'facilitator/getperson/' + id,
        type: 'GET',
        success: function (data) {
            $('#name').text(data.first_name + " " + data.last_name);
            var height = ImageExist("/Uploads/Profile/" + data.aspnet_Users.UserId + ".jpg");
            if (height >0)
                $('#profileImage').attr("src", "/Uploads/Profile/" + data.aspnet_Users.UserId + ".jpg");
            else {
                $('#profileImage').attr("src", "/Uploads/Profile/avatar.png");
            }
            $('#designation').text("");
            $('#organization').text("");
            $('#qualifications').text("");
            if (data.tdb_person_organization_history.length > 0) {
                $('#designation').text(data.tdb_person_organization_history[0].desigantion);
                $('#organization').text(data.tdb_person_organization_history[0].tdb_organizations.organization_name);
            }
            var qualifications = "";
            if (data.tdb_person_qualifications.length > 0) {
                for (var i = 0; i < data.tdb_person_qualifications.length; i++)
                    qualifications += data.tdb_person_qualifications[i].tdb_qualifications.qualification_name + " ";
                $('#qualifications').text(qualifications);
            }
           
            $('#titles').change(data.title);
            $('#facebook').text(data.facebook);
            $('#facebook').attr("href", data.facebook);
            $('#website').text(data.website);
            $('#website').attr("href", data.website);
            $('#mobile').text(data.mobile);
            $('#attendance').text(data.tdb_training_attendance.length);
            $('#facilitate').text(data.tdb_training_facilitators.length);
            //loadOrganisation(data.id);
            //loadQualification(data.id);
            //window.location.reload(true);
        }
    });




}

function ImageExist(url) {
    var img = new Image();
    img.src = url;
    return img.height != 0;
}

function loadOrganisation(id) {
    $.ajax({
        url: baseUrl() + 'organization/GetPersonOrganisation/' + id,
        type: "GET",
        success: function (data) {
            if (data.organization_id != null)
                $('#organizations').val(data.organization_id);
            if (data.desigantion != null)
                $('#designation').val(data.desigantion);
        }
    });
}

function loadQualification(id) {
    $.ajax({
        url: baseUrl() + 'qualification/GetPersonQualificationId/' + id,
        type: "GET",
        success: function (data) {
            $('#qualifications').val(data);
            
        }
    });
}