const { useState } = React;

// API Configuration - Update this endpoint to your backend
const API_ENDPOINT = "/api/rsvp"; // Change this to your backend URL

function PartyInvitation() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState("");

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
      // Uncomment this section when you have a backend ready
      /*
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rsvpData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit RSVP');
            }

            const data = await response.json();
            console.log('RSVP submitted:', data);
            */

      // For now, just log to console
      console.log("RSVP Data:", rsvpData);

      setResponse(answer);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      // Still show success for demo purposes
      setResponse(answer);
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setName("");
    setSubmitted(false);
    setResponse("");
  };

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
          <button
            className="btn btn-yes"
            onClick={resetForm}
            style={{ marginTop: "20px" }}
          >
            Submit Another
          </button>
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
        <span className="emoji">🎄</span> YOU'RE INVITED!!! <span className="emoji">🎅</span>
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
