﻿let dataCoverTable;

$(document).ready(function () {
    loadCoverDataTable();
});

function loadCoverDataTable() {
    dataCoverTable = $('#tblCoverData').DataTable({
        "ajax": {
            "url": "/Admin/CoverType/GetAll"
        },
        "columns": [
            { "data": "name", "width": "60%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/Admin/CoverType/Upsert/${data}"
                            class="btn btn-success text-white" style="cursor: pointer">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a onclick=DeleteCover("/Admin/CoverType/Delete/${data}")
                            class="btn btn-danger text-white" style="cursor: pointer">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    `;
                }, "width": "40%"
            }
        ]
    });
}

function DeleteCover(url) {
    swal({
        title: "Are you sure you want to delete this entry?",
        text: "You will not be able to revert this change",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataCoverTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    });
}