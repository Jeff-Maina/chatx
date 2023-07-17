import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { motion, useSpring } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // making a mention logic;
  const [isGroupMentionActive, setGroupMentionActive] = useState(false);
  const mentionClass = isGroupMentionActive
    ? "h-64 pt-4 opacity-1"
    : "h-0 opacity-0";

  // Input state;
  const [message, setMessage] = useState("");

  const handleMessageInput = (e) => {
    let inputmessage = e.target.value;
    setMessage(inputmessage);
    if (!inputmessage.includes("@")) {
      setGroupMentionActive(false);
    }
  };

  const updateMentionInputColor = (e) => {
    let inputField = e.target;
    if (e.key === "@") {
      setGroupMentionActive(true);
    }
    if (e.key === " " && isGroupMentionActive) {
      setGroupMentionActive(false);
    }

    var cursorPosition = inputField.selectionStart;

    var inputValue = inputField.value;
    var letter = inputValue.charAt(cursorPosition - 1);

    if (e.key === "Backspace" && letter === " " && isGroupMentionActive) {
      setGroupMentionActive(false);
    }
  };

  const users = [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "Daniel",
    "Olivia",
    "David",
    "Ava",
    "Matthew",
    "Isabella",
  ];

  const selectMember = (member) => {
    setGroupMentionActive(false);
    setMessage(message + member);
  };

  // making a recording;
  const [isRecording, setIsRecording] = useState(false);
  const[contWidth, setContWidth] = useState(100);

  const startRecording = (e) => {
    handleClick
    let icon = document.querySelector(".mic");
    let ImageIcon = document.querySelector(".image-icon");
    let inputContainer = document.querySelector(".input-container");
    let messageInput = document.querySelector("#message-input");
    if (!isRecording) {
      icon.classList.add("recording");
      messageInput.placeholder = "Speak...";
      ImageIcon.style.display = "none";
      inputContainer.style.paddingLeft = "20px";
      inputContainer.classList.add("input-container-record");
      setTimeout(()=>{
        inputContainer.classList.remove("input-container-record");
      },600)
      setIsRecording(true);
    } else {
      icon.classList.remove("recording");
      messageInput.placeholder = "Type your message";
      ImageIcon.style.display = "grid";
      inputContainer.style.paddingLeft = "0px";
      inputContainer.classList.add("input-container-record");
      setTimeout(()=>{
        inputContainer.classList.remove("input-container-record");
      },600)
      setIsRecording(false);
    }
  };

  const [isAnimating, setIsAnimating] = useState(false);

  const { width } = useSpring({
    width: isAnimating ? '90%' : '100%',
    config: { duration: 500 },
  });

  const handleClick = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <main className="w-screen h-screen bg-white grid place-items-center">
      <section className="border section pb-4">
        <div className="w-full h-14 border-b border-[#b8b8b8] bg-zinc-200"></div>
        <div className="w-full flex-grow flex flex-col">
          <div className="flex-grow w-full"></div>
          <div className="w-full  h-16 flex justify-evenly items-center gap-2 px-4 relative">
            <div
              className={`absolute w-2/4 border border-[#ccc] ${mentionClass} overflow-hidden rounded-lg bg-zinc-200 bottom-8 left-4 transition-all ease duration-500 mention-menu flex justify-center`}
            >
              <div className="w-[90%] h-[90%] overflow-y-auto members-tab">
                {users.map((user) => {
                  return (
                    <div
                      className="w-[97%] h-auto flex items-center border-b py-3 border-[#ccc]"
                      onClick={() => {
                        selectMember(user);
                      }}
                    >
                      <div className="h-10 aspect-square border border-zinc-400 rounded-full grid place-items-center bg-zinc-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          id="user"
                        >
                          <path
                            fill="#000"
                            d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a9.985 9.985 0 0 0-8 4 9.985 9.985 0 0 0 8 4 9.985 9.985 0 0 0 8-4 9.985 9.985 0 0 0-8-4z"
                          ></path>
                        </svg>
                      </div>
                      <div className="h-full flex-grow flex items-center pl-4 ">
                        <h2 className="font-jost text-lg">{user}</h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-12 w-[100%] border border-[#b8b8b8] flex rounded-full relative z-10 bg-white  input-container">
              <div className="h-full aspect-square mx-2 rounded-full grid place-items-center image-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 512 512"
                  id="image"
                  className="cursor-pointer hover:fill-black transition-all ease duration-200"
                  fill="#555"
                  onClick={() => {
                    setGroupMentionActive(!isGroupMentionActive);
                  }}
                >
                  <path d="M368 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z"></path>
                  <path d="M452 64H60c-15.6 0-28 12.7-28 28.3v327.4c0 15.6 12.4 28.3 28 28.3h392c15.6 0 28-12.7 28-28.3V92.3c0-15.6-12.4-28.3-28-28.3zM348.9 261.7c-3-3.5-7.6-6.2-12.8-6.2-5.1 0-8.7 2.4-12.8 5.7L304.6 277c-3.9 2.8-7 4.7-11.5 4.7-4.3 0-8.2-1.6-11-4.1-1-.9-2.8-2.6-4.3-4.1L224 215.3c-4-4.6-10-7.5-16.7-7.5-6.7 0-12.9 3.3-16.8 7.8L64 368.2V107.7c1-6.8 6.3-11.7 13.1-11.7h357.7c6.9 0 12.5 5.1 12.9 12l.3 260.4-99.1-106.7z"></path>
                </svg>
              </div>
              <div className="h-full flex-grow grid">
                <input
                  type="text"
                  id="message-input"
                  className="text-[20px] text-[#222] outline-none font-jost"
                  placeholder="Type your message"
                  onChange={handleMessageInput}
                  onKeyUp={updateMentionInputColor}
                  value={message}
                />
              </div>
              <div className="h-full aspect-square rounded-full grid place-items-center mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="recording"
                  height="26"
                  width="26"
                  onClick={startRecording}
                  fill="#555"
                  className="mic"
                >
                  <path
                    d="M8 11c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3S5 1.35 5 3v5c0 1.65 1.35 3 3 3z"
                  ></path>
                  <path d="M12 7.958V8c0 2.2-1.8 4-4 4s-4-1.8-4-4v-.042H3V8a5.009 5.009 0 0 0 4 4.899V15H5v1h6v-1H9v-2.101A5.009 5.009 0 0 0 13 8v-.042h-1z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
