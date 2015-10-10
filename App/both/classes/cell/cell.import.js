/**
 * Created by Marcos on 10/10/2015.
 */

import GameObject from '../game_object';
import Game from '../game';

export default class Cell extends GameObject {

    static get _collection(){
        return Cells;
    };

    static udpate(conditionObj, updateProps, options){
        Cell._collection.update(conditionObj, updateProps, options);
    };

    static createNewCell(properties){
        properties['_class'] = 'Cell';
        Cell._collection.insert(properties);
    };

    static removeCell(cellId){
        Cell._collection.remove(cellId);
    };

    constructor(obj){
        super(obj);
    };

    get x(){ return this._x; };
    set x(val){ Cell.update(this._id, {$set: {_x: val}}); };

    get y(){ return this._y; };
    set y(val){ Cell.update(this._id, {$set: {_y: val}}); };

    get z(){ return this._z; };
    set z(val){ Cell.update(this._id, {$set: {_z: val}}); };

    get h(){ return this._h; };
    set h(val){ Cell.update(this._id, {$set: {_h: val}}); };

    get stack(){
        let stackGameObjArray = [];
        for(let i = 0; i < this._stack.length; i++){
            stackGameObjArray.push(Game.getGameObjectByID(this._stack[i]));
        }
        return stackGameObjArray;
    };
    set stack(val) {
        if(!_.isArray(val)){
            val = [val];
        }
        for(let i = 0; i < val.length; i++){
            let temp = val[i];
            if(_.isObject(temp)){
                val[i] = temp._id;
            }
        }
        Cell.update(this._id, {$set:{_stack: val}});
    };

    addSheet(sheetsIds, position){
        if(!_.isArray(sheetsIds)){
            sheetsIds = [sheetsIds];
        }
        for(let i = 0; i < sheetsIds.length; i++) {
            sheetId = sheetsIds[i];
            if (_.isObject(sheetId)) {
                sheetsIds[i] = sheetId._id;
            }
        }
        let modifier = { $each: sheetsIds };
        if(position != null) {
            modifier.$position = position;
        }
        return Cell.update(this._id, { $push: { _stack: modifier } });
    };

    removeSheet(sheetsIds){
        if(!_.isArray(sheetsIds)){
            sheetsIds = [sheetsIds];
        }
        for(let i = 0; i < sheetsIds.length; i++) {
            sheetId = sheetsIds[i];
            if (_.isObject(sheetId)) {
                sheetsIds[i] = sheetId._id;
            }
        }
        return Cell.update(this._id, { $pullAll: { _stack: sheetsIds } });
    };
};