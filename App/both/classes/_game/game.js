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

    let generateData = function(times, timeout, count) {
        setTimeout(function(){
            for(let i = 0; i < 100; i++){
                let cell = MAGED.Classes.Cell.createNewObject({_x: Math.round(Math.random()*100), _y:Math.round(Math.random()*100),_z:Math.round(Math.random()*100),_h:Math.round(Math.random()*100),_stack:[]});
                for(let j = 0; j < 5; j++) {
                    let sheet = MAGED.Classes.Sheet.createNewObject({dynamic: Math.random() > 0.5, height: Math.round(Math.random()*10)});
                    cell.addSheet(sheet._id);
                }
            }
            if(count < times){
                count++;
                generateData(times, timeout, count);
            }
            else{
                return;
            }
        }, timeout);
    };
    MAGED.Classes.Game.instancesStressTest = function(times){
        let startTime = new Date();
        console.log(startTime);
        generateData(times, 5000, 0);
        let msEnd = new Date() - startTime;
        console.log('END: ' + msEnd + ' ms');
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