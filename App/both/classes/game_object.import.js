/**
 * Created by Marcos on 10/10/2015.
 */

export default class GameObject {

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