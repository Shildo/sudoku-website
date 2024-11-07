"use client"

import { getSudoku } from "sudoku-gen";
import CryptoJS from "crypto-js";

let solutionHash = '';

export function fetchBoard(difficulty) {

	const { puzzle, solution } = getSudoku(difficulty);

	solutionHash = CryptoJS.SHA256(solution).toString();

	const puzzleArray = puzzle.split('').map(val => (val === '-' ? 0 : parseInt(val)));
	const formattedPuzzle = [];
	while (puzzleArray.length) formattedPuzzle.push(puzzleArray.splice(0, 9));

	return formattedPuzzle;
}

export function checkSolution(board) {
	return CryptoJS.SHA256(board.flat().join('')).toString() === solutionHash;
}
