"use client";
import { useEffect, useState } from "react";
import HeroTracker from "@/components/HeroCards/HeroTracker";
import { Hero, HeroSection } from "../../../../types/HeroTypes";
import { useSearchParams } from "next/navigation";
import HeroCard from "@/components/HeroCards/HeroCard";

export default function Hero({ params }: { params: { heroName: string } }) {
  const query = useSearchParams();
  // get the data from the api from api scraper route
  const [data, setData] = useState<HeroSection[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hero: params.heroName }),
      });
      const newData = await res.json();

      // find index of the type that matches the query
      const index = newData.findIndex((item: HeroSection) => {
        return item.name.includes(query.get("type")!);
      });

      setActiveTab(index);

      setData(newData);
    };
    fetchData();
  }, [params.heroName, query]);

  const colors = [
    "bg-cyan-700",
    "bg-yellow-600",
    "bg-orange-700",
    "bg-red-700",
  ];
  const heroName = params.heroName.replace(/_/g, " ");

  return (
    <div className="wrapper p-4 ">
      <div className="sections grid gap-8">
        {data.length > 0 ? (
          <div
            className={`hero-tabs order-last md:order-first md:relative grid grid-flow-col grid-cols-${
              data.length + 1
            } gap-4`}
          >
            <div
              className=" md:hidden grid place-items-center bg-green-900 rounded-lg p-4 text-center"
              onClick={() => (location.href = "/")}
            >
              {"<"}
            </div>
            {data.map((skill, index) => (
              <div
                key={index}
                className={`tab  p-4 rounded-lg transition-all duration-300 text-center ${
                  activeTab === index ? "bg-green-700" : "bg-green-900"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        ) : (
          <p className="grid place-items-center">
            No skills available for this hero
          </p>
        )}

        {data.length > 0 && (
          <HeroCard heroInfo={data[activeTab]} heroName={heroName} />
        )}
      </div>
    </div>
  );
}
