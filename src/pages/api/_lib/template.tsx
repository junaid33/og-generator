import { layouts } from "../../../layouts";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { IConfig, ILayoutConfig, LayoutComponent } from "../../../types";
import { sanitizeHtml } from "./sanitizer";

const getCommonCSS = () => {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

    body {
        background: white;
        color: black;
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 100px;
        margin: 0;
        padding: 0;
    }

    * {
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, p {
      margin: 0;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }
`;
};

const NotImplemented: LayoutComponent = ({ config }) => (
  <h1 style={{ fontSize: 100 }}>{config.layoutName} not implemented</h1>
);

export const getHtml = (config: IConfig & ILayoutConfig) => {
  const layout = layouts.find(l => l.name === config.layoutName);

  const rendered = ReactDOMServer.renderToString(
    layout?.Component != null ? (
      <layout.Component config={config} />
    ) : (
      <NotImplemented config={config} />
    ),
  );

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCommonCSS()}
        ${layout?.getCSS != null ? layout.getCSS(config) : ""}
    </style>
    <body>
      ${rendered}
    </body>
</html>`;
};
