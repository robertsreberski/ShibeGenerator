import React from "react";
import { Flex, Box } from "reflexbox";

const Field = ({ title, name, errors, touched, children }) => (
  <Flex align="center">
    <Box px={1}>
      <p>{title}</p>
    </Box>
    <Box px={1}>{children}</Box>
    <Box>
      {errors[name] &&
        touched[name] && <p style={{ color: "red" }}>{errors[name]}</p>}
    </Box>
  </Flex>
);

export default Field;
