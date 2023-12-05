import { PageView } from "@/types/PageView";

export default function PickTeamView({ active }: PageView) {
	return <div className={`view ${active && "view--active"}`}></div>;
}
