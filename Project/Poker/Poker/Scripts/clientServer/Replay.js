﻿var gameHub = $.connection.gameHub;
var clientPos = 0;
var gameModel;

function start(model) {
    gameModel = model;

    //functions for client to call hub
    $.connection.hub.start().done(function () {
        clientPos = gameModel.position;

        gameHub.server.replay(gameModel.username, gameModel.position);
    });
}

gameHub.client.myPosition = function (username, position, amount, avatarURL) {
    clientPos = position;
    positionPlayer(position);
    setPlayerStats(username, position, amount, avatarURL);
};

gameHub.client.otherPlayers = function (username, position, amount, avatarURL) {
    setPlayerCard(position, "back", "back");
    setPlayerStats(username, position, amount, avatarURL);
};

gameHub.client.resetTable = function (card1, card2, pos) {
    resetSceen();
};

gameHub.client.getCards = function (card1, card2, pos) {
    if (clientPos === pos) {
        setPlayerCard(pos, card1, card2);
    }
    else {
        setPlayerCard(pos, "back", "back");
    }
};

gameHub.client.showSmallBlind = function (smallBlind, pos) {
    resetPlayerChips();
    setPlayerChips(pos, smallBlind, 1);
};

gameHub.client.showBigBlind = function (bigBlind, pos) {
    //resetPlayerChips();
    setPlayerChips(pos, bigBlind, 1);
};

gameHub.client.displayCardsOnTable = function (pos, cards) {
    //setTableCard(pos, card)
    for (var i = 0; i < cards.length; i++) {
        setTableCard(i, cards[i]);
    }
};

gameHub.client.showWinner = function (positions) {
    //mutiple winners posible
    for (var i = 0; i < positions.length; i++) {
        showWinner(positions[i], positions.length, 1);
    }
};

gameHub.client.flipCards = function (card1, card2, pos) {
    setPlayerCard(pos, card1, card2);
};

gameHub.client.displayPlayed = function (pos, result) {
    displayMove(pos, result, 1);
};

gameHub.client.displayPlayedMove = function (pos, move) {
    setMoveName(pos, move);
};