        // modal
        var thoughtanautModal = document.getElementById('thoughtanautModal');
        var drumModal = document.getElementById('drumModal');
        var wizardModal = document.getElementById('wizardModal');
        var yeptiModal = document.getElementById('yeptiModal');

        var spans = document.querySelectorAll(".close");

        spans.forEach((span) => {
            span.addEventListener('click', () => {
                controls.enableZoom = true;
                                thoughtanautModal.style.opacity = 0;
                thoughtanautModal.style.pointerEvents = 'none';
                   drumModal.style.opacity = 0;
                drumModal.style.pointerEvents = 'none';
                yeptiModal.style.opacity = 0;
                yeptiModal.style.pointerEvents = 'none';
               wizardModal.style.opacity = 0;
                wizardModal.style.pointerEvents = 'none';
              
            })
        })

    

        //3D
        var container;
        var camera, scene, raycaster, renderer, controls;

        var mouse = new THREE.Vector2(),
            INTERSECTED;
        var radius = 100,
            theta = 0;
        var thoughtanaut;
        var drum;
        var wizard;
        var landscape;
        var yepti;
        const mixers = [];
        const clock = new THREE.Clock();

        var intersectsThoughtanaut;
        var intersectsWizard;
        var intersectsDrum;

        init();

        function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});
        
        function init() {
            window.addEventListener( 'resize', onWindowResize, false );

            container = document.createElement('div');
            document.body.appendChild(container);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

            camera.position.set(200, 200, 1400);

            var light = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(light);

            var pointLight = new THREE.PointLight(0xcc4b0e, 1.5);
            // soft white light
            pointLight.position.set(70, 0, 140);
            scene.add(pointLight);
            pointLight.castShadow = true;
            pointLight.shadow.mapSize.width = 2048; // default
            pointLight.shadow.mapSize.height = 2048; // default
            pointLight.shadow.camera.near = 0.5; // default
            pointLight.shadow.camera.far = 1050;

            //    

            //            var sphereSize = 1;
            //            var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
            //            scene.add( pointLightHelper );


            raycaster = new THREE.Raycaster();

            controls = new THREE.OrbitControls(camera, renderer);
            controls.autoRotate = true;
            controls.enablePan = false;
            controls.autoRotateSpeed = 0.4;
            controls.maxDistance = 300;
            controls.minDistance = 150;
            controls.maxPolarAngle = Math.PI / 1.75 * 1;
            controls.target.set(75, 5, 15);


            renderer = new THREE.WebGLRenderer();
            renderer.gammaOutput = true;
            renderer.gammaFactor = 2.2;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
            renderer.setClearColor(0x000000);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            console.log(scene);


            scene.fog = new THREE.Fog(0x000000, 0, 1760);
        }


        var loader = new THREE.GLTFLoader();


        loader.load(
            // resource URL
            'wizard.glb',
            // called when the resource is loaded
            function(gltf) {

                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.castShadow = true;
                    }
                });

                model = gltf.scene;
                mixer = new THREE.AnimationMixer(model);
                mixer.clipAction(gltf.animations[0]).play();
                wizard = model;
                scene.add(wizard);
                position();
            },
        );

        loader.load(
            // resource URL
            'thoughtanaut.glb',
            // called when the resource is loaded
            function(gltf) {

                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.castShadow = true;
                    }
                });


                model = gltf.scene;
                thoughtanaut = model;
                scene.add(thoughtanaut);
                position();

            },
        );

        loader.load(
            // resource URL
            'drum.glb',
            // called when the resource is loaded
            function(gltf) {


                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.castShadow = true;
                    }
                });

                model = gltf.scene;
                drum = model;
                scene.add(drum);
                position();


            },
        );
        
        loader.load(
            // resource URL
            'yepti.glb',
            // called when the resource is loaded
            function(gltf) {


                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.castShadow = false;
                    }
                });

                model = gltf.scene;
                yepti = model;
                scene.add(yepti);
                position();


            },
        );


        loader.load(
            // resource URL
            'scene.glb',
            // called when the resource is loaded
            function(gltf) {

                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.receiveShadow = true;
                        node.castShadow = true;
                    }

                });

                model = gltf.scene;
                landscape = model;
                scene.add(landscape);
                position();

            },
        );

        loader.load(
            // resource URL
            'eye.glb',
            // called when the resource is loaded
            function(gltf) {

                gltf.scene.traverse(function(node) {

                    if (node instanceof THREE.Mesh) {
                        node.receiveShadow = true;
                    }

                });

                model = gltf.scene;
                landscape = model;
                scene.add(landscape);
                position();
                mixer2 = new THREE.AnimationMixer(model);
                mixer2.clipAction(gltf.animations[0]).play();



            },
        );


        function position() {

            console.log("thoughtanaut");
            if (thoughtanaut) thoughtanaut.position.set(150, -20, 150)
            if (thoughtanaut) thoughtanaut.scale.set(300,300,300)
            if (drum) drum.position.set(0, -20, 150)
            if (drum) drum.scale.set(300,300,300)
            if (yepti) yepti.position.set(75, -30, 230)
            if (yepti) yepti.scale.set(300,300,300)
            if (wizard) wizard.scale.set(0.25, 0.25, 0.25)
            if (wizard) wizard.position.set(75, -80, 0)
            if (wizard) wizard.rotation.y = 6.4;
            if (landscape) landscape.scale.set(150, 150, 150)
            if (landscape) landscape.position.set(75, -335, -150)
            
   
        }
    
        


        function clicked(event) {

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersectsThoughtanaut = raycaster.intersectObjects(thoughtanaut.children);
            var intersectsDrum = raycaster.intersectObjects(drum.children);
            var intersectsWizard = raycaster.intersectObjects(wizard.children);
            var intersectsYepti = raycaster.intersectObjects(yepti.children);




            // PARROT INTERSECTION


            if (intersectsThoughtanaut.length > 0) {
                controls.enableZoom = false;
                drumModal.style.pointerEvents = 'none';
                drumModal.style.opacity = 0;
                yeptiModal.style.pointerEvents = 'none';
                yeptiModal.style.opacity = 0;
                wizardModal.style.pointerEvents = 'none';
                wizardModal.style.opacity = 0;
                thoughtanautModal.style.pointerEvents = 'all';
                thoughtanautModal.style.opacity = 1;
                console.log("u just clicked on the thoughtanaut")

                var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };

                var target = {
                    x: intersectsThoughtanaut[0].point.x,
                    y: intersectsThoughtanaut[0].point.y,
                    z: intersectsThoughtanaut[0].point.z
                }


                var Postween = new TWEEN.Tween(position).to(target, 1000);

                Postween.onUpdate(function() {
                    controls.target.x = position.x;
                    controls.target.y = position.y;
                    controls.target.z = position.z;
                });

                Postween.start();
            } else {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
            }

            if (intersectsWizard.length > 0) {
                controls.enableZoom = false;
                drumModal.style.pointerEvents = 'none';
                drumModal.style.opacity = 0;
                thoughtanautModal.style.pointerEvents = 'none';
                thoughtanautModal.style.opacity = 0;
                yeptiModal.style.pointerEvents = 'none';
                yeptiModal.style.opacity = 0;
                wizardModal.style.pointerEvents = 'all';
                wizardModal.style.opacity = 1;
                
                console.log("u just clicked on the thoughtanaut")

                var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };

                var target = {
                    x: intersectsWizard[0].point.x,
                    y: intersectsWizard[0].point.y,
                    z: intersectsWizard[0].point.z
                }


                var Postween = new TWEEN.Tween(position).to(target, 1000);

                Postween.onUpdate(function() {
                    controls.target.x = position.x;
                    controls.target.y = position.y;
                    controls.target.z = position.z;
                });

                Postween.start();
            } else {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
            }


            if (intersectsDrum.length > 0) {
                controls.enableZoom = false;
                thoughtanautModal.style.pointerEvents = 'none';
                thoughtanautModal.style.opacity = 0;
                wizardModal.style.pointerEvents = 'none';
                wizardModal.style.opacity = 0;
                yeptiModal.style.pointerEvents = 'none';
                yeptiModal.style.opacity = 0;
                drumModal.style.pointerEvents = 'all';
                drumModal.style.opacity = 1;

                var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };

                var target = {
                    x: intersectsDrum[0].point.x,
                    y: intersectsDrum[0].point.y,
                    z: intersectsDrum[0].point.z
                }


                var Postween = new TWEEN.Tween(position).to(target, 1000);

                Postween.onUpdate(function() {
                    controls.target.x = position.x;
                    controls.target.y = position.y;
                    controls.target.z = position.z;
                });

                Postween.start();
            } else {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
            }
            
            if (intersectsYepti.length > 0) {
                controls.enableZoom = false;
                drumModal.style.pointerEvents = 'none';
                drumModal.style.opacity = 0;
                wizardModal.style.pointerEvents = 'none';
                wizardModal.style.opacity = 0;
                thoughtanautModal.style.pointerEvents = 'none';
                thoughtanautModal.style.opacity = 0;
                yeptiModal.style.pointerEvents = 'all';
                yeptiModal.style.opacity = 1;
                console.log("u just clicked on the yepti")

                var position = {
                    x: controls.target.x,
                    y: controls.target.y,
                    z: controls.target.z
                };

                var target = {
                    x: intersectsYepti[0].point.x,
                    y: intersectsYepti[0].point.y,
                    z: intersectsYepti[0].point.z
                }


                var Postween = new TWEEN.Tween(position).to(target, 1000);

                Postween.onUpdate(function() {
                    controls.target.x = position.x;
                    controls.target.y = position.y;
                    controls.target.z = position.z;
                });

                Postween.start();
            } else {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
            }
        }

        renderer.domElement.addEventListener('mousedown', function(event) {
            // find intersections
            clicked(event);
            camera.updateMatrixWorld();

        });


        // ON MOUSEMOVE HIGHLIGHT MODEL

        renderer.domElement.addEventListener('mousemove', function(event) {

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);


            var intersectsArray = [wizard, thoughtanaut, drum, yepti];

            var intersects = raycaster.intersectObjects(intersectsArray, true);


            if (intersects.length > 0) {

                document.querySelector('html').style.cursor = 'pointer'
                document.querySelector('body').style.cursor = 'pointer'

                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                    INTERSECTED = intersects[0].object;
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0x1c1c1c);

                }

            } else {
                document.querySelector('html').style.cursor = 'default'
                document.querySelector('body').style.cursor = 'default'

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = null;

            }
        });




        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
            TWEEN.update();

            var delta = clock.getDelta();
            if (wizard) mixer.update(delta);
            if (landscape) mixer2.update(delta);

            if (thoughtanaut) thoughtanaut.rotation.y += 0.01;
            if (drum) drum.rotation.y += 0.01;
            if (yepti) yepti.rotation.y += 0.01;



        }

        animate();
