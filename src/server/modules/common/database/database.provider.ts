import { Database } from 'mongorito';
import * as datetime from 'mongorito-timestamps'
import { databaseConnectToken, database } from '../../../utils/config';

export const databaseProvider = {
	provide: databaseConnectToken,
	useFactory: async () => {
		const db = new Database(database);
		await db.connect();

		// plugins
		db.use(datetime());

		return db
	}
};
