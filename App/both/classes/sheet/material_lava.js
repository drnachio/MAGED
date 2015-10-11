/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Lava = class Lava extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Lava._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Lava';
        properties['_table'] = 'Sheets';
        if(!properties.rarity){
            properties.rarity = MAGED.Constants.RARITY.ULTRARARE;
        }
        let newLavaId = Lava._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newLavaId, properties._class, properties._table);
        return new Lava(Lava._collection.findOne({_id: newLavaId}));
    };

    static removeObject(lavaId){
        MAGED.Classes.GameObject.removeObject(lavaId);
        return Lava._collection.remove(lavaId);
    };

    constructor(obj){
        super(obj);
    };

};