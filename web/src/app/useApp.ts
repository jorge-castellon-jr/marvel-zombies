import { useAppData, useHeroSelection, usePageId } from "@/store/AppStore";
import { useAtom } from "jotai";

export const useApp = () => {
	const [pageId, setPageId] = useAtom(usePageId);
	const [appData, setAppData] = useAtom(useAppData);
	const [heroSelected, setHeroSelected] = useAtom(useHeroSelection);

	return {
		pageId,
		setPageId,
		appData,
		setAppData,
		heroSelected,
		setHeroSelected,
	};
};
