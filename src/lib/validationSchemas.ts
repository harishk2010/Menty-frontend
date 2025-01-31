import * as Yup from "yup";

export const UsernameSchema = Yup.object().shape({
    username: Yup.string()
      .trim() // Remove leading and trailing spaces
      .min(5, "Username must be at least 5 characters")
      .required("Username is Required")
      .test(
        "no-spaces",
        "Username cannot consist of only spaces",
        (value) => !!value && value.trim().length > 0 // Ensure non-space characters
      ),
  });