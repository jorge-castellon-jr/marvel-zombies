const getAllData = async (): Promise<any> => {
  const url = "https://zombies-api.heroesgrid.com/all";
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const GET = async () => {
  const data: any = await getAllData();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
