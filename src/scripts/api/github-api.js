import { Octokit } from 'octokit';

export class GithubApi {
  constructor({ token } = {}) {
    this.octocit = new Octokit({ auth: token });
  }

  async futchUser(username) {
    const { data } = await this.octocit.request(`GET /users/${username}`);
  }
}
