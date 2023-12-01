"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { Hero, HeroSection, HeroType } from "../../../types/HeroTypes";
import HeroIcons from "@/components/PickYourTeam/HeroIcons";
import HeroCard from "@/components/HeroCards/HeroCard";

export default function Home() {
  // get the data from the api from api scraper route
  const [heroes, setHeroes] = useState<Hero[]>([]);
  // useState to switch between hero types
  const [heroType, setHeroType] = useState<HeroType | null>(null);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [pickedHeroes, setPickedHeroes] = useState<
    { icon: Hero; info: HeroSection }[]
  >([]);

  const [heroDoesNotExist, setHeroDoesNotExist] = useState(false);

  const selectPickHero = async (hero: Hero) => {
    // if hero is already picked, deselect it
    const alreadyPicked = pickedHeroes.find(
      (pickedHero) => pickedHero.icon.name === hero.name
    );
    if (!alreadyPicked && pickedHeroes.length < 6) {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hero: hero.link.split("/").pop() }),
      });
      const newData = await res.json();
      if (!newData.length) {
        setTimeout(() => setHeroDoesNotExist(false), 3000);
        return setHeroDoesNotExist(true);
      }
      setPickedHeroes([
        ...pickedHeroes,
        {
          icon: hero,
          info: newData.find((item: HeroSection) => item.name === hero.type),
        },
      ]);
    }
  };
  const deselectPickHero = (hero: Hero) => {
    const filteredHeroes = pickedHeroes.filter(
      (pickedHero) => pickedHero.icon.name !== hero.name
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
            <div>Picked Heroes (Click to Remove them)</div>
            <HeroIcons
              heroes={pickedHeroes.map((hero) => ({ ...hero.icon }))}
              selectPickHero={deselectPickHero}
            />
            {pickedHeroes.map((hero) => (
              <div key={hero.icon.name}>
                <HeroCard heroInfo={hero.info} heroName={hero.icon.name} />
              </div>
            ))}
          </>
        )}
        All Heroes
        <HeroIcons
          heroes={filteredHeroes}
          pickedHeroes={pickedHeroes}
          selectPickHero={selectPickHero}
        />
      </div>
      {heroDoesNotExist && (
        <div className="toast bg-red-700 text-white p-4 rounded-lg fixed bottom-4 right-4">
          Hero does not exist in our database
        </div>
      )}
    </div>
  );
}
