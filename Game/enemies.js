var paper

function Enemies(raphaelPaper) {
    paper = raphaelPaper
    this.enemies = []
    this.deathAnimationTimers = []
    return this
}

Enemies.prototype.createEnemy = function(offsetX, offsetY, width, height, health, speed, rotationSpeed, image, imageHit) {
    var rand = Math.random()
    // Select an enemy location
    var x = 0;
    var y = 0;
    var rotationSpeed = 1 || rotationSpeed

    // Set enemy images Images
    var imageURL = image || "images/enemy.png"
    var imageHitURL = imageHit || "images/enemy_hit.png"

    // Set Enemy Initial Location
    if (rand < 0.25) {
        x = offsetX - 200;
        y = Math.random() * (window.innerHeight + 200) + offsetY;
    } else if (rand < 0.5) {
        x = window.innerWidth + 200 + offsetX;
        y = Math.random() * (window.innerHeight + 200) + offsetY
    } else if (rand < 0.75) {
        x = Math.random() * (window.innerWidth + 200) + offsetX;
        y = offsetY - 200
    } else {
        x = Math.random() * (window.innerWidth + 200) + offsetX;
        y = window.innerHeight + 200 + offsetY
    }
    this.enemies.push({
        x: x,
        y: y,
        speed: speed,
        rotationSpeed: rotationSpeed,
        width: width,
        height: height,
        rotation: 0,
        health: health,
        maxHealth: health,
        imageURL: imageURL,
        imageHitURL: imageHitURL,
        image: paper.image(imageURL, 0, 0, width, height).attr("fill", "#FFF").transform("t" + x + "," + y),
        healthBar: paper.rect(0, 0, width, 10).attr("fill", "#F00").transform("t" + x + "," + y),
        hit: 0,
    })
}

Enemies.prototype.updateHitAnimation = function() {
    if (this.enemies[i].hit > 0) {
        this.enemies[i].hit--;
        if (this.enemies[i].hit == 0) {
            this.enemies[i].image.node.href.baseVal = this.enemies[i].imageURL
        } else {
            this.enemies[i].image.node.href.baseVal = this.enemies[i].imageHitURL
        }
    }
}
Enemies.prototype.updateLocation = function(playerX, playerY, playerWidth, playerHeight) {
    var opposite = playerY - this.enemies[i].y - this.enemies[i].height / 2 + playerHeight / 2
    var adjacent = playerX - this.enemies[i].x - this.enemies[i].width / 2 + playerWidth / 2
    if (adjacent < 0) {
        var trig = 180
    } else {
        var trig = 0
    }
    var oldr = this.enemies[i].rotation
    this.enemies[i].rotation = (Math.atan(opposite / adjacent)) / (Math.PI / 180) + trig
    // If the angle is less than 0, then this.enemies[i].rotation goes from 270 to negative 90. therefore, you need to check if the -360 version is closer
    if (Math.abs(this.enemies[i].rotation - oldr - 360) < Math.abs(this.enemies[i].rotation - oldr)) {
        this.enemies[i].rotation = oldr - this.enemies[i].rotationSpeed
    } else if (Math.abs(this.enemies[i].rotation - oldr + 360) < Math.abs(this.enemies[i].rotation - oldr)) {
        this.enemies[i].rotation = oldr + this.enemies[i].rotationSpeed
    }
    // If the difference is positive by at least 2 degrees, then spin up
    else if (this.enemies[i].rotation - oldr > 2) {
        this.enemies[i].rotation = oldr + this.enemies[i].rotationSpeed
    }
    // If the different is negative by atleast 2 degrees, then spin down
    else if (this.enemies[i].rotation - oldr < -2) {
        this.enemies[i].rotation = oldr - this.enemies[i].rotationSpeed
    }
    // Prevent the angle from going over 360 degrees (270 because raphael)
    if (this.enemies[i].rotation < -90)
        this.enemies[i].rotation += 360
    if (this.enemies[i].rotation > 270)
        this.enemies[i].rotation -= 360
    // Speed * angle of movement. Sin for vertical, cos for horizontal
    if (playerY > this.enemies[i].y) {
        this.enemies[i].y += this.enemies[i].speed * Math.sin(this.enemies[i].rotation * Math.PI / 180)
    }
    if (playerY < this.enemies[i].y) {
        this.enemies[i].y += this.enemies[i].speed * Math.sin(this.enemies[i].rotation * Math.PI / 180)
    }
    if (playerX > this.enemies[i].x) {
        this.enemies[i].x += this.enemies[i].speed * Math.cos(this.enemies[i].rotation * Math.PI / 180)
    }
    if (playerX < this.enemies[i].x) {
        this.enemies[i].x += this.enemies[i].speed * Math.cos(this.enemies[i].rotation * Math.PI / 180)
    }
    this.enemies[i].image.transform("t" + this.enemies[i].x + "," + this.enemies[i].y + "r" + this.enemies[i].rotation)
    this.enemies[i].healthBar.transform("t" + this.enemies[i].x + "," + (this.enemies[i].y - 20))
}

Enemies.prototype.fireWeapon = function(bullets) {
    bullets.fireWeapon(this.enemies[i].x + this.enemies[i].width / 2, this.enemies[i].y + this.enemies[i].height / 2, this.enemies[i].rotation, 0, this.enemies[i].image.id)
}

Enemies.prototype.update = function(playerX, playerY, playerWidth, playerHeight, bullets) {
    // Move enemy
    for (i in this.enemies) {
        this.updateHitAnimation();
        this.updateLocation(playerX, playerY, playerWidth, playerHeight);
        this.fireWeapon(bullets)
    }
    this.updateDeathAnimations();
}
Enemies.prototype.updateDeathAnimations = function() {
    for (i in this.deathAnimationTimers) {
        // need to grab it's location here becuase next step removes the image
        var enemyAttrs = this.deathAnimationTimers[i].image.attrs;
        this.deathAnimationTimers[i].image.remove()
        this.deathAnimationTimers[i].deathTimer++;
        if (this.deathAnimationTimers[i].deathTimer > 20) {
            this.deathAnimationTimers.splice(i, 1)
        } else {
            this.deathAnimationTimers[i].image = paper.image("images/Explosions/explosions_" + Math.floor(this.deathAnimationTimers[i].deathTimer / 2) + ".png", enemyAttrs.x, enemyAttrs.y, enemyAttrs.width, enemyAttrs.height);
            this.deathAnimationTimers[i].image.transform("t0,0r" + this.deathAnimationTimers[i].r)
        }
    }
}