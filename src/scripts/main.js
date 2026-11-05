import '../styles/style.scss';
import { GithubApi } from './api/github-api';
import { ProfileCard } from './ui/profile-card';
import { ProfileSearch } from './controllers/profile-search';

const api = new GithubApi();
const card = new ProfileCard();

new ProfileSearch({ api, card });
