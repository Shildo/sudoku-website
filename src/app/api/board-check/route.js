import { checkSolution } from '@/app/lib/functionalities';
import { getSolution } from '@/app/lib/functionalities';

export async function POST(req) {
	try {
		const board = await req.json();

		const solution = getSolution('latestSolution');

		if (!solution) {
			return new Response("No solution available", { status: 500 });
		}

		const isCorrect = checkSolution(board, solution);

		return new Response(JSON.stringify({ isCorrect }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error processing the request:', error);
		return new Response('Error processing the request', {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
