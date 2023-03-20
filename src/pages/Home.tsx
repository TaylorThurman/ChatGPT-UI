import {Box, Container} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import PromptInput from "../components/PromptInput";
import ChatWindow from "../components/ChatWindow";
import SideNav from "../components/SideNav";
import {chatListTestData} from "../TestData";

export interface GptRequestMessage {
    role: string,
    content: string
}

export default function Home() {
    const [chatList, setChatList] = useState([] as any[]);
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<GptRequestMessage[]>([]);
    const [currentChat, setCurrentChat] = useState<GptRequestMessage[]>([]);
    const [messageIsLoading, setMessageIsLoading] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            setChatList(chatListTestData)
            console.log(chatList[0])
            setCurrentChat(chatListTestData[0].chat)
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            setMessageIsLoading(true);
            fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        messages: messages
                    }
                )
            })
                .then(response => response.json())
                .then(data => {
                        setCurrentChat([...messages, data]);
                    }
                )
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                        setMessageIsLoading(false);
                    }
                )
            ;
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        };
    }, [messages, currentChat]);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight + 100,
                behavior: 'smooth',
            });
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (prompt === "") return;
        scrollToBottom();
        const message: GptRequestMessage = {
            role: "user",
            content: prompt
        }
        setCurrentChat((messages) => {
            return [...messages, message]
        });
        setMessages(() => {
            return [...currentChat, message]
        });
        setPrompt("");
    };

    return (
        <Box display={"flex"} flexDirection={"row"} pos={"relative"}>
            <SideNav chatList={chatList}
                     setChatList={setChatList}
                     setCurrentChat={setCurrentChat}
                     currentChat={currentChat}/>

            <Container maxW={"5xl"} display={"flex"} flexDirection={"column"} gap={2} p={0} pos={"relative"}>
                <ChatWindow currentChat={currentChat}
                            messageIsLoading={messageIsLoading}
                            chatBoxRef={chatBoxRef}
                            scrollToBottom={scrollToBottom}
                />
                <PromptInput prompt={prompt}
                             setPrompt={setPrompt}
                             handleSubmit={handleSubmit}
                             messageIsLoading={messageIsLoading}
                />
            </Container>
        </Box>
    )
}