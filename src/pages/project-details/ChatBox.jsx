import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/redux/chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();
  const scrollRef = useRef(null); // Scroll area reference
  const dummyRef = useRef(null); // Dummy element for scroll to bottom
  const isAtBottom = useRef(true); // Flag to check if user is at the bottom

  useEffect(() => {
    dispatch(fetchChatByProject(id)); // Fetch chat for the project
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id)); // Fetch messages for the chat
      const interval = setInterval(() => {
        dispatch(fetchChatMessages(chat.chat.id)); // Poll for new messages
      }, 500);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [dispatch, chat.chat?.id]);

  useEffect(() => {
    // Detect if user is at the bottom of the chat
    if (scrollRef.current) {
      // const isScrolledToBottom =
      //   scrollRef.current.scrollHeight - scrollRef.current.scrollTop === scrollRef.current.clientHeight;
      // isAtBottom.current = isScrolledToBottom;
      // dummyRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Scroll to the bottom if the user is already at the bottom
  
  }, [chat.messages]); // Trigger when new messages are added

  const handleSendMessage = async () => {
    if (message.trim() === "") return; // Prevent empty messages

    const newMessage = {
      senderId: auth.user?.id,
      projectId: id,
      content: message,
    };

    await dispatch(sendMessage(newMessage)); // Send message
    dispatch(fetchChatMessages(chat.chat?.id)); // Refresh messages
    setMessage(""); // Clear input field
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea
          ref={scrollRef}
          className="h-[32rem] w-full p-5 flex flex-col gap-3 overflow-y-auto"
        >
          {chat.messages?.map((item, index) => (
            <div
              className={`flex gap-2 mb-2 ${
                item?.sender?.id !== auth.user?.id ? "justify-start" : "justify-end"
              }`}
              key={index}
            >
              {item?.sender?.id !== auth.user?.id ? (
                <>
                  <Avatar>
                    <AvatarFallback>{item.sender?.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                    <p>{item.sender?.username}</p>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                    <p>{item.sender?.username}</p>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                  <Avatar>
                    <AvatarFallback>{item.sender?.username[0]}</AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          ))}
          {/* Dummy element to scroll to the bottom */}
          <div ref={dummyRef}></div>
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeholder="Type a message"
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
