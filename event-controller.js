var EventController = (function () {
	function $(id) {
		return document.getElementById(id);
	}

	function addClass( classname, element ) {
		var cn = element.className;
		//test for existance
		if( cn.indexOf( classname ) != -1 ) {
			return;
		}
		//add a space if the element already has class
		if( cn != '' ) {
			classname = ' '+classname;
		}
		element.className = cn+classname;
	}

	function removeClass( classname, element ) {
		var cn = element.className;
		var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
		cn = cn.replace( rxp, '' );
		element.className = cn;
	}

	function initSelect(select, obj) {
		var item, index = 0;
		for (item in obj) {
			if (obj.hasOwnProperty(item)) {
				select.innerHTML += '<option value="' + item + '">' + obj[item].title + '</option>';
			}
		}
	}

	function clearForm() {
		var field, fields = $('add-form').querySelectorAll('div.control-group');
		for (field in fields) {
			if (fields.hasOwnProperty(field)) {
				removeClass("error", fields[field]);
			}
		}
		addClass("invisible", $("errors"));
	}

	function initControls() {
		initSelect($('repeat'), Const.REPEAT);
		initSelect($('alert'), Const.ALERT);
		clearForm();
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
		var error, field, summary = "<strong>Errors!</strong><br/>";
		for (error in validator.errors) {
			if (validator.errors.hasOwnProperty(error)) {
				field = $(validator.errors[error].fieldName);
				addClass("error", field.parentNode.parentNode);
				summary += validator.errors[error].errorText + "<br/>";
			}
		}
		$("errors-summary").innerHTML = summary;
		removeClass("invisible", $("errors"));
	}
	
	Event.prototype.getDisplayableView = function() {
		return {
			title : this.title,
			location : this.location,
			startDate : formatDate(this.startDate),
			endDate : formatDate(this.endDate),
			repeat : this.repeat.title,
			alert : this.alert.title,
			notes : this.notes
		}
	}
	
	function formatDate(date) {
		var dd, mm, yyyy, hh, min;
		dd = date.getDate();
		mm = date.getMonth();
		yyyy = date.getFullYear();
		hh = date.getHours();
		min = date.getMinutes();
		return dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min;
	}
	
	function clearTable() {
		var tbody = $('eventTable').getElementsByTagName("tbody")[0];
		tbody.innerHTML = "";
	}
	
	function fillTable(events) {
		var event;
		for (event in events) {
			if (events.hasOwnProperty(event)) {
				addEventRow(events[event].getDisplayableView());
			}
		}
	}
	
	function refreshTable(events) {
		clearTable();
		fillTable(events);
	}
	
	var events = new Events();
	
	function addClick(random) {
		var validator, event;
		if (random) {
			event = Utils.randomEvent();
			$('title').value = event.title;
			$('location').value = event.location;
			$('startDate').value = formatDate(event.startDate);
			$('endDate').value = formatDate(event.endDate);
			$('repeat').value = event.repeat;
			$('alert').value = event.alert;
			$('notes').value = event.notes;
		} else {
			event = new Event({
				title : $('title').value,
				location : $('location').value,
				startDate : new Date($('startDate').value),
				endDate : new Date($('endDate').value),
				repeat : Const.REPEAT[$('repeat').value],
				alert : Const.ALERT[$('alert').value],
				notes : $('notes').value
			});
		}
		validator = event.validate();
		if (validator.valid) {
			clearForm();
			events.add(event);
			refreshTable(events.items);
		} else {
			invalidateForm(validator);
		}
	}
	
	return {
		addClick : function(random) {
			addClick(random);
		},
		initControls : function() {
			initControls();
		}
	}
}());