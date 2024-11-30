const loadBushes = (bushUrl)=>{
    fbxLoader.load(bushUrl, (bush)=>{
        scene.add(bush);
        bush.position.y = -15; 
        let bushX; 
        do{
            bushX = Math.random() * (1000 + 1000) - 1000; 
        }while(bushX >= -200 && bushX <= 200);
        bush.position.x = bushX; 
        bush.position.z = Math.random()*(-1000 + 100) - 100;
        bush.scale.set(0.25,0.25,0.25);

        let bushTexture = textureLoader.load('./models/desertplants/Textures/T_Desert_plants.png');
        const bushMaterial = new THREE.MeshPhongMaterial({map: bushTexture});

        bush.traverse(child => {
            if (child.isMesh) {
                child.material = bushMaterial;
            }
        });
    })
}