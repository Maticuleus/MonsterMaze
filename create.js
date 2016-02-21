function create () {

	game.stage.backgroundColor = '#787878';
	game.world.resize(2000, 2000);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	gamePhysics = game.physics.P2JS;

	game.physics.p2.setImpactEvents(true);


	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	enemyCollisionGroup  = game.physics.p2.createCollisionGroup();
	bossCollisionGroup	 = game.physics.p2.createCollisionGroup();
	wallCollisionGroup   = game.physics.p2.createCollisionGroup();
	weaponCollisionGroup = game.physics.p2.createCollisionGroup();
	shieldCollisionGroup = game.physics.p2.createCollisionGroup();
	blackBulletGroup	 = game.physics.p2.createCollisionGroup();
	whiteBulletGroup	 = game.physics.p2.createCollisionGroup();

	wineCollisionGroup = game.physics.p2.createCollisionGroup();
	breadCollisionGroup = game.physics.p2.createCollisionGroup();
	game.physics.p2.updateBoundsCollisionGroup();

    cursors = game.input.keyboard.createCursorKeys();

    keyButtons = game.input.keyboard.addKeys({ 'z'    : Phaser.KeyCode.Z,
    										   'x'    : Phaser.KeyCode.X,
    										   'space': Phaser.KeyCode.SPACEBAR
    		  								 });

    mouse = game.input.mouse;

    keyButtons.space.onDown.add(pAttack);

	map = game.add.tilemap('lvl1');
	map.addTilesetImage('simple', 'tiles');
	var background = map.createLayer('Background');

	health = map.createLayer('Health');
	health.resizeWorld();
	map.setCollisionBetween(0, 10000, true, health);
	game.physics.p2.convertTilemap(map, health).forEach(function(p) {
		//p.debug = true;
		game.physics.p2.enable(p);
		p.setCollisionGroup(breadCollisionGroup);
		p.addToWorld();
		p.collides([playerCollisionGroup]);
	});


	speed = map.createLayer('Speed');
	speed.resizeWorld();
	map.setCollisionBetween(0, 10000, true, speed);
	game.physics.p2.convertTilemap(map, speed).forEach(function(p) {
		//p.debug = true;
		game.physics.p2.enable(p);
		p.setCollisionGroup(wineCollisionGroup);
		p.addToWorld();
		p.collides([playerCollisionGroup]);
	});



	walls = map.createLayer('Walls');
	//walls.debug = true;
	map.setCollisionBetween(0, 10000, true, walls);

	game.physics.p2.convertTilemap(map, walls).forEach(function(p) {
		//p.debug = true;
		game.physics.p2.enable(p);
		p.addToWorld();
		p.setCollisionGroup(wallCollisionGroup);
		p.collides([playerCollisionGroup, enemyCollisionGroup, bossCollisionGroup]);
	});
	

	player = game.add.sprite(800, 800, 'guy');
	player.maxhealth = 1000;
	player.health = 1000;
	player.damage(5);
	player.animations.add('walk', [0,1,2,3,4,5]);
	player.anchor.setTo(0.5, 0.5);
	game.physics.p2.enable(player);
	
	player.body.setRectangleFromSprite();
	//player.body.debug = true;
	player.body.rotation = game.physics.arcade.angleToPointer(player) + 1.5708;

	isinvinsible = false;
	healthbar = game.add.text(32,32, player.health, { font: "32px Arial", fill: "#E52B50" });
	healthbar.fixedToCamera = true;
	gameOver = game.add.text(300,300, "G G", { font: "100px Arial", fill: "#E52B50" });
	gameOver.fixedToCamera = true;
	gameOver.visible=false;

	pWeaponL = game.add.sprite(player.x + pWeapXoffset, player.y + pWeapYoffset, 'pWeaponL');
	
	pWeaponL.visible = false;
	game.physics.p2.enable(pWeaponL);

	pWeaponL.anchor.setTo(0.5, 1);

	pWeaponL.anchor.setTo(0.5, 1);
	pWeaponL.body.clearShapes();
	pWeaponL.body.addRectangle(18, 97, 0, -48);
	pWeaponL.body.updateCollisionMask();

	//pWeaponL.body.debug = true;
	pWeaponL.body.collides([enemyCollisionGroup, bossCollisionGroup]);

	pWeaponL.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

	pWeaponD = game.add.sprite(player.x + pWeapXoffset, player.y + pWeapYoffset, 'pWeaponD');
	
	pWeaponD.visible = false;
	game.physics.p2.enable(pWeaponD);

	//pWeaponD.body.debug = true;
	pWeaponD.body.collides(enemyCollisionGroup, bossCollisionGroup);
	pWeaponD.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

	pWeaponD.anchor.setTo(0.5, 1);
	pWeaponD.body.clearShapes();
	pWeaponD.body.addRectangle(18, 97, 0, -48);
	pWeaponD.body.updateCollisionMask();

	pLShield = game.add.sprite(player.x, player.y, 'lshield');
	game.physics.p2.enable(pLShield);

	pLShield.body.clearShapes();
	pLShield.body.setCircle(50);
	//pLShield.body.debug = true;

	pLShield.body.collides(whiteBulletGroup);
	pLShield.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

	pDShield = game.add.sprite(player.x, player.y, 'dshield');
	game.physics.p2.enable(pDShield);
	//pDShield.body.debug = true;

	pDShield.body.clearShapes();
	pDShield.body.setCircle(50);
	pDShield.body.collides(blackBulletGroup);
	pDShield.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;

	playerGroup = game.add.group();
	playerGroup.add(pWeaponL);
	playerGroup.add(pWeaponD);
	playerGroup.add(player);

	var WeaponTypes = [Weapon.ScatterShot, Weapon.EightWay, Weapon.ThreeWay,Weapon.SingleBullet];
	enemies = [];
	for(var i = 0; i < 50; i++){
		enemies[i] = game.add.sprite(background.width * Math.random(),background.height * Math.random(),'dragon');
		game.physics.p2.enable(enemies[i]);
		enemies[i].body.setRectangleFromSprite();
		//enemies[i].body.debug = true;
		enemies[i].body.setCollisionGroup(enemyCollisionGroup);
		enemies[i].body.collides([enemyCollisionGroup, playerCollisionGroup, wallCollisionGroup, weaponCollisionGroup, bossCollisionGroup]);
		enemies[i].anchor.setTo(0.5, 0.5);
		enemies[i].health = 100;
		enemies[i].weapon = new WeaponTypes[i % WeaponTypes.length](this.game);
	}
	
	bossCthulu = createBoss(game, 'cthulu', 1400, 1400);
	bossCthulu.body.setCollisionGroup(bossCollisionGroup);
	bossCthulu.body.collides([enemyCollisionGroup, playerCollisionGroup, wallCollisionGroup, weaponCollisionGroup]);

	player.body.setCollisionGroup(playerCollisionGroup);

	player.body.collides([enemyCollisionGroup, wallCollisionGroup, blackBulletGroup, whiteBulletGroup, bossCollisionGroup, wineCollisionGroup, breadCollisionGroup]);
	player.body.createGroupCallback(enemyCollisionGroup, playerGetHit);
	player.body.createGroupCallback(wineCollisionGroup, drinkWine);
	player.body.createGroupCallback(breadCollisionGroup, eatBread);

	player.body.createGroupCallback(blackBulletGroup, playerBulletHit);
	player.body.createGroupCallback(whiteBulletGroup, playerBulletHit);
	bossCthulu.body.createGroupCallback(playerCollisionGroup, bossHitPlayer);

	pWeaponL.body.createGroupCallback(enemyCollisionGroup, playerHitEnemy);
	pWeaponL.body.createGroupCallback(bossCollisionGroup, playerHitEnemy);
	pWeaponD.body.createGroupCallback(enemyCollisionGroup, playerHitEnemy);

	game.camera.follow(player);


}

// @game : game object
// @name : preload name
function createBoss(game, name, x, y) {
	boss = game.add.sprite(x, y, name);
	game.physics.p2.enable(boss);
	boss.body.setRectangle(100, 100);
	boss.health = 350;
	//boss.body.debug = true;
	return boss;
}
