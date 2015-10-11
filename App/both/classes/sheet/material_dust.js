/**
 * Created by Marcos on 11/10/2015.
 */
MAGED.Classes.Dust = class Dust extends MAGED.Classes.Material {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Dust._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Dust';
        properties['_table'] = 'Sheets';
        let newDustId = Dust._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newDustId, properties._class, properties._table);
        return new Dust(Dust._collection.findOne({_id: newDustId}));
    };

    static removeObject(dustId){
        MAGED.Classes.GameObject.removeObject(dustId);
        return Dust._collection.remove(dustId);
    };

    static rarity(mult){
        if(!mult){
            mult = 1;
        }
        return MAGED.Constants.RARITY.COMMON * mult;
    };

    constructor(obj){
        super(obj);
    };

};