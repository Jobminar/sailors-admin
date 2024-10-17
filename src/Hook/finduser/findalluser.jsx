import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserById = (url, id) => {
  const [user, setUser ] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser  = async () => {
      setLoading(true);
      try {
        const values = await axios.get(url);
        const userdata = values.data
        const finduser = userdata.find((user)=> user.applicationId  === parseInt(id));
        setUser (finduser );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser ();
  }, [url, id]);

  return { user, loading, error };
};

export default useUserById;