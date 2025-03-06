import { useState, useEffect } from 'react';

export const useProfiles = (selectedRole, searchQuery) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://web.ics.purdue.edu/~tdoshi/test/fetch-data-with-filter.php?title=${selectedRole}&name=${searchQuery}&limit=20`
        );
        const data = await response.json();
        setProfiles(data.profiles);
        setError(null);
      } catch (err) {
        setError('Failed to fetch profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [selectedRole, searchQuery]);

  return { profiles, loading, error };
};