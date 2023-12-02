interface ListItems {
  id: string | null;
  label: string;
  action: () => any;
}
export default function Tabs({
  list,
  active,
}: {
  list: ListItems[];
  active: string | null;
}) {
  return (
    <div
      className={`hero-tabs order-last md:order-first md:relative grid grid-flow-col grid-cols-${list.length} gap-4`}
    >
      {list &&
        list.map((item) => (
          <div
            key={item.id}
            className={`tab  p-4 rounded-lg transition-all duration-300 text-center ${
              active === item.id ? "bg-green-700" : "bg-green-900"
            }`}
            onClick={() => item.action()}
          >
            {item.label}
          </div>
        ))}
    </div>
  );
}
