import { AppData, CharacterData } from "@/store/AppStore";
import { getSections } from "../sections/GetSections";
import { HeroType } from "@/types/HeroTypes";

const getAllData = async (): Promise<AppData> => {
	const url = "https://zombies-api.heroesgrid.com/all";
	const response = await fetch(url);
	const json = await response.json();

	const sections = await getSections();

	const setMapper: { [key: string]: string } = {
		"Core Box": "Marvel",
		"X-Men Resistance": "Marvel X Men",
		"Fantastic 4: Under Siege": "Marvel Fantastic 4",
		"Guardians of the Galaxy Set": "Marvel Guardians",
		"Hydra Resurrection": "Marvel Hydra",
		"Sentinel Strike": "Marvel Sentinel Strike",
		"Clash of the Sinister Six": "Marvel Sinister 6",
		"Galactus the Devourer": "Galactus ",
		"Artist's Special Edition Set": "Marvel Artist",
		"Stretch Goals": "Marvel K S",
	};
	json.marvel_zombies.sets = json.marvel_zombies.sets.map((set: string) => ({
		name: set,
		image:
			sections.find((section) => section.boxName == setMapper[set])?.boxImage ||
			"",
	}));

	const allHeroes = sections.map((section) => section.heroes).flat();
	const zombies = allHeroes.filter((hero) => hero.type === HeroType.Zombie);

	json.marvel_zombies.zombies = json.marvel_zombies.zombies.map(
		(hero: CharacterData) => {
			if (!!hero.character_thumbnail) return hero;

			const heroData = zombies.find(
				(h) =>
					(h.name === hero.character_name ||
						h.name === hero.character_name.replace("-", " ") ||
						h.name === hero.character_name.replace(".", "")) &&
					h.type === HeroType.Zombie
			);
			return {
				...hero,
				character_thumbnail: heroData?.image || "",
			};
		}
	);

	return json;
};

export const GET = async () => {
	const data = await getAllData();
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
