import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AssociationCategories from "@/components/ui/AssociationCategories";
// import Tabs, Tab from your UI library or implement simple tabs

// Types for framework and categories
interface Association {
  name: string;
  identifier: string;
  description?: string;
  code: string;
  status: string;
  category: string;
  index?: number;
}
interface Term {
  name: string;
  code: string;
  description?: string;
  status: string;
  identifier: string;
  associations?: Association[];
  index?: number;
  category?: string;
}
interface Category {
  identifier: string;
  name: string;
  code: string;
  description?: string;
  status: string;
  terms?: Term[];
  index?: number;
}
interface Framework {
  lastStatusChangedOn: string;
  createdOn: string;
  channel: string;
  name: string;
  identifier: string;
  description?: string;
  lastUpdatedOn: string;
  languageCode: string[];
  systemDefault: string;
  versionKey: string;
  code: string;
  objectType: string;
  status: string;
  type: string;
  categories: Category[];
}

interface FrameworkDetailsProps {
  id: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const FrameworkDetails: React.FC<FrameworkDetailsProps> = ({ id }) => {
  const [framework, setFramework] = useState<Framework | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) {
      setError("No framework specified in URL");
      setLoading(false);
      return;
    }
    const fetchFramework = async () => {
      setLoading(true);
      setError(null);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("tenantId", process.env.NEXT_PUBLIC_TENANT_ID || "");
        myHeaders.append(
          "Authorization",
          `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ""}`
        );
        myHeaders.append("Cookie", process.env.NEXT_PUBLIC_COOKIE || "");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect,
        };

        const url = `${process.env.NEXT_PUBLIC_INTERFACE_URL}/api/framework/v1/read/${id}`;
        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        // debug
        console.log(data.result.framework);
        setFramework(data.result.framework); // adjust if the structure is different
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch framework"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFramework();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!framework || typeof framework !== "object")
    return <div className="text-center py-8">No framework data available.</div>;

  const liveCategories = Array.isArray(framework.categories)
    ? framework.categories.filter((cat) => cat && cat.status === "Live")
    : [];

  // Calculate summary for all live categories
  const overviewItems = liveCategories.map((cat) => ({
    name: cat?.name || "Unnamed Category",
    count: Array.isArray(cat?.terms)
      ? cat.terms.filter((term) => term && term.status === "Live").length
      : 0,
  }));

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Framework Card (now first) */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{framework.name}</h1>
                <Badge>{framework.status}</Badge>
              </div>
              <div className="flex gap-2 items-center mb-1">
                <span className="text-base text-muted-foreground">
                  <span className="font-bold">Channel:</span>{" "}
                  {framework.channel}
                </span>
              </div>
              <p className="text-base text-muted-foreground mb-1">
                {framework.description}
              </p>
              <span className="text-xs text-muted-foreground">
                Last Updated: {formatDate(framework.lastUpdatedOn)}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Summary Section (now after the card) */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {overviewItems.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm"
            >
              <span className="text-base text-muted-foreground mb-1">
                {item.name}
              </span>
              <span className="text-2xl font-bold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Heading */}
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {liveCategories.length > 0 ? (
        <div className="space-y-6">
          {liveCategories.map((category) =>
            category ? (
              <Card
                key={category.identifier || category.name || Math.random()}
                className="shadow-md"
              >
                <CardHeader className="bg-slate-50 border-b">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">
                      {category.name || "Unnamed Category"}
                    </h2>
                    {category.description && (
                      <p className="text-base text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-3 py-2 text-left font-semibold text-base">
                            Terms
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-base">
                            Code
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-base">
                            Description
                          </th>
                          <th className="px-3 py-2 text-left font-semibold text-base">
                            Associations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(category.terms) &&
                        category.terms.filter(
                          (term) => term && term.status === "Live"
                        ).length > 0 ? (
                          category.terms
                            .filter((term) => term && term.status === "Live")
                            .map((term) =>
                              term ? (
                                <tr
                                  key={
                                    term.identifier ||
                                    term.name ||
                                    Math.random()
                                  }
                                  className="border-b last:border-0 hover:bg-slate-50"
                                >
                                  <td className="px-3 py-2 font-medium text-base">
                                    {term.name || "Unnamed Term"}
                                  </td>
                                  <td className="px-3 py-2 text-base">
                                    {term.code || "-"}
                                  </td>
                                  <td className="px-3 py-2 text-base">
                                    {term.description || "-"}
                                  </td>
                                  <td className="px-3 py-2 text-base">
                                    {Array.isArray(term.associations) &&
                                    term.associations.length > 0 ? (
                                      (() => {
                                        const liveAssocs =
                                          term.associations.filter(
                                            (assoc) =>
                                              assoc && assoc.status === "Live"
                                          );
                                        if (liveAssocs.length === 0)
                                          return (
                                            <span className="text-muted-foreground">
                                              No associations
                                            </span>
                                          );
                                        // Group associations by category and map to the new component's expected format
                                        const grouped: {
                                          [cat: string]: Association[];
                                        } = {};
                                        liveAssocs.forEach((assoc) => {
                                          if (!assoc || !assoc.category) return;
                                          if (!grouped[assoc.category])
                                            grouped[assoc.category] = [];
                                          grouped[assoc.category].push(assoc);
                                        });
                                        // Convert to array of { name, identifier, terms: [{identifier, name}] }
                                        const categories = Object.entries(
                                          grouped
                                        ).map(([cat, assocs]) => ({
                                          name:
                                            cat.charAt(0).toUpperCase() +
                                            cat.slice(1),
                                          identifier: cat,
                                          terms: assocs.map((a) => ({
                                            identifier: a.identifier,
                                            name: a.name,
                                          })),
                                        }));
                                        return (
                                          <AssociationCategories
                                            categories={categories}
                                            termName={term.name}
                                            categoryName={category.name}
                                          />
                                        );
                                      })()
                                    ) : (
                                      <span className="text-muted-foreground">
                                        No associations
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ) : null
                            )
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center text-muted-foreground py-4 text-base"
                            >
                              No terms available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : null
          )}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8 text-base">
          No categories available
        </div>
      )}
    </div>
  );
};

export default FrameworkDetails;
