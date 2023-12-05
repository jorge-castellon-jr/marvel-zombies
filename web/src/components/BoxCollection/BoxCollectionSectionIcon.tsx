import { HeroType } from "@/types/HeroTypes";
import Image from "next/image";

export default function BoxCollectionSectionIcon({
	name,
	type,
	image,
	onClick,
}: {
	name: string;
	type: HeroType;
	image?: string;
	onClick: () => void;
}) {
	const color = type === HeroType.Hero ? "bg-sky-800" : "bg-lime-800";
	return (
		<div
			className={`${color} rounded-lg shadow-lg overflow-hidden text-center flex flex-col justify-center items-center`}
			onClick={() => onClick()}
		>
			{image && <Image src={image} width={100} height={100} alt="Hero Image" />}
			<div
				className={`${
					!image ? "h-28" : "h-full"
				} px-2 w-full text-center grid justify-center items-center text-sm md:text-base`}
			>
				{name}
			</div>
		</div>
	);
}
