import { Bindings } from '..';
import { getAll } from './SaveToKV';

export default async (env: Bindings) => {
	const data = await getAll(env);
	return data;
};
