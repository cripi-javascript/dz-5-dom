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
var Collection = [];
var userinput = document.getElementById("userinput");
userinput.style.display="none";
userinput.addEventListener('blur', function(event){
	userinput.style.display ="none";
	userspan.innerHTML=userinput.value;
	if (userspan.innerHTML==""){
		userspan.innerHTML="Username";
	}
	userspan.style.display="";
},true);

var userspan= document.getElementById('username');
userspan.addEventListener('click', function(event){
	userspan.style.display="none";
	userinput.style.display="";
	userinput.focus();
	//Удаляем текст вставляем input id="userinput"
	//Добавляем 
},true);

function tableConstructor(obj,row){
	tr = document.createElement('tr')
	for (var i in eventFields){
		td = document.createElement(row);
		if (typeof obj[i] ===  "undefined" || obj[i]==''){
			td.innerHTML = '';
			td.setAttribute('class','nodata');
			}
		else {
			td.innerHTML = obj[i];
			td.setAttribute('class',i);
			};
		tr.appendChild(td)
	}
	return tr
}
addButton = document.getElementById('createButton');
addButton.addEventListener('click', function(event){
	tab = document.getElementById('tableOfEvents');
	if (Collection.length==0){
		tab.appendChild(tableConstructor(eventFields,'th'));
	}
	var user = userspan.innerHTML;
	var call = document.getElementById('call').value ;
	var dateStart = document.getElementById('dateStart').value;
	var dateFinish = document.getElementById('dateFinish').value;
	var parentSelect = document.getElementById('parents');
	var parent = parentSelect.value;
	if (parent == 'Выберите событие'){
		 parent = []};
	var description = document.getElementById('description').value
	var people = document.getElementById('people').value;
	var url = document.getElementById('url').value;
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
	Collection[index]= Item;
	option = document.createElement('option');
	option.innerHTML=Item['call'];
	option.setAttribute('value',Item['call']);
	parentSelect.appendChild(option);
	index+=1;
	//////////////////////////////////////////////////////////////
	
	tab.appendChild(tableConstructor(Item,'td'));
	console.log(Collection)
}, true);