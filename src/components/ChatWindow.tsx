import {Box, keyframes, Spacer} from "@chakra-ui/react";
import MessageBubble from "./MessageBubble";
import CircleLoader from "./CircleLoader";
import React, {RefObject, useEffect, useMemo, useRef, useState} from "react";
import {GptRequestMessage} from "../pages/Home";
import {FaAngleDoubleDown} from "react-icons/all";
import {motion} from "framer-motion";

function useIsOnScreen(ref: RefObject<HTMLElement>) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = useMemo(() => new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])


    useEffect(() => {
        // @ts-ignore
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}

export default function ChatWindow(props: any) {
    const ref = useRef<HTMLDivElement>(null)
    const isVisible = useIsOnScreen(ref)

    const animationKeyframes = keyframes`
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    `;

    const animation = `${animationKeyframes} .5s ease-in-out`;

    return (
        <Box pos={"relative"}>
            <Box h='calc(95vh)'
                 overflowY={"scroll"}
                 sx={{
                     overflowY: "auto",
                     '&::-webkit-scrollbar': {
                         width: '2px',
                     },
                     '&::-webkit-scrollbar-thumb': {
                         backgroundColor: 'purple.700',
                     },
                 }}
                 py={4}
                 ref={props.chatBoxRef}>
                {props.currentChat.map((message: GptRequestMessage, index: number) => {
                    return (
                        <Box key={index}>
                            {message.role === "user" ?
                                <Box display={"flex"} mr={5} mb={"15px"}>
                                    <Spacer/>
                                    <MessageBubble index={index}
                                                   isLoading={false}
                                                   bg={"purple.700"}>
                                        {message.content}
                                    </MessageBubble>
                                </Box>
                                :
                                <Box display={"flex"} ml={5} mb={"15px"}>
                                    <MessageBubble index={index}
                                                   isLoading={false}
                                                   bg={"gray.700"}>
                                        {message.content}
                                    </MessageBubble>
                                    <Spacer/>
                                </Box>
                            }
                        </Box>
                    )
                })}
                {props.messageIsLoading &&
                    <Box display={"flex"} marginBottom={"10px"} ml={5}>
                        <MessageBubble index={999}
                                       isLoading={props.messageIsLoading}
                                       bg={"gray.700"}>
                            <CircleLoader/>
                        </MessageBubble>
                        <Spacer/>
                    </Box>
                }
                <Spacer height={"30px"}/>
                <Box ref={ref}></Box>
            </Box>
            {!isVisible &&
                <Box
                    as={motion.div}
                    animation={animation}
                    zIndex={1}
                    bottom={"8%"}
                    right={"5%"}
                    pos={"absolute"}
                    filter={"drop-shadow(0 0 .75rem white);"}
                    _active={{filter: "drop-shadow(0 0 white);"}}
                    _hover={{filter: "drop-shadow(0 0 1rem white)"}}
                    onClick={props.scrollToBottom}
                >
                    <FaAngleDoubleDown size={25}/>
                </Box>
            }
        </Box>
    )
}