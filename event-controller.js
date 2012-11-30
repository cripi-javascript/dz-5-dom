var EventController = (function () {
	'use strict';
	/**
	 * Возвращает строку с датой вида dd/MM/yyyy hh:mm
	 * 
	 * @param {Date} date
	 *
	 * @return {String}
	 */
	function formatDate(date) {
		var dd, mm, yyyy, hh, min;
		dd = date.getDate();
		mm = date.getMonth() + 1;
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
		form = Controls.form,
		filterBar = Controls.filterBar,
		sortBar = Controls.sortBar;

	/**
	 * Обработчик щелчка по кнопке Добавить
	 * 
	 * @param {Boolean} random    сгенерировать событие случайным образом или же взять значения из формы
	 *
	 * @return {String}
	 */
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
			filterBar.clear();
			sortBar.clear();
			events.add(event);
			table.refresh(events.items);
		} else {
			form.invalidate(validator);
		}
	}

	return {
		addClick : function (random) {
			addClick(random);
		},
		/**
		 * Функция инициализирующая элементы управления на странице
		 */
		init : function () {
			Controls.initSelect($('repeat'), Const.REPEAT);
			Controls.initSelect($('alert'), Const.ALERT);
			form.clear();
			$('addBtn').addEventListener('click', function () {
				addClick();
			});
			$('addRandomBtn').addEventListener('click', function () {
				addClick(true);
			});
			$(filterBar.id).addEventListener('click', function (e) {
				var filtered, cur = e.srcElement || e.originalTarget;
				filtered = filterBar.invoke(events, cur.id);
				table.refresh(filtered.items);
			});
			$(sortBar.id).addEventListener('click', function (e) {
				var cur = e.srcElement || e.originalTarget,
					collection = filterBar.filtered || events;
				sortBar.invoke(collection, cur.id);
				table.refresh(collection.items);
			});
		}
	};
}());

document.body.addEventListener('load', function () {
	'use strict';
	EventController.init();
}, false);