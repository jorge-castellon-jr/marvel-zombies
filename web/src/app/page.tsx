"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import BoxSection from "@/components/Sections/BoxSections";
import { HeroType, Section } from "../../types/HeroTypes";

export default function Home() {
  // get the data from the api from api scraper route
  const [sections, setSections] = useState<Section[]>([]);
  // useState to switch between hero types
  const [heroType, setHeroType] = useState<HeroType | null>(null);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);

  const [allData, setAllData] = useState<any>({});

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const all = await fetch("/api/all");
      const allData = await all.json();
      setAllData(allData);

      const res = await fetch("/api/sections");
      const newData = await res.json();
      setSections(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = async () => {
      const filtered = sections.map((section) => {
        const heroes = section.heroes.filter((hero) => {
          return !heroType ? true : hero.type === heroType;
        });
        return {
          ...section,
          heroes,
        };
      });
      setFilteredSections(filtered);
    };
    filteredData();
  }, [heroType, sections]);

  const tabList = [
    { id: null, label: "All", action: () => setHeroType(null) },
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
      <a
        href="/pick-your-team"
        className="block p-4 bg-green-900 rounded-lg text-center"
      >
        Pick Your Team
      </a>

      <Tabs list={tabList} active={heroType} />

      <div className="sections grid gap-8">
        <BoxSection sections={filteredSections} />
      </div>
    </div>
  );
}
