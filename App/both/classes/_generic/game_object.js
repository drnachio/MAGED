/**
 * Created by Marcos on 10/10/2015.
 */

MAGED.Classes.GameObject = class GameObject {

    static get _collection(){
        return MAGED.Collections.GameObjects;
    };

    static update(conditionObj, updateProps, options){
        GameObject._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(id, cl, collection){
        GameObject._collection.insert({objId: id, class: cl, collection: collection});
    };

    static removeObject(objId){
        return GameObject._collection.remove({objId: objId});
    };

    constructor(obj){
        _.extend(this, obj);
        //MAGED.Classes.Game.addGameObject(this);
    };

    getEvents(){
        return [];
    };

    processEvent(event){
        return null;
    };
};