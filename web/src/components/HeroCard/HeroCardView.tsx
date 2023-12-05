"use client";
import { useApp } from "@/app/useApp";
import { PageId } from "@/store/AppStore";
import HeroCard from "./HeroCard";
import Image from "next/image";

export default function HeroCardView() {
	const { heroSelected, pageId, setPageId } = useApp();

	const hasImage = !!heroSelected.hero
		? heroSelected.hero.character_image_url
		: false;
	const hasDescription = !!heroSelected.hero
		? heroSelected.hero.short_description
		: false;

	const hasAbility = !!heroSelected.hero
		? heroSelected.hero.spawn_card_ability
		: false;

	const hasAttack = !!heroSelected.hero ? heroSelected.hero.attack : false;

	return (
		<div
			className={`gap-8 grid view ${
				pageId == PageId.HeroDetails && "view--active"
			}`}
		>
			<a
				className="block p-4 bg-green-900 rounded-lg text-center"
				onClick={() => setPageId(PageId.BoxCollection)}
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
				{hasAbility && (
					<div className="bg-slate-700 rounded-lg p-4 relative">
						{/* create a heart css */}
						<div className=" absolute -top-4 right-4 px-4 h-8 bg-red-900 transform border-2 grid items-center justify-center border-white">
							Toughness: {heroSelected.hero.toughness}
						</div>
						<div></div>
						<p className="text-white">{heroSelected.hero.spawn_card_ability}</p>
					</div>
				)}
				{hasAttack && <HeroCard hero={heroSelected} />}
			</div>
		</div>
	);
}
