import { AppData, CharacterData, GameUniverse, PageId } from "@/store/AppStore";
import BoxCollectionSectionIcon from "./BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";
import { useApp } from "@/app/useApp";

export default function BoxCollectionSection({
	set,
	data,
	gameUniverse,
	allowZombiesHeroes,
}: {
	set: string;
	data: AppData["marvel_zombies"] | AppData["dceased"];
	gameUniverse: GameUniverse;
	allowZombiesHeroes?: boolean;
}) {
	const getSet = (set: string, characterData: CharacterData[]) => {
		return characterData.filter((character) => character.set === set);
	};

	const { setHeroSelected, setPageId } = useApp();

	return (
		<div key={set} className="grid gap-4">
			<div className="flex justify-center items-center w-full bg-slate-900 rounded-lg px-4 py-8 text-lg font-bold uppercase shadow-lg">
				{set}
			</div>
			<div className="grid grid-cols-4 gap-2">
				{getSet(set, data.heroes).map((hero) => (
					<BoxCollectionSectionIcon
						key={hero.character_name}
						name={hero.character_name}
						type={HeroType.Hero}
						onClick={() => {
							setHeroSelected({ hero, type: "heroes", gameUniverse });
							setPageId(PageId.HeroDetails);
						}}
					/>
				))}
				{allowZombiesHeroes &&
					getSet(set, data.zombies).map((zombie) => (
						<BoxCollectionSectionIcon
							key={zombie.character_name}
							name={zombie.character_name}
							type={HeroType.Zombie}
							onClick={() => {
								setHeroSelected({
									hero: zombie,
									type: "zombies",
									gameUniverse,
								});
								setPageId(PageId.HeroDetails);
							}}
						/>
					))}
			</div>
		</div>
	);
}
