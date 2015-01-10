//canvas
var canvas; //linked to the canvas in index.html page
var stage; //

//Preload
var preloader; //PreloadJS object
var manifest;  //hold the list of files we need to load

//TitleView
var spriteSheet = new Array();
/* 0 titleBackground
 * 
 * 
 */

var titleBg;
var startBtn; //The start button in the main menu
var creditsBtn; //The credits button in the main menu
var titleView = new createjs.Container();
var bgGraphics; // the background graphics

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
        {src: "sprites/enemys/Demon0.png", id: "enemyOne"},
        {src: "sprites/enemys/Demon1.png", id: "enemyTwo"}
    ];

    preloader = new createjs.LoadQueue();
    preloader.on("fileload", handleFileLoad, this);
    preloader.on("complete", handleComplete, this);
    preloader.on("progress", handleProgress, this);
    preloader.loadManifest(manifest);


}

function handleProgress(event) {
    console.log(parseInt(event.loaded * 100, 10) + "% completed");
    //use event.loaded to get the percentage of the loading
}

function handleComplete(event) {
    console.log("Preloading complete");

    showTitleView();

}

function handleFileLoad(event) {
    //triggered when an individual file completes loading

    var item = event.item; //A refernce to the item that was passed in to the LoadQueue
    var type = item.type;

    switch (type)
    {
        case createjs.LoadQueue.IMAGE:
            //image loaded
            var img = new createjs.Bitmap();
            img.src = item.src;
            img.id = item.id;
            spriteSheet.push(img);
            break;

        case createjs.LoadQueue.SOUND:
            break;
    }
}

function showTitleView() {
    console.log("Adding Title View");

    titleBg = spriteSheet[0];
    titleBg.scaleX = 0.1;
    titleBg.scaleY = 0.1;
    titleBg.x = 100;
    titleBg.y = 100;
    titleBg.name = 'titleBg';


    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    titleView.addChild(titleBg);
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
    console.log("Start game");

    Tween.get(titleView).to({y: -320}, 300).call(showGameView);
}

//Game View
function showGameView() {
    /*Remove Menu & Credits Screen*/

    stage.removeChild(titleView);
    titleView = null;
    credits = null;
}


