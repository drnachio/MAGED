/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Collections.Cells = new Mongo.Collection('cells');

MAGED.Collections.Cells.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});