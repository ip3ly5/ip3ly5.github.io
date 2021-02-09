// modal
let visibleModals = document.getElementsByClassName("modal");
var thoughtanautModal = document.getElementById('thoughtanautModal');
var houndsModal = document.getElementById('houndsModal');
var duckhiveModal = document.getElementById('duckhiveModal');
var wizardModal = document.getElementById('wizardModal');
var housifyModal = document.getElementById('housifyModal');
var instructions = document.getElementById('instructions');

var spans = document.querySelectorAll(".close");

spans.forEach((span) => {
    span.addEventListener('click', () => {

        for (var i = 0; i < visibleModals.length; i++) {
            visibleModals[i].style.opacity = "0";
            visibleModals[i].style.pointerEvents = "none";
        }
        controls.enableZoom = true;
    })
})

//3D
var camera, scene, raycaster, renderer, controls;
let spacer = document.getElementById('spacer');

var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;
var thoughtanaut;
var hounds;
var wizard;
var landscape;
var housify;
var eye;
var duckhive;
var container = document.getElementById('canvas');

const mixers = [];
const clock = new THREE.Clock();

var intersectsThoughtanaut;
var intersectsWizard;
var intersectshounds;

init();

function preventBehavior(e) {
    e.preventDefault();
};

document.addEventListener("touchmove", preventBehavior, {
    passive: false
});

function init() {
    window.addEventListener('resize', onWindowResize, false);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 1, 10000);

    camera.position.set(200, 200, 1400);

    var light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(light);

    var pointLight = new THREE.PointLight(0xcc4b0e, 1.8);
    // soft white light
    pointLight.position.set(70, 0, 140);
    scene.add(pointLight);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 562; // default
    pointLight.shadow.mapSize.height = 562; // default
    pointLight.shadow.camera.near = 0.5; // default
    pointLight.shadow.camera.far = 500;

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
    container.appendChild(renderer.domElement);

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(container.offsetWidth / container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    renderer.setSize(container.offsetWidth, container.offsetHeight);


    scene.fog = new THREE.Fog(0x000000, 0, 1700);
}


var loader = new THREE.GLTFLoader();
var modelArray = ['Wizard', 'Thoughtanaut', 'Hounds', 'Housify', 'Duckhive', 'Scene', 'Eye'];
modelArray.forEach(function (obj, i) {

    loader.load(
        // resource URL
        obj + '.glb',
        // called when the resource is loaded
        function (gltf) {

            if(obj != 'Eye') {
                gltf.scene.traverse(function (node) {
                    if (node instanceof THREE.Mesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
            }
            let model = gltf.scene;
            model.name = obj;
            

            switch (i) {
                case 0:
                    mixer = new THREE.AnimationMixer(model);
                    mixer.clipAction(gltf.animations[0]).play();
                    wizard = model;
                    scene.add(wizard);
                    wizard.scale.set(0.25, 0.25, 0.25)
                    wizard.position.set(75, -80, 0)
                    wizard.rotation.y = 6.4;
                    break;
                case 1:
                    thoughtanaut = model;
                    scene.add(thoughtanaut);
                    thoughtanaut.position.set(150, -20, 150)
                    thoughtanaut.scale.set(300, 300, 300)
                    thoughtanaut.rotation.x = Math.PI / 2;
                    break;
                case 2:
                    hounds = model;
                    scene.add(hounds);
                    hounds.position.set(0, -20, 150)
                    hounds.scale.set(300, 300, 300)
                    hounds.rotation.x = Math.PI / 2;
                    break;
                case 3:
                    housify = model;
                    scene.add(housify);
                    housify.position.set(45, -30, 230)
                    housify.scale.set(300, 300, 300)
                    housify.rotation.x = Math.PI / 2; 
                    break;
                case 4:
                    duckhive = model;
                    scene.add(duckhive);
                    duckhive.position.set(115, -30, 230)
                    duckhive.scale.set(300, 300, 300)
                    duckhive.rotation.x = Math.PI / 2;
                    break;
                case 5:
                    landscape = model;
                    scene.add(landscape);
                    landscape.scale.set(150, 150, 150)
                    landscape.position.set(75, -335, -150)
                    break;
                case 6:
                    mixer2 = new THREE.AnimationMixer(model);
                    mixer2.clipAction(gltf.animations[0]).play();
                    landscape = model;
                    scene.add(landscape);
                    landscape.scale.set(150, 150, 150)
                    landscape.position.set(75, -335, -150)
                    break;
            }

        },
    );

});




function clicked(event) {
    mouse.x = ((event.clientX - spacer.offsetWidth) / container.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.offsetHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersectsArray = [wizard, thoughtanaut, hounds, duckhive, housify];
    var intersects = raycaster.intersectObjects(intersectsArray, true);

    if (intersects.length > 0) {
        navClicked(intersects[0].object.parent.name);
        instructions.style.opacity = "0";
           instructions.style.pointerEvents = "none";
    }

}

renderer.domElement.addEventListener('mousedown', function (event) {
    // find intersections
    clicked(event);
    camera.updateMatrixWorld();

});

// ON MOUSEMOVE HIGHLIGHT MODEL

renderer.domElement.addEventListener('mousemove', function (event) {

    mouse.x = ((event.clientX - spacer.offsetWidth) / container.offsetWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);


    var intersectsArray = [wizard, thoughtanaut, hounds, duckhive, housify];

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

    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);

}

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    TWEEN.update();

    var delta = clock.getDelta();

    if (wizard && landscape && thoughtanaut && duckhive && hounds && housify) { 
        mixer.update(delta);
        mixer2.update(delta);
        thoughtanaut.rotation.z += 0.01;
        duckhive.rotation.z += 0.01;
        hounds.rotation.z += 0.01;
        housify.rotation.z += 0.01;
    }
}

function navClicked(obj) {

    for (var i = 0; i < visibleModals.length; i++) {
        visibleModals[i].style.opacity = "0";
        visibleModals[i].style.pointerEvents = "none";

    }

    switch (obj) {

        case 'Wizard':
            var target = {
                x: 75,
                y: 0,
                z: 0
            }
            wizardModal.style.opacity = 1;
            wizardModal.style.pointerEvents = 'all';
            break;

        case 'Housify':

            var target = {
                x: 45,
                y: -20,
                z: 230
            }
            housifyModal.style.opacity = 1;
            housifyModal.style.pointerEvents = 'all';
            break;

        case 'Hounds':

            var target = {
                x: 0,
                y: -20,
                z: 150
            }
            houndsModal.style.opacity = 1;
            houndsModal.style.pointerEvents = 'all';
            break;

        case 'Thoughtanaut':

            var target = {
                x: 150,
                y: -20,
                z: 150
            }
            thoughtanautModal.style.opacity = 1;
            thoughtanautModal.style.pointerEvents = 'all';
            break;
        
        case 'Duckhive':
            var target = {
                x: 115,
                y: -30,
                z: 230
            }
            duckhiveModal.style.opacity = 1;
            duckhiveModal.style.pointerEvents = 'all';
            break;

    }

    var position = {
        x: controls.target.x,
        y: controls.target.y,
        z: controls.target.z
    };
    
    var Postween = new TWEEN.Tween(position).to(target, 1000);

    Postween.onUpdate(function () {
        controls.target.x = position.x;
        controls.target.y = position.y;
        controls.target.z = position.z;
    });

    Postween.start();
}

animate();