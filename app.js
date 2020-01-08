function setType(typeNo) {
    var type = "no type available for given typeNo";
    if (typeNo === 5) {
        type = "plastic";
    }
    if (typeNo === 6) {
        type = "glass";
    }
    if (typeNo === 7) {
        type = "metal";
    }
    if (typeNo === 8) {
        type = "paper";
    }
    if (typeNo === 9) {
        type = "organic";
        //   console.log("yeah");
    }
    return (type);
}

function scoreDisplay() {
    var x = width / 2 + 115;
    noFill();
    stroke("#13316c");
    strokeWeight(2);
    rect(width / 2, 22, 280, 30);
    fill("#13316c");
    noStroke();
    textSize(17);
    //  fill("red");
    text("SCORE : " + score, width / 2 - 130, 30);
    // fill("white");
    text("COLLECTED : " + collected + "/" + garbageGroup.length, width / 2 - 25, 30);
    image(bin, x, -5, 40, 50);
    fill("white");
    circle(x + 23, 23, 25);
    var lives = 3 - destroyCount;
    fill("black");
    text(lives, x + 18, 30);
    console.log(lives);
    // fill("blue");
    // noFill();
    // strokeWeight(0.3);
    // stroke("blue");
    // text("plastic :" + plastic, 65, 20);
    // stroke(255);
    // fill("blue");
    // text("glass :" + glass, 125, 20);
    // fill("grey")
    // text("metal :" + metal, 175, 20);
    // fill("white");
    // text("paper :" + paper, 230, 20);
    // stroke(0, 255, 0);
    // fill("greenBin");
    // text("organic :" + organic, 290, 20);

}
function createButtons() {
    startButton = createButton("PLAY");
    startButton.class("startButtons");

    startButton.style("visibility", "hidden");
    startButton.mousePressed(function () {
        gamestate = "play";
        settingsButton.style("visibility", "hidden");
        startButton.style("visibility", "hidden");
        junkStoreButton.style("visibility", "hidden");
        pauseButton.style("visibility", "visible");
        mainMenuButton.style("visibility", "hidden");
        replayButton.style("visibility", "hidden");
        garbageGroup = createGroup();
        reset();
        paused = false;
        click.play();
    });
    junkStoreButton = createButton("JUNK STORE");
    junkStoreButton.class("startButtons");

    junkStoreButton.style("visibility", "hidden");
    junkStoreButton.mousePressed(function () {
        gamestate = "junkPlay";
        click.play();
    })

    replayButton = createButton("Replay");
    replayButton.position(225, 440);
    replayButton.style("visibility", "hidden");
    replayButton.class("minorButtons");
    replayButton.mousePressed(function () {
        replayButton.style("visibility", "hidden");
        mainMenuButton.style("visibility", "hidden");
        exitPauseMenuButton.style("visibility", "hidden");
        pauseButton.style("visibility", "visible");
        soundButton.style("visibility", "hidden");
        soundButton1.style("visibility", "hidden");
        soundButton2.style("visibility", "hidden");

        paused = false;
        gamestate = "play";
        reset();
        click.play();
    });


    mainMenuButton = createButton("Main menu");
    mainMenuButton.position(70, 440);
    mainMenuButton.class("minorButtons");
    mainMenuButton.style("visibility", "hidden");
    mainMenuButton.mousePressed(function () {
        click.play();
        paused = false;
        gamestate = "start";
        settingsButton.style("visibility", "visible");
        pauseButton.style("visibility", "hidden");
        replayButton.style("visibility", "hidden");
        mainMenuButton.style("visibility", "hidden");
        exitPauseMenuButton.style("visibility", "hidden");
        soundButton.style("visibility", "hidden");
        soundButton1.style("visibility", "hidden");
        soundButton2.style("visibility", "hidden");
        reset();
    });



    nextLevelButton = createButton("Next");
    nextLevelButton.class("minorButtons");
    // nextLevelButton.style("width", 100)

    pauseButton = createButton("II");
    pauseButton.position(20, 20);
    pauseButton.id("pause");
    pauseButton.style("visibility", "hidden");
    pauseButton.mousePressed(function () {
        gamestate = "pause";
        paused = true;
        pauseButton.style("visibility", "hidden");
        soundButton.style("visibility", "visible")
        click.play();
        displayMiniMenu();
        // alert("Game paused")
        // if (garbageGroup !== undefined) {
        //     for (var i = 0; i <= garbageGroup.length; i++) {
        //         temp = garbageGroup.get(i);
        //         if (temp != undefined) {
        //             temp.velocityY = 0;
        //         }

        //     }
        // }
    });
    exitPauseMenuButton = createButton("❌");
    exitPauseMenuButton.style("visibility", "hidden");
    exitPauseMenuButton.id("pause");
    exitPauseMenuButton.position(330, 115);
    exitPauseMenuButton.mousePressed(function () {
        gamestate = "play";
        paused = false;
        pauseButton.style("visibility", "visible");
        exitPauseMenuButton.style("visibility", "hidden");
        mainMenuButton.style("visibility", "hidden");
        replayButton.style("visibility", "hidden");
        soundButton.style("visibility", "hidden");
        soundButton1.style("visibility", "hidden");
        soundButton2.style("visibility", "hidden");
        click.play();
    })

    settingsButton = createButton("⚙");
    settingsButton.position(20, 20);
    settingsButton.id("setting");
    settingsButton.mousePressed(function () {
        startButton.style("visibility", "hidden");
        junkStoreButton.style("visibility", "hidden");
        settingsButton.style("visibility", "hidden");
        exitSettingsButton.style("visibility", "visible");
        soundButton.style("visibility", "visible");
        gamestate = "settings";

    });

    exitSettingsButton = createButton("❌");
    exitSettingsButton.id("pause");

    exitSettingsButton.style("visibility", "hidden");
    exitSettingsButton.mousePressed(function () {
        gamestate = "start";
        settingsButton.style("visibility", "visible");
        exitSettingsButton.style("visibility", "hidden");
        soundButton.style("visibility", "hidden");
        soundButton1.style("visibility", "hidden");
        soundButton2.style("visibility", "hidden");
        para.style("visibility", "hidden");
        para2.style("visibility", "hidden");

        click.play();
    });

    soundButton = createButton("🔈");

    soundButton.id("pause");
    soundButton.style("visibility", "hidden");
    soundButton.mousePressed(function () {
        //gamestate = "sound";
        if (gamestate === "sound") {
            // alert("ok");
            gamestate = preState;
            soundButton1.style("visibility", "hidden");
            soundButton2.style("visibility", "hidden");
        }
        else if (gamestate === "settings" || gamestate === "pause" || gamestate === "over" || gamestate === "loose") {
            preState = gamestate;
            gamestate = "sound";

        }

        //displaySoundMenu();

        click.play();
    })

    soundButton1 = createButton("Background");
    soundButton1.class("sound");
    soundButton1.style("visibility", "hidden");
    soundButton1.mousePressed(function () {
        if (volume === 0) {
            if (database != undefined) {
                database.ref("/").update({
                    "volume": 0.08
                })
            }



        } else if (volume === 0.08) {
            if (database != undefined) {
                database.ref("/").update({
                    "volume": 0
                })
            }

        }
        click.play();
    })
    soundButton2 = createButton("Effects");

    soundButton2.class("sound");
    soundButton2.style("visibility", "hidden");
    soundButton2.mousePressed(function () {

        if (volume2 === 0) {
            if (database != undefined) {
                database.ref("/").update({
                    "volume2": 1
                })
            }

        } else if (volume2 === 1) {
            if (database != undefined) {
                database.ref("/").update({
                    "volume2": 0
                })
            }
        }
        click.play();
    })
    para = createP("Help the slum hero to collect all the <br>garbage.Swipe your finger to control <br>the hero and try to catch all the garbage.  ");
    para.position(85, 300);
    para.style("visibility", "hidden");
    para2 = createP("Warning!!! Do not catch the toxic waste<br> as they are harmfull.They are always <br>bounded by a red boundary");
    para2.position(85, 400);
    para2.style("visibility", "hidden");
}


function createSprites() {

    dustbin = createSprite(width / 2 - 50, height - 90, 100, 10);
    dustbin.addImage("organic", green);
    dustbin.addImage("paper", yellow);
    dustbin.addImage("glass", blue);
    dustbin.addImage("metal", grey);
    dustbin.addImage("plastic", pink);
    dustbin.addAnimation("toxic", destroyed);
    dustbin.addImage
    dustbin.addImage("binLeft", binLeft);
    dustbin.scale = 0.3;
    dustbin.setCollider("rectangle", 0, 0, 250, 250);
    wheel = createSprite(dustbin.x - 13, dustbin.y + 56);
    wheel.addImage("wheel", wheelImg);
    wheel.scale = 0.3;


    heroImg2.frameDelay = 4;
    heroImg5.frameDelay = 5;
    hero = createSprite(130, dustbin.y - 40, 100, 10);
    hero.addAnimation("standing1", heroImg1);
    hero.addAnimation("standing2", heroImg2);
    hero.addAnimation("walkingb", heroImg6);
    hero.addAnimation("walkingf", heroImg5);
    hero.addAnimation("blink", heroImg3);
    hero.addAnimation("stare", heroImg4);
    hero.scale = 0.3;

    ground = createSprite(width / 2, hero.y + 100, width, 10);
    ground.visible = false;

    roof = createSprite(width / 2, 100, width, 1);
    roof.visible = false;


    barFace = createSprite(350, 50);
    barFace.addAnimation("1", faceBlink1);
    barFace.scale = 0.22;
    barFace.addAnimation("2", faceBlink2);
    barFace.addAnimation("3", faceBlink3);


}

function getRandomNo(minRange, maxRange) {

    start: while (true) {
        var randomNo = Math.round(random(minRange, maxRange));
        if (randomNo === previousNo) {
            continue start
        } break;
    }
    previousNo = randomNo;
    return (randomNo);

}
function displayMiniMenu() {
    rectMode(CENTER);
    var x = width / 2 - 110;
    var y = height / 2 - 170;
    fill("#fbe843");
    stroke("#13316c");
    rect(width / 2, height / 2 - 70, 300, 380);
    fill("#13316c");
    textSize(30);
    strokeWeight(1);
    text("Game paused", width / 2 - 120, y - 50);
    textSize(20);
    text("Collected : " + collected + "/" + totalDrop, x, y);
    text("Score : " + score, x, y + 30);
    text("Highscore : " + highscore, x, y + 60);
    text("Plastic caught : " + plastic, x, y + 90);
    text("Glass caught : " + glass, x, y + 120);
    text("Metal caught : " + metal, x, y + 150);
    text("Paper caught : " + paper, x, y + 180);
    text("Organic caught : " + organic, x, y + 210);

    mainMenuButton.style("visibility", "visible");
    replayButton.style("visibility", "visible");
    exitPauseMenuButton.style("visibility", "visible");

    soundButton.position(width / 2 + 90, y - 75);
    soundButton1.position(soundButton.x + 10, soundButton.y + 30);
    soundButton2.position(soundButton.x + 10, soundButton.y + 60);
    exitPauseMenuButton.position(soundButton.x + 40, soundButton.y);
    mainMenuButton.position(width / 2 - 130, height / 2 + 90);
    replayButton.position(width / 2 + 20, height / 2 + 90);

}

function displaySettingsMenu() {
    rectMode(CENTER);
    fill("#fbe843");
    stroke("#13316c");
    strokeWeight(2);
    rect(width / 2, height / 2 - 20, 300, 400);
    fill("#ffffff");
    rect(width / 2, height / 2 + 60, 270, 200);
    noStroke();
    fill("#13316c");
    text("Sound", soundButton.x + 40, soundButton.y + 5);
    textSize(40);
    text("Settings", width / 2 - 80, exitSettingsButton.y + 30);
    soundButton.position(width / 2 - 60, height / 2 - 120);
    soundButton1.position(soundButton.x + 10, soundButton.y + 30);
    soundButton2.position(soundButton.x + 10, soundButton.y + 60);
    exitSettingsButton.position((width / 2) + 125, height / 2 - 205);
    stat = "mute";
    stat2 = "mute";
    textSize(15);
    if (volume === 0) {
        stat = "Unmute"
    } else if (volume === 0.08) {
        stat = "Mute"
    }
    if (volume2 === 0) {
        stat2 = "Unmute"
    } else if (volume2 === 1) {
        stat2 = "Mute"
    }
    text("How to play :", soundButton.x - 70, height / 2 - 20);
    textSize(13);
    // text("Help the slum hero to collect all the garbage.", 75, 320);
    // text("Use your finger to control the hero and try ")
    para.position(soundButton.x - 60, height / 2 - 20);
    para2.position(para.x, para.y + 100)
    para.style("visibility", "visible");
    para2.style("visibility", "visible");
}



function reset() {
    garbageGroup = createGroup();
    toxicGroup = createGroup();
    typeList = [];

    totalGarbage = 0;
    score = 0;
    organic = 0;
    glass = 0;
    metal = 0;
    paper = 0;
    plastic = 0;
    collected = 0;
    destroyCount = 0;

    p1 = p2 = p3 = p4 = false;
}


function displaySoundMenu() {
    //rect(100, 100, 100, 100);
    //   alert("working");
    soundButton1.style("visibility", "visible");
    soundButton2.style("visibility", "visible");
    // if (volume === 0) {
    //     soundButton1.style('background-color', '#ff0000');
    // } if (volume2 === 1) { soundButton1.style('background-color', '#2aff00'); }
}



function setButtonColour() {
    if (volume === 0.08) {
        soundButton1.style('background-color', '#ffffff');
    } if (volume === 0) {
        soundButton1.style('background-color', '#ff0000');
    }
    if (volume2 === 1) {
        soundButton2.style('background-color', '#ffffff');
    } if (volume2 === 0) {
        soundButton2.style('background-color', '#ff0000');
    }
}
function displayOverMenu() {

    var x = width / 2 - 110;
    var y = height / 2 - 150;
    fill("#fbe843");
    stroke("#13316c");
    rect(width / 2, height / 2 - 70, 300, 380);
    fill("#13316c");
    textSize(50);
    strokeWeight(1);
    text("Drop over", width / 2 - 120, y - 50);
    textSize(20);
    text("Collected : " + collected + "/" + totalDrop, x, y);
    text("Score : " + score, x, y + 30);
    text("Highscore : " + highscore, x, y + 60);
    text("Plastic caught : " + plastic, x, y + 90);
    text("Glass caught : " + glass, x, y + 120);
    text("Metal caught : " + metal, x, y + 150);
    text("Paper caught : " + paper, x, y + 180);
    text("Organic caught : " + organic, x, y + 210);

    mainMenuButton.style("visibility", "visible");
    replayButton.style("visibility", "visible");
    mainMenuButton.position(width / 2 - 130, height / 2 + 90);
    replayButton.position(width / 2 + 20, height / 2 + 90);

    soundButton.style("visibility", "visible");
    soundButton.position(width / 2 + 120, y - 95);
    soundButton1.position(soundButton.x - 5, soundButton.y + 30);
    soundButton2.position(soundButton.x, soundButton.y + 60);
}
function displayLooserMenu() {
    var x = width / 2 - 110;
    var y = height / 2 - 150;
    fill("#fbe843");
    stroke("#13316c");
    rect(width / 2, height / 2 - 70, 300, 380);
    fill("#13316c");
    textSize(50);
    strokeWeight(1);
    text("Lives over", width / 2 - 120, y - 50);
    textSize(20);
    text("Collected : " + collected + "/" + totalDrop, x, y);
    text("Score : " + score, x, y + 30);
    text("Highscore : " + highscore, x, y + 60);
    text("Plastic caught : " + plastic, x, y + 90);
    text("Glass caught : " + glass, x, y + 120);
    text("Metal caught : " + metal, x, y + 150);
    text("Paper caught : " + paper, x, y + 180);
    text("Organic caught : " + organic, x, y + 210);

    mainMenuButton.style("visibility", "visible");
    replayButton.style("visibility", "visible");

    soundButton.style("visibility", "visible");
    soundButton.position(width / 2 + 120, y - 95);
    soundButton1.position(soundButton.x - 5, soundButton.y + 30);
    soundButton2.position(soundButton.x, soundButton.y + 60);

    mainMenuButton.position(width / 2 - 130, height / 2 + 90);
    replayButton.position(width / 2 + 20, height / 2 + 90);
}


