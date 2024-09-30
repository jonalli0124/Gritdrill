const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',  // Dark gray background
    scene: {
        create: create
    }
};

const game = new Phaser.Game(config);

function create() {
    this.add.text(200, 300, 'Phaser is working!', { fontSize: '32px', fill: '#fff' });
}
