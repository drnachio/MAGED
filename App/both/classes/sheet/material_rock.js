/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Rock = class Rock extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Rock._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Rock';
        properties['_table'] = 'Sheets';
        if(!properties.rarity){
            properties.rarity = MAGED.Constants.RARITY.UNCOMMON;
        }
        let newRockId = Rock._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newRockId, properties._class, properties._table);
        return new Rock(Rock._collection.findOne({_id: newRockId}));
    };

    static removeObject(rockId){
        MAGED.Classes.GameObject.removeObject(rockId);
        return Rock._collection.remove(rockId);
    };

    constructor(obj){
        super(obj);
    };

};