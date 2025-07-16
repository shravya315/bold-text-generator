"use client";
import { Copy } from "lucide-react";
import { useState } from "react";

const styles = {
  boldSerif: {
    name: "Bold (serif)",
    map: (c) => mapUnicode(c, 0x1d400, 0x1d7ce),
  },
  boldSans: {
    name: "Bold (sans)",
    map: (c) => mapUnicode(c, 0x1d5d4, 0x1d7ec),
  },
  italicBoldSerif: {
    name: "Italic Bold (serif)",
    map: (c) => mapUnicode(c, 0x1d468, null),
  },
  italicBoldSans: {
    name: "Italic Bold (sans)",
    map: (c) => mapUnicode(c, 0x1d63c, null),
  },
};

function mapUnicode(char, offsetAlpha, offsetDigit) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90)
    return String.fromCodePoint(offsetAlpha + (code - 65));
  if (code >= 97 && code <= 122)
    return String.fromCodePoint(offsetAlpha + 26 + (code - 97));
  if (offsetDigit && code >= 48 && code <= 57)
    return String.fromCodePoint(offsetDigit + (code - 48));
  return char;
}

export default function Home() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = (str) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="overflow-hidden bg-[#394F74] h-screen relative">
      <h2 className="text-center text-5xl font-semibold italic font-serif mt-6 mb-6 text-[#E9E9E9] tracking-wide drop-shadow-[0_3px_10px_rgba(255,255,255,0.6)] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] transition duration-300">
        Unicode Bold Style Generator
      </h2>

      <div className="flex flex-col md:flex-row justify-center w-screen gap-5 p-5">
        <div className="w-100">
          <textarea
            className="bg-gray-200 w-full h-100 p-5 text-xl rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-white transition duration-200 placeholder:text-gray-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your text here..."
          />
        </div>
        <div className="bg-white w-100 h-100 rounded-xl shadow-xl p-5">
          {text === "" ? (
            <h1 className="text-xl">Output will be here</h1>
          ) : (
            Object.entries(styles).map(([key, { name, map }]) => (
              <div
                key={key}
                className="text-[1.4rem] mb-[1rem] pb-[0.5rem]"
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <strong className="text-[#394f74]">{name}:</strong>
                <div className="mt-[0.3rem] flex justify-between items-center">
                  <p>
                    {text
                      .split("")
                      .map((c) => map(c))
                      .join("")}
                  </p>
                  <Copy
                    className="inline w-5 h-5 ml-2 cursor-pointer text-gray-600 hover:text-blue-500 transition"
                    onClick={() =>
                      handleCopy(
                        text
                          .split("")
                          .map((c) => map(c))
                          .join("")
                      )
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {copied && (
        <span className="absolute bottom-10 right-10 z-50 text-white text-xl px-4 py-2 rounded-xl shadow-lg transform scale-100 opacity-100 transition-all duration-500 ease-out">
          Copied!
        </span>
      )}
    </div>
  );
}
