<?php
require '../../main.php';

main("Breakout", function()
{?>
    <canvas id="can" width=480 height=320 style="border:1px solid #fff"></canvas>

    <script src="../Vector.js"></script>
    <script src="Brick.js"></script>
    <script src="main.js"></script>
<?php
});?>