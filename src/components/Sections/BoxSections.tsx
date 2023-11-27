import Image from "next/image";
import HeroIcons from "./HeroIcons";
import { Section } from "../../../types/HeroTypes";

export default function BoxSections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections &&
        sections.map((section, index) => (
          <div
            className="hero grid sm:grid-cols-4 gap-8"
            key={section.boxImage}
          >
            <div>
              <h3 className="text-xl">{section.boxName}</h3>
              <Image
                src={section.boxImage}
                alt=""
                width={200}
                height={200}
                priority={index === 0}
              />
            </div>
            <div className="sm:col-start-2 sm:col-span-3">
              <p className="text-xl">Heroes:</p>
              <HeroIcons heroes={section.heroes} />
            </div>
          </div>
        ))}
    </>
  );
}
