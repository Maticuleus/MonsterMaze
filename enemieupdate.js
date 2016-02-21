/**
 * Created by Julien on 2016-01-30.
 */
var enemie_tic = 0;

function enemieupdate(){
    for(var i = 0; i < enemies.length; i++) {

        if(enemies[i].alive){
            aiMovement(enemies[i], 200, enemiemovement);
            alignDirection(enemies[i].body);
            enemies[i].weapon.fire(enemies[i]);
        }
        // if(!isinvinsible && game.physics.arcade.collide(enemies[i], player) && !permainvincible)
        // {
        //     player.damage(1);
        //     isinvinsible = true;
        // }

        
    }
}

function enemiemovement(enemie, targetDistance, distance, angle) {
    //for60ticks
    //var pos = player.getCurrentPosition();
    //player.x;
    //enemies.getpoint

    if(distance < targetDistance)
    {
        if(angle < 22.5 && angle >= -22.5)
        {
            //right
            enemie.body.velocity.x = +defaultmovement;
        }
        else if(angle <=-22.5 && angle > -67.5)
        {
            //rightup
            enemie.body.velocity.x = +defaultmovement / 2;
            enemie.body.velocity.y = -defaultmovement / 2;
        }
        else if(angle <= -67.5 && angle >  -112.5)
        {
            //up
            enemie.body.velocity.y = -defaultmovement;
        }
        else if (angle <=-112.5 && angle > -157.5) {
            //leftup
            enemie.body.velocity.x = -defaultmovement / 2;
            enemie.body.velocity.y = -defaultmovement / 2;
        }
        else if (angle <= -157.5 || angle > 157.5)
        {
            //left
            enemie.body.velocity.x = -defaultmovement;
        }
        else if (angle >=112.5 && angle < 157.5) {
            //leftdown
            enemie.body.velocity.x = -defaultmovement / 2;
            enemie.body.velocity.y = defaultmovement / 2;
        }
        else if (angle >= 67.5 && angle < 112.5 )
        {
            //down
            enemie.body.velocity.y = defaultmovement;
        }
        else if ( angle >=22.5 && angle < 67.5)
        {
            //rightdown
            enemie.body.velocity.x = +defaultmovement / 2;
            enemie.body.velocity.y = defaultmovement / 2;
        }
    }
    else {
        if (enemie_tic < 60) {
            ++enemie_tic;
            return;
        }
        randomDirection(enemie.body);
        enemie_tic = 0;
    }
}

// @entity : sprite game state
// @targetDistance : distance from player (attack range)
// @movementFunction : specific movement function for sprite
function aiMovement(entity, targetDistance, movementFunction) {
    var distance = game.physics.arcade.distanceBetween(player, entity);
    var angle = game.physics.arcade.angleBetween(entity.body, new Phaser.Point(player.body.x+20,player.body.y+20));
    angle = game.math.radToDeg(angle);
    movementFunction(entity, targetDistance, distance, angle);
}

// @body : body param of sprite
function alignDirection(body) {
    var dirangle = Math.atan2(body.velocity.y, body.velocity.x);
    body.rotation = dirangle+90;
}

// @body : body param of sprite
function randomDirection(body) {
    switch (game.rnd.integerInRange(0, 9)) {
        case 0:
            //nomovement
            break;
        case 1:
            //right
            body.velocity.x = defaultmovement;
            break;
        case 2:
            //left
            body.velocity.x = -defaultmovement;
            break;
        case 3:
            //up
            body.velocity.y = defaultmovement;
            break;
        case 4:
            //down
            body.velocity.y = -defaultmovement;
            break;
        case 5:
            //rightup
            body.velocity.x = defaultmovement / 2;
            body.velocity.y = defaultmovement / 2;
            break;
        case 6:
            //leftup
            body.velocity.x = -defaultmovement / 2;
            body.velocity.y = defaultmovement / 2;
            break;
        case 7:
            //rightdown
            body.velocity.x = defaultmovement / 2;
            body.velocity.y = -defaultmovement / 2;
            break;
        case 8:
            //leftdown
            body.velocity.x = -defaultmovement / 2;
            body.velocity.y = -defaultmovement / 2;
            break;
    }
}

