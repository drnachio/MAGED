MAGED.Classes.MapView = class MapView {

    get width ()        {return this._width;}
    set width (value)   { _width = this.value;}
    get height ()        {return this._height;}
    set height (value)   { _height = this.value;}

    constructor() {

        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this._camera.position.z = 1000;
        this._camera.rotation.x = 0.4;
        this._mouse = new THREE.Vector2();
        this._mouseRayCaster = new THREE.Raycaster();
        this._highLights = [];
        this._scene.add( new THREE.AmbientLight( 0x505060 ) );


        let radius = 100;
        let shape = new THREE.Shape();
        shape.moveTo(0, -radius);
        shape.lineTo(radius, -radius / 2);
        shape.lineTo(radius, radius / 2);
        shape.lineTo(0, radius);
        shape.lineTo(-radius, radius / 2);
        shape.lineTo(-radius, -radius / 2);
        shape.lineTo(0, -radius);
        let myGeometry = new THREE.ExtrudeGeometry(shape, {amount:radius,curveSegments:0, steps:1, bevelEnabled:false});

        for(let x=-18;x<=18;x++)
        {
            for(let y=-18;y<=18;y++) {
                var material = MAGED.Classes.Materials[Math.floor(Math.random() *MAGED.Classes.Materials.length)];
                var sheet = new THREE.Mesh(myGeometry, material.clone());
                sheet.position.x = x*radius*2 + y%2*radius;
                sheet.position.y = y*radius*1.5;
                sheet.scale.z = (1 + Math.round(Math.random() * 5)) / 4;
                sheet.castShadow = true;
                sheet.receiveShadow = true;
                this._scene.add(sheet);
            }
        }

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 0, 1000);
        spotLight.target = new THREE.Object3D();
        spotLight.target.position.set(0, 500, 0);
        spotLight.castShadow = true;
        spotLight.shadowMapWidth = 4096;
        spotLight.shadowMapHeight = 4096;
        spotLight.shadowCameraNear = 200;
        spotLight.shadowCameraFar = 6000;
        spotLight.shadowCameraFov = 200;

        this._scene.add(spotLight.target);
        this._scene.add(spotLight);
        this._spotLight = spotLight;

        this._renderer = new THREE.WebGLRenderer();
        this._renderer = new THREE.WebGLRenderer( { antialias: true } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setSize(this.width, this.height );
        this._renderer.shadowMap.enabled = true;
        this._running =false;
        console.log("Map View Created: " + this);
        this._canvas = this._renderer.domElement;
        document.body.appendChild(this._canvas);
        window.addEventListener('resize', this.onReseize.bind(this));
        this._canvas.addEventListener('mousemove',this.onMouseMove.bind(this));
        this._canvas.addEventListener('wheel',this.onMouseWheel.bind(this));

    }

    showStats(){
        this._stats = new Stats();
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.top = '0px';
        document.body.appendChild( this._stats.domElement );
    }

    onMouseWheel(e) {
        if(e.buttons==1)
        {
            if(this._highLights[0])
            {
                var ref= this._highLights[0].object;
                ref.scale.z  -= e.wheelDelta / 1000;

                if (ref.scale.z < 0.1) {
                    ref.scale.z = 0.1;
                }
                else if (ref.scale.z > 4) {
                    ref.scale.z = 4;
                }
            }
        } else {
            this._camera.position.z -= e.wheelDelta / 10;
            if (this._camera.position.z < 500) {
                this._camera.position.z = 500;
            }
            else if (this._camera.position.z > 2000) {
                this._camera.position.z = 2000;
            }
            this._spotLight.position.z = this._camera.position.z;
        }

    }


    onMouseMove(e)
    {
        if(e.buttons==1)
        {
            this._camera.position.x -= e.x -this._lastEvent.x;
            this._camera.position.y += e.y -this._lastEvent.y;
            this._spotLight.target.position.x = this._camera.position.x;
            this._spotLight.target.position.y = this._camera.position.y + 500;
        }
        this._spotLight.position.x = this._camera.position.x + (e.x - this.width /2) * 2;
        this._spotLight.position.y = this._camera.position.y + (this.height / 2 - e.y) * 2;

        this._lastEvent = e;

        this._mouse.x = ( e.clientX / this._width ) * 2 - 1;
        this._mouse.y = - ( e.clientY / this._height ) * 2 + 1;
    }


    onReseize()
    {
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._camera.aspect	= window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
    }

    toString()
    {
        return `${this.width} X ${this.height}`;
    }

    start()
    {
        this._running = true;
        this.animate()
    }

    stop()
    {
        this._running = false;
    }

    animate() {

        if(this._running) requestAnimationFrame( this.animate.bind(this) );

        for ( var i = 0; i < this._highLights.length; i++ ) {
            let ref = this._highLights[i].object.material;
            ref.emissive = ref.oldEmissive.clone();
            break;
        }

        this._mouseRayCaster.setFromCamera( this._mouse, this._camera );

        // calculate objects intersecting the picking ray
        this._highLights = this._mouseRayCaster.intersectObjects( this._scene.children );

        for ( var i = 0; i < this._highLights.length; i++ ) {
            let ref = this._highLights[i].object.material;
            if(!ref.oldEmissive) {
                ref.oldEmissive = ref.emissive.clone();
            }
            ref.emissive.set( 0x333333 );
            break;
        }

        this._renderer.render( this._scene, this._camera );

        if(this._stats) this._stats.update();
    }

};