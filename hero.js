function catchGarbage() {
    for (var i = 0; i <= garbageGroup.length; i++) {
        var temp = garbageGroup.get(i);
        //console.log(i);
        //  temp.collide(ground);
        if (temp !== undefined) {
            // temp.collide(ground);
            if (temp.y >= 450) {
                temp.rotationSpeed = 0;
            }
            if (temp.isTouching(ground)) {

                temp.velocityY = 0;
                function destroyTemp() {
                    if (temp !== undefined) {
                        temp.destroy();
                    }
                }
                setTimeout(destroyTemp, 1000);



                // console.log(temp)
                if (temp.isTouching(ground) === false) {
                    totalGarbage++;
                }
            }
        }
        if (temp !== undefined && temp.isTouching(dustbin)) {
            var type = typeList[i];
            temp.destroy();
            dustbin.changeImage(type);
            if (!temp.isTouching(dustbin)) {
                collected++;
                totalGarbage++;
                score = score + 2;
                ting.play();
                if (type === "plastic") {

                    plastic++;
                }
                if (type === "glass") {

                    glass++;
                }
                if (type === "metal") {

                    metal++;
                }
                if (type === "paper") {

                    paper++;
                }
                if (type === "organic") {


                    organic++;
                }

            }
        }
        // if (temp !== undefined) {
        //     if (temp.isTouching(roof)) {
        //         // alert("touching");
        //         temp.velocityY = 0;
        //     }
        // }
    }

}
function setHeroBehaviour() {
    if (frameCount % 20 === 0) {
        var rand = Math.round(random(1, 14));
        if (rand % 6 === 0) {
            //  hero.changeAnimation("standing2");
            blink();
        } else if (rand % 5 === 0) {
            stare();
        } else {
            hero.changeAnimation("standing1")
        }
    }
}
function blink() {
    hero.changeAnimation("blink");
}


function stare() {
    hero.changeAnimation("stare");
}

function dustbinControl() {
    //  dustbin.x = World.mouseX;
    wheel.x = dustbin.x - 13
    hero.x = dustbin.x - 70;

    if (keyDown(RIGHT_ARROW)) {
        dustbin.velocityX = 7;
        wheel.rotationSpeed = 9;
        hero.changeAnimation("walkingf");
    } else {
        setHeroBehaviour();
    }
    if (keyWentUp(RIGHT_ARROW)) {
        dustbin.velocityX = 0;
        wheel.rotationSpeed = 0;

    }
    if (keyDown(LEFT_ARROW)) {
        dustbin.velocityX = -7;
        //  wheel.velocityX = -7;
        wheel.rotationSpeed = -9;
        hero.changeAnimation("walkingb");
    } else {
        setHeroBehaviour();
    }
    if (keyWentUp(LEFT_ARROW)) {
        dustbin.velocityX = 0;
        //   wheel.velocityX = 0;
        wheel.rotationSpeed = 0;

    }
    if (dustbin.x > width / 2 + 200) {
        dustbin.x = width / 2 + 199;
        wheel.rotationSpeed = 0;
        wheel.velocityX = 0;
    } else if (dustbin.x < width / 2 - 200) {
        dustbin.x = width / 2 - 199;
        wheel.rotationSpeed = 0;
        wheel.velocityX = 0;
    }

}
function mouseControl() {
    dustbin.x = newX;
    wheel.x = dustbin.x - 13
    hero.x = dustbin.x - 70;
    // dustbin.x = World.mouseX
    // wheel.x = dustbin.x - 13
    // hero.x = dustbin.x - 70;
    // // console.log("#", dustbin.velocityX);
    // if (dustbin.velocityX < 0) {
    //     // dustbin.velocityX = -7;
    //     wheel.rotationSpeed = -9;
    //     hero.changeAnimation("walkingb");
    // } if (dustbin.velocityX === 0) {
    //     //  dustbin.velocityX = 0;
    //     setHeroBehaviour();
    // } if (dustbin.velocityX > 0) {
    //     //  dustbin.velocityX = -7;
    //     wheel.rotationSpeed = 9;
    //     hero.changeAnimation("walkingf");
    // }

    // if (dustbin.x < 200) {
    //     // dustbin.velocityX = -7;
    //     wheel.rotationSpeed = -9;
    //     hero.changeAnimation("walkingb");
    // } if (dustbin.x === 0) {
    //     //  dustbin.velocityX = 0;
    //     wheel.rotationSpeed = 0;
    //     setHeroBehaviour();
    // } if (dustbin.x > 200) {
    //     //  dustbin.velocityX = -7;
    //     wheel.rotationSpeed = 9;
    //     hero.changeAnimation("walkingf");
    // }

}

function getDirection() {
    var first = touches[0];
    var last = touches[touches.length - 1];
    var diff = last - first;
    if (diff < 0) {
        return ("left");
    } else if (diff > 0) {
        return ("right");
    } else if (diff = 0) {
        return ("no direction");
    }
}

function swipeControl() {
    var direction = getDirection();
    if (direction = "left") {
        dustbin.velocityX = 7;
        wheel.rotationSpeed = 9;
        hero.changeAnimation("walkingf");
        touches = [];
    } else if (direction = "right") {
        dustbin.velocityX = -7;
        //  wheel.velocityX = -7;
        wheel.rotationSpeed = -9;
        hero.changeAnimation("walkingb");
        touches = [];
    } else if (direction = "no direction") {
        dustbin.velocityX = 0;
        wheel.rotationSpeed = 0;
        setHeroBehaviour();
        touches = [];
    }
}



