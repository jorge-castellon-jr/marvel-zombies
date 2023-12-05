import {
	useAppData,
	useHeroSelection,
	usePageId,
	useSearch,
	useSearchResults,
} from "@/store/AppStore";
import { useAtom } from "jotai";

export const useApp = () => {
	const [pageId, setPageId] = useAtom(usePageId);
	const [appData, setAppData] = useAtom(useAppData);
	const [heroSelected, setHeroSelected] = useAtom(useHeroSelection);
	const [search, setSearch] = useAtom(useSearch);
	const [searchResults, setSearchResults] = useAtom(useSearchResults);

	return {
		pageId,
		setPageId,
		appData,
		setAppData,
		heroSelected,
		setHeroSelected,
		search,
		setSearch,
		searchResults,
		setSearchResults,
	};
};
