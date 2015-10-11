/**
 * Created by Marcos on 10/10/2015.
 */

let addSheets = function(cArray, sheets){
    for(let i = 0; i < 5; i++){
        let type = '';
        let rnd = Math.random();
        if(rnd <= MAGED.Constants.RARITY.ULTRARARE){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.ULTRARARE;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else if(rnd <= MAGED.Constants.RARITY.VERYRARE){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.VERYRARE;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else if(rnd <= MAGED.Constants.RARITY.RARE){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.RARE;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else if(rnd <= MAGED.Constants.RARITY.INFREQUENT){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.INFREQUENT;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else if(rnd <= MAGED.Constants.RARITY.UNCOMMON){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.UNCOMMON;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else if(rnd <= MAGED.Constants.RARITY.COMMON){
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.COMMON;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        else{
            let filt = _.filter(cArray, function(obj){
                if(obj.rarity){
                    return obj.rarity() === MAGED.Constants.RARITY.REGULAR;
                }
                else{
                    return false;
                }
            });
            if(filt.length > 0){
                type = filt[Math.floor(Math.random() * filt.length)].name;
            }
            else{
                type = cArray[Math.floor(Math.random() * cArray.length)].name;
            }
        }
        sheets.push({class: MAGED.Classes[type], obj:{_id: new Meteor.Collection.ObjectID().toJSONValue(),dynamic: Math.random() > 0.5, h: Math.round(Math.random()*10), b: 0, _class: type}});
    }
    //order by rarity
    sheets.sort(function(a,b){
        return a.class.rarity() - b.class.rarity();
    });
    let res = [];
    for(let i = 0; i < sheets.length; i++){
        let b = 0;
        let temp =sheets[i].obj;
        if(i != 0) {
            let prevSheet = sheets[i - 1];
            b = prevSheet.obj.b + prevSheet.obj.h;
        }
        temp.b = b;
        res.push(temp);
    }
    return res;
};

if(MAGED.Collections.GameObjects.find().count() === 0){
    console.log('START!');
    let cArray = _.toArray(MAGED.Classes).filter(function(obj){
        return _.contains(['Crystal', 'Desert', 'Dust', 'Grass', 'GreenRock', 'Lava', 'Rock', 'Stone', 'WetStone'], obj.name);
    });
    for(let x=0; x <= 100; x++){
        for(let y=0; y <= 100;y++){
            let _x = -x;
            let _y = -y;
            let _z = (x + y);
            let z = -_z;
            if(y === 0 && x === 0 && z === 0){
                let cellC1 = MAGED.Classes.Cell.createNewObject({_x: x, _y:y,_z:z,_h:Math.round(Math.random()*100),_stack:[]});
                let sheetsC1 = [];
                sheetsC1 = addSheets(cArray, sheetsC1);
                cellC1.addSheet(sheetsC1);
            }
            else {
                let cellC1 = MAGED.Classes.Cell.createNewObject({_x: x, _y: y, _z: z, _h: Math.round(Math.random() * 100), _stack: []});
                let cellC2 = MAGED.Classes.Cell.createNewObject({_x: _x, _y: _y, _z: _z, _h: Math.round(Math.random() * 100), _stack: []});
                let cellC3 = MAGED.Classes.Cell.createNewObject({_x: _x, _y: y, _z: ((_x + y) * -1), _h: Math.round(Math.random() * 100), _stack: []});
                let cellC4 = MAGED.Classes.Cell.createNewObject({_x: x, _y: _y, _z: ((x + _y) * -1), _h: Math.round(Math.random() * 100), _stack: []});
                let sheetsC1 = [];
                let sheetsC2 = [];
                let sheetsC3 = [];
                let sheetsC4 = [];
                sheetsC1 = addSheets(cArray, sheetsC1);
                sheetsC2 = addSheets(cArray, sheetsC2);
                sheetsC3 = addSheets(cArray, sheetsC3);
                sheetsC4 = addSheets(cArray, sheetsC4);

                cellC1.addSheet(sheetsC1);
                cellC2.addSheet(sheetsC2);
                cellC3.addSheet(sheetsC3);
                cellC4.addSheet(sheetsC4);
            }
        }
    }
    console.log('END');
}