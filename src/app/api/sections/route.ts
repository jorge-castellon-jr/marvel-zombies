import { load, Element } from "cheerio";
import { HeroType, Section } from "../../../../types/HeroTypes";

const getSections = async (): Promise<Section[]> => {
  const url = "https://zombicide.fandom.com/wiki/Marvel_Zombies_Heroes";
  const response = await fetch(url);
  const html = await response.text();

  const $ = load(html);
  const sections: Element[] = $(
    "#content .mw-parser-output > .article-table"
  ).toArray();

  // Extract necessary data from sections
  const extractedData = sections.map((section): Section => {
    // Example extraction, modify as per your data structure
    return {
      // have box name add spaces between words and numbers
      boxName: $(section)
        .find("td[rowspan=2] img")
        .attr("data-image-name")
        ?.replace("Cover", "")
        .replace("cover", "")
        .replace(".jpg", "")
        .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
        .replace(/([A-Z])([A-Z])/g, "$1 $2") as string,
      boxImage:
        ($(section).find("td[rowspan=2] img").attr("data-src") as string) ||
        ($(section).find("td[rowspan=2] img").attr("src") as string),
      heroes: $(section)
        .find(".survivor-table")
        .toArray()
        .map((survivor) => {
          const survivorImage = $(survivor).find("img");
          return {
            name: $(survivor).find("a").attr("title") as string,
            image:
              (survivorImage.attr("data-src") as string) ||
              (survivorImage.attr("src") as string),
            link: $(survivor)
              .find("a")
              .attr("href")
              ?.replace("/wiki", "/marvel") as string,
            type: survivorImage.attr("data-image-name")?.includes("zombie")
              ? HeroType.Zombie
              : HeroType.Hero,
          };
        }),
    };
  });

  return extractedData;
};

export const GET = async () => {
  const data: Section[] = await getSections();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
