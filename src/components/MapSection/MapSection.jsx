import React, { useState } from "react";
import "./MapSection.css";
import Button from "../Hero/Button/Button";
import { API_CONFIG } from "../../../theme";
import RealMap from "./RealMap";
import SearchBar from "./SearchBar";

const MapSection = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [previewImage, setPreviewImage] = useState(null);

  // Sample data to show before scanning
  const sampleData = [
    {
      id: "sample1",
      name: "Dizengoff Parking",
      price: "₪15/h",
      distance: "20 mts",
      status: "Available",
      address: 'Tap "Scan Nearby" to see real parkings',
      spaces: "50+",
    },
    {
      id: "sample2",
      name: "Hayarkon 72 Parking",
      price: "₪20/h",
      distance: "89 mts",
      status: "Limited",
      address: "Enable location for accurate results",
      spaces: "30+",
    },
    {
      id: "sample3",
      name: "Chof Parking Lot",
      price: "₪12/h",
      distance: "230 mts",
      status: "Available",
      address: "Real-time prices near you",
      spaces: "100+",
    },
  ];

  // Format distance for display
  const formatDistance = (meters) => {
    if (!meters) return "N/A";
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  // Helper to parse a numeric price from a rule condition string
  const parsePriceFromCondition = (text) => {
    if (!text) return null;
    const str = String(text).trim();
    const lower = str.toLowerCase();

    // handle free cases
    if (lower.includes("free") || lower.includes("gratis")) {
      return { currency: "₪", amount: 0, label: "Free" };
    }

    // pick currency, default to ₪ if not present
    const currency = str.includes("₪") ? "₪" : "₪";

    // extract first number, allow decimals, ignore thousands separators
    const cleaned = str.replace(/[, ]/g, "");
    const m = cleaned.match(/(\d+(?:\.\d+)?)/);
    if (!m) return null;

    const amount = Number(m[1]);
    return { currency, amount };
  };

  // Extract price from pricing rules or return default
  const extractPrice = (parking) => {
    // quick wins if backend ever sends direct fields
    if (parking.hourlyRate) return `₪${parking.hourlyRate}/h`;
    if (parking.dailyRate) return `₪${parking.dailyRate}/day`;

    const rules = Array.isArray(parking.pricingRules)
      ? parking.pricingRules
      : [];
    if (!rules.length) return "₪ Not available";

    // utility to search text across rule fields
    const ruleText = (r) =>
      `${r.title || ""} ${r.appliesTo || ""} ${
        r.condition || ""
      }`.toLowerCase();

    const firstHourRule = rules.find((r) => ruleText(r).includes("first hour"));
    const hourlyRule =
      firstHourRule ||
      rules.find((r) =>
        ["per hour", "hourly", " /h", " hr", " hour"].some((k) =>
          ruleText(r).includes(k)
        )
      );
    const dailyRule = rules.find((r) =>
      ["per day", "daily", "24h", " day"].some((k) => ruleText(r).includes(k))
    );

    // pick best rule by priority, else fallback to first
    const chosen = firstHourRule || hourlyRule || dailyRule || rules[0];
    const parsed = parsePriceFromCondition(chosen?.condition);

    if (!parsed) return "₪ Not available";
    if (parsed.amount === 0 && parsed.label === "Free") return "Free";

    // format amount without trailing .0 when possible
    const fmt = Number.isInteger(parsed.amount)
      ? `${parsed.amount}`
      : `${parsed.amount.toFixed(1)}`;

    if (firstHourRule) return `${parsed.currency}${fmt}/1h`;
    if (hourlyRule) return `${parsed.currency}${fmt}/h`;
    if (dailyRule) return `${parsed.currency}${fmt}/day`;

    // generic fallback if rule has no clear periodicity
    return `${parsed.currency}${fmt}`;
  };

  // Determine parking status based on spaces or default
  const getParkingStatus = (parking) => {
    // if (parking.numberOfSpaces) {
    //   if (parking.numberOfSpaces > 100) return "Available";
    //   if (parking.numberOfSpaces > 50) return "Limited";
    //   return "Few spots";
    // }
    return parking.isPublic ? "Public" : "Private";
  };

  // Fetch parking data with user location
  const fetchParkingsWithLocation = async (lat, lng) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_CONFIG.baseUrl}/parkings?lat=${lat}&lng=${lng}&radius=2`
      );

      if (!response.ok) throw new Error("Failed to fetch parking data");

      const data = await response.json();

      // Process and format the real API data
      const formattedParkings = data.slice(0, 12).map((parking) => ({
        id: parking._id,
        name: parking.name || "Unnamed Parking",
        price: extractPrice(parking),
        distance: formatDistance(parking.distanceMeters),
        distanceMeters: parking.distanceMeters,
        status: getParkingStatus(parking),
        address: parking.address || parking.neighborhood || "",
        city: parking.city || "",
        spaces: parking.numberOfSpaces || "N/A",
        openingHours: parking.openingHours || "24/7",
        category: parking.category || "Parking",
        isPublic: parking.isPublic,
        wazeUrl: parking.wazeUrl,
        googleMapsUrl: parking.googleMapsUrl,
        coordinates: {
          lat: parking.latitude,
          lng: parking.longitude,
        },
        pricingListImageUrls: parking.pricingListImageUrls || [],
      }));

      // Sort by distance
      formattedParkings.sort(
        (a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0)
      );

      setParkings(formattedParkings);
      setHasScanned(true);
    } catch (err) {
      setError("Unable to load parking data. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle location scan
  const handleScanNearby = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationPermission("granted");
        fetchParkingsWithLocation(latitude, longitude);
      },
      (error) => {
        setLoading(false);
        setLocationPermission("denied");

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              "Location permission denied. Please enable location access to find nearby parking."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable. Please try again.");
            break;
          case error.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An error occurred while getting your location.");
        }

        // Use default location as fallback
        const { lat, lng } = API_CONFIG.defaultLocation;
        fetchParkingsWithLocation(lat, lng);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Navigate to parking using Waze or Google Maps
  const handleNavigate = (parking) => {
    if (parking.wazeUrl) {
      window.open(parking.wazeUrl, "_blank");
    } else if (parking.googleMapsUrl) {
      window.open(parking.googleMapsUrl, "_blank");
    }
  };

  const displayParkings = hasScanned ? parkings : sampleData;

  return (
    <section id="map-section" className="map-section">
      <div className="container">
        <div className="section-header">
          <h2>Find Parking Near You</h2>
          <SearchBar
            onLocationSelected={({ lat, lng }) => {
              setUserLocation({ lat, lng });
              fetchParkingsWithLocation(lat, lng);
              setHasScanned(true);
            }}
          />

          <p>
            {hasScanned
              ? `Top ${parkings.length} parking locations near you`
              : "Tap the button below to discover real-time parking prices in your area"}
          </p>
        </div>

        {/* Scan Nearby Button - Main CTA */}
        {!hasScanned && (
          <div className="scan-cta">
            <Button
              variant="primary"
              size="large"
              onClick={handleScanNearby}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Scanning...
                </>
              ) : (
                <>📍 Scan Nearby Parking</>
              )}
            </Button>
            <p className="scan-hint">
              Uses your current location to find the closest parking spots with
              real-time prices
            </p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="map-container">
          {/* Map visualization */}
          <div className="map-visual">
            {userLocation ? (
              <RealMap userLocation={userLocation} parkings={displayParkings} />
            ) : (
              <>
                <div className="map-grid">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="grid-line" />
                  ))}
                </div>

                <div className="map-pins">
                  {sampleData.slice(0, 6).map((parking, index) => (
                    <div
                      key={parking.id}
                      className={`map-pin pin-${index + 1} sample`}
                      style={{
                        left: `${15 + (index % 3) * 35}%`,
                        top: `${15 + Math.floor(index / 3) * 40}%`,
                      }}
                    >
                      <div className="pin-marker">
                        <span className="pin-price">{parking.price}</span>
                      </div>
                      <div className="pin-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="map-overlay">
                  <p>📍 Scan to see real parking locations</p>
                </div>
              </>
            )}
          </div>

          {/* Parking list */}
          <div className="parking-grid">
            <div className="parking-grid-header">
              <h3>{hasScanned ? "Nearby Parking Lots" : "Sample Preview"}</h3>
              {hasScanned && (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleScanNearby}
                >
                  Search
                </Button>
              )}
            </div>

            <div className="parking-cards">
              {displayParkings.map((parking) => (
                <div
                  key={parking.id}
                  className={`parking-card ${
                    selectedParking?.id === parking.id ? "selected" : ""
                  } ${!hasScanned ? "sample" : ""}`}
                  onClick={() => hasScanned && setSelectedParking(parking)}
                >
                  <div className="parking-card-header">
                    <h4>{parking.name}</h4>
                    {/* <span
                      className={`status-badge status-${parking.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {parking.status}
                    </span> */}
                    {Array.isArray(parking.pricingListImageUrls) &&
                    parking.pricingListImageUrls.length > 0 ? (
                      <a
                        href={
                          parking.pricingListImageUrls[
                            parking.pricingListImageUrls.length - 1
                          ].url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={
                            parking.pricingListImageUrls[
                              parking.pricingListImageUrls.length - 1
                            ].url
                          }
                          alt="Price List"
                          className="price-list-thumb"
                        />
                      </a>
                    ) : (
                      <span
                        className={`status-badge status-${parking.status
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {parking.status}
                      </span>
                    )}
                  </div>

                  <div className="parking-card-body">
                    <p className="parking-address">
                      {parking.address}
                      {parking.city && `, ${parking.city}`}
                    </p>

                    <div className="parking-card-info">
                      <div className="info-item">
                        <span className="info-label">Price</span>
                        <span className="info-value price">
                          {parking.price}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Distance</span>
                        <span className="info-value">{parking.distance}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Spaces</span>
                        <span className="info-value">{parking.spaces}</span>
                      </div>
                    </div>

                    {parking.openingHours && hasScanned && (
                      <p className="opening-hours">🕐 {parking.openingHours}</p>
                    )}
                  </div>

                  {hasScanned ? (
                    <Button
                      variant="accent"
                      size="small"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(parking);
                      }}
                    >
                      Navigate
                    </Button>
                  ) : (
                    <div className="sample-overlay">
                      <span>Scan to unlock</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasScanned && userLocation && (
              <div className="location-info">
                <span className="location-badge">
                  📍 Your location: {userLocation.lat.toFixed(4)},{" "}
                  {userLocation.lng.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {previewImage && (
        <div className="image-modal" onClick={() => setPreviewImage(null)}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={previewImage} alt="Pricing Full" />
            <button
              className="close-modal"
              onClick={() => setPreviewImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MapSection;
