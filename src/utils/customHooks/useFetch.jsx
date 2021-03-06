import React from 'react';

const FETCH_STARTED = 'FETCH_STARTED';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

const state = {
	data: [],
	error: '',
	isLoading: false
};

const reducer = (state, action) => {
	const { payload, type } = action;
	switch (type) {
		case FETCH_STARTED:
			return {
				...state,
				isLoading: true
			};

		case FETCH_SUCCESS:
			return {
				...state,
				data: payload,
				isLoading: false
			};

		case FETCH_FAILED:
			return {
				...state,
				isLoading: false,
				error: payload
			};

		default:
			return state;
	}
};

const useFetch = (url) => {
	const [ { data, error, isLoading }, dispatch ] = React.useReducer(reducer, state);

	React.useEffect(() => {
		(async () => {
			dispatch({ type: FETCH_STARTED });
			try {
				const fetchData = await fetch(url);
				const data = await fetchData.json();
				dispatch({ type: FETCH_SUCCESS, payload: data });
			} catch (e) {
				dispatch({ type: FETCH_FAILED, payload: e.message });
			}
		})();
	}, []);

	return { data, error, isLoading };
};

export default useFetch;
