// sets up  Enemies the player must avoid
class EnemyPlayer{
    constructor(x,y,speed){
        // Variables applied to each of our instances go here
        this.x=x;
        this.y=y;
        this.speed=speed;

        // The image/sprite for our enemies, this uses
        // a helper provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Updates the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        //  multiplying any movement by the dt parameter ensures gamne runs at same speed on all computers
        this.x += this.speed * dt;

       // when enemy reaches outside boundary,reset position to start of canvas
       if (this.x > 500) {
           this.x =-200;
        }
    }
    // Draws the enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// sets up the player for the game
class Player {
    constructor(){
        // sets the player's position
        this.startX=200;
        this.startY=400;

        this.x=this.startX;
        this.y=this.startY;
        this.sprite= 'images/char-girl.png';
       // this.won=false;
    }
    render(){
        // Draws the player's position on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // method to handle a player's direction on board based on a key user inputs
    handleInput(key){
        // these conditions sets the boundary  and ensures player does not go off screen
        if (key==='left' && this.x > 0){
            this.x = this.x - 100;
        }
        else if (key==='up' && this.y> 0){
            this.y= this.y - 90;
        }
        else if (key==='right' && this.x< 400){
            this.x= this.x + 100 ;
        }
        else if (key==='down' && this.y < 400){
            this.y = this.y + 90;

        }
    }

    update(){
        // to check if player collides with enemy
       for(let allEnemy of allEnemies) {
            if (allEnemy.x <= player.x + 65 &&
            (allEnemy.x + 70) >= (player.x) &&
            (allEnemy.y) <= player.y + 35 &&
            (allEnemy.y + 35) >= (player.y)){
                this.reset();
                
            }   
        } 
        if (this.y < 0) {
            // shows a modal when the player reaches the water
            const getModal= document.querySelector('.modal');
            getModal.style.display='block';

            // close button event listener
            const closeBtn= document.querySelector('.close');
            closeBtn.addEventListener('click', function(){
                getModal.style.display='none';
                player.reset();
            });
        }
    }
    reset(){
        // resets the player to start position
        this.x = this.startX
        this.y = this.startY;
        
    }
}
const player= new Player();
const Enemy= new EnemyPlayer();

// instantiates the enemies objects and gives each enemy a unique position and speed
const enemy= new EnemyPlayer(60,140,200);
const enemy2= new EnemyPlayer(200,230,200);
const enemy3= new EnemyPlayer(300,60,200);
const enemy4= new EnemyPlayer(350,140,200);
const enemy5= new EnemyPlayer(-500,60,200);
const enemy6= new EnemyPlayer(-200,140,200);

//  array to store all enemy players
let allEnemies= [];
allEnemies.push(enemy,enemy2,enemy3,enemy4,enemy5,enemy6);

// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
