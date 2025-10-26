import { useState, useEffect } from "react";
import { API_CONFIG } from "../constants/theme";

/**
 * Custom hook for fetching parking data
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radius - Search radius in km
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useParkingData = (
  lat = API_CONFIG.defaultLocation.lat,
  lng = API_CONFIG.defaultLocation.lng,
  radius = API_CONFIG.defaultRadius
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}/parkings?lat=${lat}&lng=${lng}&radius=${radius}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching parking data:", err);
      setError(err.message);

      // Set fallback data on error
      setData([
        {
          id: 1,
          name: "Central Station Parking",
          price: "₪12/h",
          distance: "200m",
          status: "Available",
        },
        {
          id: 2,
          name: "Azrieli Tower Parking",
          price: "₪15/h",
          distance: "450m",
          status: "Limited",
        },
        {
          id: 3,
          name: "Beach Front Parking",
          price: "₪20/h",
          distance: "800m",
          status: "Available",
        },
        {
          id: 4,
          name: "Mall Parking",
          price: "₪10/h",
          distance: "1.2km",
          status: "Full",
        },
        {
          id: 5,
          name: "Street Parking Zone A",
          price: "₪8/h",
          distance: "100m",
          status: "Available",
        },
        {
          id: 6,
          name: "Underground Parking B",
          price: "₪18/h",
          distance: "600m",
          status: "Limited",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng, radius]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Custom hook for intersection observer
 * @param {Object} options - Intersection observer options
 * @returns {Array} - [ref, isIntersecting]
 */
export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options.threshold]);

  return [setRef, isIntersecting];
};
