var paper

function Player(raphaelPaper) {
    var thrusterWidth = 10
    var thrusterHeight = 50
    paper = raphaelPaper
        this.speedx = 0,
        this.speedy = 0,
        this.speed = 5,
        this.accel = 0.3,
        this.decel = 0.1
    	this.mousex = 0,
        this.mousey = 0,
        this.rotationSpeed = 2,
        this.width = 80,
        this.height = 50,
        this.x = window.innerWidth / 2 - this.width/2,
        this.y = window.innerHeight / 2 - this.height/2,
        this.screenOffsetX = 0,
        this.screenOffsetY = 0,
        this.r = 0,
        this.tr = 0,
        this.healthBar = paper.rect(0, 0, 100, 10)
    this.healthBar.attr("fill", "#F00")
    this.healthBar.transform("t" + (this.x - this.width / 2) + "," + (this.y - this.height / 2 - 10))
        //this.thruster = paper.image('thruster.png', 0, 0, this.width/100*40, this.height/60*11)
        //this.thruster2 = paper.image('thruster.png', 0, 0, this.width/100*40, this.height/60*11)
        //this.image = paper.image('spaceship.png', 0, 0, this.width, this.height)
    this.image = paper.image("spaceship.png",0, 0, this.width, this.height).attr("fill","F00")

    this.thrusterWidth = thrusterWidth;
    this.thrusterHeight = thrusterHeight
    this.thruster = paper.image('thruster.png', 0, 0, thrusterHeight, thrusterWidth)
    this.thruster2 = paper.image('thruster.png', 0, 0, thrusterHeight, thrusterWidth)
    this.health = 1000
    this.maxHealth =1000
    this.moneyText = paper.text(0, 0, "money: 0").attr("fill", "#FFF");
    this.money = 0;
    this.deathAnimation = 0
    this.performanceText = paper.text(0, 0, "Performance: 0").attr("fill", "#FFF");
    this.performance = 0;
    return this
}
Player.prototype.updateMouseLocation = function(x, y) {
        this.mousex = x
        this.mousey = y
    }
Player.prototype.updateAim = function() {
    var opposite = this.mousey - this.y - this.height/2 + this.screenOffsetY
    var adjacent = this.mousex - this.x - this.width/2 + this.screenOffsetX
    if (adjacent < 0) {
        var trig = 180
    } else {
        var trig = 0
    }
    this.tr = Math.atan(opposite/adjacent) / (Math.PI / 180) + trig
}
Player.prototype.onHit = function(bullets) {
    this.health -= bullets.damage
    this.healthBar.attr({
        width: 100 * (this.health / this.maxHealth)
    })
    bullets.status = false
    if (this.health == 0) {
        this.image.remove()
        this.thruster.remove()
        this.thruster2.remove()
    }
}
Player.prototype.checkDeath = function()
{
	if (this.health <= 0)
		return true
	else
		return false
}
Player.prototype.updateLocation = function(keys, shake, background) {
    if (keys[38] || keys[87]) {
        if (this.speedy > -this.speed)
            this.speedy -= this.accel;
    }

    if (keys[40] || keys[83]) {
        if (this.speedy < this.speed)
            this.speedy += this.accel;
    }
    if (keys[39] || keys[68]) {
        if (this.speedx < this.speed)
            this.speedx += this.accel;
    }
    if (keys[37] || keys[65]) {
        if (this.speedx > -this.speed)
            this.speedx -= this.accel;
    }
    this.speedx = Math.round(this.speedx * 10) / 10
    this.speedy = Math.round(this.speedy * 10) / 10
    this.x += this.speedx
    this.y += this.speedy
    if (this.x + this.speedx < 0 + this.width) {
        this.speedx = 0;
        this.x = this.width
    }
    if (this.x + this.speedx > background.width - this.width) {
        this.speedx = 0;
        this.x = background.width - this.width
    }
    if (this.y + this.speedy < 0 + this.height) {
        this.speedy = 0;
        this.y = this.height
    }
    if (this.y + this.speedy > background.height - this.height) {
        this.speedy = 0;
        this.y = background.height - this.height
    }

    if (this.speedx > 0)
        this.speedx -= this.decel;
    if (this.speedx < 0)
        this.speedx += this.decel;
    if (this.speedy > 0)
        this.speedy -= this.decel;
    if (this.speedy < 0)
        this.speedy += this.decel;
    if (this.x > window.innerWidth/2 && this.x < background.width - window.innerWidth/2) // CHANGE
        this.screenOffsetX = this.x - window.innerWidth / 2 // CHANGE
    if (this.y > window.innerHeight / 2 && this.y < background.height - window.innerHeight / 2) // CHANGE
        this.screenOffsetY = this.y - window.innerHeight / 2 // CHANGE
    paper.setViewBox(this.screenOffsetX + shake.x, this.screenOffsetY + shake.y, window.innerWidth, window.innerHeight)
    this.moneyText.transform("t" + (this.screenOffsetX + shake.x + 30) + "," + (this.screenOffsetY + shake.y + 10))
    this.performanceText.transform("t" + (this.screenOffsetX + shake.x + 60) + "," + (this.screenOffsetY + shake.y + 30))
    this.image.transform("t" + (this.x) + "," + (this.y) + "r" + this.tr)
    this.healthBar.transform("t" + (this.x) + "," + (this.y - 10))
    var offset = 7
    var XInitial = this.x + this.width/2 - this.thrusterHeight / 2
    var XRotationOffset = -(-this.thrusterHeight / 2 - this.width / 2) * Math.cos(this.tr * Math.PI / 180)
    var XOffset = offset * Math.sin(this.tr * Math.PI / 180)
    var YInitial = this.y + this.height/2 - this.thrusterWidth / 2
    var YRotationOffset = (this.thrusterHeight / 2 + this.width / 2) * Math.sin(this.tr * Math.PI / 180) // + (this.width/2)*Math.sin(this.tr*Math.PI/180)
    var YOffset = offset * Math.cos(this.tr * Math.PI / 180)
    this.thruster.transform("t" + (XInitial - XRotationOffset + XOffset) + "," + (YInitial - YRotationOffset - YOffset) + "r" + this.tr)
    this.thruster2.transform("t" + (XInitial - XRotationOffset - XOffset) + "," + (YInitial - YRotationOffset + YOffset) + "r" + this.tr)
}