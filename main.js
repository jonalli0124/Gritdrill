let footageDrilled = 0;
let inZoneDrilled = 0;
let torque = 0;
let speed = 0;
let mudWeight = 50;
let gameStarted = false;
let startButton;
let footageText, inZoneText, torqueText, speedText, mudText;

function preload() {
    this.load.image('drill1', './Drill1.png');
    this.load.image('drill2', './Drill2.png');
    this.load.image('drill3', './Drill3.png');
    this.load.image('drill4', './Drill4.png');
    this.load.image('drill5', './Drill5.png');
    this.load.image('startButton', './startbutton.png');
}

function create() {
    // Add a start button
    startButton = this.add.sprite(400, 300, 'startButton').setInteractive();
    
    // Set up button click
    startButton.on('pointerdown', () => {
        startButton.setVisible(false);  // Hide start button once clicked
        gameStarted = true;             // Begin game
    });

    // Ensure the start button is visible with a light background
    this.cameras.main.setBackgroundColor('#e0e0e0');

    // Add the formation zone
    formationZone = this.add.rectangle(400, 300, 800, 200, 0x00ff00);  // Bright green for visibility

    // Add the drill bit
    drillBit = this.physics.add.sprite(400, 300, 'drill1');

    // Create animation
    this.anims.create({
        key: 'drilling',
        frames: [
            { key: 'drill1' },
            { key: 'drill2' },
            { key: 'drill3' },
            { key: 'drill4' },
            { key: 'drill5' }
        ],
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // Add text elements for metrics in visible color
    footageText = this.add.text(10, 10, 'Footage Drilled: 0 ft', { fontSize: '16px', fill: '#000' });  // Black text
    inZoneText = this.add.text(10, 30, 'In-Zone Footage: 0 ft', { fontSize: '16px', fill: '#000' });
    torqueText = this.add.text(10, 50, 'Torque: 0', { fontSize: '16px', fill: '#000' });
    speedText = this.add.text(10, 70, 'Speed: 0 ft/hr', { fontSize: '16px', fill: '#000' });
    mudText = this.add.text(10, 90, 'Mud Weight: 50', { fontSize: '16px', fill: '#000' });
}

function update(time, delta) {
    if (!gameStarted) return;  // Do nothing until the game is started

    // Handle movement
    if (cursors.up.isDown) {
        drillBit.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        drillBit.setVelocityY(speed);
    } else {
        drillBit.setVelocityY(0);
    }

    // Calculate speed and footage drilled
    speed = Phaser.Math.Clamp(speed, 50, 300);  // Adjusted speed range
    footageDrilled += speed * delta / 3600;  // Convert time to hours for ft/hr

    // Check if the drill is in the zone
    if (drillBit.y > 200 && drillBit.y < 400) {
        inZoneDrilled += speed * delta / 3600;
    }

    // Adjust torque based on speed
    torque = speed > 250 ? speed - 250 : 0;

    // Mud management (space key to adjust mud)
    if (cursors.space.isDown) {
        mudWeight = Phaser.Math.Clamp(mudWeight + 0.1, 30, 100);  // Mud adjustment
    }

    // Update text elements with the latest values
    footageText.setText('Footage Drilled: ' + footageDrilled.toFixed(2) + ' ft');
    inZoneText.setText('In-Zone Footage: ' + inZoneDrilled.toFixed(2) + ' ft');
    torqueText.setText('Torque: ' + torque.toFixed(2));
    speedText.setText('Speed: ' + speed.toFixed(2) + ' ft/hr');
    mudText.setText('Mud Weight: ' + mudWeight.toFixed(2));
}
