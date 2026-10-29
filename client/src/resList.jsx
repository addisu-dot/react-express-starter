import { useEffect, useState } from "react";

function ResourceList(){
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("/api/resources");

        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }

        const result = await response.json();

        setResources(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (loading) {
    return <p>Loading resources...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Resource Catalog</h1>

      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        resources.map((resource) => (
          <div key={resource.id}>
            <h2>{resource.title}</h2>

            <p>Type: {resource.type}</p>

            <p>ID: {resource.id}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ResourceList; 
