function loadDino(url) {
    totalModels++;
    loader.load(url, 
        (gltf) => {
            dino = gltf.scene;
            scene.add(dino);
            dino.rotation.y = 9.5; 
            dino.rotation.z = 6.4;
            dino.position.y = -10;
            dino.position.x = -1;
            dino.position.z = -3;

            dino.scale.set(0.75, 0.75, 0.75); 

            if (gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(dino);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
            }

            loadedModels++;
            checkLoadingComplete();
        },
        (xhr) => {
            // Update the loading bar as a percentage of the total file size loaded
            const progress = (xhr.loaded / xhr.total) * 100;
            updateLoadingBar(progress);
        },
        (error) => {
            console.error(error);
            loadedModels++;
            checkLoadingComplete();
        }
    );
}
