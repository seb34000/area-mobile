import axios, { AxiosInstance } from 'axios'
import { HOST_API, PORT_API } from '@env'

class API {
	api: AxiosInstance
	constructor() {
		this.api = axios.create({
			baseURL: `${HOST_API}:${PORT_API}`,
			//baseURL: `http://192.168.1.37:${PORT_API}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
	}

	/* Register to local account */
	register = async (username: string, email: string, password: string) => {
		const res = await this.api
			.post('/auth/register', {
				username: username,
				email: email,
				password: password,
			})
			.then((res) => {
				return res
			})
			.catch((err) => {
				console.error('Error in register: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Login to local account */
	login = async (email: string, password: string) => {
		const res = await this.api
			.post('/auth/login', {
				email: email,
				password: password,
			})
			.then((res) => {
				return res
			})
			.catch((err) => {
				console.error('Error in login: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Login with Github or link local account with github */
	github = async (token: string = '') => {
		const res = await this.api
			.get('/auth/github', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				// console.log(res.data);
				return res
			})
			.catch((err) => {
				console.error(JSON.stringify(err, null, 4))
				return false
			})
		return res
	}

	/* Login with Twitter or link local account with Twitter */
	twitter = async (token: string = '') => {
		const res = await this.api
			.get('/auth/twitter', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(res.data)
				return res.data
			})
			.catch((err) => {
				console.error('Error in twitter: [api.tsx]')
				return false
			})
		return res
	}

	/* Login with Hue or link local account with Hue */
	phillipeHue = async (token: string = '') => {
		const res = await this.api
			.get('/auth/hue', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				console.error('Error in phillipeHue: [api.tsx]')
				return false
			})
		return res
	}

	/* Login with reddit or link local account with reddit */
	reddit = async (token: string = '') => {
		const res = await this.api
			.get('/auth/reddit', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res.data
			})
			.catch((err) => {
				console.error('Error in reddit: [api.tsx]')
				return false
			})
		return res
	}

	/* Get profile */
	profile = async (token: string) => {
		const res = await this.api
			.get('/', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res
			})
			.catch((err) => {
				console.error('Error in profile: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Update profile */
	updateProfile = async (token: string, username: string = '', email: string = '', password: string = '') => {
		let body = {}
		if (username !== '') {
			body = {
				...body,
				username: username,
			}
		}
		if (email !== '') {
			body = {
				...body,
				email: email,
			}
		}
		if (password !== '') {
			body = {
				...body,
				password: password,
			}
		}
		const res = await this.api
			.put('/', body, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(res.data)
				return res
			})
			.catch((err) => {
				console.error('Error in updateProfile: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Delete profile */
	deleteProfile = async (token: string) => {
		const res = await this.api
			.delete('/', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(res.data)
				return res
			})
			.catch((err) => {
				console.error('Error in deleteProfile: [api.tsx]')
				return err.response
			})
		return res
	}

	deleteApplication = async (token: string, app: string) => {
		const res = await this.api
			.delete(`/application/${app}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return true
			})
			.catch((err) => {
				console.error('Error in deleteApplication: [api.tsx]')
				console.error(JSON.stringify(err, null, 4))
				return false
			})
		return res
	}

	/* Github Repository for webhook */
	githubRepository = async (token: string) => {
		const res = await this.api
			.get('/webhooks/github/repositories', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				// console.log(res.data);
				return res
			})
			.catch((err) => {
				console.error('Error in githubRepository: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Github Events for webhook */
	githubEvents = async (token: string, repositories: string) => {
		const res = await this.api
			.get(`/webhooks/github/events/${repositories}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				// console.log(res.data);
				return res
			})
			.catch((err) => {
				console.error('Error in githubEvents: [api.tsx]')
				return err.response
			})
		return res
	}

	/* Post new Github Webhook */
	githubWebhook = async (token: string, repositories: string, events: string) => {
		const body = { repository: repositories, event: events }
		const res = await this.api
			.post('/webhooks/github', body, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				return res
			})
			.catch((err) => {
				console.error(JSON.stringify(err.response, null, 4))
				// console.error("Error in githubWebhook: [api.tsx]");
				return err.response
			})
		return res
	}

	/* Post Action hue */
	actionHue = async (
		token: string,
		type: string,
		action: string,
		external: string,
		webhook: number,
		countdown: number = 10
	) => {
		const body = JSON.stringify({
			type: type,
			action: action,
			external: external,
			webhook: webhook,
			countdown: countdown,
		})
		const res = await this.api
			.post('/actions/hue', body, {
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				return res
			})
			.catch((err) => {
				console.error(JSON.stringify(err.response, null, 4))
				console.error('Error in actionHue: [api.tsx]')
				return err.response
			})
		return res
	}
}

export default new API()
