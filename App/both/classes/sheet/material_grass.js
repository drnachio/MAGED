/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Grass = class Grass extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Grass._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Grass';
        properties['_table'] = 'Sheets';
        let newGrassId = Grass._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newGrassId, properties._class, properties._table);
        return new Grass(Grass._collection.findOne({_id: newGrassId}));
    };

    static removeObject(grassId){
        MAGED.Classes.GameObject.removeObject(grassId);
        return Grass._collection.remove(grassId);
    };

    static rarity(mult){
        if(!mult){
            mult = 1;
        }
        return MAGED.Constants.RARITY.INFREQUENT * mult;
    };

    constructor(obj){
        super(obj);
    };

};