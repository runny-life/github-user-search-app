import { Octokit } from 'octokit';

export class GithubApi {
  constructor({ token } = {}) {
    this.octokit = new Octokit({ auth: token });
  }

  async fetchUser(username) {
    const { data } = await this.octokit.request(`GET /users/${username}`);

    return data;
  }
}
