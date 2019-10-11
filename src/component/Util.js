export const get = (url, callback) => {
	fetch(url, { method: 'GET' })
		.then((response) => {
			return response.json();
		})
		.then(callback)
		.catch((error) => {
			console.log('Request failed', error);
		});
}
	