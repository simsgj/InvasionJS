/*
 * InvasionJS
 * Copyright (c) 2013 Gwillald, Semche
 * 
 * This software is provided 'as-is', without any express or
 * implied warranty. In no event will the authors be held
 * liable for any damages arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute
 * it freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented;
 *    you must not claim that you wrote the original software.
 *    If you use this software in a product, an acknowledgment
 *    in the product documentation would be appreciated but
 *    is not required.
 * 
 * 2. Altered source versions must be plainly marked as such,
 *    and must not be misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered from any
 *    source distribution.
 */

/*
 * menu screen
 */
game.MenuScreen = me.ScreenObject.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call parent constructor
		this.parent(true);

		// init stuff
		this.title = null;
		this.play = null;
		this.version = null;
	},

	/*
	 * reset function
	 */
	onResetEvent: function()
	{
		// add parallax background
		me.game.add(new BackgroundObject(), 1);

		this.title = me.loader.getImage("title");
		this.play = new Button("play", me.state.PLAY, 280);
		this.version = new me.Font("Verdana", 20, "white");

		me.audio.play("menu_theme");
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// draw title
		context.drawImage(this.title, (me.video.getWidth() / 2 - this.title.width / 2), 100);

		// draw play button
		this.play.draw(context);

		// game version
		var versionSize = this.version.measureText(context, game.data.version);
		this.version.draw(context, game.data.version,
			me.video.getWidth() - versionSize.width - 2, me.video.getHeight() - versionSize.height);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse event
		me.input.releasePointerEvent("mousedown", this.play);

		me.audio.stop("menu_theme");
	}
});

/*
 * play screen
 */
game.PlayScreen = me.ScreenObject.extend(
{
	/*
	 * action to perform when game starts
	 */
	onResetEvent: function()
	{
		// reset the score
		game.data.score = 0;
		game.data.life = 3;

		// add HUD to the game world
		me.game.add(new game.HUD.Container());

		// add parallax background
		me.game.add(new BackgroundObject(), 1);

		// add main player and enemy fleet
		me.game.add(new PlayerEntity(100, 205), 10);
		me.game.add(new EnemyFleet(), 10);

		me.audio.play("game_theme");
	},

    /*
     * action to perform when game is finished (state change)
     */
	onDestroyEvent: function()
	{
		// remove the HUD from the game world
		me.game.remove(me.game.world.getEntityByProp("name", "HUD")[0]);

		me.audio.stop("game_theme");
	}
});

/*
 * game over screen
 */
game.GameOverScreen = me.ScreenObject.extend(
{
	/*
	 * constructor
	 */
	init: function()
	{
		// call parent constructor
		this.parent(true);

		// init stuff
		this.end = null;
		this.score = null;
		this.restart = null;
		this.menu = null;
	},

	/*
	 * reset function
	 */
	onResetEvent: function()
	{
		// add parallax background
		me.game.add(new BackgroundObject(), 1);

		// labels
		this.end = new me.Font("Verdana", 25, "white");
		this.score = new me.Font("Verdana", 22, "white");

		// buttons
		this.restart = new Button("restart", me.state.PLAY, 280);
		this.menu = new Button("menu", me.state.MENU, 330);
	},

	/*
	 * drawing function
	 */
	draw: function(context)
	{
		// draw buttons
		this.restart.draw(context);
		this.menu.draw(context);

		// draw end label
		var endText = "Game over !";
		var endSize = this.end.measureText(context, endText);

		this.end.draw(context, endText,
			me.video.getWidth() / 2 - endSize.width / 2, 120);

		// draw score label
		var scoreText = "Score : " + game.data.score;
		var scoreSize = this.score.measureText(context, scoreText);

		this.score.draw(context, scoreText,
			me.video.getWidth() / 2 - scoreSize.width / 2, 150);
	},

	/*
	 * destroy event function
	 */
	onDestroyEvent: function()
	{
		// release mouse event
		me.input.releasePointerEvent("mousedown", this.restart);
		me.input.releasePointerEvent("mousedown", this.menu);
	}
});
