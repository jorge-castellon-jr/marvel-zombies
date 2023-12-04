import { PageId, useAppData, usePageId } from "@/store/AppStore";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useApp = () => {
	const [pageId, setPageId] = useAtom(usePageId);
	const [appData, setAppData] = useAtom(useAppData);

	return { pageId, setPageId, appData, setAppData };
};
