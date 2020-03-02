var balcony1, balcony2, balcony3, balcony4;
var dustbin, garbageGroup, collected, typeList, organic, glass, metal, paper, plastic;
var canvas;
var toxicGroup;
var barFace;
// var bin, green, binLeft, wheel, wheelImg;
// var bottleImg, jarImg, canImg, cupImg;
var ground;
var gamestate;
var startButton, storeButton;
var welcomePlayed = false;
var replayButton, homeButton;
var pauseButton, soundButton, settingsButton, exitPauseMenuButton, exitSettingsButton, deviceModeButton;
var previousNo = 0;
var paused = false;
var totalDrop = 10;
var totalGarbage = 0;
var gcircleGroup;
var p1 = p2 = p3 = p4 = false;
var volume = 0;
var volume2 = 1;
var soundButton1, soundButton2;
var highscore = 0;

var preState;
var database;
var stat, stat2;
var para, para2;
var battery;

var width, height;
var destroyCount = 0;

var roof;
var deviceMode = "💻";
function preload() {
    bottleImg = loadImage("bottle.png");
    bagImg = loadImage("bag.png");
    bottle2Img = loadImage("bottle2.png");
    bag2Img = loadImage("bag2.png");
    jarImg = loadImage("jar.png");
    jar2Img = loadImage("jar2.png");
    glassBottle = loadImage("glassBottle.png");
    glassImg = loadImage("glass.png");
    bulb = loadImage("bulb.png");
    canImg = loadImage("can.png");
    can3Img = loadImage("sodaCan.png");
    can2Img = loadImage("tinCan.png");
    spoon = loadImage("spoon.png");
    fork = loadImage("fork.png");
    cupImg = loadImage("cup.png");
    cup2Img = loadImage("cup2.png");
    bananaImg = loadImage("banana.png");
    appleImg = loadImage("apple.png");
    fish = loadImage("fish.png");

    toxicImg = loadImage("acid.png");
    battery = loadImage("battery.png");


    green = loadImage("rightBin.png");
    blue = loadImage("glassBin.png");
    pink = loadImage("plastic.png");
    grey = loadImage("metal.png");
    yellow = loadImage("paper.png");
    binLeft = loadImage("leftBin.png");
    destroyed = loadAnimation("rightBin.png", "glassBin.png", "plastic.png", "metal.png", "paper.png");

    wheelImg = loadImage("wheel.png");

    gcircleImg = loadAnimation("c1.png", "c3.png", "c2.png", "c3.png");



    faceBlink1 = loadAnimation("face1.png", "face1.png", "face2.png", "face1.png");
    faceBlink2 = loadAnimation("face4.png", "face4.png", "face3.png", "face4.png");
    faceBlink3 = loadAnimation("face5.png", "face5.png", "face6.png", "face4.png");

    heroImg1 = loadAnimation("4.png");
    heroImg2 = loadAnimation("1.png", "2.png", "3.png", "4.png");
    heroImg3 = loadAnimation("1.png", "2.png", "1.png", "2.png", "4.png")
    heroImg4 = loadAnimation("1.png", "4.png", "5.png", "6.png");
    heroImg5 = loadAnimation("step4.png", "step1.png", "step2.png", "step3.png");
    heroImg6 = loadAnimation("step4.png", "step3.png", "step2.png", "step1.png");



    bubble = loadImage("speechBubble.png");
    click = loadSound("click.wav");
    welcome = loadSound('welcome.wav');

    logo = loadImage("logo.png");
    swoosh = loadSound("swoosh.wav");

    backgroundSound = loadSound("bg.wav");
    wooho = loadSound("wooho.wav");


    faceImg = loadAnimation("face7.png");


    trackImg = loadImage("track.png");
    o_ou = loadSound("o ou.wav");
    dada = loadSound("da da da.wav");
    ting = loadSound("ting.wav");
    tutu = loadSound("tutu.wav");
    bin = loadImage("bin.png");

    dump = loadImage("dump.png");

}


function setup() {
    canvas = createCanvas(width, height);

    width = displayWidth;
    height = 630;



    database = firebase.database();
    backgroundSound.loop();



    // var slider = createSlider();
    createButtons();
    garbageGroup = createGroup();
    toxicGroup = createGroup();
    gcircleGroup = createGroup();
    createSprites();
    collected = 0;
    score = 0;
    organic = 0
    glass = 0;
    metal = 0;
    paper = 0;
    plastic = 0;
    typeList = [];
    gamestate = "start";

    if (database != undefined) {
        var volumeRef = database.ref("volume").on("value", function (data) {
            volume = data.val();
        })
        var volume2Ref = database.ref("volume2").on("value", function (data) {
            volume2 = data.val();
        })
        var highScoreRef = database.ref("highscore").on("value", function (data) {
            highscore = data.val();
        })
    }
}


function draw() {
    console.log(touches)
    barFace.visible = false;
    backgroundSound.setVolume(volume);
    setEfxVolume();
    setButtonColour();
    setScore();
    setHeroBehaviour();
    // console.log(gamestate);

    width = displayWidth;
    height = 555;
    dustbin.y = height - 70;
    dustbin.velocityX = 0;
    hero.y = dustbin.y - 40;
    wheel.y = dustbin.y + 56;
    ground.y = hero.y + 100;
    wheel.x = dustbin.x - 13;

    resizeCanvas(width, height);

    console.log(deviceMode);

    if (!paused) {
        // function gator() { alert('Alligator!!!!'); } setTimeout(gator, 7000);
        background("#cef4ff");
        rectMode(CENTER);
        noFill();
        strokeWeight(2);
        stroke(0);
        rect(width / 2, height / 2, 400, height);
        noStroke();
        fill("grey")
        rect(width / 2, hero.y + 90, width, 10);

        catchGarbage();
        // console.log(startButton.width, storeButton.width);
        if (gamestate === "start") {
            startButton.position(((width - 100) / 2), ((height / 4) - 35));
            storeButton.position(((width - 100) / 2), ((height / 4) + 3));
            dustbin.x = width / 2 - 50;
            wheel.x = dustbin.x - 13
            hero.x = dustbin.x - 70;
            imageMode(CENTER);
            startButton.style("visibility", "visible");
            storeButton.style("visibility", "visible");
            image(logo, width / 2, 50, 260, 80);
            setHeroBehaviour();
            textSize(12);
            if (frameCount >= 60) {
                fill(0);
                image(bubble, hero.x + 100, hero.y - 160, 300, 160);
                text("Welcome to the slum", hero.x - 20, hero.y - 195);
                if (frameCount >= 80) {
                    if (welcomePlayed === false) {
                        welcome.setVolume(volume2);
                        welcome.play();
                        welcomePlayed = true;
                    }

                    if (frameCount >= 160) {
                        text("Click 'PLAY' to start catching junk drops ", hero.x - 20, hero.y - 175);
                        if (frameCount >= 220) {
                            text("Or click 'JUNK STORE' to visit 'kabadiwala'", hero.x - 20, hero.y - 155)
                        }
                    }
                }
            }

        }
        if (gamestate === "play") {
            spawnGarbage(15, 15);
            // dustbinControl();
            // mouseControl();
            setControls();
            // swipeControl();
            createToxic(180, 9);
            scoreDisplay();
            showStarBar();

            // soundPlay();
            if (garbageGroup.length >= totalDrop) {
                setTimeout(over, 3000);
                pauseButton.style("visibility", "hidden");
                //gamestate = "over"
            } if (destroyCount >= 3) {
                setTimeout(loose, 1000);
                pauseButton.style("visibility", "hidden");
            }

            // for (var i = 0; i <= garbageGroup.length; i++) {
            //     var temp = garbageGroup.get(i);
            //     if (temp !== undefined) {
            //         if (temp.lifetime = 0) {
            //             gamestate = "over"
            //         }
            //     }

            // }
        } if (gamestate === "pause") {
            displayMiniMenu();
        } if (gamestate === "settings") {
            displaySettingsMenu();
        } if (gamestate === "loose") {
            displayLooserMenu();
            dustbin.velocityX = 0;
        }
        if (gamestate === "sound") {
            displaySoundMenu();
            if (preState === "settings") {
                // alert("working")
                displaySettingsMenu();
                text(stat, soundButton.x + 110, soundButton1.y + 13);
                text(stat2, soundButton.x + 110, soundButton2.y + 13);
            } else if (preState === "over") {
                displayOverMenu()
            } else if (preState === "loose") {
                displayLooserMenu();
            }
        }

        if (gamestate === "over") {
            if (p4 === false) {
                dada.play();
                p4 = true;
            }

            setHeroBehaviour();
            // mouseControl();
            // toxicGroup.destroy()
            displayOverMenu();
            replayButton.style("visibility", "visible");
            homeButton.style("visibility", "visible");
        }

        if (gamestate === "junkPlay") {
            for (var i = 0; i <= 5; i++) {
                var x = i + i * 66;

                imageMode(CORNER);
                image(trackImg, x, 0, 65, 660)
            }
        }

        drawSprites();
        //   console.log(plastic, glass, metal, paper, organic);

    }
    if (paused) {
        background("#cef4ff");
        rectMode(CENTER);
        noFill();
        strokeWeight(2);
        stroke(0);
        rect(width / 2, height / 2, 400, height);
        displayMiniMenu();
        noStroke();
        fill("grey")
        rect(width / 2, hero.y + 90, width, 10);
        if (gamestate === "sound") {
            displaySoundMenu();
            //  displayMiniMenu();
        }
    }

}


function showStarBar() {
    barFace.visible = true;
    noFill()
    stroke("black");
    strokeWeight(2);
    rect(width / 2, 50, 300, 20);
    // fill("yellow");
    rectMode(CORNER);
    noStroke();
    getBarFace();
    // console.log(calculateBarWidth());
    rect(width / 2 - 150, 42, calculateBarWidth(), 16);
    barFace.x = calculateBarWidth() + (width / 2 - 160);

    //  fill("green");
    stroke("black");
    strokeWeight(2);
    line(width / 2 - 90, 42, width / 2 - 90, 58);
    line(width / 2 + 20, 42, width / 2 + 20, 58);

    rectMode(CENTER);
    noStroke();
}

function calculateBarWidth() {
    var width = 1;
    if (collected != 0) {
        width = collected / totalDrop * 300;
    }
    return (width);
}
function getBarFace() {
    barFace.addAnimation("4", faceImg);
    if (calculateBarWidth() <= 300 && calculateBarWidth() > 154) {

        function change() { barFace.changeAnimation("3"); } setTimeout(change, 300);
        fill("#8ee990");
        // if (p3 === false) {
        //     wooho.play();
        //     barFace.changeAnimation("4");
        //     p3 = true;
        // }
    } else if (calculateBarWidth() <= 152 && calculateBarWidth() > 52) {
        function change() { barFace.changeAnimation("2"); } setTimeout(change, 300);
        fill("yellow");
        if (p2 === false) {
            wooho.play();
            p2 = true;
        }
    } else if (calculateBarWidth() <= 50) {
        barFace.changeAnimation("1");
        fill("#f37641");
        //  barFace.changeAnimation("4");

    }
    if (calculateBarWidth() === 300) {
        if (p3 === false) {
            wooho.play();
            p3 = true;
        }
        //  wooho.play();
        barFace.changeAnimation("4");
    }
}
function over() {
    gamestate = "over";
    toxicGroup.destroyEach();
    gcircleGroup.destroyEach();
    //  alert("wooho");
} function loose() {
    gamestate = "loose";
    toxicGroup.destroyEach();
    gcircleGroup.destroyEach();
    //  alert("wooho");
}

function setEfxVolume() {
    welcome.setVolume(volume2);
    o_ou.setVolume(volume2);
    dada.setVolume(volume2);
    ting.setVolume(volume2);
    click.setVolume(volume2);
    wooho.setVolume(volume2);
    swoosh.setVolume(volume2);
    tutu.setVolume(volume2);
}

function setScore() {
    if (score > highscore) {
        highscore = score;
        if (database != undefined) {
            database.ref("/").update({
                "highscore": score
            })
        }
    }
    if (database !== undefined) {
        database.ref("/").update({
            "lastScore": score
        })

    }
}
