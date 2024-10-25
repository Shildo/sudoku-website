import { fetchBoard } from '@/app/lib/serverSideFunctions';

export const dynamic = 'force-dynamic';

export async function GET(req) {
	const url = new URL(req.url);
	const difficulty = url.searchParams.get('difficulty') || '';
	const board = await fetchBoard(difficulty);
	return new Response(JSON.stringify(board), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-store, max-age=0',
		},
	});
}
