enchant();

window.onload = function(){
	var core = new Core(320, 320);
	core.preload('chara1.png', 'bg.png');
	core.fps = 10;
	core.onload = function(){
		var Bear = Class.create(Sprite, {
			initialize: function(x, y, frame){
				Sprite.call(this, 32, 32);
				this.x = x;
				this.y = y;
				this.image = core.assets['chara1.png'];
				this.frame = frame;
				core.rootScene.addChild(this);
			}
		});
		var label = new Label();
		label.x = 280;
		label.y = 5;
		label.color = 'red';
		label.font = '14px "Arial"';
		label.text = '0';
		core.rootScene.addChild(label);

		var gameOverScene = new Scene();
		gameOverScene.backgroundColor = 'black';

		var bg = new Sprite(320, 320);
		bg.image = core.assets['bg.png']
		bg.x = 0;
		bg.y = 0;
		core.rootScene.addChild(bg);

		var bear = new Bear(0, 250, 0);
		var bear2 = new Bear(200, 250, 5)
		bear.on('enterframe', function(){
			this.frame = this.age % 3;

			if(this.within(bear2, 10)){
				core.pushScene(gameOverScene);
				core.stop();
			}

		});
		core.rootScene.on('touchstart', function(){
			bear.tl.moveBy(0, -50, 5, enchant.Easing.CUBIC_EASEOUT)
				.moveBy(0, 50, 5, enchant.Easing.CUBIC_EASEOUT);
		});
		bear2.on('enterframe', function(){
			this.x -= 10;
		})
	};
	core.start();
};
