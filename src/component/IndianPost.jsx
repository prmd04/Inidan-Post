import React, { useState } from "react";
import PostCard from "./PostCard";

const App = () => {
  const [data, setData] = useState([]);
  const [pin, setPin] = useState("");
  const [filterText, setFilterText] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pin.length !== 6 || isNaN(pin)) {
      setError("PIN code must be exactly 6 digits.");
      setData([]);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );

      if (!response.ok) {
        throw new Error("Network response failed.");
      }

      const apiData = await response.json();
      const result = apiData[0];

      setMessage(result.Message);

      if (result.Status !== "Success" || !result.PostOffice) {
        setError(
          result.Message || "Invalid PIN code or no post offices found."
        );
        setData([]);
      } else {
        setData(result.PostOffice);
      }
    } catch (err) {
      setError("Failed to fetch data. Please check the network connection.");
      setData([]);
    }

    setLoading(false);
  };

  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      {data.length === 0 && (
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Enter PinCode</h3>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PinCode"
              maxLength="6"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Lookup"}
            </button>
          </form>

          {error && <p>{error}</p>}
        </div>
      )}

      {loading && <p>Loading post office data...</p>}

      {data.length > 0 && (
        <div>
          <div className="results">
            <h3>Pincode: {pin}</h3>
            <h3>
              Message:<span>{message}</span>
            </h3>

            <input
              type="text"
              placeholder="Filter by Post Office Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {filteredData.length > 0 ? (
            <div className="">
              {filteredData.map((office, i) => (
                <PostCard key={i} data={office} />
              ))}
            </div>
          ) : (
            <p>Couldn't find any post offices matching "{filterText}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
