
var boss_tic = 0;
var bossSpeed = defaultmovement*3;
var bossCanMove = true;

function bossupdate() {
    if (bossCanMove) {
    	aiMovement(bossCthulu, 400, bossMovement);
    	alignDirection(bossCthulu.body);
    }
    else {
        if (playerinvulnerability < 15) {
            bossCanMove = true;
        }
    }
}

function bossMovement(boss, targetDistance, distance, angle) {
    if(distance < targetDistance)
    {
        if(angle < 22.5 && angle >= -22.5)
        {
            //right
            boss.body.velocity.x = +bossSpeed;
        }
        else if(angle <=-22.5 && angle > -67.5)
        {
            //rightup
            boss.body.velocity.x = +bossSpeed / 2;
            boss.body.velocity.y = -bossSpeed / 2;
        }
        else if(angle <= -67.5 && angle >  -112.5)
        {
            //up
            boss.body.velocity.y = -bossSpeed;
        }
        else if (angle <=-112.5 && angle > -157.5) {
            //leftup
            boss.body.velocity.x = -bossSpeed / 2;
            boss.body.velocity.y = -bossSpeed / 2;
        }
        else if (angle <= -157.5 || angle > 157.5)
        {
            //left
            boss.body.velocity.x = -bossSpeed;
        }
        else if (angle >=112.5 && angle < 157.5) {
            //leftdown
            boss.body.velocity.x = -bossSpeed / 2;
            boss.body.velocity.y = bossSpeed / 2;
        }
        else if (angle >= 67.5 && angle < 112.5 )
        {
            //down
            boss.body.velocity.y = bossSpeed;
        }
        else if ( angle >=22.5 && angle < 67.5)
        {
            //rightdown
            boss.body.velocity.x = +bossSpeed / 2;
            boss.body.velocity.y = bossSpeed / 2;
        }
    }
    else {
        if (boss_tic < 60) {
            ++boss_tic;
            return;
        }
        randomDirection(boss.body);
        boss_tic = 0;
    }
}

function bossHitPlayer(body1, body2) {
    if (playerinvulnerability == 0 && !permainvincible) {
        body2.sprite.damage(100);
        playerinvulnerability = 90;
        playerCanMove = false;
        bossCanMove = false;

        body2.velocity.x *= 2;
        body2.velocity.y *= 2;

        body1.velocity.x *= 2;
        body1.velocity.y *= 2;
    }
}