import { HeroType } from "@/types/HeroTypes";

export default function BoxCollectionSectionIcon({
	name,
	type,
}: {
	name: string;
	type: HeroType;
}) {
	const color = type === HeroType.Hero ? "bg-sky-800" : "bg-lime-800";
	return (
		<div
			className={`${color} rounded-lg shadow-lg p-2 text-center flex justify-center items-center`}
		>
			{name}
		</div>
	);
}
