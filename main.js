const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#333333',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let drillBit;
let cursors;
let formationZone;
let zoneMinY = 200;
let zoneMaxY = 400;
let faultTimer = 0;
let speed = 100;
let maxSpeed = 300;
let torqueThreshold = 250;
let mudLevel = 50;
let maxMud = 100;
let minMud = 10;

function preload() {
    this.load.image('drill', 'path_to_drill_image.png');
}

function create() {
    formationZone = this.add.rectangle(400, (zoneMinY + zoneMaxY) / 2, 800, zoneMaxY - zoneMinY, 0x00ff00);
    drillBit = this.physics.add.sprite(400, 300, 'drill');
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
    if (cursors.left.isDown) {
        speed = Phaser.Math.Clamp(speed - 2, 50, maxSpeed);
    }
    if (cursors.right.isDown) {
        speed = Phaser.Math.Clamp(speed + 2, 50, maxSpeed);
    }
    if (cursors.up.isDown) {
        drillBit.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        drillBit.setVelocityY(speed);
    } else {
        drillBit.setVelocityY(0);
    }
    if (speed > torqueThreshold) {
        console.log('Torque issues! Slow down!');
    }
    faultTimer += delta;
    if (faultTimer > 5000) {
        shiftFormationZone();
        faultTimer = 0;
    }
    if (drillBit.y < zoneMinY || drillBit.y > zoneMaxY) {
        console.log('Out of Zone!');
    }
    if (cursors.space.isDown) {
        mudLevel = Phaser.Math.Clamp(mudLevel + 1, minMud, maxMud);
    }
    if (mudLevel < minMud || mudLevel > maxMud) {
        console.log('Mud level out of range! Adjust mud levels!');
    }
}

function shiftFormationZone() {
    let shiftAmount = Phaser.Math.Between(-100, 100);
    zoneMinY += shiftAmount;
    zoneMaxY += shiftAmount;
    zoneMinY = Phaser.Math.Clamp(zoneMinY, 50, 500);
    zoneMaxY = Phaser.Math.Clamp(zoneMaxY, zoneMinY + 100, zoneMinY + 200);
    formationZone.y = (zoneMinY + zoneMaxY) / 2;
    formationZone.height = zoneMaxY - zoneMinY;
}
