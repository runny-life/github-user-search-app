export class ProfileCard {
  static elements = {
    card: 'profile-card',
    avatar: 'profile-avatar',
    name: 'profile-name',
    login: 'profile-login',
    joined: 'profile-joined',
    bio: 'profile-bio',
    repos: 'profile-repos',
    followers: 'profile-followers',
    following: 'profile-following',
    location: 'profile-location',
    twitter: 'profile-twitter',
    blog: 'profile-blog',
    company: 'profile-company',
  };

  static stateClasses = {
    disabled: 'disabled',
  };

  constructor() {
    this.refs = Object.fromEntries(
      Object.entries(ProfileCard.elements).map(([key, id]) => [key, document.getElementById(id)]),
    );
  }

  render(data) {
    console.log(data);
    this.renderHeader(data);
    this.renderStats(data);
    this.renderLinks(data);
  }

  renderHeader(data) {
    const displayName = data.name ?? data.logic;

    this.refs.avatar.src = data.avatar_url;
    this.refs.avatar.alt = displayName;
    this.refs.name.textContent = displayName;
    this.refs.login.textContent = `@${data.login}`;
    this.refs.joined.textContent = `Joined ${this.formatDate(data.created_at)}`;
    this.refs.bio.textContent = data.bio ?? 'This profile has no bio';
  }

  renderStats(data) {
    this.refs.repos.textContent = data.public_repos;
    this.refs.followers.textContent = data.followers;
    this.refs.following.textContent = data.following;
  }

  renderLinks(data) {
    this.renderLink(
      this.refs.location,
      data.location,
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`,
    );
    this.renderLink(
      this.refs.twitter,
      data.twitter_username,
      `https://x.com/${data.twitter_username}`,
    );
    this.renderLink(this.refs.blog, data.blog, data.blog);
    this.renderLink(
      this.refs.company,
      data.company,
      data.company ? `https://github.com/${data.company.replace('@', '')}` : '',
    );
  }

  renderLink(element, value, href) {
    const isEmpty = value === null || value === undefined || value === '';

    if (isEmpty) {
      element.textContent = 'Not Available';
      element.removeAttribute('href');
      element.classList.add(ProfileCard.stateClasses.disabled);
      element.setAttribute('tabindex', '-1');
      return;
    }

    element.textContent = value;
    element.href = href;
    element.classList.remove(ProfileCard.stateClasses.disabled);
    element.setAttribute('tabindex', '0');
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  }
}
