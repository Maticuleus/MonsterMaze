/**
 * Created by Julien on 2016-01-30.
 */

var playerAnimationFrameRate = 10;
var playerVelocity = 200;
var speedBoost = 10;
var playerDir = 2;   // 0 - up  |  1 - right  | 2 - down  | 3 - left
var playerinvulnerability = 0;
var playerCanMove = true;
var pWeapXoffset = -70;
var pWeapYoffset = -30;
var pAttackState = 0;
var canBlock = true;

function playerupdate() {
    if(playerinvulnerability > 0)
    {
        playerinvulnerability--;
        if (!playerCanMove && (playerinvulnerability < 45)) {
            playerCanMove = true;
        }
    }
    player.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708;

    pWeaponL.body.x = player.body.x;
    pWeaponD.body.x = player.body.x;
    pWeaponL.body.y = player.body.y;
    pWeaponD.body.y = player.body.y;

    pLShield.body.x = player.body.x;
    pLShield.body.y = player.body.y;

    pDShield.body.x = player.body.x;
    pDShield.body.y = player.body.y;

    pWeaponL.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708;
    pWeaponD.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708;

    if (playerCanMove) {
        player.body.setZeroVelocity();
    }

    if(speedBoost > 0){
        speedBoost -= 1;
    }


    if (game.input.mousePointer.isDown && playerCanMove) {
        game.physics.arcade.moveToPointer(player, playerVelocity + speedBoost);

        var animSpeed = playerAnimationFrameRate + (speedBoost / 15);
        player.animations.play('walk', animSpeed, true);
        player.animations.currentAnim.speed = animSpeed;
        
        if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
        {
            player.body.setZeroVelocity();
            player.animations.stop();
            player.frame = 0;
        }
    }
    else {
        player.animations.stop();
        player.frame = 0;
    }

    if (keyButtons.z.isDown && canBlock) {
        lblock();
    } else if (keyButtons.x.isDown && canBlock) {
        dblock();
    } else {
        pLShield.body.setCollisionGroup(game.physics.p2.createCollisionGroup());
        pLShield.visible = false;

        pDShield.body.setCollisionGroup(game.physics.p2.createCollisionGroup());
        pDShield.visible = false;
    }
    


    function playerSpeed(){
        return playerVelocity + speedBoost;
    }

}

function eatBread(sprite, tile){
    map.setLayer(health);
    map.removeTile(Math.round(tile.x)/32, Math.round(tile.y)/32);
    map.setLayer(walls);
    tile.destroy();
    sprite.sprite.heal(200);
    return false;
}

function drinkWine(sprite, tile){
    map.setLayer(speed);
    map.removeTile(Math.round(tile.x)/32, Math.round(tile.y)/32);
    map.setLayer(walls);
    tile.destroy();
    if(speedBoost < 600){
        speedBoost+=120;
    }
    return false;
}

function pAttack() {
    canBlock = false;
    pWeaponL.body.setCollisionGroup(weaponCollisionGroup);
    var t = game.add.tween(pWeaponL.body);
    pWeaponL.visible = true;
    // left swing
    if (pAttackState == 0) {
        pWeaponL.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708 + 1.22173;    
        t.to({ rotation: game.physics.arcade.angleToPointer(player) + 1.5708 - 1.22173}, 150);
        pAttackState++;        
    } else if (pAttackState == 1) {  // right swing
        pWeaponL.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708 - 1.22173;    
        t.to({ rotation: game.physics.arcade.angleToPointer(player) + 1.5708 + 1.22173}, 150);
        pAttackState++;
    } else { // thrust
        pWeaponL.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708;  
        t.to({ rotation: game.physics.arcade.angleToPointer(player) + 1.5708}, 200);
        pAttackState = 0;
    }

    t.onComplete.add(function() {
        pWeaponL.visible = false;
        pWeaponL.body.setCollisionGroup(game.physics.p2.createCollisionGroup());
        canBlock = true;
    });

    t.start(); 

}

function lblock() {
    pLShield.visible = true;
    pLShield.body.setCollisionGroup(shieldCollisionGroup);
}
 
function dblock() {
    pDShield.visible = true;
    pDShield.body.setCollisionGroup(shieldCollisionGroup);
}   

function playerGetHit(body1, body2)
{
    if(playerinvulnerability==0 && !permainvincible) {
        body1.sprite.damage(1);
        playerinvulnerability=60;
    }
} 

function playerHitEnemy(body1, body2)
{
    body2.sprite.damage(4);
    // body2.velocity.x = -body2.velocity.x;
    // body2.velocity.y = -body2.velocity.y;
}
function playerBulletHit(body1, body2){
    body2.sprite.kill();
    if(playerinvulnerability==0 && !permainvincible) {
        body1.sprite.damage(1);
        playerinvulnerability=10;
    }
}

function lShieldCallback(body1, body2) {
    if (body2.sprite.bulletType == 1) {
        body2.sprite.kill();
    }
}

function dShieldCallback(body1, body2) {
    if (body2.sprite.bulletType == 0) {
        body2.sprite.kill();
    }
}