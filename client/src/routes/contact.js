export const getContacts = async ({ userId }) => {
  try {
    // Send POST request with userId in the request body
    const response = await api.post("/contact/get", { userId });
    return response.data;
  } catch (err) {
    console.error(err);
    // setError("Error fetching contact list");
  }
};


