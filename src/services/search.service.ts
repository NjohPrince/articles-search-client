import debounce from "lodash/debounce";

const sendSearchRequest = async (search: string) => {
  if (search.trim() !== "") {
    const body = {
      search: search,
    };

    try {
      await fetch("http://localhost:8000/api/searches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const searches = await getSearches();
      return searches;
    } catch (error) {
      console.error("Failed to record search");

      return [];
    }
  }
};

export const getSearches = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/searches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const searches = await response.json();

    return searches;
  } catch (error) {
    console.error("Failed to get searches from the server");
    return [];
  }
};

export const debouncedSearch = debounce(sendSearchRequest, 1000);
