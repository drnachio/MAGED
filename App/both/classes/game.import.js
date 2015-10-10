/**
 * Created by Marcos on 10/10/2015.
 */

let GameModule = {};
GameModule._gameObjects = [];
GameModule._gameObjects.length = 0;
GameModule.getGameObjectByID = function (id) {
    return GameModule._gameObjects[id];
};
GameModule.deleteGameObjectByID = function (id) {
    delete GameModule._gameObjects[id];
    GameModule._gameObjects.length--;
};
GameModule.parseGameObjects = function (cursor) {
    var res = [];
    cursor.forEach(function(obj){
        if(GameModule[obj._class]) {
            res.push(new GameModule[obj._class](obj));
        }
    });
    return res;
};
export default Game = GameModule;