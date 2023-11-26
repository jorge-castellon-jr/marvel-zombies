import { load, Element } from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export interface HeroSection {
  name: string;
  levels: Level[];
  attack: Attack;
  devour?: Attack;
}
interface Level {
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

const getHeroSkills = async (hero: string): Promise<HeroSection[]> => {
  const url = `https://zombicide.fandom.com/wiki/${hero}`;
  const response = await fetch(url);
  const html = await response.text();

  const $ = load(html);
  const skills: Element[] = $("#content .article-table").toArray();

  // Extract necessary data from sections
  const extractedData = skills.map((skill) => {
    const levels: Level[] = $(skill)
      .find("tr:nth-child(3) td")
      .toArray()
      .map((level) => {
        const name =
          $(level).find("b").text() || $(level).text().split(":")[0].trim();
        return {
          name,
          info: $(level).text().replace(name, "").trim().slice(1).trim(),
        };
      });
    // .filter((level) => level.name !== "");

    const attack = {
      name: $(skill)
        .find("tr:nth-child(4) .mw-headline")
        .text()
        .replace("Ability", "")
        .replace(":", "")
        .trim(),
      type: $(skill).find("tr:nth-child(6) td:first-child").text().trim(),
      range: $(skill).find("tr:nth-child(6) td:nth-child(2)").text().trim(),
      dice: $(skill).find("tr:nth-child(6) td:nth-child(3)").text().trim(),
      accuracy: $(skill).find("tr:nth-child(6) td:nth-child(4)").text().trim(),
    };
    const devour = {
      name: $(skill).find("tr:nth-child(7) .mw-headline").text().trim(),
      type: $(skill).find("tr:nth-child(9) td:first-child").text().trim(),
      range: $(skill).find("tr:nth-child(9) td:nth-child(2)").text().trim(),
      dice: $(skill).find("tr:nth-child(9) td:nth-child(3)").text().trim(),
      accuracy: $(skill).find("tr:nth-child(9) td:nth-child(4)").text().trim(),
      effect: $(skill).find("tr:nth-child(10) p").text().trim(),
    };

    return {
      name: $(skill).find("tr:first-child h3 .mw-headline").text(),
      levels,
      attack,
      devour,
    };
  });

  return extractedData.filter((skill) => skill.name !== "");
};

export const POST = async (req: Request) => {
  const request = await req.json();
  const data: HeroSection[] = await getHeroSkills(request.hero);
  return Response.json(data);
};
