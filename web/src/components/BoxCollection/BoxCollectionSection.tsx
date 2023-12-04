import { AppData, CharacterData } from "@/store/AppStore";
import BoxCollectionSectionIcon from "./BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";

export default function BoxCollectionSection({
	set,
	data,
}: {
	set: string;
	data: AppData["marvel_zombies"] | AppData["dceased"];
}) {
	const getSet = (set: string, characterData: CharacterData[]) => {
		return characterData.filter((character) => character.set === set);
	};
	return (
		<div key={set} className="grid gap-4">
			<div className="flex justify-center items-center w-full bg-slate-800 rounded-lg px-4 py-8 text-lg font-bold uppercase shadow-lg">
				{set}
			</div>
			<div className="grid grid-cols-4 gap-4">
				{getSet(set, data.heroes).map((hero) => (
					<BoxCollectionSectionIcon
						key={hero.character_name}
						name={hero.character_name}
						type={HeroType.Hero}
					/>
				))}
				{getSet(set, data.zombies).map((zombie) => (
					<BoxCollectionSectionIcon
						key={zombie.character_name}
						name={zombie.character_name}
						type={HeroType.Zombie}
					/>
				))}
			</div>
		</div>
	);
}
