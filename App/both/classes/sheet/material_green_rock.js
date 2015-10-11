/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.GreenRock = class GreenRock extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return GreenRock._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'GreenRock';
        properties['_table'] = 'Sheets';
        let newGreenRockId = GreenRock._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newGreenRockId, properties._class, properties._table);
        return new GreenRock(GreenRock._collection.findOne({_id: newGreenRockId}));
    };

    static removeObject(greenRockId){
        MAGED.Classes.GameObject.removeObject(greenRockId);
        return GreenRock._collection.remove(greenRockId);
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