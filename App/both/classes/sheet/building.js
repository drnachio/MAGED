/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Building = class Building extends MAGED.Classes.Sheet {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Building._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Building';
        properties['_table'] = 'Sheets';
        let newBuildingId = Building._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newBuildingId, properties._class, properties._table);
        return new Building(Building._collection.findOne({_id: newBuildingId}));
    };

    static removeObject(buildingId){
        MAGED.Classes.GameObject.removeObject(buildingId);
        return Building._collection.remove(buildingId);
    };

    constructor(obj){
        super(obj);
    };

};