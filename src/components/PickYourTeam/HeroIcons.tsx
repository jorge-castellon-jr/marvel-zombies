import Image from "next/image";
import { Hero, HeroType } from "../../../types/HeroTypes";

export default function HeroIcons({
  heroes,
  pickedHeroes,
  selectPickHero,
}: {
  heroes: Hero[];
  pickedHeroes?: Hero[];
  selectPickHero: (hero: Hero) => void;
}) {
  // if pickedHeroes is defined, set class of active to all heroes in pickedHeroes
  if (pickedHeroes) {
    heroes = heroes.map((hero) => {
      const pickedHero = pickedHeroes.find(
        (pickedHero) => pickedHero.name === hero.name
      );
      if (pickedHero) {
        return {
          ...hero,
          active: true,
        };
      }
      return hero;
    });
  }
  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 ">
      {heroes.map((hero, index) => (
        <li
          key={`${hero.name}-${hero.type}-${index}`}
          onClick={() => selectPickHero(hero)}
        >
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
        </li>
      ))}
    </ul>
  );
}
