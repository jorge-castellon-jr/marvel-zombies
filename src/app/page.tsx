"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Section } from "./api/sections/route";

export default function Home() {
  // get the data from the api from api scraper route
  const [data, setData] = useState<Section[]>([]);

  // fetch the data from the api
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sections");
      const newData: Section[] = await res.json();
      setData(newData);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper p-4 ">
      <div className="sections grid gap-8">
        {data &&
          data.map((section) => (
            <div
              className="hero grid sm:grid-cols-4 gap-8"
              key={section.boxImage}
            >
              <div>
                <h3 className="text-xl">{section.boxName}</h3>
                <Image src={section.boxImage} alt="" width={200} height={200} />
              </div>
              <div className="sm:col-start-2 sm:col-span-3">
                <p className="text-xl">Heroes:</p>
                <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 ">
                  {section.heroes.map((hero) => (
                    <li key={hero.name}>
                      <a href={hero.link}>
                        <Image
                          src={hero.image}
                          alt={hero.name}
                          width={100}
                          height={100}
                        />
                        {hero.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
