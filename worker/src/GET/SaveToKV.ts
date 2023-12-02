import Client from '../SheetDB/index';

export default function () {
	return Client('702rgfxqcoor5', { sheet: 'Heroes', limit: 1 });
}
