function getParams(id) {
    $.ajax({
        url: baseUrl() + "reporting/getparams?id=" + id,
        method: "GET",
        success: function (data) {

            $("#params").empty();

            var formdata = "";
            formdata += '<div class="top-news"><a href="javascript:;" class="blue"><span>' + data.title + ' | Report Parameters </span><em>Enter the parameters of the report (if any)</em></a></div>';

            formdata = '<div class="note note-success"><h4 class="block">' + data.title + '</h4><p>' + data.description + '<em>Enter the parameters of the report (if any)</em></p></div>';

            if (data.parameters != null) {
                var params = data.parameters.split(':');

                if (params.length > 0 && params != "" && params != null) {

                    for (var i = 0; i < params.length; i++) {
                        var values = params[i].split(" ");



                        formdata += '<div class="form-group"><label class="col-md-3 control-label">' + values[0] + '</label><div class="col-md-9">';

                        if (values[1].trim() == "date") {
                            formdata += ' <div class="input-group input-medium date date-picker" data-date-format="mm-dd-yyyy" ><input type="text" required class="form-control" id="' + values[0] + '" name="' + values[0] + '" readonly><span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span></div> </div></div>';
                        } else {
                            formdata += '  <input type="text" id="' + values[0] + '" name="' + values[0] + '" class="form-control" required ></div></div>';
                        }



                    }


                }
            }



            formdata += '<div class="form-group"><label class="col-md-3 control-label"></label><div class="col-md-9">  <input type="submit"  class="btn blue" value="Generate" ></div></div>';
            $("#params").append(formdata);

            if (jQuery().datepicker) {
                $('.date-picker').datepicker({
                    rtl: Metronic.isRTL(),
                    orientation: "left",
                    autoclose: true
                });

            }

            $("#reportId").val(data.id);




        }
    })
}


function add_criteria() {
    var id_values = $.map($('input[name="table_column"]:checked'), function (c) { return c.value; });
    var options = "";
    if (id_values.length == 0) return;
    for (var i = 0; i < id_values.length; i++) {
        options +="<option>" +  id_values[i]+ "</option>";
       
    }

    var control = '<div class="form-group"><div class="col-md-5 control-label"><select class="form-control" name="criteria_colum">' + options + '</select></div><div class="col-md-5"><select  class="form-control"  name="criteria_operator"><option>=</option></select></div><a href="javascript:;" class="btn btn-icon-only red"><i class="icon-trash"></i></a></div>';

    $("#criteria_container").append(control);

}