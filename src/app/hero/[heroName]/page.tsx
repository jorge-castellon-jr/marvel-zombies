"use client";
import { useEffect, useState } from "react";
import { HeroSection } from "@/app/api/hero/route";
import HeroTracker from "@/components/HeroCards/HeroTracker";

export default function Hero({ params }: { params: { heroName: string } }) {
  // get the data from the api from api scraper route
  const [data, setData] = useState<HeroSection[]>([]);

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

      setData(newData);
    };
    fetchData();
  }, [params.heroName]);

  const [activeTab, setActiveTab] = useState(0);

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
          <div className="bg-cyan-200 bg-opacity-50 rounded-lg grid ">
            <div className="p-4 -mx-4 bg-red-800 border border-white">
              {data[activeTab].name} {heroName}
            </div>
            <div className="grid md:grid-cols-2 py-4 gap-4">
              <div className="flex flex-col gap-4">
                <HeroTracker label="Health" start={5} />
                <HeroTracker
                  label={
                    data[activeTab].name.includes("Zombie") ? "Hunger" : "Power"
                  }
                  start={0}
                />
                <div className="skill">
                  <div className="skill__title bg-blue-900">
                    {data[activeTab].attack.name}
                  </div>
                  <div className="skill__attack">
                    <div className="skill__attack__slot">
                      {data[activeTab].attack.type}
                    </div>
                    <div className="skill__attack__slot">
                      {data[activeTab].attack.range}
                    </div>
                    <div className="skill__attack__slot">
                      {data[activeTab].attack.dice}
                    </div>
                    <div className="skill__attack__slot">
                      {data[activeTab].attack.accuracy}
                    </div>
                  </div>
                </div>
                {data[activeTab].name.includes("Zombie") && (
                  <div>
                    <div className="px-4 py-2 bg-green-800 border border-white">
                      Devour
                    </div>
                    <div className="skill__attack">
                      <div className="skill__attack__slot">Melee</div>
                      <div className="skill__attack__slot">0</div>
                      <div className="skill__attack__slot">1</div>
                      <div className="skill__attack__slot">4+</div>
                    </div>
                    {!!data[activeTab].devour?.effect && (
                      <div className="skill__attack__desc mx-2 my-1">
                        {data[activeTab].devour?.effect}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="grid gap-4">
                {data[activeTab].levels.map((level, index) => (
                  <div key={index} className="skill">
                    <div className={`skill__title ${colors[index]}`}>
                      {level.name}
                    </div>
                    {level.info && (
                      <div className="skill__ability">
                        <div className="skill__ability__slot">{level.info}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
