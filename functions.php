<?php
/**
 * Created by PhpStorm.
 * User: Gauntly
 * Date: 28/05/17
 * Time: 2:38 PM
 */

function generateReferenceCode(){
    return strtoupper(substr(str_shuffle(md5(microtime())),0,6));
}