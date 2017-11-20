import { Model } from 'mongorito';
import { databaseConnectToken, weightCollectToken, database } from '../../utils/config';

class WeightModel extends Model {}

export const weightProvider = {
	provide: weightCollectToken,
	useFactory:  (db: any) => {
		db.register(WeightModel);
		return WeightModel
	},
	inject: [ databaseConnectToken ]
};
