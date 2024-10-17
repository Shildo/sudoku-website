import { fetchBoard } from '@/app/lib/functionalities';

export function GET(req) {
	const board = fetchBoard();
	return new Response(JSON.stringify(board), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
