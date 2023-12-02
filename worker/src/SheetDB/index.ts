interface SheetDBParams {
	sheet?: string;
	limit?: number;
	offset?: number;
	sort_by?: string;
	sort_order?: 'asc' | 'desc' | 'random';
	sort_method?: string;
	sort_date_format?: string;
	cast_numbers?: string;
	single_object?: boolean;
	mode?: string;
}

export default async function (address: string, params: SheetDBParams) {
	const url = new URL(`https://sheetdb.io/api/v1/${address}`);
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			url.searchParams.append(key, String(value));
		}
	});

	try {
		const response = await fetch(url.toString(), {
			method: 'GET',
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.log('Failed to fetch data:', response.status);
			return response.status;
		}
	} catch (error) {
		console.log('Error fetching data:', error);
		return error;
	}
}
