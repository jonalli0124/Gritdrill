let footageDrilled = 0;
let inZoneDrilled = 0;
let torque = 0;
let speed = 0;
let mudWeight = 50;
let footageText, inZoneText, torqueText, speedText, mudText;

function preload() {
    // Load the drill bit images
    this.load.image('drill1', './Drill1.png');
    this.load.image('drill2', './Drill2.png');
    this.load.image('drill3', './Drill3.png');
    this.load.image('drill4', './Drill4.png');
    this.load.image('drill5', './Drill5.png');
}

function create() {
    // Add a background color for visibility
    this.cameras.main.setBackgroundColor('#e0e0e0');

    // Add the drill bit sprite
    drillBit = this.physics.add.sprite(400, 300, 'drill1');

    // Create animation for the drill bit using frames
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

    // Play the drilling animation
    drillBit.anims.play('drilling');

    cursors = this.input.keyboard.createCursorKeys();

    // Add text elements for metrics
    footageText = this.add.text(10, 10, 'Footage Drilled: 0 ft', { fontSize: '16px', fill: '#000' });
    inZoneText = this.add.text(10, 30, 'In-Zone Footage: 0 ft', { fontSize: '16px', fill: '#000' });
    torqueText = this.add.text(10, 50, 'Torque: 0', { fontSize: '16px', fill: '#000' });
    speedText = this.add.text(10, 70, 'Speed: 0 ft/hr', { fontSize: '16px', fill: '#000' });
    mudText = this.add.text(10, 90, 'Mud Weight: 50', { fontSize: '16px', fill: '#000' });
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

    // Calculate speed and footage drilled
    speed = Phaser.Math.Clamp(speed, 50, 300);  // Adjust speed range as needed
    footageDrilled += speed * delta / 3600;  // Convert time to hours for ft/hr

    // Update text elements with the latest values
    footageText.setText('Footage Drilled: ' + footageDrilled.toFixed(2) + ' ft');
    inZoneText.setText('In-Zone Footage: ' + inZoneDrilled.toFixed(2) + ' ft');
    torqueText.setText('Torque: ' + torque.toFixed(2));
    speedText.setText('Speed: ' + speed.toFixed(2) + ' ft/hr');
    mudText.setText('Mud Weight: ' + mudWeight.toFixed(2));
}
