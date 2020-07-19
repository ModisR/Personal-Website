<?php
function main($title, $content)
{?>
    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/assets/main.css">
        <title><?=$title?></title>
    </head>
    
    <body><?=$content()?></body>
    </html>

<?php }?>
