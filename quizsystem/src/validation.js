/* eslint-disable no-useless-escape */
const emailRegex = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
const inputRegex = {
  /* eslint-disable no-useless-escape */
  name: value => /[a-zA-Z]/.test(value),
  username: value => /[a-zA-Z]/.test(value),
  email: value => emailRegex.test(value),
  password: value => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value),
  contactno: value => {
    const filterValue = value.replace(/\D/g, "");
    return (
      filterValue.length > 9 &&
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        filterValue
      )
    );
  }
};

export default inputRegex;
