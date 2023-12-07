"use client";
import { useEffect, useState } from "react";
import { HeroType, Section } from "@/types/HeroTypes";
import { useApp } from "./useApp";
import { AppData, PageId } from "@/store/AppStore";
import BoxCollectionView from "@/components/BoxCollection/BoxCollectionView";
import HeroDetailsView from "@/components/HeroCard/HeroDetailsView";
import SearchView from "@/components/Search/SearchView";
import PickTeamView from "@/components/PickTeam/PickTeamView";
import MainNav from "@/components/App/MainNav";

export default function Home() {
	const {
		loading,
		setLoading,
		pageId,
		backId,
		setBackId,
		setSearch,
		setNeedsBack,
		setAppData,
	} = useApp();

	// fetch the data from the api
	useEffect(() => {
		const fetchData = async () => {
			const all = await fetch("/api/all");
			const allData = await all.json();
			setAppData(allData);
			setLoading(false);
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		setSearch("");
		if (pageId != PageId.BoxCollection) {
			setNeedsBack(true);
		} else {
			setNeedsBack(false);
		}
		if (pageId == backId) {
			setBackId(PageId.BoxCollection);
		}
	}, [pageId]);

	return (
		<>
			{loading ? (
				<div className="w-full h-screen grid items-center justify-center">
					Loading
				</div>
			) : (
				<>
					<div className="px-2 pt-2">
						<BoxCollectionView active={pageId == PageId.BoxCollection} />
						<HeroDetailsView active={pageId == PageId.HeroDetails} />
						<SearchView active={pageId == PageId.Search} />
						<PickTeamView active={pageId == PageId.PickTeam} />
					</div>
					<MainNav />
				</>
			)}
		</>
	);
}
