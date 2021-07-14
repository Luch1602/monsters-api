
let prev=null;
let next  = 'https://rickandmortyapi.com/api/character';
let characters=[];
let sortTyp="1";
class Character {
	constructor (character) {
		this.character = character;
		this.createAsNumber = new Date(this.character.created).getTime();
		this.countEpisodes = this.character.episode?.length || 0;
	}
	getDateAsString(date) {
		var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
		var today  = new Date(date);
		//console.log(today.toLocaleDateString("de-DE", options));
	return today.toLocaleDateString("de-DE", options);
	}
	
	render () {
		let card="<div class='card'>"+
	"<div class='container'>"+	
	"<img src='"+this.character.image+"' alt='"+this.character.name+"' style='width:100%'>"+
    "<h2 style='text-align:center'><b>"+this.character.name+"</h2>"+
  	
    "<p>"+this.character.species+"</p>"+
    "<p>"+this.character.location?.name+"</p>"+
    "<p>"+this.getDateAsString(this.character.created)+"</p>" +
    "<p> count of episodes:"+this.character.episode?.length+"</p></div> </div>";
	return card;
	}
}
function load (url){
	fetch(url)
    .then(res => res.json())
    .then(data => {
        const rawData = data.results;
		const info = data.info;
	characters=[];
	initData(rawData, info.prev, info.next);
	

    })
    .catch((error) => {
        console.log(JSON.stringify(error));
    });
}


function sortBy(val){
	if(val=="0") return;
	sortTyp= val;
	characters = characters.sort(compareCharacter);
	makeCards(characters, false);
	
}

function compareCharacter(ch1, ch2) {
	if(sortTyp=="1") 
		return ch1.createAsNumber -ch2.createAsNumber; 
	else if(sortTyp=="2") return ch2.createAsNumber -ch1.createAsNumber; 
	else {
		 const ret = ch2.countEpisodes -ch1.countEpisodes; 	
		if(ret ===0 ) return ch1.createAsNumber -ch2.createAsNumber; 
		return ret;
	}
}

function initData(charactersArray, prevd, nextd) {
	makeCards(charactersArray, true);
	prev =prevd;
	next = nextd;
	if(prev) document.getElementById("bprev").style.display="inline"
	else document.getElementById("bprev").style.display="none";
	if(next) document.getElementById("bnext").style.display="inline"
	else document.getElementById("bnext").style.display="none";
}
function makeCards(charactersArray, withPush=true){
	const cardContainer = document.querySelector ('#card-container');
	cardContainer.innerHTML = '';
	charactersArray.forEach(character =>{
		const ch = withPush? new Character(character):character;
		if(withPush)characters.push(ch);
		cardContainer.innerHTML = cardContainer.innerHTML + ch.render();
	});
}

function goLast(){
	load(prev);
};

function goNext(){
	load(next);
};




