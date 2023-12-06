"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import BoxSection from "@/components/Sections/BoxSections";
import { HeroType, Section } from "@/types/HeroTypes";
import { useApp } from "./useApp";
import { AppData, PageId } from "@/store/AppStore";
import BoxCollectionView from "@/components/BoxCollection/BoxCollectionView";
import HeroDetailsView from "@/components/HeroCard/HeroCardView";
import SearchView from "@/components/Search/SearchView";
import PickTeamView from "@/components/PickTeam/PickTeamView";

export default function Home() {
	const { pageId, setPageId, setAppData } = useApp();
	// get the data from the api from api scraper route
	const [sections, setSections] = useState<Section[]>([]);
	// useState to switch between hero types
	const [heroType, setHeroType] = useState<HeroType | null>(null);
	const [filteredSections, setFilteredSections] = useState<Section[]>([]);

	const [allData, setAllData] = useState<AppData | null>(null);

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch("/api/all");
			const allData = await all.json();
			setAllData(allData);
			setAppData(allData);

			const res = await fetch("/api/sections");
			const newData = await res.json();
			setSections(newData);
		};
		fetchData();
	}, [setAppData]);

	useEffect(() => {
		const filteredData = async () => {
			const filtered = sections.map((section) => {
				const heroes = section.heroes.filter((hero) => {
					return !heroType ? true : hero.type === heroType;
				});
				return {
					...section,
					heroes,
				};
			});
			setFilteredSections(filtered);
		};
		filteredData();
	}, [heroType, sections]);

	const tabList = [
		{ id: null, label: "All", action: () => setHeroType(null) },
		{
			id: HeroType.Hero,
			label: HeroType.Hero,
			action: () => setHeroType(HeroType.Hero),
		},
		{
			id: HeroType.Zombie,
			label: HeroType.Zombie,
			action: () => setHeroType(HeroType.Zombie),
		},
	];

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
					{pageId == PageId.Home && (
						<div
							className={`wrapper grid gap-4 view ${
								pageId == PageId.Home && "view--active"
							}`}
						>
							<a
								href="/pick-your-team"
								className="block p-4 bg-green-900 rounded-lg text-center"
							>
								Pick Your Team
							</a>
							<a
								className="block p-4 bg-green-900 rounded-lg text-center"
								onClick={() => setPageId(PageId.BoxCollection)}
							>
								New App Redesign
							</a>
							<Tabs list={tabList} active={heroType} />
							<div className="sections grid gap-8">
								<BoxSection sections={filteredSections} />
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
