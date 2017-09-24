﻿var gameHub = $.connection.gameHub;
var clientPos = 0;
var gameModel;
var currentHand = [];

function start(model) {
    gameModel = model;

    //functions for client to call hub
    $.connection.hub.start().done(function () {

        gameHub.server.enterGame(gameModel.username, gameModel.gameName);


    });
}

$.connection.hub.disconnected(function () {
    gameHub.server.exitGame(clientPos, gameModel.gameName);
    //remove avatar
});

//functions for hub to call
gameHub.client.myPosition = function (username, position, amount, avatarURL) {
    clientPos = position;
    positionPlayer(position);
    setPlayerStats(username, position, amount, avatarURL);
};

gameHub.client.otherPlayers = function (username, position, amount, avatarURL) {
    setPlayerCard(position, "back", "back");
    setPlayerStats(username, position, amount, avatarURL);
};

gameHub.client.displayPlayer = function (username, position, amount, avatarURL) {
    setPlayerStats(username, position, amount, avatarURL);
};

gameHub.client.getCards = function (card1, card2, pos) {
    if (clientPos === pos) {
        setPlayerCard(pos, card1, card2);
    }
    else {
        setPlayerCard(pos, "back", "back");
    }
};

gameHub.client.resetTable = function (card1, card2, pos) {
    resetSceen();
};

gameHub.client.showSmallBlind = function (smallBlind, pos) {
    resetPlayerChips();
    setPlayerChips(pos, smallBlind);
};

gameHub.client.showBigBlind = function (bigBlind, pos) {
    //resetPlayerChips();
    setPlayerChips(pos, bigBlind);
};

gameHub.client.youAreNext = function (pos, amount, bigBlind) {
    if (pos == clientPos) {
        playMan(pos, amount, bigBlind);

    }
};

gameHub.client.displayPlayed = function (pos, result) {
    displayMove(pos, result);
};

gameHub.client.displayCardsOnTable = function (pos, cards) {
    //setTableCard(pos, card)
    for (var i = 0; i < cards.length; i++)
    {
        setTableCard(i, cards[i]);
    }
};

gameHub.client.showWinner = function (pos) {
    //showWinner
};

gameHub.client.displayMessage = function (username, message) {
    //show message
}

function sendMessage(message) {
    gameHub.server.send(gameModel.gameName, gameModel.username, message);
}