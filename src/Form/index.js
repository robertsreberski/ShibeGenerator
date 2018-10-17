import React from "react";
import { Box } from "reflexbox";
import { compose } from "recompose";
import { withFormik } from "formik";
import Field from "./Field";

export const Type = {
  Shibes: 0,
  Birds: 1,
  Cats: 2,
  Random: 3
};

const enhance = compose(
  withFormik({
    mapPropsToValues: () => ({
      count: 1,
      type: 0
    }),
    validate: ({ type, count }) => ({
      ...(count < 1 || count > 10 || count === ""
        ? { count: "Wartość musi mieścić się w przedziale od 1 do 10" }
        : {}),
      ...(type === -1 ? { type: "Wybierz spośród dostępnych wartości" } : {})
    }),
    handleSubmit: (values, { setSubmitting, props }) => {
      props.onSubmit(values, () => {
        setSubmitting(false);
      });
    }
  })
);

const Form = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <Field title="Ilość zdjęć" name="count" {...{ errors, touched }}>
      <input
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.count}
        name="count"
      />
    </Field>
    <Field title="Typ zwierzaka" name="type" {...{ errors, touched }}>
      <select name="type" onChange={handleChange}>
        {Object.entries(Type).map(entry => (
          <option key={`list-${entry[1]}`} value={entry[1]}>
            {entry[0]}
          </option>
        ))}
      </select>
    </Field>
    <Box justify="center" p={2}>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ładowanie danych..." : "Szukaj"}
      </button>
    </Box>
  </form>
);

export default enhance(Form);
