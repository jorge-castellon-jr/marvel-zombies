import Image from "next/image";
import { HeroType, Section } from "../../types/HeroTypes";

export default function HeroIcons({ heroes }: { heroes: Section["heroes"] }) {
	return (
		<ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 ">
			{heroes.map((hero, index) => (
				<li key={`${hero.name}-${hero.type}-${index}`}>
					<a href={`${hero.link}?type=${hero.type}`}>
						<Image
							src={hero.image}
							alt={hero.name}
							width={116}
							height={116}
							className={
								hero.type === HeroType.Hero
									? "border-8 border-sky-800 rounded-lg"
									: "border-8 border-lime-800 rounded-lg"
							}
						/>
						{hero.name}
					</a>
				</li>
			))}
		</ul>
	);
}
