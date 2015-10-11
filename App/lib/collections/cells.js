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

Meteor.methods({
    getInViewCellCount(x1, x2, y1, y2, z1, z2){
        return MAGED.Collections.Cells.find({_x: {$gte: x1, $lte: x2}, _y: {$gte: y1, $lte: y2}, _z: {$gte: z1, $lte: z2}}).count();
    }
});