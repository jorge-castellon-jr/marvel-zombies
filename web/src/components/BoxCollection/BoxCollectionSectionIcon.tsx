import { HeroType } from "@/types/HeroTypes";

export default function BoxCollectionSectionIcon({
	name,
	type,
	onClick,
}: {
	name: string;
	type: HeroType;
	onClick: () => void;
}) {
	const color = type === HeroType.Hero ? "bg-sky-800" : "bg-lime-800";
	return (
		<div
			className={`${color} rounded-lg shadow-lg p-2 text-center flex justify-center items-center`}
			onClick={() => onClick()}
		>
			{name}
		</div>
	);
}
