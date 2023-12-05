import { Hono } from 'hono';
import SaveToKV from './GET/SaveToKV';
import AllData from './GET/AllData';

export interface Bindings {
	[key: string]: KVNamespace;
	marvel_zombies: KVNamespace;
	dceased: KVNamespace;
	custom_heroes: KVNamespace;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/', async (c, next) => {
	return new Response(JSON.stringify(await SaveToKV(c.env)), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
});
app.use('/__scheduled', async (c, next) => {
	return new Response(JSON.stringify(await SaveToKV(c.env)), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

app.use('/all', async (c, next) => {
	return new Response(JSON.stringify(await AllData(c.env)), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

export default app;
