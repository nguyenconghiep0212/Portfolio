import { genMessage } from "../helper";

const modules = import.meta.globEager("./vi/**/*.ts");
export default {
  message: {
    ...genMessage(modules, "vi"),
  },
  dateLocale: null,
  dateLocaleName: "vi",
};
