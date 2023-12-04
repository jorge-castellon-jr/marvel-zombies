import { atom } from "jotai";

export enum PageId {
	Home,
	MarvelZombies,
	Dceased,
	CustomHeroes,
	PickTeam,
}

export const usePageId = atom<PageId>(PageId.Home);

interface BaseData {
	character_name: string;
	set: string;
	ks_exclusive: string;
	character_image_url: string;
}
export interface CharacterData extends BaseData {
	alt_sculpt: string;
	attack: string;
	type: string;
	range: string;
	dice: string;
	to_hit: string;
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
}
export interface BystanderData extends BaseData {
	ability: string;
}
export interface NPCData extends BaseData {
	quantity: string;
}

export interface AppData {
	marvel_zombies: {
		heroes: CharacterData[];
		zombies: CharacterData[];
		bystanders: BystanderData[];
		npcs: NPCData[];
		sets: string[];
	};
	dceased: {
		heroes: CharacterData[];
		zombies: CharacterData[];
		bystanders: BystanderData[];
		npcs: NPCData[];
		sets: string[];
	};
	custom_heroes: {};
}

export const useAppData = atom<AppData>({} as AppData);
