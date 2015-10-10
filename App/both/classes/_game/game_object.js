/**
 * Created by Marcos on 10/10/2015.
 */

MAGED.Classes.GameObject = class GameObject {

    static get _collection(){
        return null;
    };

    static udpate(conditionObj, updateProps, options){
        GameObject._collection.update(conditionObj, updateProps, options);
    };

    constructor(obj){
        _.extend(this, obj);
    };

    getEvents(){
        return [];
    };

    processEvent(event){
        return null;
    };
};