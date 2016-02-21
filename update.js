var defaultmovement = 150;
var invinsibletimer = 60;
function update () {

    playerupdate();
    bossupdate();
    enemieupdate();
    healthbar.text = player.health;
    if (permainvincible)
    {
        invinsibletimer--;
        if (invinsibletimer == 0)
        {
            isinvinsible = false;
            invinsibletimer = 60;
        }
    }
}



