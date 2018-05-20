var NavTabs = (function () {
    var $navTabs;
    var $tabs;

    var current = "#employee";
    return {
        init: function () {
            $navTabs = $(".my-tab");
            $tabs = $(".tabs");
            
            $navTabs.click(function (event) {
                var target = $(this).attr("data-target");
                event.preventDefault();
                $navTabs.removeClass("active");
                $(this).addClass("active");
                $tabs.removeClass("active");
                $(target).addClass("active");
                Tables.get(target);
                current = target;
                Insert.tab(target);
            });
        },
        currentTab:function () {
            return current;
        }
    }
})();

var Insert = (function () {
    var $insert;
    return {
        init: function () {
            $insert = $("#insert-row");
            this.tab("#employee");
        },
        tab: function (t) {
            var inner;
            if (t === "#employee") {
                inner = "<td><input type='text' data-type='string' name='ename' class='form-control' placeholder='姓名'></td>" +
                    "<td><input type='date' data-type='string' name='ebirth' class='form-control' placeholder='生日'></td>" +
                    "<td><input type='date' data-type='string' name='edate' class='form-control' placeholder='入职时间'></td>" +
                    "<td><input type='text' data-type='string' name='econtact' class='form-control' placeholder='联系方式'></td>" +
                    "<td><input type='text' data-type='string' name='eaddress' class='form-control' placeholder='家庭地址'></td>" +
                    "<td><input type='text' data-type='string' name='eposition' class='form-control' placeholder='职位'></td>";
            } else if (t === "#supplier") {
                inner = "<td><input type='text' data-type='string' name='supname' class='form-control' placeholder='名称'></td>" +
                    "<td><input type='text' data-type='string' name='supcontact' class='form-control' placeholder='联系方式'></td>";
            } else if (t === "#production") {
                inner ="<td><input type='text' data-type='string' name='pname' class='form-control' placeholder='商品名称'></td>" +
                    "<td><input type='text' data-type='string' name='shelfid' class='form-control' placeholder='货架号'></td>" +
                    "<td><input type='text' data-type='number' name='buyprice' class='form-control' placeholder='进价'></td>" +
                    "<td><input type='text' data-type='number' name='sellprice' class='form-control' placeholder='售价'></td>" +
                    "<td><input type='date' data-type='string' name='pdate' class='form-control' placeholder='生产日期'></td>";
            } else if (t === "#shelter") {
                inner = "<td><input type='text' data-type='string' name='sheltertype' class='form-control' placeholder='货架型号'></td>" +
                    "<td><input type='text' data-type='string' name='area' class='form-control' placeholder='区域编号'></td>";
            } else if (t === "#bill") {
                inner = "<td><input type='text' data-type='number' name='number' class='form-control' placeholder='数额'></td>" +
                    "<td><input type='date' data-type='string' name='bdate' class='form-control' placeholder='日期'></td>";
            } else if (t === "#bill-detail") {
                inner = "<td><input type='text'  data-type='number' name='bid' class='form-control' placeholder='帐单号'></td>" +
                    "<td><input type='text' data-type='number' name='detailid' class='form-control' placeholder='明细号'></td>" +
                    "<td><input type='text' data-type='string' name='detail' class='form-control' placeholder='事项'></td>" +
                    "<td><input type='text' data-type='string' name='count' class='form-control' placeholder='数量'></td>" +
                    "<td><input type='text' data-type='string' name='total' class='form-control' placeholder='金额'></td>";
            } else if (t === "#store") {
                inner = "<td><input type='text' data-type='string' name='storename' class='form-control' placeholder='库房名称'></td>" +
                    "<td><input type='text' data-type='string' name='storeaddress' class='form-control' placeholder='库房地址'></td>";
            } else if (t === "#truck") {
                inner = "<td><input type='text' data-type='string' name='truckid' class='form-control' placeholder='车牌号'></td>" +
                    "<td><input type='text' data-type='string' name='cartype' class='form-control' placeholder='车型'></td>" +
                    "<td><input type='text' data-type='number' name='eid' class='form-control' placeholder='驾驶员'></td>";
            } else if (t === "#supply") {
                inner = "<td><input type='text' data-type='number' name='pid' class='form-control' placeholder='商品编号'></td>" +
                    "<td><input type='text' data-type='number' name='supid' class='form-control' placeholder='供货商编号'></td>";
            } else alert(t);
            inner += "<td><button class='btn btn-info' onclick='submitInsert();return false;'>确认</button></td>" +
                "<td><input type='reset' class='btn btn-info' value='重置'></td>";
            $insert.html(inner);
        }
    }
})();

var Tables = (function () {
    var $employeeTable;
    var $supplierTable;
    var $productionTable;
    var $shelterTable;
    var $billTable;
    var $billDetailTable;
    var $storeTable;
    var $truckTable;
    var $supplyTable;

    
    return {
        init: function () {
            $employeeTable = $("#employee-table");
            $supplierTable = $("#supplier-table");
            $productionTable = $("#production-table");
            $shelterTable = $("#shelter-table");
            $billTable = $("#bill-table");
            $billDetailTable = $("#bill-detail-table");
            $storeTable = $("#store-table");
            $truckTable = $("#truck-table");
            $supplyTable = $("#supply-table");

            initTables();

            getData("#employee");
        },
        get:function (table) {
            getData(table)
        }

    };

    function initTables() {
        var id;
        $employeeTable.DataTable({
                serverSide:false,
                ajax:null,
                pageLength:5,

                columns:[
                    {
                        data:"eid",
                        render:function (data, type, row, meta) {
                            id = "employee" + data;
                            return "<input type='text' name='eid' style='text-align: center' data-required='eid' disabled value='" +
                                data + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"ename",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='ename' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"ebirth",
                        render:function (data, type, row, meta) {
                            return "<input type='date' name='ebirth' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"edate",
                        render:function (data, type, row, meta) {
                            return "<input type='date' name='edate' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"econtact",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='econtact' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"eaddress",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='eaddress' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "'/ class='form-control'>";
                        }
                    },
                    {
                        data:"eposition",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='eposition' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        render:function (data, type, row, meta) {
                            return "<button class='btn btn-info table-edit' id='" + id +
                                "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                                "' onclick='onDeleteClick(this)'>删除</button>";
                        }
                    }
                ]
            });

        $supplierTable.DataTable({
                serverSide:false,
                ajax:null,
                pageLength:5,

                columns:[
                    {
                        data:"supid",
                        render:function (data, type, row, meta) {
                            id = "supplier" + data;
                            return "<input type='text' name='supid' style='text-align: center' data-required='supid' disabled value='" +
                                data + "' class='form-control'/>";
                        }
                    },
                    {
                        data:"supname",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='supname' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "'/ class='form-control'>";
                        }
                    },
                    {
                        data:"supcontact",
                        render:function (data, type, row, meta) {
                            return "<input type='text' name='supcontact' style='text-align: center' disabled value='" +
                                data + "' data-id='" + id + "' class='form-control'/>";
                        }
                    },
                    {
                        render:function (data, type, row, meta) {
                            return "<button class='btn btn-info table-edit' id='" + id +
                                "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                                "' onclick='onDeleteClick(this)'>删除</button>";
                        }
                    }
                ]
            });

        $productionTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"pid",
                    render:function (data, type, row, meta) {
                        id = "production" + data;
                        return "<input type='text' name='production' style='text-align: center' data-required='pid' disabled value='" +
                            data + "' class='form-control'/>";
                    }
                },
                {
                    data:"pname",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='panem' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"shelfid",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='shelfid' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"buyprice",
                    render:function (data, type, row, meta) {
                        return "<input type='text' id='buyprice' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"sellprice",
                    render:function (data, type, row, meta) {
                        return "<input type='text' id='sellprice' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"pdate",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='pdate' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $shelterTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"shelterid",
                    render:function (data, type, row, meta) {
                        id = "shelter" + data;
                        return "<input type='text' name='shelterid' style='text-align: center' data-required='shelterid' disabled value='" +
                            data + "' class='form-control'/>";
                    }
                },
                {
                    data:"area",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='area' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"sheltertype",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='sheltertype' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $billTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"bid",
                    render:function (data, type, row, meta) {
                        id = "bill" + data;
                        return "<input type='text' name='bid' style='text-align: center' data-required='bid' disabled value='" +
                            data + "' class='form-control'/>";
                    }
                },
                {
                    data:"number",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='number' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"bdate",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='bdate' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $billDetailTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"bid",
                    render:function (data, type, row, meta) {
                        id = "bill-detail" + data;
                        return "<input type='text' name='bid' style='text-align: center' data-required='bid' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"detailid",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='detailid' style='text-align: center' data-required='detailid' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"detail",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='detail' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"count",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='count' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"total",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='total' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $storeTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"storeid",
                    render:function (data, type, row, meta) {
                        id = "store" + data;
                        return "<input type='text' name='storeid' style='text-align: center' data-required='storeid' disabled value='" +
                            data + "' class='form-control'/>";
                    }
                },
                {
                    data:"storename",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='storename' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"storeaddress",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='storeaddress' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $truckTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"truckid",
                    render:function (data, type, row, meta) {
                        id = data;
                        return "<input type='text' name='truckid' style='text-align: center' data-required='truckid' disabled value='" +
                            data + "' class='form-control'/>";
                    }
                },
                {
                    data:"cartype",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='cartype' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    data:"eid",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='eid' style='text-align: center' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-info table-edit' id='" + id +
                            "' onclick='onEditClick(this)'>修改</button><button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });

        $supplyTable.DataTable({
            serverSide:false,
            ajax:null,
            pageLength:5,

            columns:[
                {
                    data:"pid",
                    render:function (data, type, row, meta) {
                        id = data + "-" + meta.row;
                        return "<input type='text' name='pid' style='text-align: center' data-required='pid' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'/>";
                    }
                },
                {
                    data:"supid",
                    render:function (data, type, row, meta) {
                        return "<input type='text' name='supid' style='text-align: center' data-required='supid' disabled value='" +
                            data + "' data-id='" + id + "' class='form-control'>";
                    }
                },
                {
                    render:function (data, type, row, meta) {
                        return "<button class='btn btn-danger table-delete' id='" + "delete-" + id +
                            "' onclick='onDeleteClick(this)'>删除</button>";
                    }
                }
            ]
        });
    }
    
    function getData(table) {
        var params = {
            "table": table.substring(1)
        };

        $.getJSON("/scripts/query.php", params, function (response) {
            if (response.status === 200) {
                var $table = null;
                if (table === "#employee") $table = $employeeTable;
                else if (table === "#supplier") $table = $supplierTable;
                else if (table === "#production") $table = $productionTable;
                else if (table === "#shelter") $table = $shelterTable;
                else if (table === "#bill") $table = $billTable;
                else if (table === "#bill-detail") $table = $billDetailTable;
                else if (table === "#store") $table = $storeTable;
                else if (table === "#truck") $table = $truckTable;
                else if (table === "#supply") $table = $supplyTable;
                else alert("Error table: " + table);
                if ($table !== null) {
                    $table.DataTable().clear();
                    $table.DataTable().rows.add(response.data);
                    $table.DataTable().draw();
                }
            } else alert("Get data error: " + response.status);
        })
    }
})();

function onEditClick(e) {
    var id = $(e).attr("id");
    var sel = "[data-id='" + id + "']";
    if ($(e).text() === "修改") {
        $(sel).removeAttr("disabled");
        $(e).text("确认");
        sel = "#delete-" + id;
        $(sel).text("取消");
    } else if ($(e).text() === "确认") {


        var param = {};
        param["table"] = NavTabs.currentTab().substring(1);
        var key = {};
        $(e).parent().parent().children().children("[data-required]").each(function () {
            key[$(this).attr("data-required")] = $(this).val();
        });
        param["key"] = key;
        var data = {};
        $(sel).each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        param["data"] = data;
        
        $.ajax({
            url: "/scripts/update.php",
            method: "GET",
            data: param,
            success: function (response) {
                if (response === "success") {
                    Notification.success("Edit succeeded!");
                    Tables.get(NavTabs.currentTab());
                } else alert(response);
            }
        });

        $(sel).attr("disabled", "disabled");
        $(e).text("修改");
        sel = "#delete-" + id;
        $(sel).text("删除");
    } else alert($(e).text());
}

function onDeleteClick(e) {
    var id = $(e).attr("id").substring(7);
    var sel = "[data-id='" + id + "']";
    if ($(e).text() === "取消") {
        $(sel).attr("disabled", "disabled");
        $(e).text("删除");
        $("#" + id).text("修改");
    } else {
        // TODO
        var param = {};
        param["table"] = NavTabs.currentTab().substring(1);
        var key = {};
        $(e).parent().parent().children().children("[data-required]").each(function () {
            key[$(this).attr("data-required")] = "'" + $(this).val() + "'";
        });
        param["key"] = key;
        $.ajax({
            url: "/scripts/delete.php",
            data: param,
            method: "GET",
            success: function (response) {
                if (response === "success") {
                    Notification.success("Delete succeeded!");
                    Tables.get(NavTabs.currentTab());
                }
                else alert(response);
            }
        })
    }
}

function submitInsert() {
    var param = {};
    var values = {};
    $("#insert-row input[type!='reset']").each(function () {
        if ($(this).attr("data-type") === "string") values[$(this).attr("name")] = "'" + $(this).val() + "'";
        else values[$(this).attr("name")] = $(this).val();
    });
    param["table"] = NavTabs.currentTab().substring(1);
    param["params"] = values;

    $.ajax({
        url: "/scripts/insert.php",
        data: param,
        dataType: "text",
        method: "GET",
        success: function (response) {
            if (response === "success") {
                Notification.success("Add succeeded!");
                Tables.get(NavTabs.currentTab());
            }
            else alert(response);
        }
    })
}