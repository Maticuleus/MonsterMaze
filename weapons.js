var DEFAULT_FIRE_RATE = 450;

//  Our core Bullet class
//  This is a simple Sprite object that we set a few properties on
//  It is fired by all of the Weapon classes

var Bullet = function (game, bulletType) {

    Phaser.Sprite.call(this, game, 0, 0, 'bullet'+bulletType);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.P2JS;
    game.physics.p2.enable(this);

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.bulletType = bulletType;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    if (this.bulletType == 0) {
        this.body.setCollisionGroup(blackBulletGroup);
    } else if (this.bulletType == 1) {
        this.body.setCollisionGroup(whiteBulletGroup);

    }
    this.body.collides([playerCollisionGroup, shieldCollisionGroup]);
    
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.body.angle = angle;
    var p = game.physics.arcade.velocityFromAngle(angle, speed);
    this.body.velocity.x = p.x;
    this.body.velocity.y = p.y;
        this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {


    if (this.body.x < game.camera.x
        || this.body.x > game.camera.x + game.camera.width
        || this.body.y < game.camera.y
        || this.body.y > game.camera.y + game.camera.height){
        this.kill();
    }

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }




};

var Weapon = {};

function fireBullet(source, x, y, angle, speed, gx, gy){

    var bullet = source.getFirstExists(false);
    if(bullet  === null){
        return;
    }
    bullet.fire(x, y, angle, speed, gx, gy);
}

////////////////////////////////////////////////////
//  A single bullet is fired in front of the ship //
////////////////////////////////////////////////////

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 400;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 128; i++)
    {
        this.add(new Bullet(game, i % 2), true);
        
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    fireBullet(this, x,y,source.angle - 90, this.bulletSpeed, 0, 0);

    this.nextFire = game.time.time + this.fireRate;

};


/////////////////////////////////////////////////////////
//  A bullet is shot both in front and behind the ship //
/////////////////////////////////////////////////////////

Weapon.FrontAndBack = function (game) {

    Phaser.Group.call(this, game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 400;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 128; i++)
    {
        this.add(new Bullet(game, i % 2), true);
    }

    return this;

};

Weapon.FrontAndBack.prototype = Object.create(Phaser.Group.prototype);
Weapon.FrontAndBack.prototype.constructor = Weapon.FrontAndBack;

Weapon.FrontAndBack.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    fireBullet(this, x,y,0, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,180, this.bulletSpeed, 0, 0);

    this.nextFire = game.time.time + this.fireRate;

};



//////////////////////////////////////////////////////
//  3-way Fire (directly above, below and in front) //
//////////////////////////////////////////////////////

Weapon.ThreeWay = function (game) {

    Phaser.Group.call(this, game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 400;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, i % 2), true);
    }

    return this;

};

Weapon.ThreeWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.ThreeWay.prototype.constructor = Weapon.ThreeWay;

Weapon.ThreeWay.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    fireBullet(this, x,y,270, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,0, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,90, this.bulletSpeed, 0, 0);
    this.nextFire = game.time.time + this.fireRate;

};

/////////////////////////////////////////////
//  8-way fire, from all sides of the ship //
/////////////////////////////////////////////

Weapon.EightWay = function (game) {

    Phaser.Group.call(this, game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 300;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 96; i++)
    {
        this.add(new Bullet(game, i % 2), true);
    }

    return this;

};

Weapon.EightWay.prototype = Object.create(Phaser.Group.prototype);
Weapon.EightWay.prototype.constructor = Weapon.EightWay;

Weapon.EightWay.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = source.y + 10;

    fireBullet(this, x,y,0, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,45, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,90, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,135, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,225, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,270, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,180, this.bulletSpeed, 0, 0);
    fireBullet(this, x,y,315, this.bulletSpeed, 0, 0);

    this.nextFire = game.time.time + this.fireRate;

};

////////////////////////////////////////////////////
//  Bullets are fired out scattered on the y axis //
////////////////////////////////////////////////////

Weapon.ScatterShot = function (game) {

    Phaser.Group.call(this, game, game.world, 'Scatter Shot', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, i % 2), true);
    }

    return this;

};

Weapon.ScatterShot.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScatterShot.prototype.constructor = Weapon.ScatterShot;

Weapon.ScatterShot.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 16;
    var y = (source.y + source.height / 2) + game.rnd.between(-10, 10);

    fireBullet(this, x, y, source.angle - 90, this.bulletSpeed, 0, 0);

    this.nextFire = game.time.time + this.fireRate;

};

//////////////////////////////////////////////////////////////////////////
//  Fires a streaming beam of lazers, very fast, in front of the player //
//////////////////////////////////////////////////////////////////////////

Weapon.Beam = function (game) {

    Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = DEFAULT_FIRE_RATE;

    for (var i = 0; i < 128; i++)
    {
        this.add(new Bullet(game, i % 2), true);
    }

    return this;

};

Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
Weapon.Beam.prototype.constructor = Weapon.Beam;

Weapon.Beam.prototype.fire = function (source) {

    if (game.time.time < this.nextFire) { return; }

    var x = source.x + 40;
    var y = source.y + 10;

    fireBullet(this, x, y, source.angle - 90, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = game.time.time + this.fireRate;

};

