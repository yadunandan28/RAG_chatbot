import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  /* ---------------- DARK MODE ---------------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------------- PDF UPLOAD ---------------- */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedPdfs((prev) => [...prev, file.name]);
      toast.success("PDF uploaded successfully!");
    } catch {
      toast.error("Upload failed");
    }
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setChatHistory((prev) => [...prev, input]);
    setInput("");
    setLoading(true);

    try {
      const response = await API.post("/chat", { query: input });

      const botMessage = {
        role: "bot",
        content: response.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      toast.error("Error getting response");
    }

    setLoading(false);
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* ================= SIDEBAR ================= */}
      <div className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-6 flex flex-col">

        <h1 className="text-xl font-bold mb-6">RAG AI</h1>

        {/* Upload */}
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Uploaded PDFs */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Uploaded PDFs</h3>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            {uploadedPdfs.length === 0 && (
              <li className="text-gray-400 text-xs">No PDFs uploaded</li>
            )}
            {uploadedPdfs.map((pdf, index) => (
              <li key={index} className="truncate">{pdf}</li>
            ))}
          </ul>
        </div>

        {/* Chat History */}
        <div className="mt-6 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">Chat History</h3>
          <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
            {chatHistory.length === 0 && (
              <li className="text-gray-400">No chats yet</li>
            )}
            {chatHistory.map((chat, index) => (
              <li
                key={index}
                className="truncate cursor-pointer hover:text-black dark:hover:text-white"
              >
                {chat}
              </li>
            ))}
          </ul>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CHAT ================= */}
      <div className="flex-1 flex flex-col p-6">

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {/* Typing Loader */}
          {loading && (
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 rounded-2xl w-fit animate-pulse">
              Bot is typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="mt-4 flex items-center gap-4">
          <input
            className="flex-1 p-3 rounded-xl border dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask about your PDFs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
