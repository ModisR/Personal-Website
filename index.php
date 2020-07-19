<?php
require 'main.php';

main("Dragon Curve", function(){
?>
    <h1>Dragon Curve</h1>

    <p>
    Imagine a long, thin strip of paper which has been folded in half many times.
    Opening each fold to 90&deg; approximates the dragon curve. 
    The result of 15 such folds is demonstrated below.
    </p>
    
    <canvas id="canvas"></canvas>
    <script src="assets/dragon-curve.js"></script>
    <script src="assets/main.js"></script>
<?php
});
?>
