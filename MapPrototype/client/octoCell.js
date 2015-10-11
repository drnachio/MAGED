MAGED.Classes.octoCell = class octoCell {
    constructor(rad,h)
    {
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(0.0,0.0,0.0);
        this.geometry.vertices.push(100.0,0.0,0.0);
        this.geometry.vertices.push(100.0,100.0,0.0);

        let uvs = [];
        uvs.push(new THREE.Vector2(0.0,0.0));
        uvs.push(new THREE.Vector2(1.0,0.0));
        uvs.push(new THREE.Vector2(1.0,1.0));

        this.geometry.faces.push(new THREE.Face3(2,1,0));
        this.geometry.faceVertexUvs[0].push([uvs[0],uvs[1],uvs[2]]);
    }
}