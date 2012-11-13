// JavaScript Document
var index=0;
var eventFields = {'user':'Пользователь',
'call':'Название события',
'dateStart':'Дата начала',
'dateFinish':'Дата окончания',
'description':'Описание',
'location':'Место проведения',
'parent':'Предшествующие события',
'people':'Участники',
'url':'Ссылка на событие в сети',
'private':'Приватность события',
'EvRS':'Возрастные ограничения'};
var constructorFormFields = ['call', 'dateStart', 'dateFinish', 'description', 'people', 'url'];
var headSotrEventFlag = false;

var ourEvents = new Events();

/////////////////////Поле username//////////////////////////////////////
var userinput = document.getElementById("userinput");
var userspan= document.getElementById('username');
userinput.style.display="none";
userinput.value = userspan.innerHTML;
userinput.addEventListener('blur', function(event){
	userinput.style.display ="none";
	userspan.innerHTML=userinput.value;
	userspan.style.display="";
},true);
userspan.addEventListener('click', function(event){
	userspan.style.display="none";
	userinput.value = userspan.innerHTML;
	userinput.style.display="";
	userinput.focus();
},true);
/////////////////////////////////////////////////////////////////////////
function tableConstructor(obj,row){
	/*
	Создаёт строки в таблице.
	Параметры объект добавляемый в талицу
	Тип ячейки заголовок/простая.
	*/
	tr = document.createElement('tr')
	for (var i in eventFields){
		td = document.createElement(row);
		if (typeof obj[i] ===  "undefined" || obj[i]==''){
			td.innerHTML = '';
			td.setAttribute('class','nodata '+i);
			}
		else {
			td.innerHTML = obj[i];
			td.setAttribute('class',i);
			};
		tr.appendChild(td)
	}
	return tr
}
function addData(fieldId){
	var formfield=document.getElementById(fieldId);
	var result = formfield.value;
	formfield.value = '';
	return result;
}
var tab = document.getElementById('tableOfEvents');

/////////////////Описание обработчика добавления события////////////////
addButton = document.getElementById('createButton');
addButton.addEventListener('click', function(event){
	if (ourEvents.items.length==0){
		tab.appendChild(tableConstructor(eventFields,'th'));
		thList = document.getElementsByTagName('th');
		for (var i=0; i<thList.length; i++){
		thList[i].addEventListener('dblclick', function(event){
			///////////Сортируем по заданному полю////////////
			var sortedField = event.target.className ///Нет ли тут некорректной обработки ?
			ourEvents.items.sort(function(a,b){
				if (a[sortedField]>b[sortedField]){
					return -1};
				if (a[sortedField]<b[sortedField]) {
					return 1};
				return 0;
			});
			/////////////Удаляем старую таблицу////////
			var information = tab.childNodes;
			var l = information.length;
			for (var i=1; i<=l; i++){ //Убирает только половину записей за событие!! Что делать?
				tab.removeChild(information[i]);
			}
			////////////Выводим новую отсортированную по полю таблицу///////////////
			/*
			
			
			*/
		}, true);
	}
	}
	var user = userspan.innerHTML;
	var call = addData('call');
	var dateStart = addData('dateStart');
	var dateFinish = addData('dateFinish');
	var parentSelect = document.getElementById('parents');
	var parent = parentSelect.value;
	if (parent == 'Выберите событие'){
		 parent = []};
	parentSelect.value = 'Выберите событие';
	var description = addData('description');
	var people = addData('people');
	var url = addData('url');
	function getRadioGroupValue(radioGroupObj)
	 {
 	 for (var i=0; i < radioGroupObj.length; i++)
    	if (radioGroupObj[i].checked) return radioGroupObj[i].value;
  	 return null;
	 }
	var EvRS = getRadioGroupValue(document.constructor.EvRS);
	var private = getRadioGroupValue(document.constructor.private);
	
	//////////////Создаём событие конструктором или чем-то похожим
	Item = {'user':user, 'call':call, 'dateStart':dateStart, 'dateFinish':dateFinish, 'parent':parent,'description':description, 'people':people, 'url':url, 'EvRS':EvRS, 'private':private};
	
	
	var ourEvent = new Event(Item);
	var errors = ourEvent.validate() // Если ошибки есть - вернуть форму с введёными данными иначе отчистить
	if (errors.length > 0){
		errorBlock = document.getElementById('errors')
		for (var error in errors){
			var li = document.createElement('li');
			li.innerHTML = errors[error];
			errorBlock.appendChild(li)
		}
	}
	else {
		for (var field in constructorFormFields){
			document.getElementById(constructorFormFields[field]).value = "";
		};
		ourEvents.add(Item);
	};
	
	
	var option = document.createElement('option');
	option.innerHTML=Item['call'];
	option.setAttribute('value',Item['call']);
	parentSelect.appendChild(option);
	index+=1;
	//////////////////////////////////////////////////////////////
	
	tab.appendChild(tableConstructor(Item,'td'));
	
}, true);
/////////Окончание обработчика добавления события/////////////////

/*keyDown
keyUp
KeyPressed*/
/*event.keyCode
event.CharCode*/