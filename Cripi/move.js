// JavaScript Document
var index=0;
var eventFields = {'user':'Пользователь',
'call':'Название события',
'dateStart':'Дата начала',
'dateFinish':'Дата окончания',
'location':'Место проведения',
'parent':'Предшествующие связанные события',
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
	var parent = document.getElementById('parents').value;
	if (parent == ''){
		 parent = []};
	var people = document.getElementById('people').value;
	var url = document.getElementById('url').value;
	//////////////Создаём событие конструктором или чем-то похожим
	Item = {'user':user, 'call':call, 'dateStart':dateStart, 'dateFinish':dateFinish, 'parent':parent, 'people':people, 'url':url};
	Collection[index]= Item;
	index+=1;
	//////////////////////////////////////////////////////////////
	
	tab.appendChild(tableConstructor(Item,'td'));
	console.log(Collection)
}, true);