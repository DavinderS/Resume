window.onload = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var paper = Raphael(0, 0, width, height);
    var keys = [];
    var paused = true;
    var pauseWindow = paper.set();
    var deathWindow = paper.set();
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
        height: 2000,
        width: 2000
    }

    var stars = {
        x: 0,
        y: 0,
        image: paper.image("space.jpg", 0, 0, background.width, background.width * 0.7),
    }

    var player = new Player(paper);
    var enemyFactory = new Enemies(paper);
    var bullets = new Bullets(paper);
    var enemies = enemyFactory.enemies;


    enemyFactory.createEnemy(0, 0, 100, 100, 1000, 2);
    enemyFactory.createEnemy(0, 0, 100, 100, 1000, 2);
    enemyFactory.createEnemy(0, 0, 100, 100, 1000, 2);
    enemyFactory.createEnemy(0, 0, 100, 100, 1000, 2);
    enemyFactory.createEnemy(0, 0, 100, 100, 1000, 2);


    pauseWindow.push(
        paper.rect(width / 2 - 100, height / 2 - 100, 200, 200, 10).attr("fill", "#111"),
        paper.rect(width / 2 - 90, height / 2 - 90, 180, 180, 10).attr("stroke", "159"),
        paper.text(width / 2, height / 2, "Press space to start and paused\n use WASD to move and\n mouse to aim and shoot").attr("fill", "#000").attr("stroke", "#999")
    );


    window.onmousemove = function(event) {
        player.updateMouseLocation(event.clientX, event.clientY);
    }
    window.onmousedown = function(event) {
        keys["mouse"] = true;
    }
    window.onmouseup = function(event) {
        keys["mouse"] = false;
    }

    function shakeScreen() {
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
    }


    function update() {
        if (!paused) {
            player.updateAim()
            player.updateLocation(keys, shake, background)
            if (keys["mouse"]) {
                bullets.fireWeapon(player.x + player.width / 2, player.y + player.height / 2, player.tr, 10, 'player', shake, player.money)
            }
            enemyFactory.update(player.x, player.y, player.width, player.height, bullets)
            bullets.updateLocation(keys, enemies, player, enemyFactory, shake)
            shakeScreen();
            

            if (player.checkDeath()) {
                paused = true;
                deathWindow = paper.set();
                deathWindow.push(
                    paper.rect(width / 2 - 100, height / 2 - 100, 200, 200, 10).attr("fill", "#111"),
                    paper.rect(width / 2 - 90, height / 2 - 90, 180, 180, 10).attr("stroke", "159"),
                    paper.text(width / 2, height / 2, "GAME OVER").attr("fill", "#999")
                )
                deathWindow.transform("t" + player.screenOffsetX + "," + player.screenOffsetY)
            }
        }
    }


    function pause() {
        paused = !paused
        if (paused == true) {
            pauseWindow.transform("t" + player.screenOffsetX + "," + player.screenOffsetY)
            pauseWindow.toFront();
            pauseWindow.show();
        } else {
            pauseWindow.hide();
        }
    }
    window.onresize = function() {
        width = window.innerWidth;
        height = window.innerHeight;
        paper.setSize(width, height);
    }

    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
        if (e.keyCode == 32 && !player.checkDeath()) {
            pause();
        }
    });

    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
    
    // Set the players initial position
    player.updateLocation(keys, shake, background);
    // 60 fps
    setInterval(update, 1000 / 60);

}