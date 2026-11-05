export class ProfileSearch {
  static elements = {
    form: 'search-form',
    input: 'search-input',
  };

  static stateClasses = {
    disabled: 'disabled',
  };

  constructor({ api, card }) {
    this.api = api;
    this.card = card;

    this.form = document.getElementById(ProfileSearch.elements.form);
    this.input = document.getElementById(ProfileSearch.elements.input);

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
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(isLoading) {
    this.form.classList.toggle(ProfileSearch.stateClasses.disabled, isLoading);
    this.input.disabled = isLoading;
  }
}
