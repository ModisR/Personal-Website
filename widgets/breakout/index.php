<?php
require '../../main.php';

main("Breakout", function()
{?>
    <canvas id="can" width=1280 height=720 style="border:1px solid #fff;display:block;margin:auto"></canvas>

    <script src="../Vector.js"></script>
    <script src="Brick.js"></script>
    <script src="Level.js"></script>
    <script src="main.js"></script>
<?php
});?>