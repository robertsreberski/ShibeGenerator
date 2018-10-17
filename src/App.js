import React from "react";
import { compose, withState, withHandlers } from "recompose";
import Form, { Type } from "./Form";
import Gallery from "./Gallery";

const Url = "http://shibe.online/api";

const TypeEndpoints = {
  [Type.Shibes]: "shibes",
  [Type.Birds]: "birds",
  [Type.Cats]: "cats"
};

const fetchCors = url => fetch(`https://cors-escape.herokuapp.com/${url}`);

const getFinalType = type =>
  parseInt(type) === Type.Random ? Math.floor(Math.random() * 3) : type;

const enhance = compose(
  withState("urls", "setUrls", []),
  withHandlers({
    handleLoadUrls: ({ setUrls }) => ({ type, count }, onFinished) => {
      const endpoint = TypeEndpoints[getFinalType(type)];
      fetchCors(`${Url}/${endpoint}?count=${count}`)
        .then(response => response.json())
        .then(urls => {
          setUrls(urls);
          onFinished();
        });
    }
  })
);

const App = ({ urls, handleLoadUrls }) => (
  <div>
    <Form onSubmit={handleLoadUrls} />
    <Gallery {...{ urls }} />
  </div>
);

export default enhance(App);
