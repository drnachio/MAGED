/**
 * Created by Marcos on 10/10/2015.
 */
MAGED.Collections.GameObjects = new Mongo.Collection('gameObjects');

MAGED.Collections.GameObjects.allow({
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
    getTotalGameObjectsCount(){
        return MAGED.Collections.GameObjects.find({}).count();
    },
    findGameObject(query, multi){
        if(multi){
            return MAGED.Collections.GameObjects.find(query).fetch();
        }
        else {
            return MAGED.Collections.GameObjects.findOne(query);
        }
    }
});