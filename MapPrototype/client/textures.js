MAGED.Classes.Materials = [];
{
    let textures = {};

    {
        let texture = THREE.ImageUtils.loadTexture('/img/desert.png');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.desert = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/bumpArena.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 10, 1 / 10, 1 / 10);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bumpArena = texture;
    }

    //let material = new THREE.MeshLambertMaterial({map: texture});
    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(15,11,19)"),
        shininess: 10,
        bumpMap: textures.bumpArena,
        map: textures.desert,
        bumpScale: 1,
    });

    MAGED.Classes.Materials.push(material);
}

{
    let textures = {};

    {
        let texture = THREE.ImageUtils.loadTexture('/img/stone.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.desert = texture;
    }


    //let material = new THREE.MeshLambertMaterial({map: texture});
    let material = new THREE.MeshPhongMaterial({
        color: new THREE.Color("rgb(155,156,150)"),
        specular: new THREE.Color("rgb(155,113,90)"),
        shininess: 20,
        bumpMap: textures.desert,
        map: textures.desert,
        bumpScale: 1,
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'rock';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(50,50,50)"),
        shininess: 30,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 1
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'grass';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(50,50,50)"),
        shininess: 1,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 0.5
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'crystal';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(150,150,150)"),
        shininess: 50,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 10
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'lava';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/difuse.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/lightB.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.light = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(150,150,150)"),
        shininess: 2,
        bumpMap: textures.bump,
        map: textures.normal,
        lightMap: textures.light,
        emissive: new THREE.Color("rgb(11,0,0)"),
        emisiveMap: textures.light,
        bumpScale: 10
    });



    MAGED.Classes.Materials.push(material);
}



{
    let textures = {};

    var name = 'greenR1';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(50,50,50)"),
        shininess: 10,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 10
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'dust1';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 400, 1 / 400, 1 / 400);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(50,50,50)"),
        shininess: 10,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 10
    });

    MAGED.Classes.Materials.push(material);
}


{
    let textures = {};

    var name = 'wetStone';

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/map.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.normal = texture;
    }

    {
        let texture = THREE.ImageUtils.loadTexture('/img/textures/' + name + '/bump.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 1;
        texture.repeat.set(1 / 200, 1 / 200, 1 / 200);
        texture.offset.set(0.5, 0.5, 0.5);
        textures.bump = texture;
    }

    let material = new THREE.MeshPhongMaterial({
        specular: new THREE.Color("rgb(40,38,30)"),
        shininess: 30,
        bumpMap: textures.bump,
        map: textures.normal,
        bumpScale: 8
    });

    MAGED.Classes.Materials.push(material);
}