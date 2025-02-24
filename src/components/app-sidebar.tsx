import * as React from "react";
import { ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Import uuid

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Import JSON file
import medusaOpenApi from "../../docs/Medusa.openapi.json";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [dataNav, setDataNav] = React.useState({
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Installation",
            url: "#",
          },
          {
            title: "Project Structure",
            url: "#",
          },
        ],
      },
    ],
  });

  React.useEffect(() => {
    // Extract tags and paths from the OpenAPI JSON
    const paths = medusaOpenApi.paths;

    // Create a map to group paths by their tags
    const tagMap = new Map();

    Object.entries(paths).forEach(([, methods]) => {
      const methodEntries = methods as Record<
        string,
        { tags: string[]; summary: string; operationId: string }
      >;
      const firstMethod = methodEntries[Object.keys(methodEntries)[0]];
      if (firstMethod && firstMethod.tags && firstMethod.tags.length > 0) {
        const tag = firstMethod.tags[0];
        const shortTag = tag.split("/").pop(); // Get the last part of the tag

        if (!tagMap.has(shortTag)) {
          tagMap.set(shortTag, []);
        }

        const items = Object.entries(methodEntries).map(
          ([method, operation]) => {
            const uuid = uuidv4();
            return {
              id: uuid, // Generate a unique ID for each item
              title: operation.summary,
              url: `#${operation.operationId}-${uuid}`,
              method: method.toUpperCase(),
              operationId: operation.operationId,
            };
          }
        );

        tagMap.get(shortTag).push(...items);
      }
    });

    // Create a navigation structure based on the tag map
    const navMain = Array.from(tagMap.entries()).map(([tag, items]) => {
      return {
        title: tag,
        url: "#",
        items,
      };
    });

    // Update the state with the new navigation structure
    setDataNav((prevState) => ({
      ...prevState,
      navMain,
    }));
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={dataNav.versions}
          defaultVersion={dataNav.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {dataNav.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.id}>
                        <SidebarMenuButton asChild isActive={false}>
                          <a
                            href={subItem.url}
                            className="flex justify-between items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                          >
                            <span>{subItem.title}</span>
                            <span
                              className={
                                subItem.method === "GET"
                                  ? "text-[#007F31] text-sm"
                                  : subItem.method === "POST"
                                  ? "text-[#AD7A03] text-sm"
                                  : subItem.method === "PUT"
                                  ? "text-[#0053B8] text-sm"
                                  : subItem.method === "PATCH"
                                  ? "text-[#623497] text-sm"
                                  : subItem.method === "DELETE"
                                  ? "text-[#8E1A10] text-sm"
                                  : subItem.method === "HEAD"
                                  ? "text-[#007F31] text-sm"
                                  : subItem.method === "OPTIONS"
                                  ? "text-[#A61468] text-sm"
                                  : ""
                              }
                            >
                              {subItem.method}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}