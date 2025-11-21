import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie?: Movie) => {
  try {
    // Check if the search term already exists
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: "metrics",
      queries: [Query.equal("searchTerm", query)],
    });

    // If it exists, update the count
    if (result.total > 0) {
      const existingEntry = result.rows[0];
      const newCount = existingEntry.count + 1;

      const updatedRow = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: existingEntry.$id,
        data: {
          count: newCount,
        },
      });
    } else {
      // If not, create a new entry
      const createdRow = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          movie_id: movie?.id,
          title: movie?.title,
        },
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};
