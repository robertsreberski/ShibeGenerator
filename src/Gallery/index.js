import React from "react";
import uuid from "uuid/v4";
import { Flex, Box } from "reflexbox";

const Gallery = ({ urls }) => (
  <Flex w={1} justify="center" wrap>
    {urls.map((url, index) => (
      <Box w={0.3} key={uuid()}>
        <img src={url} alt={`img-${index}`} style={{ width: "100%" }} />
      </Box>
    ))}
  </Flex>
);

export default Gallery;
