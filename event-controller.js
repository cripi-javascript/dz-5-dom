function $(id) {
	return document.getElementById(id);
}

function initSelect(select, obj) {
	var item, index = 0;
	for (item in obj) {
		if (obj.hasOwnProperty(item)) {
			select.innerHTML += '<option value="' + item + '">' + obj[item].title + '</option>';
		}
	}
}

function initControls() {
	initSelect($('repeat'), Const.REPEAT);
	initSelect($('alert'), Const.ALERT);
}

function addEventRow(event) {
	var tbody = $('eventTable').getElementsByTagName("tbody")[0], evRowHTML = '<tr>', prop;
	for (prop in event) {
		if (event.hasOwnProperty(prop)) {
			evRowHTML += '<td>' + event[prop] + '</td>';
		}
	}
	tbody.innerHTML += evRowHTML + '</tr>';
}

function invalidateForm(validator) {

}

function addClick() {
	var validator, event = new Event({
		title : $('title').value,
		location : $('location').value,
		startDate : new Date($('startDate').value),
		endDate : new Date($('endDate').value),
		repeat : Const.REPEAT[$('repeat').value],
		alert : Const.ALERT[$('alert').value],
		notes : $('notes').value
	});
	validator = event.validate();
	if (validator.valid) {
		addEventRow(event);
	} else {
		invalidateForm(validator);
	}
}

function clearTable() {
	var tbody = $('eventTable').getElementsByTagName("tbody")[0];
	tbody.innerHTML = "";
}