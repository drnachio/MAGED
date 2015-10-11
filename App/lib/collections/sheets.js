/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Collections.Sheets = new Mongo.Collection('sheets');

MAGED.Collections.Sheets.allow({
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
    getSheetsCountFromIds(ids){
        return MAGED.Collections.Sheets.find({_id: {$in: ids}}).count();
    }
});