var paper

function Enemies(raphaelPaper) {
    paper = raphaelPaper
    this.enemies = []
    this.deathAnimationTimers = []
    this.deathImage = []
    return this
}

Enemies.prototype.createEnemy = function() {
    var rand = Math.random()
        // Select an enemy location
    var x = 500;
    var y = 200;
   if (rand < 0.25) {
        x = 0;
        y = Math.random() * (window.innerHeight + 200)
    } else if (rand < 0.5) {
        x = window.innerWidth + 200;
        y = Math.random() * (window.innerHeight + 200)
    } else if (rand < 0.75) {
        x = Math.random() * (window.innerWidth + 200);
        y = 0
    } else {
        x = Math.random() * (window.innerWidth + 200);
        y = window.innerHeight + 200
    }
    this.enemies.push({
        x: x,
        y: y,
        speed: 2,
        rotationSpeed: 3,
        width: 100,
        height: 100,
        r: 0,
        health: 1000,
        maxHealth: 1000,
        image: paper.image("image.gif", 0, 0, 100, 100).attr("fill", "#FFF").transform("t" + x + "," + y),
        healthBar: paper.rect(0, 0, 100, 10).attr("fill", "#F00").transform("t" + x + "," + y),
        hit: 0,
    })
}
Enemies.prototype.updateHitAnimation = function() {
    if (this.enemies[i].hit > 0) {
        this.enemies[i].hit--;
        if (this.enemies[i].hit == 0) {
            this.enemies[i].image.node.href.baseVal = "image.gif"
        } else {
            this.enemies[i].image.node.href.baseVal = "image_hit.png"
        }
    }
}
Enemies.prototype.updateLocation = function(playerX, playerY, playerWidth, playerHeight) {
    var opposite = playerY - this.enemies[i].y-this.enemies[i].height/2 + playerHeight/2
    var adjacent = playerX - this.enemies[i].x-this.enemies[i].width/2 + playerWidth/2
    if (adjacent < 0) {
        var trig = 180
    } else {
        var trig = 0
    }
    var oldr = this.enemies[i].r
    this.enemies[i].r = (Math.atan(opposite / adjacent)) / (Math.PI / 180) + trig
    // If the angle is less than 0, then this.enemies[i].r goes from 270 to negative 90. therefore, you need to check if the -360 version is closer
    if(Math.abs(this.enemies[i].r - oldr - 360) < Math.abs(this.enemies[i].r - oldr))
    {
        this.enemies[i].r = oldr-this.enemies[i].rotationSpeed
    } 
    else if(Math.abs(this.enemies[i].r - oldr + 360) < Math.abs(this.enemies[i].r - oldr))
    {
        this.enemies[i].r = oldr+this.enemies[i].rotationSpeed
    }
    // If the difference is positive by at least 2 degrees, then spin up
    else if (this.enemies[i].r - oldr > 2)
    {
        this.enemies[i].r = oldr+this.enemies[i].rotationSpeed
    }
    // If the different is negative by atleast 2 degrees, then spin down
    else if (this.enemies[i].r - oldr < -2)
    {
        this.enemies[i].r = oldr-this.enemies[i].rotationSpeed
    }
    // Prevent the angle from going over 360 degrees (270 because raphael)
    if (this.enemies[i].r < -90)
        this.enemies[i].r += 360
    if (this.enemies[i].r > 270)
        this.enemies[i].r -= 360
    // Speed * angle of movement. Sin for vertical, cos for horizontal
    if (playerY > this.enemies[i].y) {
        this.enemies[i].y += this.enemies[i].speed * Math.sin(this.enemies[i].r * Math.PI / 180)
    }
    if (playerY < this.enemies[i].y) {
        this.enemies[i].y += this.enemies[i].speed * Math.sin(this.enemies[i].r * Math.PI / 180)
    }
    if (playerX > this.enemies[i].x) {
        this.enemies[i].x += this.enemies[i].speed * Math.cos(this.enemies[i].r * Math.PI / 180)
    }
    if (playerX < this.enemies[i].x) {
        this.enemies[i].x += this.enemies[i].speed * Math.cos(this.enemies[i].r * Math.PI / 180)
    }
    this.enemies[i].image.transform("t" + this.enemies[i].x + "," + this.enemies[i].y + "r" + this.enemies[i].r)
    this.enemies[i].healthBar.transform("t" + this.enemies[i].x  + "," + (this.enemies[i].y-20))
}
Enemies.prototype.fireWeapon = function(bullets) {
    bullets.fireWeapon(this.enemies[i].x+this.enemies[i].width/2, this.enemies[i].y+this.enemies[i].height/2, this.enemies[i].r, 0, this.enemies[i].image.id)
}
Enemies.prototype.update = function(playerX, playerY, playerWidth, playerHeight, bullets) {
    // Move enemy
    for (i in this.enemies) {
        this.updateHitAnimation();
        this.updateLocation(playerX, playerY, playerWidth, playerHeight);
        this.fireWeapon(bullets)
    }
}
Enemies.prototype.deathAnimation = function() {

}