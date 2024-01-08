export const userToken = {
  name: 'access_token',
  get() {
    return (
      window['basetoken'] || sessionStorage.getItem(userToken.name) || undefined
    );
  },
  set(value: string) {
    sessionStorage.setItem(userToken.name, value);
  },
  delete() {
    sessionStorage.removeItem(userToken.name);
  },
};
