/**
 * Created by Marcos on 10/10/2015.
 */

if(Meteor.isClient) {
    MAGED.Classes.Game = {};
    MAGED.Classes.Game._gameObjects = [];
    MAGED.Classes.Game._gameObjects.length = 0;
    MAGED.Classes.Game._gameObjects.maxLength = 100;
    MAGED.Classes.Game.getGameObjectByID = function (id) {
        /*if(MAGED.Classes.Game._gameObjects[id]) {
            return MAGED.Classes.Game._gameObjects[id];
        }
        else{*/
            let go = MAGED.Collections.GameObjects.findOne({objId: id});
            if(go){
                let typedObj = MAGED.Collections[go.collection].findOne({_id: id});
                return new MAGED.Classes[go.class](typedObj);
            }
            else{
                return null;
            }
        //}
    };
    MAGED.Classes.Game.addGameObject = function(obj){
       /* if(MAGED.Classes.Game._gameObjects.length+1 > MAGED.Classes.Game._gameObjects.maxLength){
            MAGED.Classes.Game.deleteOldestGameObject();
        }
        obj.__added = new Date().getTime();
        MAGED.Classes.Game._gameObjects[obj._id] = obj;
        MAGED.Classes.Game._gameObjects.length++;
        return MAGED.Classes.Game._gameObjects.length;*/
    };
    MAGED.Classes.Game.deleteGameObjectByID = function (id) {
        delete MAGED.Classes.Game._gameObjects[id];
        MAGED.Classes.Game._gameObjects.length--;
    };
    MAGED.Classes.Game.deleteOldestGameObject = function(){
        let oldest = null;
        for(let id in MAGED.Classes.Game._gameObjects){
            if(!oldest || (MAGED.Classes.Game._gameObjects[id].__added < oldest.__added)){
                oldest = MAGED.Classes.Game._gameObjects[id];
            }
        }
        MAGED.Classes.Game.deleteGameObjectByID(oldest._id);
    };
    MAGED.Classes.Game.parseGameObjects = function (cursor) {
        var res = [];
        cursor.forEach(function(obj){
            if(MAGED.Classes[obj._class]) {
                res.push(new MAGED.Classes[obj._class](obj));
            }
        });
        return res;
    };

    MAGED.Classes.Game.loadAllCellsInMemory = function(){
        MAGED.Collections.Cells.find({}).forEach(function(obj){
            MAGED.Classes.Game.addGameObject(obj);
        });
        MAGED.Collections.Sheets.find({}).forEach(function(obj){
            MAGED.Classes.Game.addGameObject(obj);
        });
    };

    MAGED.Classes.Game.ready = new ReactiveVar(false);
}