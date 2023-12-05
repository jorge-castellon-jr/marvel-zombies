"use client";
import { useState } from "react";
import { useApp } from "@/app/useApp";
import { AppData, GameUniverse, PageId } from "@/store/AppStore";
import BoxCollectionSection from "./BoxCollectionSection";

export default function BoxCollectionView({
	data: { marvel_zombies, dceased },
}: {
	data: AppData;
}) {
	const [gameUniverse, setGameUniverse] = useState<GameUniverse | null>(
		GameUniverse.MarvelZombies
	);

	const isMarvelZombies = gameUniverse == GameUniverse.MarvelZombies;
	const isDCeased = gameUniverse == GameUniverse.DCeased;

	const { pageId, setPageId } = useApp();

	return (
		<div
			className={`p-4 view gap-8 ${
				pageId == PageId.MarvelZombies && "view--active"
			}`}
		>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => setPageId(PageId.Home)}
			>
				Back
			</a>
			<div className="grid grid-cols-2 border-2 p-2 rounded-lg border-slate-700 gap-2">
				<button
					className={`${
						isMarvelZombies && "bg-slate-700"
					}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
					onClick={() => setGameUniverse(GameUniverse.MarvelZombies)}
				>
					Marvel Zombies
				</button>
				<button
					className={`${
						isDCeased && "bg-slate-700"
					}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
					onClick={() => setGameUniverse(GameUniverse.DCeased)}
				>
					DCeased
				</button>
			</div>
			<div className="grid gap-8">
				{/* {JSON.stringify(heroSelected)} */}
				{marvel_zombies &&
					isMarvelZombies &&
					marvel_zombies.sets.map((set: string) => (
						<BoxCollectionSection
							key={set}
							set={set}
							data={marvel_zombies}
							gameUniverse={GameUniverse.MarvelZombies}
							allowZombiesHeroes
						/>
					))}
				{dceased &&
					isDCeased &&
					dceased.sets.map((set: string) => (
						<BoxCollectionSection
							key={set}
							set={set}
							data={dceased}
							gameUniverse={GameUniverse.DCeased}
						/>
					))}
			</div>
		</div>
	);
}
