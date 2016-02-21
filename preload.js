function preload () {

    game.stage.backgroundColor = '#85b5e1';

    game.load.spritesheet('player', 'assets/images/jesus.png', 32, 48);
    game.load.spritesheet('pWeaponL', 'assets/images/sword.png', 150, 150);
    game.load.spritesheet('pWeaponD', 'assets/images/dsword.png', 150, 150);
    game.load.spritesheet('guy', 'assets/images/guy2.png', 40, 50);

    game.load.image('dragon', 'assets/images/enemiedrag.png');
    game.load.image('cthulu', 'assets/images/enemieboss.png');

    game.load.image('lshield', 'assets/images/lshield.png');
    game.load.image('dshield', 'assets/images/dshield.png');

    game.load.tilemap('lvl1', 'assets/tiles/lvl2.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tiles', 'assets/tiles/tiles2.png', 32, 32);
    game.load.image('bullet0', 'assets/images/bullet0.png');
    game.load.image('bullet1', 'assets/images/bullet1.png');

}

