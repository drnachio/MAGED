/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.WetStone = class WetStone extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return WetStone._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'WetStone';
        properties['_table'] = 'Sheets';
        if(!properties.rarity){
            properties.rarity = MAGED.Constants.RARITY.RARE;
        }
        let newWetStoneId = WetStone._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newWetStoneId, properties._class, properties._table);
        return new WetStone(WetStone._collection.findOne({_id: newWetStoneId}));
    };

    static removeObject(wetStoneId){
        MAGED.Classes.GameObject.removeObject(wetStoneId);
        return WetStone._collection.remove(wetStoneId);
    };

    constructor(obj){
        super(obj);
    };

};