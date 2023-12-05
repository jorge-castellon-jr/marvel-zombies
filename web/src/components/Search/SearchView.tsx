import { GameUniverse, PageId } from "@/store/AppStore";
import SearchInput from "../SearchInput";
import { useApp } from "@/app/useApp";
import BoxCollectionSectionIcon from "../BoxCollection/BoxCollectionSectionIcon";
import { HeroType } from "@/types/HeroTypes";

export default function SearchView() {
	const { pageId, setPageId, searchResults, setHeroSelected } = useApp();

	return (
		<div
			className={`search view gap-8 ${
				pageId == PageId.Search && "view--active"
			}`}
		>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => setPageId(PageId.BoxCollection)}
			>
				Back
			</a>
			<SearchInput autoFocus />
			<div className="grid grid-cols-3 gap-4">
				{searchResults.map((result, index) => (
					<BoxCollectionSectionIcon
						key={`${result.character_name}_${result.set}_${index}`}
						name={result.character_name}
						type={
							result.searchType == "heroes" ? HeroType.Hero : HeroType.Zombie
						}
						onClick={() => {
							setHeroSelected({
								hero: result,
								type: result.searchType as "heroes" | "zombies",
								gameUniverse: result.gameUniverse,
							});
							setPageId(PageId.HeroDetails);
						}}
					/>
				))}
			</div>
		</div>
	);
}