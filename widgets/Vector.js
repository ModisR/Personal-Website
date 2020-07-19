function vec(...args){
    return Int16Array.from(args);
}

function scale(a, v){
    return v.map(x => a*x);
}
function add(v, w){
    return v.map( (x, i) => x+w[i]);
}