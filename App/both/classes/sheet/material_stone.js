/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Stone = class Stone extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Stone._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Stone';
        properties['_table'] = 'Sheets';
        if(!properties.rarity){
            properties.rarity = MAGED.Constants.RARITY.UNCOMMON;
        }
        let newStoneId = Stone._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newStoneId, properties._class, properties._table);
        return new Stone(Stone._collection.findOne({_id: newStoneId}));
    };

    static removeObject(stoneId){
        MAGED.Classes.GameObject.removeObject(stoneId);
        return Stone._collection.remove(stoneId);
    };

    constructor(obj){
        super(obj);
    };

};