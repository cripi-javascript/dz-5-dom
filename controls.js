function $(id) {
	'use strict';
	return document.getElementById(id);
}

var Controls = (function () {
	'use strict';
	function hasClass(classname, element) {
		var cn = element.className;
		return cn.indexOf(classname) !== -1;
	}

	function addClass(classname, element) {
		var cn = element.className;
		if (hasClass(classname, element)) {
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
	}, FilterBar = function () {
		this.id = 'filter-bar';
		this.filters = [];
	}, SortBar = function () {
		this.id = 'sort-bar';
	};

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

	FilterBar.prototype =
		{
			addFilter : function (filter) {
				this.filters.push(filter);
			},
			removeFilter : function (filter) {
				var index = this.filters.indexOf(filter);
				if (index !== -1) {
					this.filters.splice(index, 1);
				}
			},
			pushBtn : function (filter) {
				var wasOn, filterLi = $(filter).parentNode;
				if (hasClass("active", filterLi)) {
					this.removeFilter(filter);
					removeClass("active", filterLi);
					wasOn = true;
				} else {
					this.addFilter(filter);
					addClass("active", filterLi);
					wasOn = false;
				}
				return wasOn;
			},
			invokeInt : function(filter) {
				this.filtered = this.filtered[filter]();
			},
			invoke : function(collection, filter) {
				var fullRefresh = this.pushBtn(filter);
				if (this.filtered && !fullRefresh) {
					this.invokeInt(filter);
				} else {
					this.filtered = collection;
					for (filter in this.filters) {
						if (this.filters.hasOwnProperty(filter)) {
							this.invokeInt(this.filters[filter]);
						}
					}
				}
				return this.filtered;
			}
		};

	return {
		form : new Form(),
		table : new Table(),
		filterBar : new FilterBar(),
		initSelect : function (select, obj) {
			var item, index = 0;
			for (item in obj) {
				if (obj.hasOwnProperty(item)) {
					select.innerHTML += '<option value="' + item + '">' + obj[item].title + '</option>';
				}
			}
		}
	};
}());