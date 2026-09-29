function addCourse() {
    var course = $('#course_name').val();
    var desc = $('#description').val();
    var t_area = $('#thematic_area').val();
    var dur = $('#duration').val();
    var mod = $('#modules').val();
    var sect = $('#sector').val();
    var account = $('#account_id').val();
    
    var dt = { course_name: course, description: desc, thematic_area: t_area, duration: dur, modules: mod ,sector:sect,account_id:account};
    $.ajax({
        url: baseUrl() + 'course/post',
        type: 'POST',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function getCourse(id) {
    $.ajax({
        url: baseUrl() + "course/getcourse/" + id,
        type: "GET",
        success:function(data) {
            $('#course_id').val(data.id);
            $('#course_name1').val(data.course_name);
            $('#description1').val(data.description);
            $('#thematic_area1').val(data.thematic_area);
            $('#duration1').val(data.duration);
            $('#modules1').val(data.modules);
        }
    });
}


function updateCourse() {
    var course_id = $('#course_id').val();
    var course = $('#course_name1').val();
    var desc = $('#description1').val();
    var t_area = $('#thematic_area1').val();
    var dur = $('#duration1').val();
    var mod = $('#modules1').val();
    var account = $('#account_id').val();

    var dt = { course_name: course, description: desc, thematic_area: t_area, duration: dur, modules: mod ,id:course_id,account_id:account};
    $.ajax({
        url: baseUrl() + 'course/PUT',
        type: 'PUT',
        data: JSON.stringify(dt),
        contentType: 'application/json',
        success: function () {
            window.location.reload(true);
        }
    });
}

function deleteCourse(id) {
    $.ajax({
        url: baseUrl() + "Course/Delete/" + id,
        type: "DELETE",
        success: function () {
            window.location.reload(true);
        }
    });
}

