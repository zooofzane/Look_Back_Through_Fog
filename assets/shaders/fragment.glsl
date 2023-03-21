precision mediump float;

varying vec4 vposition;
varying float gnoise;

// varying vec3 vColor;

void main()
{

        // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);
    // strength = 1.0 - strength;

    // // Diffuse point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.0;
    // strength = 1.0 - strength;

    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Final color
    vec3 nColor = vec3(0.1255, 0.1255, 0.1255);
    // vec3 color = mix(vec3(1.0, 1.0, 1.0), nColor, gl_PointCoord.z);
    vec3 color = mix(vec3(1.0, 1.0, 1.0) ,nColor, vposition.z/4.+.2);
    // vec3(gl_PointCoord.z)
    // gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vec3(pow(5.-vposition.z,3.)), 1.);
    // gl_FragColor = vec4(vec3(pow((5.-vposition.z)*gnoise,3.)), 1.);
    gl_FragColor = vec4(color*gnoise,vposition.z/4.+.2);
    // gl_FragColor = vec4(vec3(1.), 1.);


    // vec3 color = vec3(1.0, 1.0, 1.0);
    float dist = 0.;
    // dist = distance(vec3 vposition.xyz, vec3(0.5));
    // float trans = mix(0.,1.,dist);


    // gl_FragColor = vec4(color, 1.0);
}