/**
 * Created by Marcos on 10/10/2015.
 */
if(MAGED.Collections.GameObjects.find().count() === 0){
    for(let i = 0; i < 3000; i++){
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
    }
}