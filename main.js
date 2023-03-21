
import * as THREE from 'three';
// import * as StackBlur from 'stackblur-canvas';
// import StackBlur from './blur.js';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    ImprovedNoise
} from 'three/examples/jsm/math/ImprovedNoise.js';
import {
    GUI
} from 'three/examples/jsm/libs/lil-gui.module.min.js';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import './style.css'
import {
    FontLoader
} from 'three/examples/jsm/loaders/FontLoader.js';
import {
    TextGeometry
} from 'three/examples/jsm/geometries/TextGeometry.js';
import tVertexShader from './assets/shaders/vertex.glsl'
import tFragmentShader from './assets/shaders/fragment.glsl'
import smokeVertexShader from './assets/shaders/smokevert.glsl'
import smokeFragmentShader from './assets/shaders/smokefrag.glsl'
import {
    CinematicCamera
} from 'three/examples/jsm/cameras/CinematicCamera.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import droidFont from "three/examples/fonts/droid/droid_sans_bold.typeface.json";
if (WebGL.isWebGL2Available() === false) {
    document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}
let tmaterial
// let ballmaterial
// let INTERSECTED;
let renderer, scene, camera;

let mesh;
let clock
const textloader = new FontLoader();
const parsedDroidFont = textloader.parse(droidFont);
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
let pointer, raycaster, isShiftDown = false;
/* ------------------------------ mouseinteract ----------------------------- */
raycaster = new THREE.Raycaster();
raycaster.params.Mesh.threshold = 60;
raycaster.far = 1;
// raycaster.near = 10;
pointer = new THREE.Vector2();
let indexball;
let timearray = []
let deatharray = []
let alltimestart, alltimeend, totaldeathnum, countryname
let allball = new THREE.Group();
let object;
let storeAttribute = {
    time: 0,
    sideA: null,
    sideB: null,
    location: 0
}

let canvas;
let length;
let detaildata, tsnedata;

// let aa
// let bb = 3
// let Unkraine = 2;
let parameters = {
    // threshold: 0.25,
    // opacity: 0.25,
    // range: 0.1,
    // steps: 100,
    selectstatue: 0,
    intervalinorout: 0,
    enableTimeDisplay: false,
    withinDays: 0,
    enableDistanceDisplay: false,
    nearByKM: 0,
    sideA: false,
    sideB: false,
    // country1: [Unkraine]
    // country2: [Unkraine]
    // country3: [Unkraine]
    // country4: [Unkraine]
};
let ballmaterial = new THREE.MeshPhysicalMaterial({
    color: 0x696969,
    blending: THREE.NoBlending,
    fog: true
})
let indexballgeometry = new THREE.SphereGeometry(.007);

// let lightt = new THREE.PointLight(0xffffff);
// scene.add(lightt)\
let nballmaterial
init();

animate();

function init() {

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
        deatharray = [];
        timearray = []
    }
    // console.log("run")
    clock = new THREE.Clock()
    let light = new THREE.PointLight(0xE0E0E0, 1, 100); // soft white light
    light.position.set(10, 10, 10);
    scene.add(light);
    let light1 = new THREE.PointLight(0xE0E0E0, 1, 100); // soft white light
    light1.position.set(-10, 0, -5);
    scene.add(light1);
    scene.fog = new THREE.Fog(0xFFFFFF, .25, 10)
    //    scene.add(fog);
    // aa = parameters.country1
    // if (aa = 0) {
    // detaildata = require('./detaildata/' + 'Afghanistan' + '.json');
    // tsnedata = require('./tsnedata/' + 'Afghanistan' + '.json');
    // } else if (aa = 1) {
    //     detaildata = require('./detaildata/' + 'Algeria' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Algeria' + '.json');
    // } else if (aa = 2) {
    // detaildata = require('./detaildata/' + 'Bosnia' + '.json');
    // tsnedata = require('./tsnedata/' + 'Bosnia' + '.json');
    // }
    // if (bb = 3) {
    //     detaildata = require('./detaildata/' + 'Brazil' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Brazil' + '.json');
    // }
    // else if (aa = 4) {
    //     detaildata = require('./detaildata/' + 'Colombia' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Colombia' + '.json');
    // }else if (aa = 5) {
    //     detaildata = require('./detaildata/' + 'DR' + '.json');
    //     tsnedata = require('./tsnedata/' + 'DR' + '.json');
    // }
    // else if (aa == 6) {
    //     detaildata = require('./detaildata/' + 'India' + '.json');
    //     tsnedata = require('./tsnedata/' + 'India' + '.json');
    // }else if (aa == 7) {
    //     detaildata = require('./detaildata/' + 'Iraq' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Iraq' + '.json');
    // }else if (aa == 8) {
    //     detaildata = require('./detaildata/' + 'Israel' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Israel' + '.json');
    // }else if (aa == 9) {
    //     detaildata = require('./detaildata/' + 'Mexico' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Mexico' + '.json');
    // }else if (aa == 10) {
    //     detaildata = require('./detaildata/' + 'Nepal' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Nepal' + '.json');
    // }else if (aa == 11) {
    //     detaildata = require('./detaildata/' + 'Nigeria' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Nigeria' + '.json');
    // }else if (aa == 12) {
    //     detaildata = require('./detaildata/' + 'Pakistan' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Pakistan' + '.json');
    // }else if (aa == 13) {
    //     detaildata = require('./detaildata/' + 'Philippines' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Philippines' + '.json');
    // }else if (aa == 14) {
    // detaildata = require('./detaildata/' + 'Russia' + '.json');
    // tsnedata = require('./tsnedata/' + 'Russia' + '.json');
    // }else if (aa == 15) {
    //     detaildata = require('./detaildata/' + 'Somalia' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Somalia' + '.json');
    // }else if (aa == 16) {
    //     detaildata = require('./detaildata/' + 'SriLanka' + '.json');
    //     tsnedata = require('./tsnedata/' + 'SriLanka' + '.json');
    // }else if (aa == 17) {
    //     detaildata = require('./detaildata/' + 'Syria' + '.json');
    //     tsnedata = require('./tsnedata/' + 'Syria' + '.json');
    // }else if (aa == 18) {
        // detaildata = require('./detaildata/' + 'Turkey' + '.json');
        // tsnedata = require('./tsnedata/' + 'Turkey' + '.json');
    // }else if (aa == 19) {
    // detaildata = require('./detaildata/' + 'uk' + '.json');
    // tsnedata = require('./tsnedata/' + 'uk' + '.json');
    // }else if (aa == 20) {
    detaildata = require('./detaildata/' + 'Ukraine' + '.json');
    tsnedata = require('./tsnedata/' + 'Ukraine' + '.json');
    // }else if(aa == 21) {
    //     detaildata = require('./detaildata/' + 'USA' + '.json');
    //     tsnedata = require('./tsnedata/' + 'USA' + '.json');
    // }


    canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, 32);
    gradient.addColorStop(0.0, '#7C7C7C');
    gradient.addColorStop(0.5, '#999999');
    gradient.addColorStop(1.0, '#C2C2C2');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, 32);

    /* -------------------------------------------------------------------------- */
    /*                                    smoke                                   */
    /* -------------------------------------------------------------------------- */
    const size = 88;
    const data = new Uint8Array(size * size * size);
    let i = 0;
    const scale = 0.08;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();
    for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
                data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
                i++;
            }
        }
    }
    const texture = new THREE.Data3DTexture(data, size, size, size);
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        depthWrite: true,
        uniforms: {
            base: {
                value: new THREE.Color(0x3D3D3D)
            },
            map: {
                value: texture
            },
            cameraPos: {
                value: new THREE.Vector3()
            },
            threshold: {
                value: 0.23
            },
            opacity: {
                value: 0.13
            },
            range: {
                value: 0.07
            },
            steps: {
                value: 55
            },
            frame: {
                value: 0
            }
        },
        vertexShader: smokeVertexShader,
        fragmentShader: smokeFragmentShader,
        side: THREE.BackSide,
        transparent: true
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(3, 3, 3)
    scene.add(mesh);

    /* -------------------------------------------------------------------------- */
    /*                                    text                                    */
    /* -------------------------------------------------------------------------- */
    tmaterial = new THREE.ShaderMaterial({
        depthWrite: true,
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending,
        vertexColors: true,
        uniforms: {
            uTime: {
                value: 0
            },
            selectstatue: {
                value: 0
            },
            intervalinorout: {
                value: 0
            },
        },
        vertexShader: tVertexShader,
        fragmentShader: tFragmentShader,
    });

    if (detaildata.length > 5000) {
        length = 5000;
    } else {
        length = detaildata.length;
    }
    for (let i = 0; i < length; i++) {
        timearray.push(parseFloat(detaildata[i].year));
        deatharray.push(parseFloat(detaildata[i].best));
        let fontsize = detaildata[i].best / 100000 * 5 + 0.008;
        let y_position = tsnedata[i].y * .08;
        let x_position = tsnedata[i].x * .08;
        let z_position = tsnedata[i].z * .08;
        let tgeometry = new TextGeometry(detaildata[i].conflict_name, {
            height: 0,
            size: fontsize,
            curveSegments: 1,
            font: parsedDroidFont,
        });
        object = new THREE.Mesh(tgeometry, tmaterial);
        object.position.set(x_position, y_position, z_position);
        scene.add(object);

        nballmaterial = new THREE.MeshStandardMaterial({
            color: 0x636363,
            blending: THREE.NoBlending,
            fog: true,
            emissive: 0x2E2E2E
        })


        //  changecolor();
        indexball = new THREE.Mesh(indexballgeometry, nballmaterial);

        indexball.position.set(x_position - .0055, y_position + .0025, z_position);
        let starttime = detaildata[i].date_start;
        let endtime = detaildata[i].date_end;
        indexball.userData.name = detaildata[i].dyad_name;
        indexball.userData.type = detaildata[i].type_of_violence;
        indexball.userData.start = starttime.split(' ')[0];
        indexball.userData.end = endtime.split(' ')[0];
        indexball.userData.location = detaildata[i].geom_wkt;
        indexball.userData.soldierdeath = detaildata[i].deaths_b + detaildata[i].deaths_a;
        indexball.userData.deaths_civilians = detaildata[i].deaths_civilians;
        indexball.userData.deaths_unknown = detaildata[i].deaths_unknown;
        indexball.userData.source_headline = detaildata[i].source_headline.split(';')[0];
        indexball.userData.time = detaildata[i].date_start.split(' ')[0].split('-')[0] * 365 + detaildata[i].date_start.split(' ')[0].split('-')[1] * 30 + detaildata[i].date_start.split(' ')[0].split('-')[2];
        indexball.userData.long = detaildata[i].longitude;
        indexball.userData.lat = detaildata[i].latitude;
        indexball.userData.cols = 0;
        if (detaildata[i].type_of_violence == 1) {
            indexball.userData.type = "State-based armed conflict *";
        } else if (detaildata[i].type_of_violence == 2) {
            indexball.userData.type = "Non-state conflict";
        } else if (detaildata[i].type_of_violence == 3) {
            indexball.userData.type = "One-sided violence";
        }
        allball.add(indexball);
        // console.log(allball)
        scene.add(allball);
    }
    // console.log(allball)
    alltimestart = Math.min(...timearray);
    alltimeend = Math.max(...timearray);
    totaldeathnum = sum(deatharray)
    countryname = detaildata[0].country;
    document.getElementById("alltime").innerHTML = "  " + alltimestart + " - " + alltimeend;
    document.getElementById("country").innerHTML = countryname;
    document.getElementById("alldeath").innerHTML = totaldeathnum;

    function update() {
        // material.uniforms.threshold.value = parameters.threshold;
        // material.uniforms.opacity.value = parameters.opacity;
        // material.uniforms.range.value = parameters.range;
        // material.uniforms.steps.value = parameters.steps;
        tmaterial.uniforms.selectstatue.value = parameters.selectstatue;
        tmaterial.uniforms.intervalinorout.value = parameters.intervalinorout;
    }

    const gui = new GUI();
    // // gui.add(parameters, 'threshold', 0, 1, 0.01).onChange(update);
    // // gui.add(parameters, 'opacity', 0, 1, 0.01).onChange(update);
    // // gui.add(parameters, 'range', 0, 1, 0.01).onChange(update);
    // // gui.add(parameters, 'steps', 0, 200, 1).onChange(update);
    // // gui.add(parameters, 'enableTimeDisplay').onChange(changecolor);
    // gui.add(parameters, 'withinDays', 0, 90, 1).onChange(update);
    // gui.add(parameters, 'enableDistanceDisplay').onChange(update);
    // gui.add(parameters, 'nearByKM', 0, 500, 1).onChange(update);
    // gui.add(parameters, 'country', {
    //     Afghanistan: 0,
    //     Algeria: 1,
    //     Bosnia: 2,
    //     Brazil: 3,
    //     Colombia: 4,
    //     DRCongo: 5,
    //     India: 6,
    //     Iraq: 7,
    //     Israel: 8,
    //     Mexico: 9,
    //     Nepal: 10,
    //     Nigeria: 11,
    //     Pakistan: 12,
    //     Philippines: 13,
    //     Russia: 14,
    //     Somalia: 15,
    //     SriLanka: 16,
    //     Syria: 17,
    //     Turkey: 18,
    //     UK: 19,
    //     Ukraine: 20,
    //     USA: 21
    // });
    window.addEventListener('resize', onWindowResize);

}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}


function sum(arr) {
    var s = 0;
    arr.forEach(function (val, idx, arr) {
        s += val;
    }, 0);
    return s;
};

function onPointerDown(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(allball.children, false);

    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.scale.set(2.5, 2.5, 2.5);
        for (let j = 0; j < length; j++) {
            let internaldis = distance(intersects[i].object.userData.lat, intersects[i].object.userData.long, allball.children[j].userData.lat, allball.children[j].userData.long, "M");
            let internaltime = Math.abs(intersects[i].object.userData.time - allball.children[j].userData.time);
            if (internaltime < 10) {
                allball.children[j].userData.timegreen = true
            } else {
                allball.children[j].userData.timegreen = false
            }
            if (internaldis < 90) {
                allball.children[j].userData.disred = true
            } else {
                allball.children[j].userData.disred = false
            }

            if (allball.children[j].userData.timegreen) {
                allball.children[j].material = new THREE.MeshStandardMaterial({
                    color: 0x77EAAA,
                    blending: THREE.NoBlending,
                    fog: true,
                    emissive: 0x4CA875
                })
            }
            if (allball.children[j].userData.disred) {
                allball.children[j].material = new THREE.MeshStandardMaterial({
                    color: 0xFE4C4C,
                    blending: THREE.NoBlending,
                    fog: true,
                    emissive: 0x8A2727
                })
            }
            if (allball.children[j].userData.disred == false && allball.children[j].userData.timegreen == false) {
                allball.children[j].material = new THREE.MeshStandardMaterial({
                    color: 0x636363,
                    blending: THREE.NoBlending,
                    fog: true,
                    emissive: 0x2E2E2E
                })
            }

            intersects[i].object.userData.cols++;
            if (allball.children[j].userData.cols > 0) {
                allball.children[j].material = new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                    blending: THREE.NoBlending,
                    fog: true,
                    emissive: 0xB2B2B2
                })
            }

        }
        document.getElementById("dyad_name").innerHTML = intersects[i].object.userData.name;
        document.getElementById("type").innerHTML = intersects[i].object.userData.type;
        document.getElementById("starttime").innerHTML = intersects[i].object.userData.start + " ——— " + intersects[i].object.userData.end;
        document.getElementById("location").innerHTML = intersects[i].object.userData.location;
        document.getElementById("deaths_soldier").innerHTML = "Soldiers death: " + intersects[i].object.userData.soldierdeath;
        document.getElementById("deaths_civilians").innerHTML = "Civilians death: " + intersects[i].object.userData.deaths_civilians;
        document.getElementById("deaths_unknown").innerHTML = "Unknown death: " + intersects[i].object.userData.deaths_unknown;
        document.getElementById("sourceheadline").innerHTML = '"' + intersects[i].object.userData.source_headline + '"';
    }
}

function onPointerMove(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(allball.children, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const elapsedTime = clock.getElapsedTime()
    requestAnimationFrame(animate);

    mesh.material.uniforms.cameraPos.value.copy(camera.position);
    scene.rotation.y = -performance.now() / 40000;

    controls.update();

    window.addEventListener('pointerdown', onPointerDown);
    // window.addEventListener('pointermove', onPointerMove);

    mesh.material.uniforms.frame.value++;
    tmaterial.uniforms.uTime.value = elapsedTime;
    renderer.render(scene, camera);

}