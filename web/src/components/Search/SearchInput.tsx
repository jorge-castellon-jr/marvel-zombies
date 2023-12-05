import { useApp } from "@/app/useApp";
import {
	CharacterData,
	GameUniverse,
	PageId,
	SearchResults,
} from "@/store/AppStore";
import { useEffect, useRef, useState } from "react";

export default function SearchInput({
	onClick,
	autoFocus,
}: {
	onClick?: () => void;
	autoFocus?: boolean;
}) {
	const { pageId, appData, search, setSearch, setSearchResults } = useApp();

	useEffect(() => {
		const filterData = () => {
			if (search === "") return setSearchResults([]);

			const marvel_heroes = appData.marvel_zombies.heroes
				.filter((hero) =>
					hero.character_name.toLowerCase().includes(search.toLowerCase())
				)
				.map((hero: CharacterData) => ({
					...hero,
					searchType: "heroes",
					gameUniverse: GameUniverse.MarvelZombies,
				}));
			const marvel_zombies = appData.marvel_zombies.zombies
				.filter((hero) =>
					hero.character_name.toLowerCase().includes(search.toLowerCase())
				)
				.map((hero: CharacterData) => ({
					...hero,
					searchType: "zombies",
					gameUniverse: GameUniverse.MarvelZombies,
				}));
			const dc_heroes = appData.dceased.heroes
				.filter((hero) =>
					hero.character_name.toLowerCase().includes(search.toLowerCase())
				)
				.map((hero: CharacterData) => ({
					...hero,
					searchType: "heroes",
					gameUniverse: GameUniverse.DCeased,
				}));
			const dc_zombies = appData.dceased.zombies
				.filter((hero) =>
					hero.character_name.toLowerCase().includes(search.toLowerCase())
				)
				.map((hero: CharacterData) => ({
					...hero,
					searchType: "zombies",
					gameUniverse: GameUniverse.DCeased,
				}));

			setSearchResults([
				...marvel_heroes,
				...marvel_zombies,
				...dc_heroes,
				...dc_zombies,
			]);
		};
		filterData();
	}, [search, appData, setSearchResults]);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (pageId == PageId.Search) inputRef.current?.focus();
	}, [pageId]);
	return (
		<div className="flex justify-center items-center">
			<input
				ref={inputRef}
				className="border-2 border-slate-500 bg-slate-800 rounded-lg p-4 w-full"
				type="text"
				placeholder="Search"
				value={search}
				autoFocus={autoFocus}
				onChange={(e) => setSearch(e.target.value)}
				onClick={
					onClick
						? () => {
								setSearch("");
								onClick();
						  }
						: () => null
				}
			/>
		</div>
	);
}
