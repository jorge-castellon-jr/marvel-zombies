import { Bindings } from '..';
import Client from '../SheetDB/index';

export default async function (env: Bindings) {
	// Marvel Zombies
	const mz_tabs = ['Heroes', 'Zombies', 'Bystanders', 'NPCs'];
	for (const tab of mz_tabs) {
		await getSet('702rgfxqcoor5', tab, env.marvel_zombies);
	}
	await setUnique({ namespace: env.marvel_zombies, getNamespaceKey: 'heroes', setNamespaceKey: 'sets', filterKey: 'set' });

	// DCeased
	const dc_tabs = ['Heroes', 'Zombies', 'Bystanders', 'NPCs'];
	for (const tab of dc_tabs) {
		await getSet('ci5n9lmw6s4bn', tab, env.dceased);
	}
	await setUnique({ namespace: env.dceased, getNamespaceKey: 'heroes', setNamespaceKey: 'sets', filterKey: 'set' });

	return {
		status: 200,
		body: 'OK',
	};
}

interface SetUnique {
	namespace: KVNamespace;
	getNamespaceKey: string;
	setNamespaceKey: string;
	filterKey: keyof CharacterData;
}

const setUnique = async ({ namespace, getNamespaceKey, setNamespaceKey, filterKey }: SetUnique) => {
	const data = await namespace.get(getNamespaceKey);
	const data_json = data ? await JSON.parse(data) : null;
	if (!data_json) return;

	const filter_data = data_json.map((hero: CharacterData) => hero[filterKey]);
	const unique_data = [...new Set(filter_data)];

	// set Core Box first and Stretch Goals last
	unique_data.sort((a, b) => {
		if (a === 'Core Box') return -1;
		if (b === 'Core Box') return 1;
		if (a === 'Stretch Goals') return 1;
		if (b === 'Stretch Goals') return -1;
		return 0;
	});

	await namespace.put(setNamespaceKey, JSON.stringify(unique_data));
};

interface CharacterData {
	character_name: string;
	set: string;
	alt_sculpt: string;
	ks_exclusive: string;
	attack: string;
	type: string;
	range: string;
	dice: string;
	to_hit: string;
	devour_effect: string;
	blue_skill_name: string;
	blue_skill_description: string;
	yellow_skill_name: string;
	yellow_skill_description: string;
	orange_skill_name: string;
	orange_skill_description: string;
	red_skill_name: string;
	red_skill_description: string;
	spawn_ability: string;
	toughness: string;
	character_image_url: string;
}

interface BasicKV<T = string> {
	[key: string]: T;
}

const getSet = async (address: string, tab: string, nameSpace: KVNamespace) => {
	const clientData: BasicKV[] = (await Client(address, { sheet: tab, sort_by: 'Set' })) as BasicKV[];
	const data: CharacterData[] = clientData.map((row) => {
		const modifiedRow: any = {};

		for (const key in row) {
			if (key === 'extra' && row[key]) {
				const extraData = JSON.parse(row[key]);
				for (const extraKey in extraData) {
					const newExtraKey = extraKey.toLowerCase().replace(/ /g, '_');
					modifiedRow[newExtraKey] = extraData[extraKey];
				}
				delete modifiedRow[key];
				console.log(modifiedRow);
			}
			const newKey = key.toLowerCase().replace(/ /g, '_');
			modifiedRow[newKey] = row[key];
		}
		return modifiedRow;
	});

	const completeData = data.filter((hero) => !!hero.attack);

	await nameSpace.put(tab.toLowerCase(), JSON.stringify(completeData));
};

interface MarvelZombiesData {
	[key: string]: BasicKV[];
}
interface AllData {
	marvel_zombies: MarvelZombiesData;
	dceased: any;
	custom_heroes: any;
}
export const getAll = async (env: Bindings) => {
	const data: AllData = {
		marvel_zombies: {},
		dceased: {},
		custom_heroes: {},
	};

	const mz_data = ['heroes', 'zombies', 'bystanders', 'npcs', 'sets'];
	for (const tab of mz_data) {
		const kv_data = await env.marvel_zombies.get(tab);
		data.marvel_zombies[tab] = kv_data ? await JSON.parse(kv_data) : null;
	}

	const dc_data = ['heroes', 'zombies', 'bystanders', 'npcs', 'sets'];
	for (const tab of dc_data) {
		const kv_data = await env.dceased.get(tab);
		data.dceased[tab] = kv_data ? await JSON.parse(kv_data) : null;
	}

	console.log(data);

	return data;
};
