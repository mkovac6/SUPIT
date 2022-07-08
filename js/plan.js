var myTableVar = document.getElementById('myTable');
var sumECTS=0;
var sumSati=0;

$.getJSON('http://www.fulek.com/VUA/SUPIT/GetNastavniPlan', function(data) {

    $( "#autocomplete" ).autocomplete({
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(data, request.term);
            response(results.slice(0, 10));
        },
        select: function (event, ui) {
            // Set selection
            $('#autocomplete').val(ui.item.label); 
            $.getJSON('http://www.fulek.com/VUA/supit/GetKolegij/' + ui.item.value, function(data) {

                $(myTable).find('tbody').append(
                    "<tr><td>"+ data.kolegij +"</td>"+ 
                    "<td>"+ data.ects +"</td>" +
                    "<td>"+ data.sati +"</td>" +
                    "<td>"+ data.predavanja +"</td>" +
                    "<td>"+ data.vjezbe +"</td>" +
                    "<td>"+ data.tip +"</td>" +
                    "<td><input type=button value=Obriši Row onclick=SomeDeleteRowFunction(this)></td></tr>"
                );

                sumECTS += data.ects;
                sumSati += data.sati;

                updateTable();
            });

            return false;
        }
    });
});

function updateTable() {
    myTableVar.rows[document.getElementById('myTable').rows.length -1 ].cells[1].innerHTML = sumECTS;
    myTableVar.rows[document.getElementById('myTable').rows.length -1 ].cells[2].innerHTML = sumSati;
    
    if(sumECTS > 0){

        document.getElementById('myTable').style.display = "block";
    }else{
        document.getElementById('myTable').style.display = "none";
    }
    
    document.getElementById('autocomplete').value = "";

  }


function SomeDeleteRowFunction(o) {

    sumECTS-=o.parentNode.parentNode.cells[1].innerHTML;
    sumSati-=o.parentNode.parentNode.cells[2].innerHTML;

    updateTable();



    var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
}
