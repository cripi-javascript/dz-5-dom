function $(id) {
	'use strict';
	return document.getElementById(id);
}

var Controls = (function () {
	'use strict';
	/**
	 * Проверяет есть ли у элемента css класс
	 * 
	 * @param {String} classname    имя css класса
	 * @param {Element} element    DOM элемент
	 *
	 * @return {Boolean}
	 */
	function hasClass(classname, element) {
		var cn = element.className;
		return cn.indexOf(classname) !== -1;
	}

	/**
	 * Добавляет css класс элементу
	 * 
	 * @param {String} classname    имя css класса
	 * @param {Element} element    DOM элемент
	 *
	 */
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

	/**
	 * Удаляет css класс у элемента
	 * 
	 * @param {String} classname    имя css класса
	 * @param {Element} element    DOM элемент
	 *
	 */
	function removeClass(classname, element) {
		var cn = element.className,
			rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
		cn = cn.replace(rxp, '');
		element.className = cn;
	}

	/**
	 * Переключает наличие/отсутствие css класса у элемента
	 * 
	 * @param {String} classname    имя css класса
	 * @param {Element} element    DOM элемент
	 *
	 * @return {Boolean}
	 */
	function toggleClass(classname, element) {
		var hadClass = hasClass(classname, element);
		if (hadClass) {
			removeClass(classname, element);
		} else {
			addClass(classname, element);
		}
		return hadClass;
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
			/**
			 * Добавляет строку в таблицу со свойствами объекта obj
			 * 
			 * @param {Object} obj
			 *
			 */
			addRow : function (obj) {
				var rowHTML = '<tr>', prop;
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						rowHTML += '<td>' + obj[prop] + '</td>';
					}
				}
				this.body.innerHTML += rowHTML + '</tr>';
			},
			/**
			 * Очищает таблицу
			 */
			clear : function () {
				this.body.innerHTML = "";
			},
			/**
			 * Заполняет таблицу объектами objs
			 * 
			 * @param {Array} objs
			 *
			 */
			fill : function (objs) {
				var obj;
				for (obj in objs) {
					if (objs.hasOwnProperty(obj)) {
						this.addRow(objs[obj].getDisplayableView());
					}
				}
			},
			/**
			 * Очищает и заполняет таблицу объектами objs
			 * 
			 * @param {Array} objs
			 *
			 */
			refresh : function (objs) {
				this.clear();
				this.fill(objs);
			}
		};

	Form.prototype =
		{
			/**
			 * Очищает форму и возвращает ее к исходному состоянию
			 */
			clear : function () {
				var field, fields = $(this.id).querySelectorAll('div.control-group');
				for (field in fields) {
					if (fields.hasOwnProperty(field)) {
						removeClass("error", fields[field]);
					}
				}
				addClass("invisible", $("errors"));
			},
			/**
			 * Выделяет ошибочные поля на форме
			 * 
			 * @param {ValidationResult} validator    объект, содержащий результаты валидации
			 *
			 */
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
			/**
			 * Очищает фильтр и возвращает его к исходному состоянию
			 */
			clear : function () {
				var filterLi, filterLis = $(this.id).getElementsByTagName('li');
				for (filterLi in filterLis) {
					if (filterLis.hasOwnProperty(filterLi)) {
						removeClass("active", filterLis[filterLi]);
					}
				}
				this.filtered = null;
			},
			/**
			 * Добавляет фильтр
			 * 
			 * @param {String} filter    название функции фильтрации коллекции
			 *
			 */
			addFilter : function (filter) {
				this.filters.push(filter);
			},
			/**
			 * Убирает фильтр
			 * 
			 * @param {String} filter    название функции фильтрации коллекции
			 *
			 */
			removeFilter : function (filter) {
				var index = this.filters.indexOf(filter);
				if (index !== -1) {
					this.filters.splice(index, 1);
				}
			},
			/**
			 * Обработчик нажатия кнопки фильтр-бара
			 * 
			 * @param {String} filter    название функции фильтрации коллекции, id кнопки
			 *
			 */
			pushBtn : function (filter) {
				var filterLi = $(filter).parentNode, wasOn = toggleClass("active", filterLi);
				if (wasOn) {
					this.removeFilter(filter);
				} else {
					this.addFilter(filter);
				}
				return wasOn;
			},
			/**
			 * Вызывает функцию фильтрации коллекции
			 * 
			 * @param {String} filter    название функции фильтрации коллекции
			 *
			 */
			invokeInt : function (filter) {
				this.filtered = this.filtered[filter]();
			},
			/**
			 * Применяет все функции фильтрации, занесенные в фильтр, к коллекции
			 * 
			 * @param {Collection} collection
			 * @param {String} filterFunc    название функции фильтрации коллекции
			 *
			 */
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
			/**
			 * Очищает бар сортировки и возвращает его к исходному состоянию
			 */
			clear : function () {
				var sortLi, sortLis = $(this.id).getElementsByTagName('li');
				for (sortLi in sortLis) {
					if (sortLis.hasOwnProperty(sortLi)) {
						removeClass("active", sortLis[sortLi]);
					}
				}
				this.sortFunc = '';
			},
			/**
			 * Обработчик нажатия кнопки бара сортировки
			 * 
			 * @param {String} sortFunc    название функции сортировки коллекции, id кнопки
			 *
			 */
			pushBtn : function (sortFunc) {
				var sortLi = $(sortFunc).parentNode;
				this.clear();
				this.sortFunc = sortFunc;
				toggleClass("active", sortLi);
			},
			/**
			 * Применяет функцию сортировки к коллекции
			 * 
			 * @param {Collection} collection
			 * @param {String} sortFunc    название функции сортировки коллекции
			 *
			 */
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
		/**
		 * Инициализирует селект свойствами объекта obj
		 * 
		 * @param {Element} element    DOM элемент <select>
		 * @param {Object} obj
		 *
		 */
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