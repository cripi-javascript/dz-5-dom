function $(id) {
	'use strict';
	return document.getElementById(id);
}

var Controls = (function () {
	'use strict';
	function addClass(classname, element) {
		var cn = element.className;
		if (cn.indexOf(classname) !== -1) {
			return;
		}
		if (cn !== '') {
			classname = ' ' + classname;
		}
		element.className = cn + classname;
	}

	function removeClass(classname, element) {
		var cn = element.className,
			rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
		cn = cn.replace(rxp, '');
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

	var Table = function () {
		this.id = 'eventTable';
		this.body = $(this.id).getElementsByTagName("tbody")[0];
	}, Form = function () {
		this.id = 'add-form';
	}, table = new Table(), form = new Form();

	Table.prototype =
		{
			addRow : function (obj) {
				var rowHTML = '<tr>', prop;
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						rowHTML += '<td>' + obj[prop] + '</td>';
					}
				}
				this.body.innerHTML += rowHTML + '</tr>';
			},
			clear : function () {
				this.body.innerHTML = "";
			},
			fill : function (objs) {
				var obj;
				for (obj in objs) {
					if (objs.hasOwnProperty(obj)) {
						this.addRow(objs[obj].getDisplayableView());
					}
				}
			},
			refresh : function (objs) {
				this.clear();
				this.fill(objs);
			}
		};

	Form.prototype =
		{
			clear : function () {
				var field, fields = $(this.id).querySelectorAll('div.control-group');
				for (field in fields) {
					if (fields.hasOwnProperty(field)) {
						removeClass("error", fields[field]);
					}
				}
				addClass("invisible", $("errors"));
			},
			invalidate : function (validator) {
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
		};

	return {
		form : form,
		table : table,
		init : function () {
			initSelect($('repeat'), Const.REPEAT);
			initSelect($('alert'), Const.ALERT);
			form.clear();
		}
	};
}());