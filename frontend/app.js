const { useState, useEffect } = React;

// API Configuration - works both locally and on Vercel
const API_ENDPOINT =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/rsvp"
    : "/api/rsvp";

function PartyInvitation() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState("");
  const [rsvpList, setRsvpList] = useState({ yes: [], no: [] });

  const fetchRSVPs = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      if (data.success) {
        setRsvpList({ yes: data.yes, no: data.no });
      }
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
    }
  };

  const handleSubmit = async (answer) => {
    if (!name.trim()) {
      alert("⚠️ PLEASE ENTER YOUR NAME! ⚠️");
      return;
    }

    const rsvpData = {
      name: name.trim(),
      answer: answer,
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      const data = await response.json();
      console.log("RSVP submitted:", data);

      setResponse(answer);
      setSubmitted(true);

      // Fetch updated RSVP list
      await fetchRSVPs();
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("❌ Failed to submit RSVP. Please try again!");
    }
  };

  const resetForm = () => {
    setName("");
    setSubmitted(false);
    setResponse("");
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  if (submitted) {
    return (
      <div className="container">
        <div className="success-message">
          <h1 className="success-title">
            <span className="sparkle">🎄</span>
            {response === "yes" ? "HO HO HO!!!" : "OH NO!!!"}
            <span className="sparkle">🎅</span>
          </h1>
          <p className="success-text">
            Thanks {name}! Your response has been recorded!
          </p>
          <p className="success-text" style={{ marginTop: "15px" }}>
            You said: <strong>{response.toUpperCase()}</strong>
          </p>
        </div>

        <div className="rsvp-lists">
          <div className="rsvp-column">
            <h2 className="rsvp-list-title yes-title">
              🎅 COMING! 🎄 ({rsvpList.yes.length})
            </h2>
            <ul className="rsvp-list yes-list">
              {rsvpList.yes.map((person, index) => (
                <li key={index} className="rsvp-item">
                  ⭐ {person.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rsvp-column">
            <h2 className="rsvp-list-title no-title">
              😢 NOT COMING 💔 ({rsvpList.no.length})
            </h2>
            <ul className="rsvp-list no-list">
              {rsvpList.no.map((person, index) => (
                <li key={index} className="rsvp-item">
                  ❌ {person.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-content">
            🎄 MERRY CHRISTMAS 🎅 HO HO HO ❄️ JINGLE BELLS 🎁 SANTA IS COMING 🔔
            DECK THE HALLS 🎄
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">
        <span className="emoji">🎄</span> YOU'RE INVITED!!!{" "}
        <span className="emoji">🎅</span>
      </h1>
      <div className="subtitle">🎁 CHRISTMAS PARTY 🎄</div>

      <div className="form-group">
        <label className="form-label">ENTER YOUR NAME:</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here..."
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label
          className="form-label"
          style={{ textAlign: "center", fontSize: "28px" }}
        >
          ARE YOU COMING TO THE CHRISTMAS PARTY?! 🎅🎄
        </label>
      </div>

      <div className="button-group">
        <button className="btn btn-yes" onClick={() => handleSubmit("yes")}>
          <span className="sparkle">🎄</span> YES!{" "}
          <span className="sparkle">🎁</span>
        </button>
        <button className="btn btn-no" onClick={() => handleSubmit("no")}>
          ❌ NO ❌
        </button>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          🎄 🎅 ❄️ CLICK YES OR NO 🎁 🔔 ⭐ DON'T FORGET TO ENTER YOUR NAME 🎄
          🎅 ❄️
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<PartyInvitation />, document.getElementById("root"));
