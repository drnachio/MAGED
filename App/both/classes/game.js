/**
 * Created by Marcos on 10/10/2015.
 */

if(Meteor.isClient) {
    MAGED.Classes.Game = {};
    MAGED.Classes.Game._gameObjects = [];
    MAGED.Classes.Game._gameObjects.length = 0;
    MAGED.Classes.Game.getGameObjectByID = function (id) {
        return MAGED.Classes.Game._gameObjects[id];
    };
    MAGED.Classes.Game.deleteGameObjectByID = function (id) {
        delete MAGED.Classes.Game._gameObjects[id];
        MAGED.Classes.Game._gameObjects.length--;
    };
    MAGED.Classes.Game.parseGameObjects = function (cursor) {
        var res = [];
        cursor.forEach(function(obj){
            if(MAGED.Classes.Game[obj._class]) {
                res.push(new MAGED.Classes.Game[obj._class](obj));
            }
        });
        return res;
    };
}