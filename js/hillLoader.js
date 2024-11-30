
const loadEnvironment = (mtnUrl) => {
    totalModels++;
    fbxLoader.load(mtnUrl, (mountain) => {
        scene.add(mountain);
        mountain.position.y = -10; 
        let randX;
        do{
            randX = Math.random() * (1000 + 1000) - 1000; 
        }while (randX >= -200 && randX <= 200);
        mountain.position.x = randX;
        mountain.position.z = Math.random() * (-1000 + 100) - 100;
        mountain.scale.set(0.05, 0.05, 0.05);

        let hillTexture = textureLoader.load('./models/desertMountain/Textures/T_Mountains_desert.png');
        const hillMaterial = new THREE.MeshPhongMaterial({map: hillTexture});

        mountain.traverse(child => {
            if (child.isMesh) {
                child.material = hillMaterial;
            }
        });

        loadedModels++;
        checkLoadingComplete();
    });
};