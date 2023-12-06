"use client";
import { useState } from "react";
import { useApp } from "@/app/useApp";
import { AppData, GameUniverse, PageId } from "@/store/AppStore";
import BoxCollectionSection from "./BoxCollectionSection";
import SearchInput from "../Search/SearchInput";
import { PageView } from "@/types/PageView";

export default function BoxCollectionView({
	data: { marvel_zombies, dceased },
	active,
}: {
	data: AppData;
} & PageView) {
	const { setPageId } = useApp();
	const [gameUniverse, setGameUniverse] = useState<GameUniverse | null>(
		GameUniverse.MarvelZombies
	);

	const isMarvelZombies = gameUniverse == GameUniverse.MarvelZombies;
	const isDCeased = gameUniverse == GameUniverse.DCeased;

	return (
		<div className={`view gap-8 ${active && "view--active"}`}>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => setPageId(PageId.Home)}
			>
				Back
			</a>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => setPageId(PageId.PickTeam)}
			>
				Pick Your Team
			</a>
			<SearchInput onClick={() => setPageId(PageId.Search)} />
			<div className="grid grid-cols-2 border-2 p-1 rounded-lg border-slate-700 gap-2">
				<a
					className={`${
						isMarvelZombies && "bg-slate-700"
					}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
					onClick={() => setGameUniverse(GameUniverse.MarvelZombies)}
				>
					Marvel Zombies
				</a>
				<a
					className={`${
						isDCeased && "bg-slate-700"
					}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
					onClick={() => setGameUniverse(GameUniverse.DCeased)}
				>
					DCeased
				</a>
			</div>
			<div className="grid gap-8">
				{marvel_zombies &&
					isMarvelZombies &&
					marvel_zombies.sets.map((set: string) => (
						<BoxCollectionSection
							key={set}
							set={set}
							data={marvel_zombies}
							gameUniverse={GameUniverse.MarvelZombies}
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
