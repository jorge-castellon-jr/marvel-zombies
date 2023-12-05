"use client";
import { useApp } from "@/app/useApp";
import { PageId } from "@/store/AppStore";
import HeroCard from "./HeroCard";
import Image from "next/image";
import { PageView } from "@/types/PageView";
import { useEffect, useState } from "react";

export default function HeroDetailsView({ active }: PageView) {
	const { heroSelected, pageId, setPageId, setSearch } = useApp();

	const hasImage = !!heroSelected.hero
		? heroSelected.hero.character_image_url
		: false;
	const hasDescription = !!heroSelected.hero
		? heroSelected.hero.short_description
		: false;

	const hasSpawn = !!heroSelected.hero
		? heroSelected.hero.spawn_card_ability
		: false;

	const hasAttack = !!heroSelected.hero ? heroSelected.hero.attack : false;

	enum DetailState {
		IdCard,
		SpawnCard,
	}
	const [detailState, setDetailState] = useState<DetailState>(
		DetailState.IdCard
	);
	const isIdCard = detailState === DetailState.IdCard;
	const isSpawnCard = detailState === DetailState.SpawnCard;

	useEffect(() => {
		if (pageId === PageId.HeroDetails) {
			if (!hasAttack) {
				setDetailState(DetailState.SpawnCard);
			} else {
				setDetailState(DetailState.IdCard);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageId]);

	return (
		<div className={`gap-8 grid view ${active && "view--active"}`}>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => {
					setSearch("");
					setPageId(PageId.BoxCollection);
				}}
			>
				Back
			</a>
			<div className="grid gap-8">
				{hasImage && (
					<Image
						src={heroSelected.hero.character_image_url}
						className="rounded-lg "
						width={500}
						height={500}
						alt="Hero Image"
						loading="eager"
						placeholder="blur"
						blurDataURL={heroSelected.hero.character_image_url}
					/>
				)}
				{hasDescription && (
					<div className="bg-slate-700 rounded-lg p-4">
						<p className="text-white">
							<span className="underline">Short Description:</span>
							<br />
							{heroSelected.hero.short_description}
						</p>
					</div>
				)}
				{hasSpawn && hasAttack && (
					<div className="grid grid-cols-2 border-2 p-2 rounded-lg border-slate-700 gap-2">
						<button
							className={`${
								isIdCard && "bg-slate-700"
							}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
							onClick={() => setDetailState(DetailState.IdCard)}
						>
							ID Card
						</button>
						<button
							className={`${
								isSpawnCard && "bg-slate-700"
							}  rounded-lg border-gray-800 text-xl text-center py-4 px-2`}
							onClick={() => setDetailState(DetailState.SpawnCard)}
						>
							Spawn Card
						</button>
					</div>
				)}
				{hasAttack && isIdCard && <HeroCard hero={heroSelected} />}
				{hasSpawn && isSpawnCard && (
					<div className="bg-slate-700 rounded-lg p-4 relative">
						{/* create a heart css */}
						<div className=" absolute -top-4 right-4 px-4 h-8 bg-red-900 transform border-2 grid items-center justify-center border-white">
							Toughness: {heroSelected.hero.toughness}
						</div>
						<div></div>
						<p className="text-white">{heroSelected.hero.spawn_card_ability}</p>
					</div>
				)}
			</div>
		</div>
	);
}
