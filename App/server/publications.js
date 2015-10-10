/**
 * Created by Marcos on 10/10/2015.
 */

Meteor.publish('allGameObjects', function(){
    return MAGED.Collections.GameObjects.find();
});
Meteor.publish('allCells', function(){
    return MAGED.Collections.Cells.find();
});
Meteor.publish('allSheets', function(){
    return MAGED.Collections.Sheets.find();
});

Meteor.publish('cells', function(x1, x2, y1, y2, z1, z2){
    return MAGED.Collections.Cells.find({_x: { $gte: x1, $lte: x2 }, _y: { $gte: y1, $lte: y2}, _z: {$gte: z1, $lte: z2}});
});
Meteor.publish('sheets', function(ids){
    return MAGED.Collections.Sheets.find({_id: {$in: ids}});
});