"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import BoxSection from "@/components/Sections/BoxSections";
import { useApp } from "@/app/useApp";
import { Section, HeroType } from "../../types/HeroTypes";
import { AppData, CharacterData } from "@/store/AppStore";
import BoxCollectionSection from "./BoxCollectionSection";

export default function BoxCollectionView({
	data: { marvel_zombies, dceased },
}: {
	data: AppData;
}) {
	enum GameUniverse {
		MarvelZombies = "Marvel Zombies",
		DCeased = "DCeased",
	}
	const [gameUniverse, setGameUniverse] = useState<GameUniverse | null>(null);

	const toggleGameUniverse = (newGameUniverse: GameUniverse) => {
		newGameUniverse == gameUniverse
			? setGameUniverse(null)
			: setGameUniverse(newGameUniverse);
	};

	const tabList = [
		{
			id: GameUniverse.MarvelZombies,
			label: GameUniverse.MarvelZombies,
			action: () => toggleGameUniverse(GameUniverse.MarvelZombies),
		},
		{
			id: GameUniverse.DCeased,
			label: GameUniverse.DCeased,
			action: () => toggleGameUniverse(GameUniverse.DCeased),
		},
	];

	const isMarvelZombies =
		gameUniverse == GameUniverse.MarvelZombies || gameUniverse == null;
	const isDCeased =
		gameUniverse == GameUniverse.DCeased || gameUniverse == null;

	return (
		<div className="p-4">
			<div>
				Filters:
				<Tabs list={tabList} active={gameUniverse} />
			</div>
			<div className="grid gap-8">
				{isMarvelZombies && (
					<div className="w-full border-b border-gray-800 text-3xl text-center p-4">
						Marvel Zombies
					</div>
				)}
				{marvel_zombies &&
					isMarvelZombies &&
					marvel_zombies.sets.map((set: string) => (
						<BoxCollectionSection key={set} set={set} data={marvel_zombies} />
					))}
				<div className="w-full border-b border-gray-800 text-3xl text-center p-4">
					Dceased
				</div>
				{dceased &&
					isDCeased &&
					dceased.sets.map((set: string) => (
						<div key={set}>
							<div className="flex justify-center items-center w-full bg-slate-800 rounded-lg px-4 py-8 text-lg font-bold uppercase shadow-lg">
								{set}
							</div>
							<div className="grid grid-cols-4 gap-4"></div>
						</div>
					))}
			</div>
		</div>
	);
}
