/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Sheet = class Sheet extends MAGED.Classes.GameObject {

    static get _collection(){
        return Sheets;
    };

    static udpate(conditionObj, updateProps, options){
        return Sheet._collection.update(conditionObj, updateProps, options);
    };

    static createNewSheet(properties){
        properties['_class'] = 'Sheet';
        let newSheetId = Sheet._collection.insert(properties);
        return new Sheet(Sheet._collection.findOne({_id: newSheetId}));
    };

    static removeSheet(sheetId){
        return Sheet._collection.remove(sheetId);
    };

    constructor(obj){
        super(obj);
    };

};