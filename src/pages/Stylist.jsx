import Navbar from "../components/Navbar";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Stylist() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to the atelier. Tell me about the look you have in mind — occasion, mood, or a piece you already love.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Route Guarding
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I apologize, but my connection to the atelier is currently interrupted. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white pt-14 pb-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col h-[75vh]">

          {/* Header */}
          <div className="mb-4">
            <p className="text-[#c8a34d] tracking-[0.35em] text-[13px] mb-2">
              CONCIERGE
            </p>
            <h1 className="font-serif text-[36px] font-light leading-none">
              Your stylist
            </h1>
          </div>

          {/* Chat Box */}
          <div className="border border-zinc-900 bg-[#070707] flex-1 overflow-y-auto p-6 mb-5 space-y-6 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg border ${
                    msg.role === "user"
                      ? "bg-[#c8a34d] text-black border-[#c8a34d] rounded-tr-none font-medium"
                      : "bg-black text-[#f5eee6] border-zinc-900 rounded-tl-none font-light leading-relaxed"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-black text-[#c8a34d] border border-zinc-900 max-w-[80%] p-4 rounded-lg rounded-tl-none animate-pulse text-sm">
                  Curation in progress...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask for an outfit, color advice, a brand..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="
                flex-1
                h-[45px]
                bg-black
                border
                border-zinc-900
                px-4
                text-[13px]
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-[#c8a34d]
                transition
                rounded-md
              "
            />
            <button
              onClick={handleSend}
              className="
                h-[45px]
                w-[55px]
                bg-[#a8893b]
                flex
                items-center
                justify-center
                hover:opacity-90
                transition
                cursor-pointer
                rounded-md
              "
            >
              <IoPaperPlaneOutline
                size={18}
                className="text-black"
              />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}

export default Stylist;