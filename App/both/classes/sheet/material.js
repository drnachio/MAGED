/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Classes.Material = class Material extends MAGED.Classes.Sheet {

    static get _collection(){
        return MAGED.Collections.Sheets;
    };

    static update(conditionObj, updateProps, options){
        return Material._collection.update(conditionObj, updateProps, options);
    };

    static createNewObject(properties){
        properties['_class'] = 'Material';
        properties['_table'] = 'Sheets';
        let newMaterialId = Material._collection.insert(properties);
        MAGED.Classes.GameObject.createNewObject(newMaterialId, properties._class, properties._table);
        return new Material(Material._collection.findOne({_id: newMaterialId}));
    };

    static removeObject(materialId){
        MAGED.Classes.GameObject.removeObject(materialId);
        return Material._collection.remove(materialId);
    };

    constructor(obj){
        super(obj);
    };

};