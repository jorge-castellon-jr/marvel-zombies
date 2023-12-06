import { Section } from "@/types/HeroTypes";
import { getSections } from "./GetSections";

export const GET = async () => {
	const data: Section[] = await getSections();
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
