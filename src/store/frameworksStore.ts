import { create } from 'zustand';

interface Framework {
  identifier: string;
  name: string;
  code: string;
  categories?: string[];
  status: string;
  lastUpdatedOn?: string;
  [key: string]: any;
}

interface FrameworksState {
  frameworks: Framework[];
  loading: boolean;
  error: string | null;
  fetchFrameworks: () => Promise<void>;
}

export const useFrameworksStore = create<FrameworksState>((set) => ({
  frameworks: [],
  loading: false,
  error: null,
  fetchFrameworks: async () => {
    set({ loading: true, error: null });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("tenantId", import.meta.env.VITE_TENANT_ID);
      myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`);
      myHeaders.append("Cookie", import.meta.env.VITE_COOKIE);

      const raw = JSON.stringify({
        request: {
          filters: {
            status: ["Draft", "Live"],
            objectType: "Framework"
          }
        }
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      const url = `${import.meta.env.VITE_INTERFACE_URL}/action/composite/v3/search`;
      const response = await fetch(url, requestOptions);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      set({ frameworks: data.result.Framework || [], loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch frameworks", loading: false });
    }
  },
})); 