/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
    Created on : Dec 14, 2015, 11:33:28 AM
    Author     : saswatmi
*/
/**
 * Tic Tac Toe Module
 * Main module object
 * @type @exp;angular@call;module
 */
var ticTacToeApp = angular.module( 'ticTacToeApp', [] );

/**
 * This is the controller for Tic Tac Toe game.
 * This will have all the configs rquired.
 * @param {obj} $scope
 * @param {function} function 
 */
ticTacToeApp.controller( 'TicTacToeController', ['$scope', function ($scope) {

    $scope.currentPlayer = 'O';
    $scope.player = 'O';
    $scope.winner = null;
    $scope.boardSize = 3;
    $scope.boardIndex = [0, 1, 2];
    $scope.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
/*
 * 
 * This function will change the board size on select of the drop down.
 * Default board size is 3 X 3;
 */
    $scope.changeBoardSize = function () {
        $scope.boardIndex = [];
        $scope.board = [];
        for (var rowIndex = 0; rowIndex < $scope.boardSize; rowIndex++) {
            $scope.boardIndex.push(rowIndex);
            $scope.board[rowIndex] = [];
            for (var columnIndex = 0; columnIndex < $scope.boardSize; columnIndex++) {
                $scope.board[rowIndex].push(null);
            }
        }
        $scope.newGame();
    };
/**
 * 
 * @param {number} row
 * @param {number} column
 * return the value of cell in the board
 */
    function cell(row, column) {
        return $scope.board[row][column];
    };
/**
 * 
 * @param {number} row
 * @param {number} column
 * @returns the value of cell on each click
 */    

    $scope.cellText = function (row, column) {
        var value = cell(row, column);
        return value ? value : '-';
    };
/**
 * 
 * @param {number} row
 * @param {number} column
 * on each click of the cell it set the value to the cell
 * alternate the players
 * decides who is the winner
 */
    $scope.cellClick = function (row, column) {
        if( $scope.winner ) {
            $scope.result = true;
            return false;
        }

        if( $scope.board[row][column] == null ) {
            setCell( row, column, $scope.player );
            checkBoard( row, column );
            if( 'O' == $scope.currentPlayer ) {
                $scope.currentPlayer = 'X';
                $scope.player = 'X';
            } else {
                $scope.currentPlayer = 'O';
                $scope.player = 'O';
            }
        }
    };
    
/**
 * 
 * @param {number} row
 * @param {number} column
 * @param {string} value
 * set the value to the cell of the board
 */

    function setCell(row, column, value) {
        $scope.board[row][column] = value;

    };
/**
 * 
 * @param {number} row
 * @param {number} column
 * on each click it check the value horizontally, vertically and diagonally
 * declares the winner if any.
 */
    function checkBoard( row, column ) {
        var winner, empty = false;

        // check for any empty cell
        for ( var i = 0; i < $scope.boardSize; i++ ) {
            for (var j = 0; j < $scope.boardSize; j++) {
                if (!cell(i, j))
                    empty = true;
            }
        }

        // check board vertically and horizontally  
        var horizonCondt = '';
        var verticalCondt = '';
        for (var index = 0; index < $scope.boardSize; index++) {
            horizonCondt = "cell(" + index + ", 0)";
            verticalCondt = "cell( 0, " + index + ")";

            for (var j = 1; j < $scope.boardSize; j++) {
                if (j > 1) {
                    horizonAndCondt = horizonCondt.split('==')[1];
                    verticAndlCondt = verticalCondt.split('==')[1];
                } else {
                    horizonAndCondt = horizonCondt;
                    verticAndlCondt = verticalCondt;
                }

                horizonCondt = horizonCondt + " && " + horizonAndCondt + " == cell(" + index + "," + j + " )";
                verticalCondt = verticalCondt + " && " + verticAndlCondt + " == cell(" + j + "," + index + " )";
            }

            if ( eval( horizonCondt ) ) {
                winner = cell(index, 0);
            }

            if ( eval( verticalCondt ) ) {
                winner = cell(0, index);
            }

        }

        // check board diagonally
        var strRightToLeft = '';
        var strLeftToRight = '';
        var j = $scope.boardSize - 1;
        for (var i = 0; i < $scope.boardSize; i++) {
            if (i == 0) {
                strRightToLeft += "cell(" + i + "," + j + ") && cell(" + i + "," + j + ")";
                strLeftToRight = "cell(" + i + "," + i + ") && cell(" + i + "," + i + ")"
            } else {
                if (i + 1 == $scope.boardSize) {
                    strRightToLeft += "== cell(" + i + "," + j + ")";
                    strLeftToRight += "== cell(" + i + "," + i + ")";
                } else {
                    strRightToLeft += "== cell(" + i + "," + j + ") && cell(" + i + "," + j + ")";
                    strLeftToRight += "== cell(" + i + "," + i + ") && cell(" + i + "," + i + ")";
                }
            }
            j--;

        }
        
        if (eval(strRightToLeft)) {
            winner = cell(0, $scope.boardSize - 1);
        }
        if (eval(strLeftToRight)) {
            winner = cell(0, 0);
        }

        // no more empty cell - no winner
        if ( !empty && !winner ) {
            $scope.winner = 'Oops !! Its a tie';
            return false;
        }

        // winner? declare!
        if ( winner ) {
            $scope.winner = 'Winner is '+winner;
        }
    };
/**
 * 
 * This function reset the game when user clicks on new game or change the board size.
 * The game will start form starting.
 */
    $scope.newGame = function () {
        for (var i = 0; i < $scope.boardSize; i++) {
            for (var j = 0; j < $scope.boardSize; j++) {
                setCell(i, j, null);
            }
        }
        $scope.currentPlayer = 'O';
        $scope.player = 'O';
        $scope.winner = null;
    };

}]);

ticTacToeApp.directive( 'winnerDirective', function() {
    var btn = '<input type="button" class="btn" ng-click="newGame()" value="New Game" />';
    return {
        restrict : 'EA',
        template : '<h1>{{winner}} !! '+btn+'</h1>'
    }
})
