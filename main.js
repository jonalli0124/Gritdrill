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
    // Load the drill bit frames
    this.load.image('drill1', 'Drill1.png');
    this.load.image('drill2', 'Drill2.png');
    this.load.image('drill3', 'Drill3.png');
    this.load.image('drill4', 'Drill4.png');
    this.load.image('drill5', 'Drill5.png');
}

function create() {
    // Add the drill bit sprite (starting with drill1 frame)
    drillBit = this.physics.add.sprite(400, 300, 'drill1');

    // Create the animation using the frames
    this.anims.create({
        key: 'drilling',
        frames: [
            { key: 'drill1' },
            { key: 'drill2' },
            { key: 'drill3' },
            { key: 'drill4' },
            { key: 'drill5' }
        ],
        frameRate: 10,  // Adjust this value for speed of rotation
        repeat: -1 // Loop indefinitely
    });

    // Start playing the animation
    drillBit.anims.play('drilling');

    // Set up controls for movement
    cursors = this.input.keyboard.createCursorKeys();

    // Add the formation zone
    formationZone = this.add.rectangle(400, (zoneMinY + zoneMaxY) / 2, 800, zoneMaxY - zoneMinY, 0x00ff00);
}

function update(time, delta) {
    // Handle movement
    if (cursors.up.isDown) {
        drillBit.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        drillBit.setVelocityY(speed);
    } else {
        drillBit.setVelocityY(0);
    }

    if (cursors.left.isDown) {
        speed = Phaser.Math.Clamp(speed - 2, 50, maxSpeed);
    }
    if (cursors.right.isDown) {
        speed = Phaser.Math.Clamp(speed + 2, 50, maxSpeed);
    }

    // Check if the drill bit is out of the formation zone
    if (drillBit.y < zoneMinY || drillBit.y > zoneMaxY) {
        console.log('Out of Zone!');
    }

    // Handle faults: shift the formation zone every 5 seconds
    faultTimer += delta;
    if (faultTimer > 5000) {
        shiftFormationZone();
        faultTimer = 0;
    }

    // Mud management (space bar to increase mud level)
    if (cursors.space.isDown) {
        mudLevel = Phaser.Math.Clamp(mudLevel + 1, minMud, maxMud);
    }

    if (mudLevel < minMud || mudLevel > maxMud) {
        console.log('Mud level out of range!');
    }
}

function shiftFormationZone() {
    // Randomly shift the formation zone
    let shiftAmount = Phaser.Math.Between(-100, 100);
    zoneMinY += shiftAmount;
    zoneMaxY += shiftAmount;

    // Keep the zone within bounds
    zoneMinY = Phaser.Math.Clamp(zoneMinY, 50, 500);
    zoneMaxY = Phaser.Math.Clamp(zoneMaxY, zoneMinY + 100, zoneMinY + 200);

    // Update the visual zone
    formationZone.y = (zoneMinY + zoneMaxY) / 2;
    formationZone.height = zoneMaxY - zoneMinY;
}
