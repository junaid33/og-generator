import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { colourThemes, defaultTheme } from "./colours";
import { getTheme, RLogo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = getTheme(config);
  const colours = colourThemes[theme];

  return `
  .top {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    background-color: ${colours.bg};
    color: ${colours.fg};
    padding: 80px;
  }

    .rlogo {
      position: absolute;
      top: 60px;
      left: 60px;
    }

    h1 {
      margin: 0;
      text-align: right;
      font-size: 1.5em;
      font-weight: 800;
      max-width: 1600px;
    }

    .dicon-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 80px;
    }

    .dicon {
      width: 300px;
      height: 300px;
      border-radius: 2px;
    }

    .em {
      color: ${colours.pink};
    }

    .url {
      margin-top: 40px;
      text-align: right;
      font-size: 45px;
      color: ${colours.gray};
    }
    `;
};

const Component: LayoutComponent = ({ config }) => {
  const theme = getTheme(config);
  const name = config.Name;
  const url = config.URL;
  const iconURL = `https://devicons.railway.app/${name}?variant=${
    theme === "light" ? "dark" : "light"
  }`;
  const hideIcon = config.Icon === "Hide";

  console.log({ iconURL });

  return (
    <div className="top">
      <RLogo config={config} />

      <div className="content">
        {!hideIcon && (
          <div className="dicon-wrapper">
            <img className="dicon" src={iconURL} />
          </div>
        )}

        <h1>
          Deploy <span className="em">{name}</span> on Railway
        </h1>

        {url && <div className="url">{url}</div>}
      </div>
    </div>
  );
};

export const starterLayout: ILayout = {
  name: "Starter",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Name",
      type: "text",
      default: "BlitzJS",
      placeholder: "Starter title",
    },
    {
      name: "URL",
      type: "text",
      placeholder: "github.com/railwayapp/starters",
    },
    {
      name: "Icon",
      type: "select",
      options: ["Show", "Hide"],
      default: "Show",
    },
  ],
  getCSS,
  Component,
};
