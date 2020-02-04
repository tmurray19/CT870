
/*

// Here's sone nice variables
var cool = 1;
let block_scope = 4;


//  alert(cool + block_scope);

var salary = parseInt(prompt("Please enter your salary", "30000"));
//alert(salary+cool);

if(salary > 500000){
	alert("You have a lot of money!");
}
else if(salary < 100000){
	alert("You don't have a lot of money!");
}
else{
	alert("You have average money!");
}

//salary = parseInt(salary);

var monthly = parseInt(prompt("Empty monthly expenses", "800"));

var net = salary - (monthly * 12);

alert(net);


// alert("You have " + salary + " Euro. Cool");
//alert(salary+cool)



alert("You can borrow " +  net * 3.5 + " amount of money"); 


var a=4;
let b=2;
let c=5;
var d=3;

alert((a+b) * (c+d));
alert(a+(b*c)+c);
alert((d*(-b))+c);
alert((d*a)-b+c);

*/

/*
var secret_word = prompt("Enter secret word", "word");

var guess;
var counter = 0;
while(guess != secret_word){
	guess = prompt("Enter the secret word. You have guessed " + counter + " times.", "guess :)");
	if(counter == 10){
		alert("You didn't get it");
		break;
	}
	counter++;
}	
if(guess == secret_word){
	alert("You Got it in " + counter + " guesses.");
}

function retire_at(age){
	let years_to_retirement = 68 - age; 
	alert("You retire at year : " + ( 2019 + years_to_retirement));
}

var input = parseInt(prompt("Enter age", "None"));
retire_at(input);



function hello(){
	alert('Hello, World!');
}
*/

// Proerty - Value format (just a dict)
//
var carArray = [];
var car1 = {make:'Ford', model:'Mondeo', age:2}; 
var car2 = {make:'Volvo', model:'WhoCares', age:5}; 
var car3 = {make:'Toyota', model:'Corolla', age:1}; 
var car4 = {make:'BMW', model:'Dunno', age:7}; 
var car5 = {make:'Skoda', model:'Ocvativa', age:8};

carArray.push(car1);
carArray.push(car2);
carArray.push(car3);
carArray.push(car4);
carArray.push(car5);

function displayVehicle(){
	var sHTML = "<table class='table'><thead><tr><th>Make</th><th>Model</th><th>Age</th></tr></thead><tbody>";
	
	for (i = 0; i < carArray.length; i++){
		var vehicle = carArray[i];
		sHTML += "<tr><td>" + vehicle.make + "</td><td>" + vehicle.model + "</td><td>" + vehicle.age + "</tr></td>";
	}
	sHTML += "</tbody></table>";
	div = document.getElementById('car');
	div.innerHTML = sHTML;
}
