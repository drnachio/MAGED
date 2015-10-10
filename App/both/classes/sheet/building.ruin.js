/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Ruin = class Ruin extends MAGED.Classes.Building {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Ruin._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Ruin';
        properties['_table'] = 'Sheets';
        let newRuinId = Ruin._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newRuinId, properties._class, properties._table);
        return new Ruin(Ruin._collection.findOne({_id: newRuinId}));
    };

    static removeObject(ruinId){
        MAGED.Classes.GameObject.removeObject(ruinId);
        return Ruin._collection.remove(ruinId);
    };

    constructor(obj){
        super(obj);
    };

};