/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Sheet = class Sheet extends MAGED.Classes.GameObject {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Sheet._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Sheet';
        properties['_table'] = 'Sheets';
        let newSheetId = Sheet._collection.insert(properties);
        super.createNewObject(newSheetId, properties._class, properties._table);
        return new Sheet(Sheet._collection.findOne({_id: newSheetId}));
    };

    static removeObject(sheetId){
        super.removeObject(sheetId);
        return Sheet._collection.remove(sheetId);
    };

    constructor(obj){
        super(obj);
    };

    get height(){ return this.h; };

    set height(val){ /*Cell.update(this._id, {$set: {h: val}}); */};

};