import React from 'react';
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

// Mocked framework data (replace with API/fetch logic as needed)
// const framework: Framework = {
//   name: 'Vidya-framework',
//   status: 'Live',
//   channel: 'c4gt-test-channel',
//   description: 'This is a Framework for testing and UI implementation for C4GT',
//   lastUpdatedOn: '2025-06-04T16:54:05.354+0000',
//   categories: [] // Fill with real data or mock data as needed
// };

const framework: Framework = {
    lastStatusChangedOn: "2025-06-04T16:41:33.748+0000",
    name: "Vidya-framework",
    createdOn: "2025-06-04T16:41:33.748+0000",
    channel: "c4gt-test-channel",
    lastUpdatedOn: "2025-06-04T16:54:05.354+0000",
    identifier: "vidya-framework",
    description: "This is a Framework for testing and UI implementation for C4GT",
    languageCode: [],
    systemDefault: "No",
    versionKey: "1749056045354",
    code: "vidya-framework",
    objectType: "Framework",
    status: "Live",
    type: "K-12",
    categories: [
      {
        identifier: "vidya-framework_board",
        code: "board",
        terms: [
          {
            associations: [
              {
                name: "English",
                identifier: "vidya-framework_subject_english",
                description: "English Subject",
                code: "english",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Sanskrit",
                identifier: "vidya-framework_subject_sanskrit",
                description: "Sanskrit Subject",
                code: "sanskrit",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Hindi",
                identifier: "vidya-framework_medium_hindi",
                description: "Hindi Medium",
                code: "hindi",
                status: "Live",
                category: "medium",
                index: 1
              },
              {
                name: "English",
                identifier: "vidya-framework_medium_english",
                description: "English Medium",
                code: "english",
                status: "Live",
                category: "medium",
                index: 1
              },
              {
                name: "Hindi",
                identifier: "vidya-framework_subject_hindi",
                description: "Hindi Subject",
                code: "hindi",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Science",
                identifier: "vidya-framework_subject_science",
                description: "Science Subject",
                code: "science",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Mathematics",
                identifier: "vidya-framework_subject_mathematics",
                description: "Mathematics Subject",
                code: "mathematics",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Social Science",
                identifier: "vidya-framework_subject_socialscience",
                description: "Social Science Subject",
                code: "socialscience",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Class 10",
                identifier: "vidya-framework_gradelevel_class10",
                description: "Class10 Grade",
                code: "class10",
                status: "Live",
                category: "gradeLevel",
                index: 1
              },
              {
                name: "Bengali",
                identifier: "vidya-framework_subject_bengali",
                description: "Bengali Subject",
                code: "bengali",
                status: "Live",
                category: "subject",
                index: 1
              }
            ],
            identifier: "vidya-framework_board_cbse",
            code: "cbse",
            name: "CBSE",
            description: "CBSE Board Test",
            index: 1,
            category: "board",
            status: "Live"
          }
        ],
        name: "Board",
        description: "Board category",
        index: 1,
        status: "Live"
      },
      {
        identifier: "vidya-framework_medium",
        code: "medium",
        terms: [
          {
            associations: [
              {
                name: "Class 10",
                identifier: "vidya-framework_gradelevel_class10",
                description: "Class10 Grade",
                code: "class10",
                status: "Live",
                category: "gradeLevel",
                index: 1
              },
              {
                name: "Mathematics",
                identifier: "vidya-framework_subject_mathematics",
                description: "Mathematics Subject",
                code: "mathematics",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Science",
                identifier: "vidya-framework_subject_science",
                description: "Science Subject",
                code: "science",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "English",
                identifier: "vidya-framework_subject_english",
                description: "English Subject",
                code: "english",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Sanskrit",
                identifier: "vidya-framework_subject_sanskrit",
                description: "Sanskrit Subject",
                code: "sanskrit",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Social Science",
                identifier: "vidya-framework_subject_socialscience",
                description: "Social Science Subject",
                code: "socialscience",
                status: "Live",
                category: "subject",
                index: 1
              }
            ],
            identifier: "vidya-framework_medium_english",
            code: "english",
            name: "English",
            description: "English Medium",
            index: 1,
            category: "medium",
            status: "Live"
          },
          {
            associations: [
              {
                name: "Class 10",
                identifier: "vidya-framework_gradelevel_class10",
                description: "Class10 Grade",
                code: "class10",
                status: "Live",
                category: "gradeLevel",
                index: 1
              },
              {
                name: "Mathematics",
                identifier: "vidya-framework_subject_mathematics",
                description: "Mathematics Subject",
                code: "mathematics",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Bengali",
                identifier: "vidya-framework_subject_bengali",
                description: "Bengali Subject",
                code: "bengali",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Hindi",
                identifier: "vidya-framework_subject_hindi",
                description: "Hindi Subject",
                code: "hindi",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Social Science",
                identifier: "vidya-framework_subject_socialscience",
                description: "Social Science Subject",
                code: "socialscience",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Science",
                identifier: "vidya-framework_subject_science",
                description: "Science Subject",
                code: "science",
                status: "Live",
                category: "subject",
                index: 1
              }
            ],
            identifier: "vidya-framework_medium_hindi",
            code: "hindi",
            name: "Hindi",
            description: "Hindi Medium",
            index: 1,
            category: "medium",
            status: "Live"
          }
        ],
        name: "Medium",
        description: "Medium",
        index: 2,
        status: "Live"
      },
      {
        identifier: "vidya-framework_gradelevel",
        code: "gradeLevel",
        terms: [
          {
            associations: [
              {
                name: "English",
                identifier: "vidya-framework_subject_english",
                description: "English Subject",
                code: "english",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Sanskrit",
                identifier: "vidya-framework_subject_sanskrit",
                description: "Sanskrit Subject",
                code: "sanskrit",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Science",
                identifier: "vidya-framework_subject_science",
                description: "Science Subject",
                code: "science",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Bengali",
                identifier: "vidya-framework_subject_bengali",
                description: "Bengali Subject",
                code: "bengali",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Mathematics",
                identifier: "vidya-framework_subject_mathematics",
                description: "Mathematics Subject",
                code: "mathematics",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Social Science",
                identifier: "vidya-framework_subject_socialscience",
                description: "Social Science Subject",
                code: "socialscience",
                status: "Live",
                category: "subject",
                index: 1
              },
              {
                name: "Hindi",
                identifier: "vidya-framework_subject_hindi",
                description: "Hindi Subject",
                code: "hindi",
                status: "Live",
                category: "subject",
                index: 1
              }
            ],
            identifier: "vidya-framework_gradelevel_class10",
            code: "class10",
            name: "Class 10",
            description: "Class10 Grade",
            index: 1,
            category: "gradeLevel",
            status: "Live"
          }
        ],
        name: "Grade",
        description: "Grade",
        index: 3,
        status: "Live"
      },
      {
        identifier: "vidya-framework_subject",
        code: "subject",
        terms: [
          {
            identifier: "vidya-framework_subject_bengali",
            code: "bengali",
            name: "Bengali",
            description: "Bengali Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_science",
            code: "science",
            name: "Science",
            description: "Science Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_english",
            code: "english",
            name: "English",
            description: "English Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_mathematics",
            code: "mathematics",
            name: "Mathematics",
            description: "Mathematics Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_sanskrit",
            code: "sanskrit",
            name: "Sanskrit",
            description: "Sanskrit Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_hindi",
            code: "hindi",
            name: "Hindi",
            description: "Hindi Subject",
            index: 1,
            category: "subject",
            status: "Live"
          },
          {
            identifier: "vidya-framework_subject_socialscience",
            code: "socialscience",
            name: "Social Science",
            description: "Social Science Subject",
            index: 1,
            category: "subject",
            status: "Live"
          }
        ],
        name: "Subject",
        description: "Subject",
        index: 4,
        status: "Live"
      }
    ]
  };

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

const FrameworkDetails: React.FC = () => {
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