import { load, Element } from "cheerio";
import { Hero, HeroType, Section } from "../../../../types/HeroTypes";

const getSections = async (): Promise<Hero[]> => {
  const url = "https://zombicide.fandom.com/wiki/Marvel_Zombies_Heroes";
  const response = await fetch(url);
  const html = await response.text();

  const $ = load(html);

  return $(".survivor-table")
    .toArray()
    .map((survivor): Hero => {
      const survivorImage = $(survivor).find("img");
      const name = $(survivor).find("a").attr("title")!;
      const image =
        survivorImage.attr("data-src")! || survivorImage.attr("src")!;
      const link = $(survivor)
        .find("a")
        .attr("href")!
        .replace("/wiki", "/marvel");
      const type = survivorImage.attr("data-image-name")!.includes("zombie")
        ? HeroType.Zombie
        : HeroType.Hero;

      return {
        name,
        image,
        link,
        type,
      };
    });
};

export const GET = async () => {
  const data: Hero[] = await getSections();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
