import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { Copy } from "lucide-react";
import ParameterRow from "@/components/ParameterRow"
// Import JSON file
import medusaOpenApi from "../../docs/openApi/openapi.json";

type Parameter = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  children?: Parameter[];
  example?: string;
};

function ContentHome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const apiPath = queryParams.get("api");

  const apiInfo = apiPath
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (medusaOpenApi.paths as Record<string, any>)[apiPath]
    : null;

  const activeTab = "javascript";

  const codeExample = `var axios = require('axios');
        var data = JSON.stringify({
        "email": "string",
        "password": "string"
        });

        var config = {
        method: 'post',
        url: 'https://api.medusa-commerce.com/store/token',
        headers: {`;

  const parameters: Parameter[] = [
    {
      name: "region_id",
      type: "string",
      required: false,
      description:
        "The ID of the Region to create the Cart in. Setting the cart's region can affect the pricing of the items in the cart as well as the used currency. If this parameter is not provided, the first region in the store is used by default.",
    },
    {
      name: "sales_channel_id",
      type: "string",
      required: false,
      description:
        "The ID of the Sales channel to create the Cart in. The cart's sales channel affects which products can be added to the cart. If a product does not exist in the cart's sales channel, it cannot be added to the cart.",
    },
    {
      name: "country_code",
      type: "string",
      required: false,
      description:
        "The two character ISO country code to create the Cart in. Setting this parameter will set the country code of the shipping address.",
    },
    {
      name: "context",
      type: "object",
      required: false,
      description: "An object to provide context to the Cart.",
      example: '{"ip":"::1","user_agent":"Chrome"}',
    },
    {
      name: "items",
      type: "array [object (2)]",
      required: false,
      description: "An array of product variants to generate line items from.",
      children: [
        {
          name: "variant_id",
          type: "string",
          required: true,
          description: "The ID of the Product Variant.",
        },
        {
          name: "quantity",
          type: "integer",
          required: true,
          description: "The quantity to add into the cart.",
        },
      ],
    },
  ];

  return (
    <>
      {apiInfo ? (
        <div className="space-y-4 p-5">
          <h1 className="text-2xl font-semibold">{apiInfo.post.summary}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-orange-500 text-white rounded text-sm font-medium">
                POST
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                /store/token
              </span>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button>Try it out</Button>
              <Button variant="outline" className="text-slate-600">
                ⌘ Run in Apidog
              </Button>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            {apiInfo.post.description}
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Request</h2>

            <div className="flex gap-4">
              <div className="flex-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-slate-600">Body Params</h3>
                  <span className="text-sm text-slate-500">
                    application/json
                  </span>
                </div>

                <div className="space-y-1">
                  {parameters.map((param, index) => (
                    <ParameterRow key={index} parameter={param} level={0} />
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-slate-600">Example</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-slate-500"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <pre className="text-sm text-slate-500">
                    {`{
  "region_id": "string",
  "sales_channel_id": "string",
  "country_code": "string",
  "context": {
    "ip": "::1",
    "user_agent": "Chrome"
  },
  "items": [
    {
      "variant_id": "string",
      "quantity": 0
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Request samples</h2>
              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="grid grid-cols-7 w-full bg-transparent gap-2">
                  <TabsTrigger
                    value="javascript"
                    className={`flex items-center gap-2 ${
                      activeTab === "javascript"
                        ? "bg-slate-100 dark:bg-slate-800"
                        : ""
                    }`}
                  >
                    <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center text-xs">
                      JS
                    </div>
                    JavaScript
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="javascript">
                  <div className="bg-[#1B1F23] rounded-lg p-4 mt-2">
                    <pre className="text-sm text-slate-500">
                      {codeExample}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Data Fetching</h1>
          <p>
            In this section, you'll learn how to fetch data from an API and
            render it on the screen.
          </p>
        </>
      )}
    </>
  );
}

export default ContentHome;