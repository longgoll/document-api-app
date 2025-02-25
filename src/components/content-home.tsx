import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
// Import JSON file
import medusaOpenApi from "../../docs/openApi/openapi.json";

function ContentHome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const apiPath = queryParams.get("api");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiInfo = apiPath ? (medusaOpenApi.paths as Record<string, any>)[apiPath] : null;

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
            {/* Description */}
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            {apiInfo.post.description}
          </p>
          {/* Endpoint Header */}

          {/* Request Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Request</h2>

            {/* Body Parameters */}
            

            {/* Example */}
            <div className="space-y-2">
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
                <pre className="text-slate-50 text-sm">
                  {`{
  "email": "string",
  "password": "string"
}`}
                </pre>
              </div>
            </div>

            {/* Request Samples */}
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
                  {/* Add other language tabs as needed */}
                </TabsList>
                <TabsContent value="javascript">
                  <div className="bg-[#1B1F23] rounded-lg p-4 mt-2">
                    <pre className="text-slate-50 text-sm font-mono">
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
