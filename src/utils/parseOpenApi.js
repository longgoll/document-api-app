import SwaggerClient from "swagger-client";

async function parseOpenApi() {
  try {
    const client = await SwaggerClient({
      url: "docs/openApi/openApi.json"
    });
    const api = client.spec;
    console.log(api);
  } catch (err) {
    console.error(err);
  }
}

export default parseOpenApi;