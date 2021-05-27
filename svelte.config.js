import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    defaults: {
      style: "scss"
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  }),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte"
  }
};

export default config;