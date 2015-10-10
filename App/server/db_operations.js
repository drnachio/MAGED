/**
 * Created by Marcos on 10/10/2015.
 */
Meteor.methods({
    insert: function(userId, token, collection, query){
        //TODO: implement security anti hacking checks (userId, token, etc)
        MAGED.Collections[collection].insert(query);
    },
    update: function(userId, token, collection, query){
        //TODO: implement security anti hacking checks (userId, token, etc)
        MAGED.Collections[collection].update(query);
    },
    remove: function(userId, token, collection, query){
        //TODO: implement security anti hacking checks (userId, token, etc)
        MAGED.Collections[collection].remove(query);
    }
});