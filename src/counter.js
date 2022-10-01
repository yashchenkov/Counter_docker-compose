import express from 'express';
import redis from 'redis';

const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const client = redis.createClient({ url: REDIS_URL});
(async () => {
	await client.connect();
})

app.post('/counter/:bookId/incr', async (req, res) => {
	const { bookId } = req.params;
	try {
		const cnt = await client.incr(bookId);
		res.json({message: `Counter = ${cnt}`})
	} catch (e) {
		res.statusCode(500).json({ errmsg: "Error"});
	} 
})

app.get('/counter/:bookId', (req, res) => {
	const { bookId } = req.params;
	res.json({client})
})


app.listen(PORT);