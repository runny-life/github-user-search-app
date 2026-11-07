export class ProfileSearch {
  static elements = {
    form: 'search-form',
    input: 'search-input',
    card: 'profile-card',
    error: 'profile-error',
    searchError: 'search-error',
  };

  static stateClasses = {
    disabled: 'disabled',
  };

  constructor({ api, card }) {
    this.api = api;
    this.card = card;

    this.form = document.getElementById(ProfileSearch.elements.form);
    this.input = document.getElementById(ProfileSearch.elements.input);
    this.cardElement = document.getElementById(ProfileSearch.elements.card);
    this.errorElement = document.getElementById(ProfileSearch.elements.error);
    this.searchErrorElement = document.getElementById(ProfileSearch.elements.searchError);

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const username = this.input.value.trim();
    if (!username) return;

    this.setLoading(true);

    try {
      const data = await this.api.fetchUser(username);
      this.card.render(data);
      this.showCard();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoading(false);
    }
  }

  handleError(error) {
    this.showError();
    console.error(error);
  }

  setLoading(isLoading) {
    this.form.classList.toggle(ProfileSearch.stateClasses.disabled, isLoading);
    this.input.disabled = isLoading;
  }

  showCard() {
    this.cardElement.hidden = false;
    this.errorElement.hidden = true;
    this.searchErrorElement.hidden = true;
  }

  showError() {
    this.cardElement.hidden = true;
    this.errorElement.hidden = false;
    this.searchErrorElement.hidden = false;
  }
}
