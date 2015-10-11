/**
 * Created by Marcos on 10/10/2015.
 */

if(Meteor.isClient) {
    MAGED.Classes.Game = {};
    MAGED.Classes.Game._gameObjects = [];
    MAGED.Classes.Game._gameObjects.length = 0;
    MAGED.Classes.Game._gameObjects.maxLength = 100;
    MAGED.Classes.Game.getGameObjectById = function (id) {
        return new Promise(function(resolve){
            let go = MAGED.Classes.Game._gameObjects[id];
            if(go) {
                resolve(new MAGED.Classes[go.class](MAGED.Collections[go.collection].findOne({_id: id})));
            }
            else{
                Meteor.call('findGameObject',{objId: id}, function (err, res) {
                    if(err){resolve(null);}
                    go = res;
                    if(!go){
                        resolve(null);
                    }
                    MAGED.Classes.Game.addGameObject(go);
                    if(go){
                        resolve(new MAGED.Classes[go.class](MAGED.Collections[go.collection].findOne({_id: id})));
                    }
                    else{
                        resolve(null);
                    }
                });
            }
        });
    };
    MAGED.Classes.Game.addGameObject = function(obj){
        if(MAGED.Classes.Game._gameObjects.length+1 > MAGED.Classes.Game._gameObjects.maxLength){
            MAGED.Classes.Game.deleteOldestGameObject();
        }
        obj.__added = new Date().getTime();
        MAGED.Classes.Game._gameObjects[obj.objId] = obj;
        MAGED.Classes.Game._gameObjects.length++;
        return MAGED.Classes.Game._gameObjects.length;
    };
    MAGED.Classes.Game.deleteGameObjectById = function (id) {
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
        MAGED.Classes.Game.deleteGameObjectById(oldest.objId);
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

}