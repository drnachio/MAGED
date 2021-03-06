/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Cell = class Cell extends MAGED.Classes.GameObject {

    static get _collection(){
        return MAGED.Collections.Cells;
    };

    static update(conditionObj, updateProps, options){
        return Cell._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Cell';
        properties['_table'] = 'Cells';
        let newCellId = Cell._collection.insert(properties);
        super.createNewObject(newCellId, properties._class, properties._table);
        return new Cell(Cell._collection.findOne({_id: newCellId}));
    };

    static removeObject(objId){
        super.removeObject(objId);
        return Cell._collection.remove(objId);
    };

    constructor(obj){
        super(obj);
        this.stack = [];
        this._stack.forEach((function(obj){
            this.stack.push(new MAGED.Classes[obj._class](obj));
        }).bind(this));
    };

    get x(){ return this._x; };
    set x(val){ Cell.update(this._id, {$set: {_x: val}}); };

    get y(){ return this._y; };
    set y(val){ Cell.update(this._id, {$set: {_y: val}}); };

    get z(){ return this._z; };
    set z(val){ Cell.update(this._id, {$set: {_z: val}}); };

    get h(){ return this._h; };
    set h(val){ Cell.update(this._id, {$set: {_h: val}}); };

    addSheet(sheets, position){
        if(!_.isArray(sheets)){
            sheets = [sheets];
        }
        let modifier = { $each: sheets };
        if(position != null) {
            modifier.$position = position;
        }
        return Cell.update(this._id, { $push: { _stack: modifier } });
    };

    removeSheet(sheetsIds){
        if(!_.isArray(sheetsIds)){
            sheetsIds = [sheetsIds];
        }
        return Cell.update(this._id, { $pullAll: { _stack: sheetsIds } });
    };
};