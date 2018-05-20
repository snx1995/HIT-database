var Query = (function () {
    var $goBtn;
    var $sqlInput;
    var $resultTable;
    var $searchGroup;

    return {
        init: function () {
            $goBtn = $("#go-btn");
            $sqlInput = $("#search");
            $resultTable = $("#result-table");
            $searchGroup = $("button[data-search]");
            
            $searchGroup.click(function (event) {
                event.preventDefault();
                var type = $(this).attr("data-search");
                var input = $("#" + type).val();
                var sql;
                if (type === "employee-search") sql = "select * from employee where eid='" + input +
                    "' or ename='" + input + "'";
                else if (type === "production-search") sql = "select * from production where pname='" + input + "' or pid" +
                    "='" + input + "'";
                else if (type === "supply-search") sql = "select * from supply s, production p, supplier sup " +
                    "where (s.pid = p.pid and s.supid = sup.supid) and (sup.supid='" + input + "' or " +
                    "sup.supname='" + input + "')";
                else if (type === "shelter-search") sql = "select * from production p, shelter s where p.shelfid=s.shelterid " +
                    "and (p.pname='" + input + "' or p.pid='" + input + "')";
                else alert("wrong");
                if ( $.fn.dataTable.isDataTable( '#result-table' ) ) {
                    $resultTable.DataTable().destroy();
                }
                $resultTable.html("");
                $.ajax({
                    url: "/scripts/sql_query.php?sql=" + sql,
                    dataType: "json",
                    success: function (response) {
                        // alert(response);
                        var inner = "<thead><tr>";
                        var column = [];
                        for (var i = 0;i < response["cols"].length;i++) {
                            var col = {};
                            inner += "<th>" + response["cols"][i] + "</th>";
                            col["data"] = response["cols"][i];
                            column.push(col);
                        }
                        inner += "</tr></thead>";
                        $resultTable.html(inner);

                        $resultTable.DataTable({
                            serverSide:false,
                            ajax:null,
                            pageLength:5,

                            columns: column
                        });

                        $resultTable.DataTable().clear();
                        $resultTable.DataTable().rows.add(response["data"]);
                        $resultTable.DataTable().draw();
                    }
                })

            });
            
            $goBtn.click(function (event) {
                event.preventDefault();
                if ( $.fn.dataTable.isDataTable( '#result-table' ) ) {
                    $resultTable.DataTable().destroy();
                }
                $resultTable.html("");
                $.ajax({
                    url: "/scripts/sql_query.php?sql=" + $sqlInput.val(),
                    dataType: "json",
                    success: function (response) {
                        // alert(response);
                        var inner = "<thead><tr>";
                        var column = [];
                        for (var i = 0;i < response["cols"].length;i++) {
                            var col = {};
                            inner += "<th>" + response["cols"][i] + "</th>";
                            col["data"] = response["cols"][i];
                            column.push(col);
                        }
                        inner += "</tr></thead>";
                        $resultTable.html(inner);

                        $resultTable.DataTable({
                            serverSide:false,
                            ajax:null,
                            pageLength:5,

                            columns: column
                        });

                        $resultTable.DataTable().clear();
                        $resultTable.DataTable().rows.add(response["data"]);
                        $resultTable.DataTable().draw();
                    }
                })
            });
        }
    }
})();