"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { Hero, HeroType } from "../../../types/HeroTypes";
import HeroIcons from "@/components/PickYourTeam/HeroIcons";

export default function Home() {
  // get the data from the api from api scraper route
  const [heroes, setHeroes] = useState<Hero[]>([]);
  // useState to switch between hero types
  const [heroType, setHeroType] = useState<HeroType | null>(null);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [pickedHeroes, setPickedHeroes] = useState<Hero[]>([]);

  const selectPickHero = (hero: Hero) => {
    // if hero is already picked, deselect it
    const alreadyPicked = pickedHeroes.find(
      (pickedHero) => pickedHero.name === hero.name
    );
    if (!alreadyPicked && pickedHeroes.length < 6) {
      setPickedHeroes([...pickedHeroes, hero]);
    }
  };
  const deselectPickHero = (hero: Hero) => {
    const filteredHeroes = pickedHeroes.filter(
      (pickedHero) => pickedHero.name !== hero.name
    );
    setPickedHeroes(filteredHeroes);
  };

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/heroes");
      const newData = await res.json();
      setHeroes(newData);
    };
    fetchData();
    setHeroType(HeroType.Hero);
  }, []);

  useEffect(() => {
    const filteredData = async () => {
      const filteredHeroes = heroes.filter((hero) => {
        return hero.type === heroType;
      });
      setFilteredHeroes(filteredHeroes);
    };
    filteredData();
  }, [heroType, heroes]);

  const tabList = [
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
    <div className="wrapper p-4 ">
      <Tabs list={tabList} active={heroType} />
      <div className="sections grid gap-8">
        {!!pickedHeroes.length && (
          <>
            Picked Heroes
            <HeroIcons
              heroes={pickedHeroes}
              selectPickHero={deselectPickHero}
            />
          </>
        )}
        All Heroes
        <HeroIcons
          heroes={filteredHeroes}
          pickedHeroes={pickedHeroes}
          selectPickHero={selectPickHero}
        />
      </div>
    </div>
  );
}
