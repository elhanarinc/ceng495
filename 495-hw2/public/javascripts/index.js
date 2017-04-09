var index = 0;
var globalItems;

$(window).load(function() {
    $('#main_form').hide();
    $('#hide_button').hide();
    $('#loader').hide();

     $.ajax({
        type: 'POST',
        data: '',
        contentType: 'application/json',
        url: '/data',
        success: function(items) {
            globalItems = items;
            for (var iter = 0; iter < items.length; iter++)
            {
                //console.log(items[iter]);
                var str = '<table id="mytable_' + iter + '" class="ui celled table">' +
                '<thead><tr id="names_' + iter + '">';
                for (o in items[iter]) {
                    if (o === "id")
                        continue;
                    else if (o === "releaseDate")
                        str += '<th>Release Date</th>';
                    else if (o === "movieName")
                        str += '<th>Movie Name</th>';
                    else if (!o.startsWith("_"))
                        str += '<th>' + o + '</th>';
                }
                str += '<th>Edit</th>';
                str += '<th>Delete</th>';
                str += '</tr></thead><tbody>';

                str += '<tr id=' + iter +'>';
                for (o in items[iter]) {
                    if (o === "id")
                        continue;
                    else if (o === "releaseDate")
                        str += '<td>' + items[iter].releaseDate + '</td>';
                    else if (o === "movieName")
                        str += '<td>' + items[iter].movieName + '</td>';
                    else if (!o.startsWith("_"))
                        str += '<td>' + items[iter][o] + '</td>';
                }

                str += '<td><button id="edit_button_' + iter + '" onclick="editRow(' + iter + ')">Edit</button></td>';
                str += '<td><button id="delete_button_' + iter + '" onclick="deleteRow(' + iter + ')">Delete</button></td>';
                str += '</tr>';
                $("#attach_div").append(str);
            }
        }
    });
});

function editRow(index) {
    var table = document.getElementById('mytable_' + index);
    var button = document.getElementById('edit_button_' + index);
    if (button.textContent === 'Edit') {
        button.textContent = 'Save';

        var list = $('#' + index)[0].getElementsByTagName('td');

        for (var i = 0; i < list.length; i++) {
            $(list[i]).attr('contenteditable','true');
        }
    }
    else if (button.textContent === 'Save') {
        $('#loader').show();

        var list = $('#' + index)[0].getElementsByTagName('td');
        var names = $('#names_' + index)[0].getElementsByTagName('th');

        for (var i = 0; i < list.length; i++) {
            $(list[i]).attr('contenteditable','false');
        }

        var my_data = {};

        my_data.id = globalItems[index].id;

        for (var i = 0; i < list.length; i++) {
            if (names[i].outerText === "Edit" || names[i].outerText === "Save" || names[i].outerText === "Delete")
                continue;
            my_data[names[i].outerText] = list[i].outerText;
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(my_data),
            contentType: 'application/json',
            url: '/update',
            dataType:'JSON',
            success: function (data) {
                console.log('Success: ' + data);
                if (data.result === 'UPDATE_FAIL') {
                    alert('There is an error!');
                }
                globalItems[index] = my_data;
                $('#loader').hide();
                button.textContent = 'Edit';
            },
            error: function (data) {
                console.log('Error: ' + data);
                if (data.result === 'UPDATE_FAIL') {
                    alert('There is an error!');
                }
                $('#loader').hide();
                button.textContent = 'Edit';
            },
            complete: function (data) {
                console.log('Complete: ' + data);
                if (data.result === 'UPDATE_FAIL') {
                    alert('There is an error!');
                }
                globalItems[index] = my_data;
                $('#loader').hide();
                button.textContent = 'Edit';
            }
        });
    }
}

function deleteRow(index) {
    var table = document.getElementById('mytable_' + index);
    var list = $('#' + index)[0].getElementsByTagName('td');
    var names = $('#names_' + index)[0].getElementsByTagName('th');

    var my_data = {};

    my_data.id = globalItems[index].id;

    for (var i = 0; i < list.length; i++) {
        if (names[i].outerText === "Edit" || names[i].outerText === "Save" || names[i].outerText === "Delete")
            continue;
        my_data[names[i].outerText] = list[i].outerText;
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(my_data),
        contentType: 'application/json',
        url: '/delete',
        dataType:'JSON',
        success: function (data) {
            console.log('Success: ' + JSON.stringify(data));
            globalItems[index] = null;
            $('#mytable_' + index).remove();
        },
        error: function (data) {
            console.log('Error: ' + JSON.stringify(data));
        },
        complete: function (data) {
            console.log('Complete: ' + JSON.stringify(data));
            globalItems[index] = null;
            $('#mytable_' + index).remove();
        }
    });
}

$(function () {
    $('#show_button').click(function(e) {
        e.preventDefault();

        $('#main_form').show();
        $('#hide_button').show();

        $('#show_button').hide();
    });
});

$(function () {
    $('#hide_button').click(function(e) {
        e.preventDefault();

        $('#main_form').hide();
        $('#hide_button').hide();

        $('#show_button').show();
    });
});

$(function () {
    $('#add_custom').click(function(e) {
        e.preventDefault();
        var row0 = '<br><br><label>Extra Field Definition:</label>';
        var row1 = '<input type="text" class="i-field" name='+index+'><br><br>';
        var row2 = '<label>Extra Field Description:</label>';
        var row3 = '<input type="text" class="i-field" name='+index+'><br><br>';

        $("#add_div").append(row0);
        $("#add_div").append(row1);
        $("#add_div").append(row2);
        $("#add_div").append(row3);
        index++;

        $("#id_index").val(index);
    });
});
