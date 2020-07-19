function vec(...args){
    return Float64Array.from(args);
}

function scale(a, v){
    return v.map(x => a*x);
}
function plus(v, w){
    return v.map( (x, i) => x+w[i]);
}
function minus(v, w){
    return v.map( (x, i) => x-w[i]);
}

function inner(v, w){
    return v.reduce((a, b, i) => a + b*w[i], 0);
}

function len2(v){
    return v.reduce((a, b) => a+b*b, 0);
}

function len(v){
    return Math.sqrt(len2(v));
}


function dis2(v, w){
    return len2(minus(v, w));
}


function norm(v){
    return scale(1/len(v), v);
}