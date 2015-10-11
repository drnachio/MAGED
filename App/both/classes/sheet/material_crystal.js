/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Crystal = class Crystal extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Crystal._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Crystal';
        properties['_table'] = 'Sheets';
        if(!properties.rarity){
            properties.rarity = MAGED.Constants.RARITY.ULTRARARE;
        }
        let newCrystalId = Crystal._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newCrystalId, properties._class, properties._table);
        return new Crystal(Crystal._collection.findOne({_id: newCrystalId}));
    };

    static removeObject(crystalId){
        MAGED.Classes.GameObject.removeObject(crystalId);
        return Crystal._collection.remove(crystalId);
    };

    constructor(obj){
        super(obj);
    };

};