import { atom } from "jotai";

export enum PageId {
	Home,
	BoxCollection,
	CustomHeroes,
	PickTeam,
	HeroDetails,
	Search,
}

export const usePageId = atom<PageId>(PageId.Home);

interface BaseData {
	character_name: string;
	set: string;
	ks_exclusive: string;
	character_image_url: string;
	character_thumbnail: string;
}
export interface CharacterData extends BaseData {
	id: string;
	alt_sculpt: string;
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
	spawn_card_ability: string;
	toughness: string;
	short_description: string;
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

export enum GameUniverse {
	MarvelZombies = "Marvel Zombies",
	DCeased = "DCeased",
}

export interface HeroSelection {
	gameUniverse: GameUniverse;
	type: "heroes" | "zombies";
	hero: CharacterData;
}

export type SearchResults = CharacterData & {
	searchType: string;
	gameUniverse: GameUniverse;
};

export const useHeroSelection = atom<HeroSelection>({} as HeroSelection);

export const useSearch = atom<string>("");
export const useSearchResults = atom<SearchResults[]>([]);
