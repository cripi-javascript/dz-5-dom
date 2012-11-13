// JavaScript Document
function inherits(Constructor, SuperConstructor){
var F = function () {};
F.prototype = SuperConstructor.prototype;
Constructor.prototype = new F()
};
function isDate(date){
	if (date ===  ''){
		return true
	}
	else {
		return false
	}
}
	
/*var Model = function (data) {
    "use strict";
    var keyName;
    for (keyName in data) {
       if (data.hasOwnProperty(keyName)) {
           this[keyName] = data[keyName];
        }
    }
};
/**
 * Set - устанавливает аттрибуты и значения атрибутов, в соответсвии с принятым в качестве параметра объектом
 *
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
/*Model.prototype.set = function (attributes) {
    for (var key in attributes){
        if (attributes.hasOwnProperty(key)) {
            this[key] = attributes[key];
        }
    }
};

/**
 * Get возвращает запрашиваемое свойство у объекта
 *
 * @param {Object} attributes
 */
/*Model.prototype.get = function (attribute) {
    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }
    return undefined;
};
/**
 * 
 * @param {Object} attributes
 */
/*Model.prototype.validate = function (attributes) {
    throw new Error('this is Abstract method');
};

*/
var Event = function(data){
	var keyName;
    for (keyName in data) {
       if (data.hasOwnProperty(keyName)) {
           this[keyName] = data[keyName];
        }
    }
};
Event.prototype.r = function(){
	console.log('tratatatata')
}
Event.prototype.validate = function() {
    //'use strict';
	var errorList = [];/*
	if (this.name === undefined){
		this.name = 'Новое событие'
	}
	if (!isDate(this.start)){
		errorList.push('Неверно указана дата начала события.')
	}
	if (!isDate(this.end)){
		errorList.push('Неверно указана дата окончания события.')
	}
	/*if (this.start < this.end){
		errorList.push('Время начала события должно быть раньше времени окончания.')
	}
	*/
	/**
	return {
		"start": DateStart || new Date(),
		"end": DateFinish,
		"name": Call || "Новое событие",
		"description": Description || "Описание события",
		"parent": Parent || {},
		"childs": Childs || [],
		"comments": Comments || [],
		"peoples": Peoples || [], 
		"location": Location || {},
		"private": Private || False, 
		"rank": Rank || 0,		
		"EvRS": EvRS || 18,		
		"Link": Link || '' 
	}
	*/
	return errorList

};



var Collection = function(data){
	this.items = [];
	var i
	for (var i in data){
		this.items.push(data[i]);
		}
};
Collection.prototype.add = function(i){
	this.items.push(i);
}
//Collection.prototype = new Model();

var Events = function(){};
Events.prototype = new Collection()

Events.prototype.sortByStartTime = function(){}
Events.prototype.sortByEndTime = function(){}
Events.prototype.previos = function(){}
Events.prototype.futures = function(){}
Events.prototype.filterByField = function(){}
Events.prototype.myEvents = function(){}
Events.prototype.eventsWhithMe = function(){}

/////////////////////////////////////////////////////////////////////////
e = new Event({"start": new Date(2012, 9, 3, 19, 00, 00),
        "end": new Date(2012, 9, 3, 20, 00, 00),
		"name": "1 лекция по JavaScript",
		"description": "Обзор языка",
		"parent": {},
		"childs": [],
		"comments": ['Красивенько', 'А мы могли бы...'],
		"people": [], 
		"location": {},
		"private": true, 
		"rank": 4,		
		"EvRS": 16,		
		"Link": 'http://cripi.ru/#javascript'});

