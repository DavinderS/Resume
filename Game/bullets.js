	var paper

	function Bullets(raphaelPaper) {
		paper = raphaelPaper
		this.bullets = []
		this.delay = {}
		this.delayCounter = {}
		this.sounds = []
		this.weapons = []
		return this
	}
	Bullets.prototype.fireWeapon = function(x, y, angle, accuracy, id, shake, money) {
		if (!this.delay[id]) {
			if (id == "player") {
				this.delay[id] = 5
				this.delayCounter[id] = 0
			} else {
				this.delay[id] = 50
				this.delayCounter[id] = 0
			}
		}
		if (this.delayCounter[id] == this.delay[id]) {
			bulletImage = 'thruster.png'
			var bulletAccuracy = (Math.random() - 0.5) * accuracy
			var radius = 5
			var bulletSpread = 0;
			var bulletColor = "#F11"
			if (id == "player")
			{
				bulletColor = "#09C"
				if (money > 50) 
				{
					bulletSpread = 12
					this.bullets.push({
						image: paper.circle(0, 0, radius).attr("fill", bulletColor),
						damage: 100,
						transformations: [x + bulletSpread * Math.sin((angle + bulletAccuracy) * Math.PI / 180), y - bulletSpread * Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.sin((angle + bulletAccuracy) * Math.PI / 180), (angle + bulletAccuracy)],
						status: true,
						speed: 12,
						radius: radius,
						id: id
					})
					bulletAccuracy = (Math.random() - 0.5) * accuracy
					bulletSpread = -12
				}
				if (money > 150) {

					this.bullets.push({
						image: paper.circle(0, 0, radius).attr("fill", bulletColor),
						damage: 100,
						transformations: [x + bulletSpread * Math.sin((angle + bulletAccuracy) * Math.PI / 180), y - bulletSpread * Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.sin((angle + bulletAccuracy) * Math.PI / 180), (angle + bulletAccuracy)],
						status: true,
						speed: 12,
						radius: radius,
						id: id
					})
					bulletSpread = 16;
					bulletAccuracy = (Math.random() - 0.5) * accuracy

				this.bullets.push({
					image: paper.circle(0, 0, radius).attr("fill", bulletColor),
					damage: 100,
					transformations: [x + bulletSpread * Math.sin((angle + bulletAccuracy) * Math.PI / 180), y - bulletSpread * Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.sin((angle + bulletAccuracy) * Math.PI / 180), (angle + bulletAccuracy)],
					status: true,
					speed: 12,
					radius: radius,
					id: id
				})
				bulletSpread = -16;
					bulletAccuracy = (Math.random() - 0.5) * accuracy

				}
			}
			this.bullets.push({
				image: paper.circle(0, 0, radius).attr("fill", bulletColor),
				damage: 100,
				transformations: [x + bulletSpread * Math.sin((angle + bulletAccuracy) * Math.PI / 180), y - bulletSpread * Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.cos((angle + bulletAccuracy) * Math.PI / 180), Math.sin((angle + bulletAccuracy) * Math.PI / 180), (angle + bulletAccuracy)],
				status: true,
				speed: 12,
				radius: radius,
				id: id
			})


			this.bullets[this.bullets.length - 1].image.transform("t" + this.bullets[this.bullets.length - 1].image.matrix.e + "," + this.bullets[this.bullets.length - 1].image.matrix.f + "r" + this.bullets[this.bullets.length - 1].transformations[4])

			this.delayCounter[id] = 0;
		} else {
			this.delayCounter[id]++;
		}
	}
	// There is a little extra gap for corners using this method, but it saves computing power for something hardly visible so it's not worth it
	Bullets.prototype.detectCollision = function(circleX, circleY, circleRadius, rectX, rectY, rectWidth, rectHeight, rectAngle) {
		unrotatedCircleX = rectX + rectWidth / 2 + (rectX + rectWidth / 2 - circleX) * Math.cos(rectAngle * Math.PI / 180) + (rectY + rectHeight / 2 - circleY) * Math.sin(rectAngle * Math.PI / 180)
		unrotatedCircleY = rectY + rectHeight / 2 + (rectX + rectWidth / 2 - circleX) * Math.sin(rectAngle * Math.PI / 180) - (rectY + rectHeight / 2 - circleY) * Math.cos(rectAngle * Math.PI / 180)
	        // Determine collision
	        if (rectX - circleRadius < unrotatedCircleX &&
	        	rectX + rectWidth + circleRadius > unrotatedCircleX &&
	        	rectY - circleRadius < unrotatedCircleY &&
	        	rectY + rectHeight + circleRadius > unrotatedCircleY) {
	        	return true
	    } else {
	    	return false
	    }
	}
	Bullets.prototype.updateLocation = function(keys, enemies, player, enemyFactory, shake) {
		if (!keys["mouse"]) {
			if (this.delayCounter["player"] < 5)
				this.delayCounter["player"]++;
		}
		for (i in this.bullets) {
			this.bullets[i].transformations[0] += this.bullets[i].transformations[2] * this.bullets[i].speed
			this.bullets[i].transformations[1] += this.bullets[i].transformations[3] * this.bullets[i].speed
			this.bullets[i].transformations[0] = this.bullets[i].transformations[0]
			this.bullets[i].transformations[1] = this.bullets[i].transformations[1]
			this.bullets[i].image.transform("t" + this.bullets[i].transformations[0] + "," + this.bullets[i].transformations[1] + "r" + this.bullets[i].transformations[4])
			if (this.bullets[i].id != 'player') {
				if (this.bullets[i].status == true &&
					this.detectCollision(
						this.bullets[i].image.matrix.e,
						this.bullets[i].image.matrix.f,
						this.bullets[i].radius,
						player.x,
						player.y,
						player.width,
						player.height,
						player.tr)) {
					player.onHit(this.bullets[i]);
			}

		} else {
	            // Math.min because don't need to add the offset if the angle ratio is greater than 0 (Because point is the top left of the block, not the center)
	            for (j in enemies) {
	            	if (this.bullets[i].status == true &&
	            		this.detectCollision(
	            			this.bullets[i].image.matrix.e,
	            			this.bullets[i].image.matrix.f,
	            			this.bullets[i].radius,
	            			enemies[j].x,
	            			enemies[j].y,
	            			enemies[j].width,
	            			enemies[j].height,
	            			enemies[j].rotation)) {
	            		enemies[j].health -= this.bullets[i].damage;
	            	enemies[j].healthBar.attr({
	            		width: enemies[j].width * (enemies[j].health / enemies[j].maxHealth)
	            	})
	                        // If the enemy was hit give im 3 frames of image_hit
	                        enemies[j].hit = 3;
	                        this.bullets[i].status = false
	                        if (enemies[j].health == 0) {
	                        	if (shake && shake.time == 0) {
	                        		shake.x = shake.value
	                        		shake.y = shake.value
	                        		shake.time = 1
	                        	}
	                        	enemyFactory.deathAnimationTimers.push({
	                        		image: paper.image("Explosions/explosions_0.png", enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height).transform("t0,0r"+enemies[j].rotation),
	                        		r: enemies[j].rotation,
	                        		deathTimer: 0
	                        	})
	                        	if (enemies[j].imageURL == "boss.png")
	                        		player.money+=490
	                        	enemies[j].image.remove()
	                        	enemies[j].healthBar.remove()
	                        	enemies.splice(j, 1)
	                        	player.money += 10;
	                        	player.moneyText.attr("text", "money: " + player.money)
	                        	enemyFactory.createEnemy(player.screenOffsetX, player.screenOffsetY, 100, 100, 1000)
	                        	if (player.money == 100)
	                        		enemyFactory.createEnemy(player.screenOffsetX, player.screenOffsetY, 300, 300, 10000, 1, 0.5, "boss.png", "boss_hit.png")


	                        }
	                    }
	                }

	            }
	        // If bullet goes off the screen
	        if (this.bullets[i].transformations[0] > window.innerWidth + player.screenOffsetX ||
	        	this.bullets[i].transformations[0] < player.screenOffsetX ||
	        	this.bullets[i].transformations[1] > window.innerHeight + player.screenOffsetY ||
	        	this.bullets[i].transformations[1] < player.screenOffsetY) {
	        	this.bullets[i].status = false
	    }
	}
}