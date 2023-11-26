"use client";
import { useEffect, useState } from "react";
import { HeroSection } from "@/app/api/hero/route";

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

  return (
    <div className="wrapper p-4 ">
      <h1 className="text-5xl text-center my-6">
        {params.heroName.replace("_", " ")}
      </h1>
      <div className="sections grid gap-8">
        {data.length > 0 ? (
          <div className={`grid grid-flow-col grid-cols-${data.length} gap-4`}>
            {data.map((skill, index) => (
              <div
                key={index}
                className={`tab  p-4 rounded-lg transition-all duration-300 ${
                  activeTab === index ? "bg-green-700" : "bg-green-900"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No skills available for this hero</p>
        )}

        {data.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-4 grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-red-800 border border-white">
                {data[activeTab].name}
              </div>
              <div className="px-4 py-2 bg-blue-900 border border-white">
                {data[activeTab].attack.name}
              </div>
              <div className="relative grid grid-cols-4">
                <div className="text-center">{data[activeTab].attack.type}</div>
                <div className="text-center">
                  {data[activeTab].attack.range}
                </div>
                <div className="text-center">{data[activeTab].attack.dice}</div>
                <div className="text-center">
                  {data[activeTab].attack.accuracy}
                </div>
              </div>
              {data[activeTab].name.includes("Zombie") && (
                <>
                  <div className="px-4 py-2 bg-green-800 border border-white">
                    Devour
                  </div>
                  <div className="relative grid grid-cols-4">
                    <div className="text-center">Melee</div>
                    <div className="text-center">0</div>
                    <div className="text-center">1</div>
                    <div className="text-center">4+</div>
                  </div>
                </>
              )}
            </div>
            <div className="grid gap-4">
              {data[activeTab].levels.map((level, index) => {
                if (level.name === "")
                  return (
                    <div key={index}>
                      <div
                        className={`px-4 py-2 ${colors[index]} border border-white`}
                      >
                        + {level.info}
                      </div>
                    </div>
                  );
                return (
                  <div key={index}>
                    <div
                      className={`px-4 py-2 ${colors[index]} border border-white`}
                    >
                      {level.name}
                    </div>
                    <div>{level.info}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
