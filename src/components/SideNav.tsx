import {Box, Button, Flex, Spacer, VStack} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {RxChatBubble, TbBrandOpenai, TbChevronsLeft, TbChevronsRight, TbMessageChatbot} from "react-icons/all";
import React, {useEffect, useState} from "react";
import {GptRequestMessage} from "../pages/Home";
import {chatListTestData} from "../TestData";

export default function SideNav(props: any) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const sideNavVariant = {
        open: {x: 0, width: "250px", transition: {duration: .5}},
        closed: {x: "-100%", width: "0px", transition: {delay: .2, duration: .5}}
    }

    const sideNavInnardsVariant = {
        open: {opacity: 1, transition: {delay: .45}},
        closed: {opacity: 0,},
    }

    const openSideNavButtonVariant = {
        open: {opacity: 0, transition: {duration: .2}},
        closed: {opacity: 1, transition: {delay: .55}},
    }

    const handleNewChat = () => {
        if (props.chatList[0].title === "...") return;
        const newChat = {
            title: "...",
            chat: []
        }
        props.setChatList([newChat, ...props.chatList]);
        props.setCurrentChat(newChat.chat);
    }

    return (
        <Box
            w={"300px"}
            h={"calc(100vh)"}
            pos={"absolute"}
            zIndex={2}
            display={"flex"}
        >
            {/*inside*/}
            <Box
                as={motion.nav}
                animate={isNavOpen ? "open" : "closed"}
                variants={sideNavVariant}
                bg={"gray.900"}
                h={"100%"}
                w={"250px"}
            >
                <Flex
                    as={motion.div}
                    animate={isNavOpen ? "open" : "closed"}
                    variants={sideNavInnardsVariant}
                    m={3}>
                    <Button w={"150px"}
                            boxShadow={"rgba(255, 255, 255, 0.55) 0px 0px 7px;"}
                            _active={{bg: "none"}}
                            _hover={{boxShadow: "rgba(255, 255, 255, 0.55) 0px 0px 10px;"}}
                            variant={"outline"}
                            onClick={handleNewChat}>
                        New Chat
                        <Box ml={2}><TbBrandOpenai/></Box>
                    </Button>
                    <Spacer/>
                    <Box h={"50px"}
                         filter={"drop-shadow(0 0 .3rem white);"}
                         _hover={{filter: "drop-shadow(0 0 .65rem white)"}}
                         onClick={() => setIsNavOpen(false)}
                    >
                        <TbChevronsLeft color={"white"} size={40}/>
                    </Box>
                </Flex>

                <VStack
                    as={motion.div}
                    animate={isNavOpen ? "open" : "closed"}
                    variants={sideNavInnardsVariant}
                    gap={1}
                >
                    {props.chatList.map((chat: any, index: number) => (
                        <Flex key={index} direction={"row"}
                              _hover={{
                                  boxShadow: "rgba(255, 255, 255, 0.55) 0px 0px 10px;",
                                  border: "solid 1px white"
                              }}
                              py={1}
                              px={2}
                              w={"95%"}
                              borderRadius={5}
                              border={"solid 1px transparent"}
                              onClick={() => props.setCurrentChat(chat.chat)}
                        >
                            <Box pt={1}>
                                <RxChatBubble size={15}/>
                            </Box>
                            <Box
                                ml={2}
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                                fontSize={".9rem"}
                                textOverflow={"ellipsis"}
                                title={chat.title}
                            >
                                {chat.title}
                            </Box>
                        </Flex>

                    ))}
                </VStack>
            </Box>

            {/*outside*/}
            <Box
                as={motion.nav}
                animate={isNavOpen ? "open" : "closed"}
                variants={openSideNavButtonVariant}
                mt={3} ml={2} h={"50px"}
                filter={"drop-shadow(0 0 .3rem white);"}
                _hover={{filter: "drop-shadow(0 0 .65rem white)"}}
                onClick={() => setIsNavOpen(true)}
            >
                <TbChevronsRight color={"white"} size={40}/>
            </Box>
        </Box>
    )
}