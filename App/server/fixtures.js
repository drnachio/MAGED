/**
 * Created by Marcos on 10/10/2015.
 */
if(MAGED.Collections.GameObjects.find().count() === 0){
    let cArray = _.toArray(MAGED.Classes).filter(function(obj){
        return _.contains(['Crystal', 'Dust', 'Grass', 'GreenRock', 'Lava', 'Rock', 'Stone', 'WetStone'], obj.name);
    });
    console.log(cArray);
    for(let x=0; x <= 20; x++){
        for(let y=0; y <= 20;y++){
            for(let z = 0; z <= 20; z++){
                let _x = -x;
                let _y = -y;
                let _z = -z;
                let cell = MAGED.Classes.Cell.createNewObject({_x: x, _y:y,_z:z,_h:Math.round(Math.random()*100),_stack:[]});
                let _cell = MAGED.Classes.Cell.createNewObject({_x: _x, _y:_y,_z:_z,_h:Math.round(Math.random()*100),_stack:[]});
                let sheets = [];
                let _sheets = [];
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
                    console.log(type);
                    sheets.push(MAGED.Classes[type].createNewObject({dynamic: Math.random() > 0.5, height: Math.round(Math.random()*10)})._id);
                }
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
                    _sheets.push(MAGED.Classes[type].createNewObject({dynamic: Math.random() > 0.5, height: Math.round(Math.random()*10)})._id);
                }
                cell.addSheet(sheets);
                _cell.addSheet(_sheets);
                console.log('(' +x+','+y+','+z+')');
            }
        }
    }
    /*for(let i = 0; i < 3000; i++){
        let cell = MAGED.Classes.Cell.createNewObject({_x: Math.round(Math.random()*100), _y:Math.round(Math.random()*100),_z:Math.round(Math.random()*100),_h:Math.round(Math.random()*100),_stack:[]});
        for(let j = 0; j < 5; j++) {
            let type = '';
            let rnd = Math.random();
            if(rnd > 0.25){
                type = 'Material';
            }
            else if(rnd >= 0.1){
                type = 'Building';
            }
            else{
                type = 'Ruin';
            }
            let sheet = MAGED.Classes[type].createNewObject({dynamic: Math.random() > 0.5, height: Math.round(Math.random()*10)});
            cell.addSheet(sheet._id);
        }
    }*/
}