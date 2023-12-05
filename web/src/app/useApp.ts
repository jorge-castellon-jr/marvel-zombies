import {
	useAppData,
	useHeroSelection,
	usePageId,
	useSearchResults,
} from "@/store/AppStore";
import { useAtom } from "jotai";

export const useApp = () => {
	const [pageId, setPageId] = useAtom(usePageId);
	const [appData, setAppData] = useAtom(useAppData);
	const [heroSelected, setHeroSelected] = useAtom(useHeroSelection);
	const [searchResults, setSearchResults] = useAtom(useSearchResults);

	return {
		pageId,
		setPageId,
		appData,
		setAppData,
		heroSelected,
		setHeroSelected,
		searchResults,
		setSearchResults,
	};
};
