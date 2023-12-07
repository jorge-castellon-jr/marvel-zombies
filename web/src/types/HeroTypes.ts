export interface Section {
	boxName: string;
	boxImage: string;
	heroes: Hero[];
}
export interface Hero {
	name: string;
	image: string;
	link: string;
	type: HeroType;
	active?: boolean;
}

export enum HeroType {
	Hero = "Hero",
	Zombie = "Zombie",
}

export interface HeroSection {
	name: string;
	levels: Level[];
	attack: Attack;
	devour?: Attack;
}
export interface Level {
	name: string;
	info: string;
}
interface Attack {
	name: string;
	type: string;
	range: string;
	dice: string;
	accuracy: string;
	effect?: string;
}
