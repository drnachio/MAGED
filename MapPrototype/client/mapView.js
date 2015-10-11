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

        var shapes =[];
        for(var i=0;i<=1;i++)
        {
            let shape = new THREE.Shape();
            var dx = (i%2*radius);
            shape.moveTo(dx, -radius);
            shape.lineTo(radius+dx, -radius / 2);
            shape.lineTo(radius+dx, radius / 2);
            shape.lineTo(dx, radius);
            shape.lineTo(dx-radius, radius / 2);
            shape.lineTo(dx-radius, -radius / 2);
            shape.lineTo(dx, -radius);
            shapes[i] = shape;
        }

        for(let x=-18;x<=18;x++)
        {
            for(let y=-18;y<=18;y++) {
                let myGeometry = new THREE.ExtrudeGeometry(shapes[Math.abs(y%2)], {amount:radius*5,curveSegments:0, steps:1, bevelEnabled:false});
                //var myGeometry = new MAGED.Classes.octoCell(radius,0).geometry;
                var material = MAGED.Classes.Materials[Math.floor(Math.random() *MAGED.Classes.Materials.length)];
                var sheet = new THREE.Mesh(myGeometry, material.clone());
                sheet._shape = shapes[Math.abs(y%2)];
                sheet.position.x = x*radius*2;
                sheet.position.y = y*radius*1.5;

                sheet.setHeight = function(h)
                {
                    this.geometry = new THREE.ExtrudeGeometry(this._shape, {amount:h,curveSegments:0, steps:1, bevelEnabled:false});
                };
                sheet.h =(1 + Math.round(Math.random() * 5)) / 4 * radius;
                sheet.setHeight(sheet.h);
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
        spotLight.shadowCameraFov = 120;
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
        window.addEventListener('keydown',this.onKeyDown.bind(this));
        window.addEventListener('keyup',this.onKeyUp.bind(this));
        this._scroll = new THREE.Vector2();
        this._scrollSpeed = new THREE.Vector2();
        this._lastEvent = new THREE.Vector2();
    }

    showStats(){
        this._stats = new Stats();
        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.top = '0px';
        document.body.appendChild( this._stats.domElement );
    }

    onKeyDown(e)
    {
        if(e.keyCode==37 || e.keyCode==65) this._scroll.x = -1;
        else if(e.keyCode==39|| e.keyCode==68) this._scroll.x = 1;
        else if(e.keyCode==38|| e.keyCode==87) this._scroll.y = 1;
        else if(e.keyCode==40|| e.keyCode==83) this._scroll.y = -1;
    }

    onKeyUp(e)
    {
        if(e.keyCode==37|| e.keyCode==65) this._scroll.x = 0;
        else if(e.keyCode==39 || e.keyCode==68) this._scroll.x = 0;
        else if(e.keyCode==38|| e.keyCode==87) this._scroll.y = 0;
        else if(e.keyCode==40|| e.keyCode==83) this._scroll.y = 0;
    }

    onMouseWheel(e) {
        if(e.altKey)
        {
            if(this._highLights[0])
            {
                var ref= this._highLights[0].object;
                ref.h  -= e.wheelDelta/10;

                if (ref.h > 400) {
                    ref.h= 400;
                }
                else if (ref.h < 1) {
                    ref.h = 1;
                }
                ref.setHeight(ref.h);
            }
        } else {
            this._camera.position.z -= e.wheelDelta / 10;
            if (this._camera.position.z < 500) {
                this._camera.position.z = 500;
            }
            else if (this._camera.position.z > 1500) {
                this._camera.position.z = 1500;
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
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize( this._width ,this._height );
        this._camera.aspect	= this._width  / this._height;
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

        if(this._scroll.x || this._scroll.y || this._scrollSpeed.x || this._scrollSpeed.y)
        {
            this._scrollSpeed.x = (this._scrollSpeed.x + this._scroll.x)*0.97;
            this._scrollSpeed.y = (this._scrollSpeed.y + this._scroll.y)*0.97;
            if(Math.abs(this._scrollSpeed.x)<0.5) this._scrollSpeed.x =0;
            if(Math.abs(this._scrollSpeed.y)<0.5) this._scrollSpeed.y =0;
            this._camera.position.x +=  this._scrollSpeed.x;
            this._camera.position.y += this._scrollSpeed.y;
            this._spotLight.target.position.x = this._camera.position.x;
            this._spotLight.target.position.y = this._camera.position.y + 500;
            this._spotLight.position.x = this._camera.position.x + (this._lastEvent.x - this.width /2) * 2;
            this._spotLight.position.y = this._camera.position.y + (this.height / 2 - this._lastEvent.y) * 2;
        }

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