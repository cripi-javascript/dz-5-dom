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

	function toggleClass(classname, element) {
		var hadClass = hasClass(classname, element);
		if (hadClass) {
			removeClass(classname, element);
		} else {
			addClass(classname, element);
		}
		return hadClass;
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
			clear : function () {
				var filterLi, filterLis = $(this.id).getElementsByTagName('li');
				for (filterLi in filterLis) {
					if (filterLis.hasOwnProperty(filterLi)) {
						removeClass("active", filterLis[filterLi]);
					}
				}
				this.filtered = null;
			},
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
				var filterLi = $(filter).parentNode, wasOn = toggleClass("active", filterLi);
				if (wasOn) {
					this.removeFilter(filter);
				} else {
					this.addFilter(filter);
				}
				return wasOn;
			},
			invokeInt : function (filter) {
				this.filtered = this.filtered[filter]();
			},
			invoke : function (collection, filterFunc) {
				var filter, fullRefresh = this.pushBtn(filterFunc);
				if (this.filtered && !fullRefresh) {
					this.invokeInt(filterFunc);
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

	SortBar.prototype =
		{
			clear : function () {
				var sortLi, sortLis = $(this.id).getElementsByTagName('li');
				for (sortLi in sortLis) {
					if (sortLis.hasOwnProperty(sortLi)) {
						removeClass("active", sortLis[sortLi]);
					}
				}
				this.sortFunc = '';
			},
			pushBtn : function (sortFunc) {
				var sortLi = $(sortFunc).parentNode;
				this.clear();
				this.sortFunc = sortFunc;
				toggleClass("active", sortLi);
			},
			invoke : function (collection, sortFunc) {
				this.pushBtn(sortFunc);
				return collection[sortFunc]();
			}
		};

	return {
		form : new Form(),
		table : new Table(),
		filterBar : new FilterBar(),
		sortBar : new SortBar(),
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