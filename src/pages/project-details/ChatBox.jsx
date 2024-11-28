import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchChatByProject(id)); // Fetch chat for the project
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id)); // Fetch messages for the chat
      // Poll for new messages every 2 seconds
      const interval = setInterval(() => {
        dispatch(fetchChatMessages(chat.chat.id));
      }, 500);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [dispatch, chat.chat?.id]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return; // Prevent empty messages

    const newMessage = {
      senderId: auth.user?.id,
      projectId: id,
      content: message,
    };

    // Send message to backend
    await dispatch(sendMessage(newMessage));
    dispatch(fetchChatMessages(chat.chat?.id)); // Refresh messages after sending
    setMessage(""); // Clear input
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const reversedMessages = chat.messages?.slice().reverse() || []; // Use Redux state

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {reversedMessages.map((item, index) =>
            item?.sender?.id !== auth.user?.id ? (
              <div className="flex gap-2 mb-2 justify-start" key={index}>
                <Avatar>
                  <AvatarFallback>{item.sender?.username[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                  <p>{item.sender?.username}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mb-2 justify-end" key={index}>
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                  <p>{item.sender?.username}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{item.sender?.username[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
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
