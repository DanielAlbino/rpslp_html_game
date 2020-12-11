// When is loading it will add a class to the canvas element
var canvas = document.getElementById("board");
const arrElements = ['Rock','Paper','Scissors','Lizard','Spock'];
const arrImg = ['../assets/choices/Rock.png','../assets/choices/Paper.png','../assets/choices/Scissor.png','../assets/choices/Lizard.png','../assets/choices/Spock.png']

var isStarted = false;

var interval;
var enemyHand;
var playerHand;

window.addEventListener("load", function(event){
    canvas.classList.add("menu_bg");

    var playBtn = new Button("div","playButton","button","playBtn");
    var rulesBtn = new Button("div","rulesButton","button","ruleBtn");
    var backButton = new Button("div", "backButton", "button", "backBtn");
    var title =  document.createElement("div");
    var message = document.createElement("div");
    var textBox =  document.createElement("div");
    var div = document.createElement("div");
    var enemyChoice = document.createElement("img");
    var playerChoice = document.createElement("img");

    playBtn.addEventListener("click", function(){
       // Start the game
       startGame();
    }, false);

    rulesBtn.addEventListener("click", function(){
        show();
    }, false);
    
    backButton.addEventListener("click", function(){
        hide();
    }, false);

    enemyChoice.id = "enemy";
    playerChoice.id="player";
    div.id = "objects";
    title.id = "title";
    message.id = "message";
    textBox.id = "rulesText";

    title.innerHTML = "<h1>ROCK, Paper, Scissors,</h1><h2>Lizard, Spock!</h2>";
    textBox.innerHTML=`<h1>RULES</h1><br>
        <p>Scissors &nbsp;&nbsp; cuts &nbsp;&nbsp; Paper</p>
        <p>Paper &nbsp;&nbsp; covers &nbsp;&nbsp; Rock</p>
        <p>Rock &nbsp;&nbsp; crushes &nbsp;&nbsp; Lizard</p>
        <p>Lizard &nbsp;&nbsp; poisons &nbsp;&nbsp; Spock</p>
        <p>Spock &nbsp;&nbsp; smashes &nbsp;&nbsp; Scissors</p>
        <p>Scissors &nbsp;&nbsp; decapitates &nbsp;&nbsp; Lizard</p>
        <p>Lizard &nbsp;&nbsp; eats &nbsp;&nbsp; Paper</p>
        <p>Paper &nbsp;&nbsp; disproves &nbsp;&nbsp; Spock</p>
        <p>Spock &nbsp;&nbsp; vaporizes &nbsp;&nbsp; Rock</p>
        <p>Rock &nbsp;&nbsp; crushes &nbsp;&nbsp; Scissors</p>
    `;


    for(let i = 0; i < arrElements.length; i++){
        let btn =  document.createElement("div");
        let arr = document.createElement('img');
        btn.style.display ="inline";
        arr.src = arrImg[i];
        arr.id = arrElements[i];
        arr.classList.add("imgObject");
        btn.appendChild(arr);
        btn.addEventListener("click", function(){
            playerChoice.src = arr.src;
            playerHand = i;
            playerChoice.style.display = "block";
            clearInterval(interval);
            enemy.src = arrImg[enemyHand];
            verifyWinner();
        }, false);
        div.appendChild(btn);
    }


    textBox.style.display ="none";
    backButton.style.display = "none";
    div.style.display ="none";
    playerChoice.style.display = "none";
    enemyChoice.style.display = "none";
    message.style.display = "none";

    canvas.appendChild(playerChoice);
    canvas.appendChild(enemyChoice);
    canvas.appendChild(title);
    canvas.appendChild(textBox);
    canvas.appendChild(playBtn);
    canvas.appendChild(rulesBtn);
    canvas.appendChild(backButton);
    canvas.appendChild(div);
    canvas.appendChild(message);
});

function Button(el, id, ...addClass){
    var btn =  document.createElement(el);
    btn.id=id;
    addClass.forEach((cl) => {
        btn.classList.add(cl);
    })
    return btn;
}

function show(){
    var play =  document.getElementById("playButton");
    var rules =  document.getElementById("rulesButton");
    var back =  document.getElementById("backButton");
    var rulesText =  document.getElementById("rulesText");
    var title =  document.getElementById("title");

    play.style.display = "none";
    rules.style.display = "none";
    title.style.display = "none";
    back.style.display = "block";
    rulesText.style.display = "block";
    back.style.top="20%";
}

function hide(){
    var play =  document.getElementById("playButton");
    var rules =  document.getElementById("rulesButton");
    var back =  document.getElementById("backButton");
    var rulesText =  document.getElementById("rulesText");
    var title =  document.getElementById("title");
    var objects =  document.getElementById("objects");
    var player =  document.getElementById("player");
    var enemy = document.getElementById("enemy");
    var message = document.getElementById("message");

    objects.style.top="75%";

    isStarted = false;

    play.style.display = "block";
    rules.style.display = "block";
    title.style.display = "block";
    back.style.display = "none";
    objects.style.display = "none";
    rulesText.style.display = "none";
    player.style.display = "none";
    enemy.style.display = "none";
    message.style.display = "none";
    
}

function hideAll(){
    var play =  document.getElementById("playButton");
    var rules =  document.getElementById("rulesButton");
    var title =  document.getElementById("title");
    var message = document.getElementById("message");
    var player =  document.getElementById("player");

    play.style.display = "none";
    rules.style.display = "none";
    title.style.display = "none";
    message.style.display = "none";
    player.style.display = "none";
  
}


function startGame(){
    if(!isStarted){
        isStarted = true;
        hideAll();
        setChoices();
        enemyChoice();
    }
}

function setChoices(){
    var obj = document.getElementById("objects");
    var backBtn = document.getElementById("backButton");
    hideAll();
    obj.style.display = "block";
    backBtn.style.display = "block";
    backBtn.style.top = "92%";
}

function enemyChoice(){
    var enemy = document.getElementById("enemy");
    enemyHand = Math.floor(Math.random()*arrElements.length);
    enemy.src = arrImg[Math.floor(Math.random()*arrElements.length)]; 
    enemy.style.display = "block";
    interval = setInterval(() => {
        enemy.src = arrImg[Math.floor(Math.random()*arrElements.length)];   
    }, 100);
}


function verifyWinner(){
    message.style.display = "block";
    if(arrElements[playerHand] == arrElements[enemyHand]){
        message.innerHTML ="<h1>TIE!</h1>";
    } else {
        var player = arrElements[playerHand];
        var enemy = arrElements[enemyHand]
        var text = false;
        if(player =="Rock" && (enemy == "Scissors" || enemy == "Lizard")){
            text = true;
        }else if(player =="Paper" && (enemy == "Rock" || enemy == "Spock")){
            text = true;
        }else if(player =="Scissors" && (enemy == "Paper" || enemy == "Lizard")){
            text = true;
        }else if(player =="Lizard" && (enemy == "Paper" || enemy == "Spock")){
            text = true;
        }else if(player == "Spock" && (enemy == "Scissors" || enemy == "Rock")){
            text = true;
        }else {
            text = false;
        }

        if(text){
            message.innerHTML ="<h1>YOU WIN!</h1>";
        } else {
            message.innerHTML ="<h1>YOU LOSE!</h1>";
        }
    }  
    message.innerHTML += "<br><div id='again' onclick='startGame()'>AGAIN?</div>"
    isStarted = false;
    reset.style.display="block";

}

