var EventController = (function () {
	'use strict';
	function formatDate(date) {
		var dd, mm, yyyy, hh, min;
		dd = date.getDate();
		mm = date.getMonth();
		yyyy = date.getFullYear();
		hh = date.getHours();
		min = date.getMinutes();
		return dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min;
	}

	Event.prototype.getDisplayableView = function () {
		return {
			title : this.title,
			location : this.location,
			startDate : formatDate(this.startDate),
			endDate : formatDate(this.endDate),
			repeat : this.repeat.title,
			alert : this.alert.title,
			notes : this.notes
		};
	};

	var events = new Events(),
		table = Controls.table,
		form = Controls.form;

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
			form.clear();
			events.add(event);
			table.refresh(events.items);
		} else {
			form.invalidate(validator);
		}
	}

	return {
		addClick : function (random) {
			addClick(random);
		}
	};
}());