import '../styles/style.scss';
import { Octokit } from 'octokit';

class SearchProfile {
  elements = {
    searchForm: 'search-form',
    searchInput: 'search-input',
    profileCard: 'profile-card',
    profileAvatar: 'profile-avatar',
    profileName: 'profile-name',
    profileLogin: 'profile-login',
    profileJoined: 'profile-joined',
    profileBio: 'profile-bio',
    profileRepos: 'profile-repos',
    profileFollowers: 'profile-followers',
    profileFollowing: 'profile-following',
    profileLocation: 'profile-location',
    profileTwitter: 'profile-twitter',
    profileBlog: 'profile-blog',
    profileCompany: 'profile-company',
  };

  stateClasses = {
    disabled: 'disabled',
  };

  constructor() {
    this.searchFormElement = document.getElementById(this.elements.searchForm);
    this.searchInputElement = document.getElementById(this.elements.searchInput);
    this.profileCardElement = document.getElementById(this.elements.profileCard);
    this.profileAvatarElement = document.getElementById(this.elements.profileAvatar);
    this.profileNameElement = document.getElementById(this.elements.profileName);
    this.profileLoginElement = document.getElementById(this.elements.profileLogin);
    this.profileJoinedElement = document.getElementById(this.elements.profileJoined);
    this.profileBioElement = document.getElementById(this.elements.profileBio);
    this.profileReposElement = document.getElementById(this.elements.profileRepos);
    this.profileFollowersElement = document.getElementById(this.elements.profileFollowers);
    this.profileFollowingElement = document.getElementById(this.elements.profileFollowing);
    this.profileLocationElement = document.getElementById(this.elements.profileLocation);
    this.profileTwitterElement = document.getElementById(this.elements.profileTwitter);
    this.profileBlogElement = document.getElementById(this.elements.profileBlog);
    this.profileCompanyElement = document.getElementById(this.elements.profileCompany);
    this.octokit = new Octokit();
    this.init();
  }

  formatterDate(date) {
    const objectDate = new Date(date);

    const formatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return formatter.format(objectDate).replace(',', '');
  }

  async getUserGitHubInfo(username) {
    try {
      return await this.octokit.request(`GET /users/${username}`);
    } catch (error) {
      console.error(error);
    }
  }

  updateUI(data) {
    this.profileAvatarElement.src = data.avatar_url;

    if (data.name === null) {
      this.profileAvatarElement.alt = data.login;
      this.profileNameElement.textContent = data.login;
    } else {
      this.profileAvatarElement.alt = data.name;
      this.profileNameElement.textContent = data.name;
    }

    this.profileLoginElement.textContent = `@${data.login}`;
    this.profileJoinedElement.textContent = `Joined ${this.formatterDate(data.created_at)}`;
    this.profileBioElement.textContent = data.bio === null ? 'This profile has no bio' : data.bio;
    this.profileReposElement.textContent = data.public_repos;
    this.profileFollowersElement.textContent = data.followers;
    this.profileFollowingElement.textContent = data.following;

    if (data.location === null) {
      this.profileLocationElement.textContent = 'Not Available';
      this.profileLocationElement.href = '';
      this.profileLocationElement.classList.add(this.stateClasses.disabled);
      this.profileLocationElement.setAttribute('tabindex', '-1');
    } else {
      this.profileLocationElement.textContent = data.location;
      this.profileLocationElement.href = `https://www.google.com/maps/search/?api=1&query=${data.location}`;
      this.profileLocationElement.classList.remove(this.stateClasses.disabled);
      this.profileLocationElement.setAttribute('tabindex', '0');
    }

    if (data.twitter_username === null) {
      this.profileTwitterElement.textContent = 'Not Available';
      this.profileTwitterElement.href = '';
      this.profileTwitterElement.classList.add(this.stateClasses.disabled);
      this.profileTwitterElement.setAttribute('tabindex', '-1');
    } else {
      this.profileTwitterElement.textContent = data.twitter_username;
      this.profileTwitterElement.href = `https://x.com/${data.twitter_username}`;
      this.profileTwitterElement.classList.remove(this.stateClasses.disabled);
      this.profileTwitterElement.setAttribute('tabindex', '0');
    }

    if (data.blog === '') {
      this.profileBlogElement.textContent = 'Not Available';
      this.profileBlogElement.href = '';
      this.profileBlogElement.classList.add(this.stateClasses.disabled);
      this.profileBlogElement.setAttribute('tabindex', '-1');
    } else {
      this.profileBlogElement.textContent = data.blog;
      this.profileBlogElement.href = data.blog;
      this.profileBlogElement.classList.remove(this.stateClasses.disabled);
      this.profileBlogElement.setAttribute('tabindex', '0');
    }

    if (data.company === null) {
      this.profileCompanyElement.textContent = 'Not Available';
      this.profileCompanyElement.href = '';
      this.profileCompanyElement.classList.add(this.stateClasses.disabled);
      this.profileCompanyElement.setAttribute('tabindex', '-1');
    } else {
      this.profileCompanyElement.textContent = data.company;
      this.profileCompanyElement.href = `https://github.com/github`;
      this.profileCompanyElement.classList.remove(this.stateClasses.disabled);
      this.profileCompanyElement.setAttribute('tabindex', '0');
    }
  }

  async onSubmitSearchForm(e) {
    e.preventDefault();
    const { data } = await this.getUserGitHubInfo(this.searchInputElement.value.trim());
    this.updateUI(data);
  }

  init() {
    this.searchFormElement.addEventListener('submit', (e) => this.onSubmitSearchForm(e));
  }
}

new SearchProfile();
