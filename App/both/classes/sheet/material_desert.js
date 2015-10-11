/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Desert = class Desert extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Desert._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Desert';
        properties['_table'] = 'Sheets';
        let newDesertId = Desert._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newDesertId, properties._class, properties._table);
        return new Desert(Desert._collection.findOne({_id: newDesertId}));
    };

    static removeObject(desertId){
        MAGED.Classes.GameObject.removeObject(desertId);
        return Desert._collection.remove(desertId);
    };

    static rarity(mult){
        if(!mult){
            mult = 1;
        }
        return MAGED.Constants.RARITY.REGULAR * mult;
    };

    constructor(obj){
        super(obj);
    };

};