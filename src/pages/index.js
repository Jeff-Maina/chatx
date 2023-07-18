import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, easeIn, motion, useSpring } from "framer-motion";

export default function Home() {
  const conversation = [];

  const [textMessages, setTextMessages] = useState(conversation);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [textMessages]);

  // Input state;
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    if (e.key === "Enter") {
      let messageObj = {
        type: "Sent",
        message,
      };
      setTextMessages([...textMessages, messageObj]);
      setMessage("");
    }
  };

  const replyMessage = (e) => {
    let messageObj = {
      type: "Received",
      message: "Non cupidatat deserunt fugiat ipsum.",
    };
    setTextMessages([...textMessages, messageObj]);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // making a mention logic;
  const [isGroupMentionActive, setGroupMentionActive] = useState(false);
  const mentionClass = isGroupMentionActive
    ? "h-64 pt-4 opacity-1"
    : "h-0 opacity-0";

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

  const groupMembers = [
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
  const [hasStoppedRecording, setHasStoppedRecording] = useState(false);

  const updateMessageInput = ({
    className,
    placeholder,
    display,
    paddingLeft,
    classList,
  }) => {
    let icon = document.querySelector(".mic");
    let ImageIcon = document.querySelector(".image-icon");
    let inputContainer = document.querySelector(".input-container");
    let messageInput = document.querySelector("#message-input");

    icon.classList.remove(className);
    messageInput.placeholder = placeholder;
    ImageIcon.style.display = display;
    inputContainer.style.paddingLeft = paddingLeft;
    inputContainer.classList.add(classList);
    setTimeout(() => {
      inputContainer.classList.remove(classList);
    }, 600);
  };

  const recordMessage = (e) => {
    if (e.ctrlKey) {
      const inputProps = {
        className: "recording",
        placeholder: "Speak...",
        display: "none",
        paddingLeft: "20px",
        classList: "input-container-record",
      };
      updateMessageInput(inputProps);
      setIsRecording(true);
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.addEventListener("result", handleRecognitionResult);
      recognition.addEventListener("end", recognition.stop);
      recognition.start();
    }
  };

  const handleKeyUp = (event) => {
    if (isRecording) {
      setHasStoppedRecording(true);
      const inputProps = {
        className: "recording",
        placeholder: "Type your message",
        display: "grid",
        paddingLeft: "0px",
        classList: "input-container-record",
      };
      updateMessageInput(inputProps);
      setIsRecording(false);
      document.removeEventListener("keyup", handleKeyUp);
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("keydown", recordMessage);
    document.addEventListener("keyup", handleKeyUp);
  }

  const handleRecognitionResult = (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (e.results[0].isFinal) {
      setMessage((prevMessage) => prevMessage + ` ${transcript}`);
    }
  };

  return (
    <main className="w-screen h-screen bg-white flex">
      <section className="xl:w-[25%] md:w-[25%] w-0 h-full border-r-2 border-bordercolor bg-white flex flex-col">
        <div className="h-24 w-full bg-white border-b-2 border-bordercolor"></div>
        <div className="w-full flex-grow lg:hidden">
          <div className="w-[60%] h-[90%]  m-auto">
            <div className="w-full aspect-square border border-black flex items-center flex-col justify-center gap-4">
              <div className="w-2/4 aspect-square border border-black rounded-full"></div>
              <h1 className="text-2xl font-jost w-2/4 text-center truncate">
                Jeff
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-full hidden lg:block">
          <div className="w-full max-h-2/4 h-2/4">
            <div className="w-[95%] h-auto m-auto  border-black">
              <h1 className="font-jost text-md font-semibold text-[#555] my-2 ml-6">
                Direct messages
              </h1>
              <DirectMessage />
            </div>
          </div>
          <div className="w-full max-h-2/4 h-2/4 border-t-2 border-border-color"></div>
        </div>
      </section>
      <section className="flex-grow bg-white w-[52%]"></section>
      <section className="w-[23%] hidden xl:block border-l-2 border-bordercolor"></section>
    </main>
  );
}

const DirectMessage = () => {
  return (
    <div className="w-full h-24 flex items-center hover:bg-blue-100 transition-all ease duration-200 cursor-pointer rounded-xl mt-1">
      <div className="h-full aspect-square grid place-items-center">
        <div className="w-[60%] rounded-full aspect-square border border-black overflow-hidden">
          <img
            src="https://i.pinimg.com/564x/eb/4c/14/eb4c14800bd9dbbffacabaa0d99448cb.jpg"
            className="w-full h-full object-cover "
            alt=""
          />
        </div>
      </div>
      <div className="w-2/4 overflow-hidden flex flex-col justify-center">
        <h1 className="font-poppins text-lg font-semibold">Mary Lucy</h1>
        <h1 className="truncate text-sm font-poppins tracking-wide">
          Exercitation duis in commodo eiusmod irure laboris reprehenderit sunt
          exercitation. Sint dolor excepteur ex consequat laboris ad voluptate
          proident. In nisi commodo adipisicing anim laborum occaecat ad magna
          ea pariatur esse exercitation fugiat aliquip. Duis ipsum labore
          occaecat voluptate elit sint fugiat. Non veniam tempor Lorem commodo
          quis non esse in esse anim dolor consectetur aute. Exercitation magna
          duis eiusmod ut. Ullamco aute eiusmod labore ea magna eu velit esse
          occaecat non cupidatat amet id.
        </h1>
      </div>
    </div>
  );
};

{
  /* <section className="border section pb-3">
        <div className="w-full h-14 border-b flex items-center relative">
          <div
            className="h-6 w-6 bg-zinc-500 rounded-[50%] absolute right-4"
            onClick={replyMessage}
          ></div>
        </div>
        <div className="w-full flex-grow flex flex-col">
          <div className="flex-grow w-full p-2 pl-5 pb-0 pt-6">
            <ul
              ref={messagesContainerRef}
              className="w-full h-full overflow-y-auto  border-black max-h-[600px] text-container pb-3"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {textMessages.map((message, index) => {
                  return (
                    <motion.li
                      layout
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        opacity: { duration: 0.1 },
                        layout: {
                          duration: index * 0.01,
                        },
                      }}
                      style={{
                        originX: message.type === "Sent" ? 1 : 0,
                      }}
                      className={`${
                        index > 0 &&
                        message.type != textMessages[index - 1].type
                          ? "mt-3"
                          : "mt-[2px]"
                      }
                  flex text-white w-[99%] px-4`}
                    >
                      <p
                        className={`text-lg py-3 px-5 font-jost ${
                          message.type === "Sent"
                            ? "bg-blue-600 ml-auto sent-message top-text"
                            : "bg-[#DEE1EB] text-[#222] received-message top-text-received"
                        } ${
                          index > 0 &&
                          textMessages[index - 1].type === message.type
                            ? "bottom-text"
                            : ""
                        }
                      
                      ${
                        index > 0 &&
                        textMessages[index + 1] &&
                        textMessages[index + 1].type === message.type &&
                        textMessages[index - 1].type === message.type
                          ? "middle-text"
                          : ""
                      } 
                      ${
                        index > 0 &&
                        textMessages[index + 1] &&
                        textMessages[index + 1].type !== message.type &&
                        textMessages[index - 1].type !== message.type
                          ? "single-text"
                          : ""
                      }
                      ${
                        index > 0 &&
                        textMessages[index + 1] == null &&
                        textMessages[index - 1].type !== message.type
                          ? "single-text"
                          : ""
                      }
                      ${
                        index === 0 && ( textMessages[index + 1] == null || textMessages[index + 1].type !== message.type)
                          ? "single-text"
                          : ""
                      }
                      max-w-[70%] leading-6`}
                      >
                        {message.message + index}
                      </p>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
          <div className="w-full  h-16 flex justify-evenly items-center gap-2 px-4 relative">
            <div
              className={`absolute w-2/4 border border-[#ccc] ${mentionClass} overflow-hidden rounded-lg bg-zinc-200 bottom-8 left-4 transition-all ease duration-500 mention-menu flex justify-center`}
            >
              <div className="w-[90%] h-[90%] overflow-y-auto members-tab">
                {groupMembers.map((user) => {
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

            <div
              className="h-12 border border-[#b8b8b8] flex rounded-full relative z-10 bg-white input-container w-[100%]"
            >
              <div className="h-full aspect-square mx-2 rounded-full grid place-items-center image-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 512 512"
                  id="image"
                  className="cursor-pointer hover:fill-black transition-all ease duration-200"
                  fill="#555"
                  onClick={() => {}}
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
                  onKeyDown={addMessage}
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
                  // onClick={startRecording}
                  fill="#555"
                  className="mic"
                >
                  <path d="M8 11c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3S5 1.35 5 3v5c0 1.65 1.35 3 3 3z"></path>
                  <path d="M12 7.958V8c0 2.2-1.8 4-4 4s-4-1.8-4-4v-.042H3V8a5.009 5.009 0 0 0 4 4.899V15H5v1h6v-1H9v-2.101A5.009 5.009 0 0 0 13 8v-.042h-1z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section> */
}
