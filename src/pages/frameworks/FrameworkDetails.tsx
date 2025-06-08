import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const FrameworkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [framework, setFramework] = useState<Framework | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) {
      setError('No framework specified in URL');
      setLoading(false);
      return;
    }
    const fetchFramework = async () => {
      setLoading(true);
      setError(null);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("tenantId", import.meta.env.VITE_TENANT_ID);
        myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`);
        myHeaders.append("Cookie", import.meta.env.VITE_COOKIE);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect,
        };

        const url = `${import.meta.env.VITE_INTERFACE_URL}/api/framework/v1/read/${id}`;
        const response = await fetch(url, requestOptions);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        // debug
        console.log(data.result.framework);
        setFramework(data.result.framework); // adjust if the structure is different
      } catch (err: any) {
        setError(err.message || "Failed to fetch framework");
      } finally {
        setLoading(false);
      }
    };

    fetchFramework();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!framework) return <div className="text-center py-8">No framework data available.</div>;

  const liveCategories = framework.categories.filter((cat) => cat.status === 'Live');

  // Calculate summary counts
  const getCategoryCount = (code: string) =>
    liveCategories.find((cat) => cat.code.toLowerCase() === code.toLowerCase())?.terms?.filter(term => term.status === 'Live').length || 0;

  const totalBoards = getCategoryCount('board');
  const totalMediums = getCategoryCount('medium');
  const totalGrades = getCategoryCount('gradelevel');
  const totalSubjects = getCategoryCount('subject');

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
                <span className="text-base text-muted-foreground"><span className="font-bold">Channel:</span> {framework.channel}</span>
              </div>
              <p className="text-base text-muted-foreground mb-1">{framework.description}</p>
              <span className="text-xs text-muted-foreground">Last Updated: {formatDate(framework.lastUpdatedOn)}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Summary Section (now after the card) */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm">
            <span className="text-base text-muted-foreground mb-1">Total Boards</span>
            <span className="text-2xl font-bold">{totalBoards}</span>
          </div>
          <div className="rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm">
            <span className="text-base text-muted-foreground mb-1">Total Mediums</span>
            <span className="text-2xl font-bold">{totalMediums}</span>
          </div>
          <div className="rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm">
            <span className="text-base text-muted-foreground mb-1">Total Grades</span>
            <span className="text-2xl font-bold">{totalGrades}</span>
          </div>
          <div className="rounded-xl border bg-white p-6 flex flex-col items-center shadow-sm">
            <span className="text-base text-muted-foreground mb-1">Total Subjects</span>
            <span className="text-2xl font-bold">{totalSubjects}</span>
          </div>
        </div>
      </div>

      {/* Categories Heading */}
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {liveCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveCategories.map((category) => (
            <Card key={category.identifier} className="shadow-md">
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  {category.description && (
                    <p className="text-base text-muted-foreground">{category.description}</p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="px-3 py-2 text-left font-semibold text-base">Terms</th>
                        <th className="px-3 py-2 text-left font-semibold text-base">Code</th>
                        <th className="px-3 py-2 text-left font-semibold text-base">Description</th>
                        <th className="px-3 py-2 text-left font-semibold text-base">Associations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(category.terms || []).filter((term) => term.status === 'Live').length > 0 ? (
                        (category.terms || [])
                          .filter((term) => term.status === 'Live')
                          .map((term) => (
                            <tr key={term.identifier} className="border-b last:border-0 hover:bg-slate-50">
                              <td className="px-3 py-2 font-medium text-base">{term.name}</td>
                              <td className="px-3 py-2 text-base">{term.code}</td>
                              <td className="px-3 py-2 text-base">{term.description}</td>
                              <td className="px-3 py-2 text-base">
                                {term.associations && term.associations.length > 0 ? (
                                  // Group associations by category
                                  (() => {
                                    const liveAssocs = term.associations.filter((assoc) => assoc.status === 'Live');
                                    if (liveAssocs.length === 0) return <span className="text-muted-foreground">No associations</span>;
                                    const grouped: { [cat: string]: Association[] } = {};
                                    liveAssocs.forEach((assoc) => {
                                      if (!grouped[assoc.category]) grouped[assoc.category] = [];
                                      grouped[assoc.category].push(assoc);
                                    });
                                    return (
                                      <div className="space-y-1">
                                        {Object.entries(grouped).map(([cat, assocs]) => (
                                          <div key={cat}>
                                            <span className="font-semibold text-xs bg-slate-100 rounded px-2 py-0.5 mr-2 text-slate-700 inline-block mb-1">
                                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </span>
                                            <div className="flex flex-wrap gap-1 mb-1">
                                              {assocs.map((assoc) => (
                                                <Badge key={assoc.identifier} className="bg-indigo-100 text-indigo-800">
                                                  {assoc.name}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  })()
                                ) : (
                                  <span className="text-muted-foreground">No associations</span>
                                )}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted-foreground py-4 text-base">No terms available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8 text-base">No categories available</div>
      )}
    </div>
  );
};

export default FrameworkDetails; 