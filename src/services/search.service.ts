import debounce from "lodash/debounce";

const sendSearchRequest = async (query: string): Promise<void> => {
  if (query.trim() !== "") {
    try {
      await fetch("/api/searches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      console.log("Search recorded successfully");
    } catch (error) {
      console.error("Failed to record search");
    }
  }
};

export const debouncedSearch = debounce(sendSearchRequest, 1000);
