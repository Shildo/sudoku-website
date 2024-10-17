import { fetchBoard } from '@/app/lib/functionalities';

export async function GET(req) {
	const board = await fetchBoard();
	return new Response(JSON.stringify(board), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store, max-age=0',
		},
	});
}
