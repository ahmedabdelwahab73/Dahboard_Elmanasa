var table_search = document.getElementById('table-search')
var fillter = table_search.value.toUpperCase();
var table = document.getElementById('table');
    var rows = table.getElementsByTagName('tr');
function ActiveSearch (){

    for(var i= 1; i < rows.length; i++){
        var cells = rows[i].getElementsByTagName('td');
        var found = false;
        for(var a = 0; a < cells.length; a++){
            var cell = cells[a];
            if(cell.innerHTML.toUpperCase().indexOf(fillter) > -1){
                found = true;
                console.log(found)
                break;
            }
        }
        if(found){
            rows[i].style.display ='';  
        }
        else{
            rows[i].style.display ='none';
        }
    }
}