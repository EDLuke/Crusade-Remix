//Constant values for individual sprite's width and height
var SP_LENGTH = 16;

//Canvas
var canvas; //linked to the canvas in index.html page
var stage; //

//Preload
var preloader; //PreloadJS object
var manifest;  //hold the list of files we need to load

//SpriteSheet
var spriteSheet = new Array();
/* 0 Title
 * 1 Start button
 * 2 Credits button
 * 3 Tile
 * 4 Floor
 * 5 Wall
 * 6 Door0
 * 7 Door1
 * 8 Player0
 * 9 Player1
 * 10 Enemy0
 * 11 Enemy1
 */

//TitleView
var titleBg; //Title
var startBtn; //The start button in the main menu
var creditsBtn; //The credits button in the main menu
var titleView = new createjs.Container();

//GameView


function main() {
    /* Link Canvas*/
    canvas = document.getElementById('mainGame');
    stage = new createjs.Stage(canvas);
    stage.mouseEventsEnabled = true;

    preload();
}

function preload() {
    console.log("Preloading");

    manifest = [
        {src: "sprites/ui/title.png", id: "titleBg"},
        {src: "sprites/ui/startBtn.png", id: "startBtn"},
        {src: "sprites/ui/creditsBtn.png", id: "creditsBtn"},
        {src: "sprites/tiles/Tile.png", id: "tile"},
        {src: "sprites/tiles/Floor.png", id: "floor"},
        {src: "sprites/tiles/Wall.png", id: "wall"},
        {src: "sprites/tiles/Door0.png", id: "doorOne"},
        {src: "sprites/tiles/Door1.png", id: "doorTwo"},
        {src: "sprites/players/Player0.png", id: "playerOne"},
        {src: "sprites/players/Player1.png", id: "playerTwp"},
        {src: "sprites/enemys/Demon0.png", id: "enemyOne"},
        {src: "sprites/enemys/Demon1.png", id: "enemyTwo"}
    ];

    preloader = new createjs.LoadQueue();
    preloader.on("fileload", handleFileLoad, this);
    preloader.on("complete", handleComplete, this);
    preloader.on("progress", handleProgress, this);
    preloader.loadManifest(manifest);
    
    //Set Tick
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function handleProgress(event) {
    /*Use event.loaded to get the percentage of the loading*/

    console.log(parseInt(event.loaded * 100, 10) + "% completed");

}

function handleComplete(event) {
    console.log("Preloading complete");

    showTitleView();
}

function handleFileLoad(event) {
    /*Triggered when an individual file completes loading*/

    var item = event.item; //A refernce to the item that was passed in to the LoadQueue
    var type = item.type;

    switch (type) {
        case createjs.LoadQueue.IMAGE:
            //image loaded
            var img = new createjs.Bitmap(item.src);
            img.id = item.id;
            spriteSheet.push(img);
            break;

        case createjs.LoadQueue.SOUND:
            break;
    }
}

function handleClick(event) {
    /*Triggered when a button is clicked*/

    var targetId = event.target.id;

    switch (targetId) {
        case "startBtn":
            tweenTitleView();
            break;
        case "creditsBtn":

            break;
    }
}

function showTitleView() {
    console.log("Adding Title View");

    //Title
    titleBg = spriteSheet[0];
    titleBg.x = 140;
    titleBg.y = 50;
    titleBg.name = 'titleBg';

    //Start Button
    startBtn = spriteSheet[1];
    startBtn.x = 256;
    startBtn.y = 360;
    startBtn.name = 'startBtn';
    startBtn.on("click", handleClick);

    //Credits Button
    creditsBtn = spriteSheet[2];
    creditsBtn.x = 256;
    creditsBtn.y = 460;
    creditsBtn.name = 'creditsBtn';
    creditsBtn.on("click", handleClick);

    titleView.addChild(titleBg);
    titleView.addChild(startBtn);
    titleView.addChild(creditsBtn);
    stage.addChild(titleView);
    stage.update();

    titleBg.on("press", tweenTitleView);
}

//Credits
function showCredits() {

}

function hideCredits() {

}

//Tween Title View
function tweenTitleView() {
    console.log("Tweening Title View");
    
    //Turn off click listeners
    startBtn.off("click");
    creditsBtn.off("click");
    
    createjs.Tween.get(titleView)
            .to({scaleX: 1.5, scaleY: 1.5, x: -200, y: -100, alpha: 0}, 1500, createjs.Ease.getPowInOut(5)) 
            .call(showGameView);
}

//Game View
function showGameView() {
    /*Remove Menu & Credits Screen*/

    stage.removeChild(titleView);
    titleView = null;
    credits = null; 
    stage.update();
}