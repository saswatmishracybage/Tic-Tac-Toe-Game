/* 
    @Created on : Dec 14, 2015, 11:33:28 AM
    @Author     : saswatmi
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
ticTacToeApp.controller( 'TicTacToeController', ['$scope', function ( $scope ) {

    $scope.currentPlayer = 'O';
    $scope.player = 'O';
    $scope.winner = null;
    $scope.boardSize = 3;
    $scope.boardSizeOptions = [3, 4, 5, 6, 7, 8, 9, 10];
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
        for ( var rowIndex = 0; rowIndex < $scope.boardSize; rowIndex++ ) {
            $scope.boardIndex.push( rowIndex );
            $scope.board[rowIndex] = [];
            for ( var columnIndex = 0; columnIndex < $scope.boardSize; columnIndex++ ) {
                $scope.board[rowIndex].push( null );
            }
        }
        $scope.newGame();
    };
/**
 * This function returns the value of each cell based on the index
 * @param {number} row
 * @param {number} column
 * @return the {string} of cell in the board
 */
    function cell( row, column ) {
        return $scope.board[row][column];
    };
/**
 * This functin decide the return value of each cell
 * default is '-'
 * @param {number} row
 * @param {number} column
 * @returns {stringt} the value of cell on each click
 */    

    $scope.cellText = function ( row, column ) {
        var value = cell(row, column);
        return value ? value : '-';
    };
/**
 * On each click of the cell it set the value to the cell
 * Alternate the players
 * decides who is the winner
 * @param {number} row
 * @param {number} column
 * 
 */
    $scope.cellClick = function ( row, column ) {
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
 * This function set the value of the cell
 * @param {number} row
 * @param {number} column
 * @param {string} value
 */

    function setCell( row, column, value ) {
        $scope.board[row][column] = value;

    };
/**
 * on each click it check the value horizontally, vertically and diagonally
 * declares the winner if any.
 * @param {number} row
 * @param {number} column
 * checkVertical variable builts the string to check the values along vertical direction
 * checkHorizontal variable builts the string to check the values along horizontal direction
 * checkRightToLeft variable builts the string to check the values along right to left diagonal
 * checkLeftToRight variable builts the string to check the values along left to right diagonal
 * checkHorizontalAnd and checkVerticalAnd variables concatenate the AND condition to the main string
 */
    function checkBoard( row, column ) {
        var winner, empty = false;

        // check for any empty cell
        for ( var i = 0; i < $scope.boardSize; i++ ) {
            for ( var j = 0; j < $scope.boardSize; j++ ) {
                if ( !cell( i, j ) )
                    empty = true;
            }
        }

        // check board vertically and horizontally  
        var checkHorizontal = '';
        var checkVertical = '';
        for (var index = 0; index < $scope.boardSize; index++) {
            checkHorizontal = "cell(" + index + ", 0)";
            checkVertical = "cell( 0, " + index + ")";

            for (var j = 1; j < $scope.boardSize; j++) {
                if (j > 1) {
                    var checkHorizontalAnd = checkHorizontal.split('==')[1];
                    var checkVerticalAnd = checkVertical.split('==')[1];
                } else {
                    var checkHorizontalAnd = checkHorizontal;
                    var checkVerticalAnd = checkVertical;
                }
                checkHorizontal = checkHorizontal + " && " + checkHorizontalAnd + " == cell(" + index + "," + j + " )";
                checkVertical = checkVertical + " && " + checkVerticalAnd + " == cell(" + j + "," + index + " )";
            }

            if ( eval( checkHorizontal ) ) {
                winner = cell(index, 0);
            }

            if ( eval( checkVertical ) ) {
                winner = cell(0, index);
            }
        }

        // check board diagonally
        var checkRightToLeft = '';
        var checkLeftToRight = '';
        var j = $scope.boardSize - 1;
        for (var i = 0; i < $scope.boardSize; i++) {
            if (i == 0) {
                checkRightToLeft += "cell(" + i + "," + j + ") && cell(" + i + "," + j + ")";
                checkLeftToRight = "cell(" + i + "," + i + ") && cell(" + i + "," + i + ")"
            } else {
                if ( i + 1 == $scope.boardSize ) {
                    checkRightToLeft += "== cell(" + i + "," + j + ")";
                    checkLeftToRight += "== cell(" + i + "," + i + ")";
                } else {
                    checkRightToLeft += "== cell(" + i + "," + j + ") && cell(" + i + "," + j + ")";
                    checkLeftToRight += "== cell(" + i + "," + i + ") && cell(" + i + "," + i + ")";
                }
            }
            j--;
        }
        
        if ( eval( checkRightToLeft ) ) {
            winner = cell( 0, $scope.boardSize - 1 );
        }
        
        if ( eval( checkLeftToRight ) ) {
            winner = cell( 0, 0 );
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
/**
 * 
 * This is the custome directive intended to show the result of the match.
 * @param {string} directive name
 * @param {function} function
 */
ticTacToeApp.directive( 'gameResult', function() {
    var btn = '<input type="button" class="btn" ng-click="newGame()" value="New Game" />';
    return {
        restrict : 'EA',
        template : '<strong  class="alert alert-success">{{winner}} !!</strong>'+btn
    }
})
