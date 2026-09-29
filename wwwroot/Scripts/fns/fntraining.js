function addTraining() {
    var cs = $('#courses').val();
    var vn = $('#venues').val();
    var st_date = $('#start_date').val();
    var en_date = $('#end_date').val();
    var num = $('#no_of_participants').val();
    var project = $('#project').val();
    var cat = $('#categories').val();
    var account = $('#account_id').val();
    var cert_id = $('#certificate_id').val();
    if (cs == null) {
        alert("Please select a course.");
        return;
    }
    if (vn == null) {
        alert("Please select a venue.");
        return;
    }
    //if (project == null) {
    //    alert("Please select a project.");
    //    return;
    //}
    var dt = { course_id: cs, venue_id: vn, start_date: st_date, end_date: en_date, number_of_participants: num, project_id: project, category: cat, account_id: account, certificate_id: cert_id};
    $.ajax({
        url: baseUrl() + 'training/post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function (data) {
            alert(data);
            window.location.reload(true);
        }
    });
}

function getTraining(id) {
    $.ajax({
        url: baseUrl() + "training/GetTraining?id=" + id,
        type: "GET",
        success:function(data) {
            $('#courses1').val(data.course_id);
            $('#venues1').val(data.venue_id);
            $('#start_date1').val(data.start_date);
            $('#end_date1').val(data.end_date);
            $('#no_of_participants1').val(data.number_of_participants);
            $('#project1').val(data.project_id);
            $('#categories1').val(data.category);
            $('#training_Id').val(data.id);
            $('#editcertificate_id').val(data.certificate_id);
        }
    });
}



function updateTraining() {
    var cs = $('#courses1').val();
    var vn = $('#venues1').val();
    var st_date = $('#start_date1').val();
    var en_date = $('#end_date1').val();
    var num = $('#no_of_participants1').val();
    var project = $('#project1').val();
    var cat = $('#categories1').val();
    var training_id = $('#training_Id').val();
    var account = $('#account_id').val();
    var cert_id = $('#editcertificate_id').val();

    var dt = { course_id: cs, venue_id: vn, start_date: st_date, end_date: en_date, number_of_participants: num, project_id: project, category: cat, id: training_id, account_id: account, certificate_id: cert_id};
    $.ajax({
        url: baseUrl() + 'training/PUT',
        type: 'PUT',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function setId(id) {
    $('#trainingId').val(id);
}

function addFacilitator() {
    var fac = $('#facilitators').val();
    var trId = $('#trainingId').val();

    var dt = { person_id: fac, course_training_id: trId };
    $.ajax({
        url: baseUrl() + 'facilitator/PostFacilitator',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            //$("#facilitators").val(0);
            $("#facilitators").select2();
            window.location.reload(true);

            localStorage.setItem("ActiveTab", "tab_3_item");      
        }
    });
}

function deleteAttendance(id) {
    $.ajax({
        url: baseUrl() + "Attendance/Delete/" + id,
        type: "DELETE",
        success:function() {
            window.location.reload(true);     
        }
    });
}

function EditAttendance(id) {
    $.ajax({
        url: baseUrl() + "Attendance/GET/" + id,
        type: "GET",
        success: function (data) {

            $('#first_name').val(data.person_.first_name);
            $('#last_name').val(data.person_.last_name);
            $('#other_names').val(data.person_.other_names);
            $('#gender').val(data.person_.gender);
            $('#titles').val(data.person_.title);
            $('#mobile').val(data.person_.mobile);
            $('#personId').val(data.person_.id);
            $('#gender').change(data.person_.gender);
            $('#titles').change(data.person_.title);
            $('#designation_id').change(data.person_.designation_id);
            $('#organizations').change(data.person_.organization_id);
            // loadOrganisation(data.id);
            //loadQualification(data.id);
            var dt = data.person_.date_of_birth;
            if (dt !== null) {
                $('#dob').val(dt.substring(0, 10));
            }
               
            $("#id").val(data.id);
            $("#pre_test").val(data.pre_test_score);
            $("#post_test").val(data.post_test_score);


            window.location.reload(true);  
        }
    });
}




function deleteFacilitator(id) {
    $.ajax({
        url: baseUrl() + "Facilitator/Delete/" + id,
        type: "DELETE",
        success: function () {
            window.location.reload(true);
            localStorage.setItem("ActiveTab", "tab_3_item");      
        }
    });
}



function deleteTraining() {
    var id = $('#training_Id').val();
    $.ajax({
        url: baseUrl() + "Training/Delete/" + id,
        type: "DELETE",
        success: function () {
            alert('Training deleted successfull');
            window.location.reload(true);
        }
    });
}

function deleteFile(fid){

     $.ajax({
        url: baseUrl() +"Training/DeleteUpload/" + fid,
        type: "GET",
        success: function () {
            alert('Training file deleted successfull');
            window.location.reload(true);
        }
    });
}

function addTrnAssesment(trId) {

    var tr_assesements = []
    var completed_training = []

    var tr = $('#assesmentTbl tbody tr')

    tr.each(function (index, trs) {
        var _person_id = $(this).find("#asid").text()
        var td = $(this).find("td")
        
       $(this).find("td").each(function (index, td_item) {
            var _remark = "";

            if ($(this).hasClass("as_input")) {
                var operator = tr.children()[index - 1]
                var reference_val = tr.children()[index - 2]
                var cid = tr.children()[index - 3]

                var input_val = 0

                if ($(this).children().attr('type') == "text" && $(this).children().attr('value') !== "") {
                    input_val = parseFloat($(this).children().attr("value"))
                }
                else {
                    if ($(this).children().find("span").hasClass("checked")) {
                        input_val = 1;
                    } else {
                        input_val = 0;
                    }
                }
                var expression = input_val + " " + $(operator).text() + " " + $(reference_val).text();
                
                if (eval(expression)) {
                  _remark = "passed"
                } else {
                  _remark = "failed"
                }
                //console.log($(cid).text())
                var person_assessment = {
                    person_id: _person_id,
                    course_training_id: trId,
                    certificate_assessment_id: $(cid).text(),
                    assessment_date:  new Date(),
                    value: input_val,
                    remarks: _remark,
                    assesment_id: $(cid).text()
                }
                tr_assesements.push(person_assessment);
            }
       });

        var remarks_arr = tr_assesements.filter(p => p.person_id == _person_id).map(r => r.remarks)
        if (remarks_arr.includes("failed")) {
           
        } else {
            completed_training.push(parseInt(_person_id))
        }
    })

    //If there are persons with completed status
    if(completed_training.length > 0){
        updateCompletionStatus(trId, completed_training)
    }

    $.ajax({
        url: baseUrl() + 'Training/AddTrainingAssessments',
        type: 'POST',
        data: JSON.stringify(tr_assesements),
        contentType: 'application/json',
        success: function () {
            //$("#facilitators").val(0);
            //$("#facilitators").select2();
            //window.location.reload(true);

            localStorage.setItem("ActiveTab", "tab_4_item");
        }
    });

    alert("Training assessments saved")
}

/* By pass assesment and certify all*/
function certifyAll(trId) {

    var tr_assesements = []
    var completed_training = []
    var tr = $('#assesmentTbl tbody tr')

    tr.each(function (index, trs) {

        var _person_id = $(this).find("#asid").text()
        var td = $(this).find("td")

        $(this).find("td").each(function (index, td_item) {
            var _remark = "";

            if ($(this).hasClass("as_input")) {
                var operator = tr.children()[index - 1]
                var reference_val = tr.children()[index - 2]
                var cid = tr.children()[index - 3]

                //console.log($(cid).text())
                var person_assessment = {
                    person_id: _person_id,
                    course_training_id: trId,
                    certificate_assessment_id: $(cid).text(),
                    assessment_date: new Date(),
                    value: 1,
                    remarks: "passed",
                    assesment_id: $(cid).text()
                }
                tr_assesements.push(person_assessment);
            }
        });

        completed_training.push(parseInt(_person_id))
    })

    //If there are persons with completed status
    if (completed_training.length > 0) {
        var response = window.confirm("Are you sure you want to certify all persons");
        if (response == true) {
            updateCompletionStatus(trId, completed_training)
        }
    }

    $.ajax({
        url: baseUrl() + 'Training/AddTrainingAssessments',
        type: 'POST',
        data: JSON.stringify(tr_assesements),
        contentType: 'application/json',
        success: function () {
            //$("#facilitators").val(0);
            //$("#facilitators").select2();
            //window.location.reload(true);

            localStorage.setItem("ActiveTab", "tab_4_item");
        }
    });

}

function updateCompletionStatus(trId, listPersonIds) {
                $.ajax({  
                     url: baseUrl() + 'Training/UpdateTrainingCompletionStatus/' + trId, 
                     type: 'POST',  
                     dataType: 'json',  
                     data: JSON.stringify(listPersonIds),
                     contentType: 'application/json',
                     success: function (data, textStatus, xhr) {  
                         //console.log(data);  
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation');  
                     }  
                 });  

}

function getTrainingReport(id) {
    var table = $("#trReport_tbl tbody")
    $.ajax({
        url: baseUrl() + "attendance/gettrainingattendance/" + id,
        type: "GET",
        success: function (data) {
            var result = "";
            
            $.each(data, function (index, item) {
                console.log(item.person_)
                var status = item.completed == null ? "Incomplete" : "Completed"
                var row_style = status == "Incomplete" ? 'class="bg-warning"' : 'class="bg-light"'

                result += '<tr>' +
                    '<td ' + row_style + '>' + (index + 1) + '</td><td ' + row_style + '>' + item.person_.nuit + ' </td><td ' + row_style + '>' + item.person_.last_name + ' </td><td ' + row_style + '> ' + item.person_.first_name + '</td> <td ' + row_style + '> ' + item.person_.mobile + '</td><td ' + row_style +'> ' + status  + '</td>'
                    '</tr>'
            });

            table.html(result);
        }
    });
}

function getTrainingAttendance(id) {
    var table = $("#trAttendance_tbl tbody") 
    $.ajax({
        url: baseUrl() + "attendance/gettrainingattendance/" + id,
        type: "GET",
        success: function (data) {
            var result = "";

            $.each(data, function (index, item) {
                result += '<tr>' +
                    '<td>' + (index + 1) + '</td><td>' + item.person_.nuit + ' </td><td>' + item.person_.last_name + ' </td><td> ' + item.person_.first_name + '</td><td> ' + item.person_.gender + '</td><td> ' + item.person_.designation_.lookup_name + '</td><td> ' + item.person_.organization_.organization_name + '</td> <td> ' + item.person_.mobile + '</td><td>'
                '</tr>'
            });

            table.html(result);
        }
    });
}
