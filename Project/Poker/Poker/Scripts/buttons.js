﻿var check = function ()
{
    raiseAmount = 0;
    readyToPlay = true;
    disableButtons();
    commitAction();
}
var fold = function () {
    raiseAmount = -1;
    readyToPlay = true;
    disableButtons();
    commitAction();
}
var raise = function () {
    raiseAmount = parseInt(document.getElementById("raiseMoney").value);
    readyToPlay = true;
    disableButtons();
    commitAction();
}

var disableButtons = function () {
    document.getElementById("raise").disabled = true;
    document.getElementById("call").disabled = true;
    document.getElementById("fold").disabled = true;
}
var enableButtons = function () {

    document.getElementById("raise").disabled = false;
    document.getElementById("call").disabled = false;
    document.getElementById("fold").disabled = false;
}