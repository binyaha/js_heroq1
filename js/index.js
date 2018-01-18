class BaseCharacter {
  constructor(name,hp,ap){
    this.name = name;
    this.hp = hp;
    this.ap = ap;
    this.maxHp = hp;
    this.alive = true;
  }
  attack(character, damage){
    if (this.alive = true){
    character.getHurt(damage);
  } else {
    return;
    }
  }
  getHurt(damage){
    this.hp -= damage;

    if (this.hp <=0 ){
      this.die();
    }

    var _this = this;
    var i = 1;

    if (damage >= 0) {
    _this.id = setInterval(function(){
      _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
      _this.element.getElementsByClassName("effect-image")[0].src = "images/effect/blade/"+i+".png";
      _this.element.getElementsByClassName("hurt-text")[0].innerHTML = damage;
      _this.element.getElementsByClassName("hurt-text")[0].style.color = "red";
      _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
      i++;
      if (i>8){
        clearInterval(_this.id);
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].innerHTML= "";
      }
    }, 50)
    } else {
      _this.id2 = setInterval(function(){
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block";
        _this.element.getElementsByClassName("effect-image")[0].src = "images/effect/heal/"+i+".png";
        _this.element.getElementsByClassName("hurt-text")[0].innerHTML = -damage;

        _this.element.getElementsByClassName("hurt-text")[0].style.color = "green";
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
        i++;
        if (i>8){
          clearInterval(_this.id2);
          _this.element.getElementsByClassName("effect-image")[0].style.display = "none";
          _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
          _this.element.getElementsByClassName("hurt-text")[0].innerHTML= "";
        }
      },50) 
    }

  }

  die(){
    this.alive = false;
  }

  updateHtml(hpElement,hpHurt){
    hpElement.textContent = this.hp;
    hpHurt.style.width = (100-this.hp/this.maxHp *100) +"%";
  }
}

class Hero extends BaseCharacter{
  constructor(name,hp, ap){
    super(name, hp, ap);
    console.log("創造英雄"+name+" 為了生活!!!")

      this.element = document.getElementById("hero-image-block");
      this.hpElement=document.getElementById("hero-hp-text");
      this.maxHpElement=document.getElementById("hero-max-hp");
      this.hpHurt=document.getElementById("hero-hp-hurt");

      this.hpElement.textContent = this.hp;
      this.maxHpElement.textContent = this.maxHp;
  }

  attack(character){
    var damage = Math.random()*(this.ap/2)+(this.ap/2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement , this.hpHurt);
  }
}

class Monster extends BaseCharacter{
  constructor(name, hp, ap){
    super(name, hp, ap);
    console.log("創造怪獸"+name+" 肉!!!");
      this.element=document.getElementById("monster-image-block");
      this.hpElement=document.getElementById("monster-hp-text");
      this.maxHpElement=document.getElementById("monster-max-hp");
      this.hpHurt=document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

  }
  attack(character){
    var damage = Math.random()*(this.ap/2)+(this.ap/2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement , this.hpHurt);
  }
}

/*---------*/
function clickEvent() {

  var skill = document.getElementById("skill");
  skill.onclick = function(){
    heroAttack();
  }
}
clickEvent();

function clickEvent2() {

  var skill = document.getElementById("skill2");
  skill.onclick = function(){
    heroHeal();
  }
}
clickEvent2();



var hero = new Hero("Bernard", 200, 30);
var monster = new Monster("Skeleton", 150, 30);

var rounds = 10;
function endRound(){
  rounds--;
  document.getElementById("round-num").innerHTML = rounds;
  if (rounds < 1) {
    finish();
  }
}

function addRound(){
  rounds++;
  document.getElementById("round-num").innerHTML = rounds;
  if (rounds < 1) {
    finish();
  }
}

function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.alive == false) {
    dialog.classList.add("win");

  } else {
    dialog.classList.add("lose");
  }
}

function heroAttack(){
  ongoing1 = true;
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  setTimeout(function() {
  document.getElementById("hero-image-block").classList.add("attacking");
  setTimeout(function(){
    hero.attack(monster);
    document.getElementById("hero-image-block").classList.remove("attacking");
    },500)
  },100)
  
  setTimeout(function() {
    if (monster.alive == true){
    document.getElementById("monster-image-block").classList.add("attacking");
    setTimeout(function() {
      monster.attack(hero);
      document.getElementById("monster-image-block").classList.remove("attacking");
      endRound();
      setTimeout(function(){
        ongoing1 = false;
      },500)
      
      if (hero.alive == false){
        finish();
      } else {
        document.getElementsByClassName("skill-block")[0].style.display = "block";
      }

    },500)
  } else {
    finish();
  }
  },1100)
}

var healCount = 3;
function heroHeal(){
  ongoing2 = true;
  hero.getHurt(-30);
  healCount--;
  addRound();
  if (healCount == 0){
    document.getElementById("skill2").style.display = "none";
  }
    setTimeout(function() {
    if (monster.alive == true){

    document.getElementById("monster-image-block").classList.add("attacking");
    setTimeout(function() {
      monster.attack(hero);
      document.getElementById("monster-image-block").classList.remove("attacking");
      endRound();
      setTimeout(function(){
        ongoing2 = false;
      },500)

      if (hero.alive == false){
        finish();
      } else {
        document.getElementsByClassName("skill-block")[0].style.display = "block";
      }

    },500)
  } else {
    finish();
  }
  },500)
}

var ongoing1=false;
var ongoing2=false;

document.onkeyup = function(event){
  
  var key = String.fromCharCode(event.keyCode);
  if (key == "A" && ongoing1 != true ) {
    heroAttack();
    
  } else if (key == "D" && ongoing2 != true && healCount > 0) {
    heroHeal();
    
  }
}




