import * as auth from './auth';

function combineModule(modules) {
	let epics = [];
	let reducers = {};
	for (let name in modules) {
		let m = modules[name];
		if (m.epics) epics = epics.concat(m.epics);
		if (m.reducer) reducers[name] = m.reducer;
	}
	return { epics, reducers };
}

export default combineModule({ auth });
