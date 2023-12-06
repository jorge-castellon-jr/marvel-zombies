"use client";
import { useEffect, useState } from "react";
import { HeroType, Section } from "@/types/HeroTypes";
import { useApp } from "./useApp";
import { AppData, PageId } from "@/store/AppStore";
import BoxCollectionView from "@/components/BoxCollection/BoxCollectionView";
import HeroDetailsView from "@/components/HeroCard/HeroCardView";
import SearchView from "@/components/Search/SearchView";
import PickTeamView from "@/components/PickTeam/PickTeamView";

export default function Home() {
	const { pageId, setAppData } = useApp();

	const [allData, setAllData] = useState<AppData | null>(null);

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch("/api/all");
			const allData = await all.json();
			setAllData(allData);
			setAppData(allData);
		};
		fetchData();
	}, [setAppData]);

	return (
		<>
			{allData && (
				<div className="p-4">
					<BoxCollectionView
						data={allData}
						active={pageId == PageId.BoxCollection}
					/>
					<HeroDetailsView active={pageId == PageId.HeroDetails} />
					<SearchView active={pageId == PageId.Search} />
					<PickTeamView data={allData} active={pageId == PageId.PickTeam} />
				</div>
			)}
		</>
	);
}
