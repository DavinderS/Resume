window.onload = function() {
    var width = window.innerWidth
    var height = window.innerHeight
    var paper = Raphael(0, 0, window.innerWidth, window.innerHeight)
        // Screen shake
    var shake = {
        x: 0,
        y: 0,
        value: 5,
        time: 0,
        maxTime: 10
    }
    var background = {
        x: 0,
        y: 0,
        height: window.innerWidth * 3 * 0.7,
        width: window.innerWidth * 3
    }
    background.image = paper.rect(-shake.value, -shake.value, background.width + shake.value * 2, background.height + shake.value * 2).attr("fill", "000")
    var stars = {
            x: 0,
            y: 0,
            image: paper.image("space.jpg", 0, 0, background.width, background.width*0.7),
        }

    var player = new Player(paper)
    // Set initial Location

    var enemyFactory = new Enemies(paper)
    var bullets = new Bullets(paper)
    var enemies = enemyFactory.enemies
    enemyFactory.createEnemy(0,0, 100, 100, 1000);
    enemyFactory.createEnemy(0,0, 100, 100, 1000);
    enemyFactory.createEnemy(0,0, 100, 100, 1000);
    enemyFactory.createEnemy(0,0, 100, 100, 1000);
    enemyFactory.createEnemy(0,0, 100, 100, 1000);
    var pause = false
    var pauseWindow = paper.set()
    pauseWindow.push(
            paper.rect(window.innerWidth/2-100, window.innerHeight/2-100, 200, 200, 10).attr("fill","#111"),
            paper.rect(window.innerWidth/2-90, window.innerHeight/2-90, 180, 180, 10).attr("stroke", "159"),
            paper.text(window.innerWidth/2, window.innerHeight/2, "Press space to start\n use WASD to move and\n mouse to aim and shoot").attr("fill", "#000").attr("stroke", "#999")
    )
    var keys = []
    window.onmousemove = function(event) {
        event = event || window.event; // IE-ism
        player.updateMouseLocation(event.clientX, event.clientY)
    }
    window.onmousedown = function(event) {
        keys["mouse"] = true
    }
    window.onmouseup = function(event) {
        keys["mouse"] = false
    }
    player.updateLocation(keys, shake, background)
    function update() {
        var t1 = performance.now()
        if (pause) {
            // Update player aim
            player.updateAim()
                // move player
            player.updateLocation(keys, shake, background)
                // Create player bullets
            if (keys["mouse"])
                bullets.fireWeapon(player.x+player.width/2, player.y+player.height/2, player.tr, 10, 'player', shake, player.money)
                //Enemy DeathAnimation
            for (i in enemyFactory.deathAnimationTimers) {
                var oldAttrs = enemyFactory.deathAnimationTimers[i].image.attrs;
                enemyFactory.deathAnimationTimers[i].image.remove()
                    // Increase their deathtimer
                enemyFactory.deathAnimationTimers[i].deathTimer++;
                // And if it's > 10 remove the enemy
                if (enemyFactory.deathAnimationTimers[i].deathTimer > 10) {
                    enemyFactory.deathAnimationTimers.splice(i, 1)
                } else {
                    enemyFactory.deathAnimationTimers[i].image = paper.image("Explosions/explosions_" + enemyFactory.deathAnimationTimers[i].deathTimer + ".png", oldAttrs.x,oldAttrs.y,oldAttrs.width,oldAttrs.height)
                    enemyFactory.deathAnimationTimers[i].image.transform("t0,0r"+enemyFactory.deathAnimationTimers[i].r)
                }
            }
            enemyFactory.update(player.x, player.y, player.width, player.height, bullets)
                // Check if bullet collides with any of the enemies. If it does update their health, remove the bullet and start the bullet.hit functions
            bullets.updateLocation(keys, enemies, player, enemyFactory, shake)
            if (shake.time != 0) {
                shake.x = -shake.x
                shake.y = -shake.y
                shake.time++;
                if (shake.time == shake.maxTime) {
                    shake.x = 0;
                    shake.y = 0;
                    shake.time = 0;
                }
            }
            for (i in bullets.bullets) {
                if (bullets.bullets[i].status == false) {
                    bullets.bullets[i].image.remove()
                    bullets.bullets.splice(i, 1)
                }
            }
            var t2 = performance.now()
            player.performance = Math.round((t2 - t1) * 100) / 100
        //    player.performanceText.attr("text", "performance: " + player.performance)
            if (player.checkDeath())
            {
                pause = false
                deathWindow = paper.set();
                deathWindow.push(
            paper.rect(window.innerWidth/2-100, window.innerHeight/2-100, 200, 200, 10).attr("fill","#111"),
            paper.rect(window.innerWidth/2-90, window.innerHeight/2-90, 180, 180, 10).attr("stroke", "159"),
            paper.text(window.innerWidth/2, window.innerHeight/2, "GAME OVER").attr("fill", "#999")
            )
                deathWindow.transform("t"+player.screenOffsetX+","+ player.screenOffsetY)
            }
        }
    }

    setInterval(update, 1000 / 60);


    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
        if (e.keyCode == 32 && !player.checkDeath())
        {
            pause = !pause
            if (pause == false)
            {
                pauseWindow.transform("t"+player.screenOffsetX+","+ player.screenOffsetY)
                pauseWindow.toFront();
                pauseWindow.show();
            } else
            {
                pauseWindow.hide();
            }
        }
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
}