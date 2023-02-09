
import { Button, Paragraph } from "./components.js";

const buttonElement = Button();

buttonElement.addEventListener("click", async () => {
  const module = await import("./more-components.js");
  module.Card();
});

Paragraph();

const name = "tebi";

console.log(name);

