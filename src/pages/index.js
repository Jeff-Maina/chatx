import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import {
  AnimatePresence,
  easeIn,
  motion,
  useAnimate,
  useSpring,
} from "framer-motion";

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

  const [toolTipActive, setToolTipActive] = useState(false);
  const toolTipClass = toolTipActive ? "top-[4.5rem]" : "top-2";

  const handleTooltipClose = () => {
    setToolTipActive(false);
  };

  // picture selection;

  // making a mention logic;
  const [isPictureGalleryActive, setPictureGalleryActive] = useState(false);
  const picGalleryClass = isPictureGalleryActive ? "h-64 " : "h-2 ";

  const images = [
    "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    "https://i.pinimg.com/564x/62/8f/1f/628f1fb26244403b8397a53b17b6fc76.jpg",
    "https://i.pinimg.com/564x/60/98/7f/60987f29bba5aa32d652cddfe30841d9.jpg",
    "https://i.pinimg.com/564x/51/4d/1b/514d1bd61f01b1968e5a44a522cce6cd.jpg",
    "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  ];




  

  return (
    <main className="w-screen h-screen  grid place-items-center">
      <section
        className="section pb-3 relative"
        onClick={() => {
          setPictureGalleryActive(false);
        }}
      >
        <div
          className={`absolute min-w-max ${toolTipClass} bg-black text-white p-2 left-2/4 -translate-x-2/4 rounded-full pl-6 pr-2 tooltip flex items-center gap-2`}
        >
          <p className="font-poppins text-[13px] w-full">
            Type "@" sign to activate mention box
          </p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="cancel"
              x="0"
              height="20"
              width="20"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              onClick={() => {
                handleTooltipClose();
              }}
            >
              <path
                fill="#555"
                stroke="#555"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                d="M9.197 19.803L19.803 9.197M9.197 9.197l10.606 10.606"
              ></path>
            </svg>
          </div>
        </div>
        <div className="w-full h-14 border-b border-zinc-300 bg-zinc-200 flex items-center relative">
          <div
            className="h-6 w-6 bg-zinc-500 rounded-[50%] absolute right-4"
            // onClick={replyMessage}
            onClick={(e) => {
              e.stopPropagation();
              setToolTipActive(!toolTipActive);
            }}
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
                      // !exit animation does not workkkkk!!!!!!!!!!!!!!!!!!!!!
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
                        index === 0 &&
                        (textMessages[index + 1] == null ||
                          textMessages[index + 1].type !== message.type)
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
          <div className="w-full h-16 flex justify-evenly items-center gap-2 px-4 relative">
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

            <div className="h-12 border border-[#b8b8b8] flex rounded-full relative z-10 bg-white input-container w-[100%]">
              <div
                className={`absolute w-[100.5%] left-2/4 -translate-x-2/4 bottom-4  ${picGalleryClass} transition-height ease  picture-gallery p-4 border border-[#b8b8b8]`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPictureGalleryActive(true);
                }}
              >
                <AnimatePresence>
                  {isPictureGalleryActive === true && (
                    <motion.div
                      layout
                      className="w-full h-[89%] rounded-lg bg-white image-container flex items-center pl-4  gap-3 overflow-x-scroll"
                    >
                      {images.map((image, index) => {
                        return (
                          <AnimatePresence>
                            <motion.div
                              layout
                              key={index}
                              initial={{ opacity: 0, y: 30, scale: 0.7, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                opacity: {
                                  duration: 0.6,
                                  delay: index * 0.1 + 0.2,
                                },
                                y: { duration: 0.4, delay: index * 0.1 + 0.2 },
                                scale: {
                                  duration: 0.5,
                                  type: "spring",
                                  // bounce: .4,
                                },
                              }}
                              whileInView={{
                                scale: 1,
                                y: 0,
                              }}
                              className="h-[80%] w-32 min-w-[128px] rounded-lg bg-black overflow-hidden"
                            >
                              <img
                                src={`${image}`}
                                className="h-full w-full object-cover"
                                alt=""
                              />
                            </motion.div>
                          </AnimatePresence>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex w-full z-10 bg-white rounded-full">
                {" "}
                <div className="h-full aspect-square mx-2 rounded-full grid place-items-center image-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                    id="image"
                    className="cursor-pointer hover:fill-black transition-all ease duration-200"
                    fill="#555"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPictureGalleryActive(!isPictureGalleryActive);
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
        </div>
      </section>
    </main>
  );
}
