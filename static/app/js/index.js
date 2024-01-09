new datedreamer.calendar({
	element: "#calendar",
})

// selected camera 

var divItems = document.getElementsByClassName("cameraselect-div");

function selected(item) {
	this.clear();
	item.style.border = '3px solid #4EB562';
}

function clear() {
	for (var i = 0; i < divItems.length; i++) {
		var item = divItems[i];
		item.style.border = 'none';
	}
}
// 



// time picker 

$(function () {

	$("#timePicker").timepicker();

});

$("#timePicker").timepicker({

	value: "08:45 PM"

});
$("#timePicker").timepicker({

	disabled: true,

});


$("#timePicker").timepicker({

	onChange: function (value) {

		alert(value);

	}

});


$("#timePicker").timepicker().getValue();

$("#timePicker").timepicker().setValue("12:00 PM")
$("#timePicker").timepicker().setEnabled();
