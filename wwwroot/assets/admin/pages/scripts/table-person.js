var TableManaged = function () {
    var tb = null;
    var initPersonTable = function () {

        var table = $('#table_person');

        // begin first table
        tb=  table.DataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],
           // "ajax": { "url": "/api/personapi/GetPersons", "dataSrc": "","type":"GET" },
            
                //"columns": [
                //    { "data": "first_name" },
                //    { "data": "last_name" },
                //    { "data": "mobile" },
                //    { "data": "email" },
                //    { "data": "state_.state_name" },
                //    { "data": "lga_.lga_name" },
                //    { "data": "organization_.organization_name" },
                //    {
                       
                //        "render": function (data, type, full, meta) {
                //            return moment(full.year_started).format("YYYY");
                //        }
                //    },
                //    { "data": "designation_.lookup_name" },
                //    {
                //        "render": function (data, type, full, meta) {
                //            var value = "No";
                //            if (full.retired === 1) {
                //                value = "Yes";
                //            }
                //            return value;
                //        }
                //    },
                //    {
                //        "render": function (data, type, full, meta) {
                //            var value = "No";
                //            if (full.registered_license === 1) {
                //                value = "Yes";
                //            }
                //            return value;
                //        }
                //    },
                //    {
                //        "render": function (data, type, full, meta) {
                //            var value = "No";
                //            if (full.student === 1) {
                //                value = "Yes";
                //            }
                //            return value;
                //        }
                //    },
                //    {
                //        sortable: false,
                //        "render": function (data, type, full, meta) {
                //            var buttonID = "reset_" + full.id;
                //            return '<a id=' + buttonID + ' href="/persons/edit/'+full.id+'" class="btn btn-warning resetBtn btn-xs" role="button">Edit</a>';
                //        }
                //    }
                //],

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 15,
            "pagingType": "bootstrap_full_number",
            "language": {
                "search": "My search: ",
                "lengthMenu": "  _MENU_ records",
                "paginate": {
                    "previous": "Prev",
                    "next": "Next",
                    "last": "Last",
                    "first": "First"
                }
            },
            "columnDefs": [{  // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [1, "asc"]
            ] // set first column as a default sort by asc
            , "initComplete": function () {
                var column = this.api().column(4);

                var values = [];
                column.data().each(function (d, j) {
                    d.split(",").forEach(function (data) {
                        data = data.trim();

                        if (values.indexOf(data) === -1) {
                            values.push(data);
                        }
                    });
                });

                $('<select class="form-control"><option value=""></option></select>')
                    .append(values.sort().map(function (o) {
                        return '<option value="' + o + '">' + o + '</option>';
                    }))
                    .on('change', function () {
                        column.search(this.value).draw();
                    })
                    .appendTo('#_state');

                //lga
                var column1 = this.api().column(5);

               var values1 = [];
                column1.data().each(function (d, j) {
                    d.split(",").forEach(function (data) {
                        data = data.trim();

                        if (values1.indexOf(data) === -1) {
                            values1.push(data);
                        }
                    });
                });

                $('<select class="form-control"><option value=""></option></select>')
                    .append(values1.sort().map(function (o) {
                        return '<option value="' + o + '">' + o + '</option>';
                    }))
                    .on('change', function () {
                        column1.search(this.value).draw();
                    })
                    .appendTo('#_lga');


                //facility
                var column2 = this.api().column(6);

                var values2 = [];
                column2.data().each(function (d, j) {
                    d.split(",").forEach(function (data) {
                        data = data.trim();

                        if (values2.indexOf(data) === -1) {
                            values2.push(data);
                        }
                    });
                });

                $('<select class="form-control"><option value=""></option></select>')
                    .append(values2.sort().map(function (o) {
                        return '<option value="' + o + '">' + o + '</option>';
                    }))
                    .on('change', function () {
                        column2.search(this.value).draw();
                    })
                    .appendTo('#_facility');


                //designation
                var column3 = this.api().column(8);

                var values3 = [];
                column3.data().each(function (d, j) {
                    d.split(",").forEach(function (data) {
                        data = data.trim();

                        if (values3.indexOf(data) === -1) {
                            values3.push(data);
                        }
                    });
                });

                $('<select class="form-control"><option value=""></option></select>')
                    .append(values3.sort().map(function (o) {
                        return '<option value="' + o + '">' + o + '</option>';
                    }))
                    .on('change', function () {
                        column3.search(this.value).draw();
                    })
                    .appendTo('#_designation');

                $.LoadingOverlay("hide");
            }
        });

        var tableWrapper = jQuery('#sample_1_wrapper');

        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });

        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });

        tableWrapper.find('.dataTables_length select').addClass("form-control input-xsmall input-inline"); // modify table per page dropdown
    }



    return {

        //main function to initiate the module
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }

            $.LoadingOverlay("show");

            initPersonTable();
            tb
                .search('')
                .columns().search('')
                .draw();

           
        }

    };

}();