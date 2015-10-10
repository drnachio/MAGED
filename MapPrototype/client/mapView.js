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

        let geometry = new THREE.BoxGeometry(600, 600, 600);
        let material = new THREE.MeshBasicMaterial({color: 0x3fF010, wireframe: true});

        {
            let radius = 400;
            let shape = new THREE.Shape();
            shape.moveTo(0, -radius);
            shape.lineTo(radius, -radius / 2);
            shape.lineTo(radius, radius / 2);
            shape.lineTo(0, radius);
            shape.lineTo(-radius, radius / 2);
            shape.lineTo(-radius, -radius / 2);
            shape.lineTo(0, -radius);
            let myGeometry = new THREE.ExtrudeGeometry(shape, {amount:100,curveSegments:0, steps:1, bevelEnabled:false});
            this._sheet = new THREE.Mesh(myGeometry, material);
            this._scene.add(this._sheet);
        }

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(this.width, this.height );
        this._running =false;
        console.log("Map View Created: " + this);

        document.body.appendChild(this._renderer.domElement);
        window.addEventListener('resize', this.onReseize.bind(this));
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
        this._sheet.rotation.x += 0.01;
        this._sheet.rotation.y += 0.02;
        this._renderer.render( this._scene, this._camera );
    }

};