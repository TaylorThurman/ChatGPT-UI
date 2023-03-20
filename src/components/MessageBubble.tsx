import {Box, keyframes, Link, Spacer} from "@chakra-ui/react";
import {motion} from "framer-motion";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// @ts-ignore
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {TbClipboardCheck, TbCopy, TbExternalLink} from "react-icons/all";

export default function MessageBubble(props: any) {
    const [copied, setCopied] = useState(false);
    const animationKeyframes = keyframes`
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      25% {
        opacity: 1;
      }
      50% {
        transform: scale(1.02);
      }
      100% {
        transform: scale(1);
      }
    `;

    const animation = `${animationKeyframes} .5s ease-in-out`;
    return (
        <Box
            as={motion.div}
            animation={animation}
            key={props.index}
            p={3}
            borderRadius={"lg"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
            bg={props.bg}
            maxW={"75%"}
            letterSpacing={"wide"}
        >
            {props.isLoading ? props.children :
                <Box my={2}>
                    <ReactMarkdown
                        children={props.children}
                        components={{
                            h1({node, children, ...props}) {
                                return (
                                    <Box as={"h1"} fontSize={"2.5rem"} color={"purple.500"} {...props}>
                                        {children}
                                    </Box>
                                )
                            },
                            h2({node, children, ...props}) {
                                return (
                                    <Box as={"h2"} fontSize={"2rem"} color={"purple.500"} {...props}>
                                        {children}
                                    </Box>
                                )
                            },
                            h3({node, children, ...props}) {
                                return (
                                    <Box as={"h3"} fontSize={"1.5rem"} color={"purple.500"} {...props}>
                                        {children}
                                    </Box>
                                )
                            },
                            li({node, className, children, ...props}) {
                                return (
                                    <Box my={1} ml={7} display={"flex"} alignItems={"top"}>
                                        <Box as={"li"} fontSize={"1.3rem"}
                                             color={"purple.500"} mt={-1}/>
                                        <Box as={"span"} color={"white"}>{children}</Box>
                                    </Box>
                                )
                            },
                            a({node, children, ...props}) {
                                return (
                                    <Link color={"purple.500"} isExternal {...props} display={"flex"}>
                                        {children} <TbExternalLink/>
                                    </Link>
                                )
                            },
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return (
                                    <Box as={"div"} borderRadius={5} overflow={"hidden"} my={2}>
                                        {match &&
                                            <Box bg={"whiteAlpha.300"} display={"flex"} px={1}>
                                                <Box color={"white"} fontSize={".9rem"} m={1}>
                                                    {match[1]}
                                                </Box>
                                                <Spacer/>
                                                <Box color={"white"}
                                                     pl={1}
                                                     m={1}
                                                     display={"flex"}
                                                     alignItems={"center"}
                                                     gap={1}
                                                     _hover={{cursor: "pointer"}}
                                                     onClick={() => {
                                                         if (!copied) {
                                                             navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                                                             setCopied(true);
                                                             setTimeout(() => {
                                                                 setCopied(false);
                                                             }, 3000)
                                                         }
                                                     }}
                                                >
                                                    {!copied ?
                                                        <>
                                                            <TbCopy/>
                                                            <Box fontSize={".75rem"}>
                                                                Copy Code
                                                            </Box>
                                                        </> :
                                                        <>
                                                            <TbClipboardCheck/>
                                                            <Box fontSize={".75rem"}>
                                                                Copied!
                                                            </Box>
                                                        </>
                                                    }
                                                </Box>
                                            </Box>
                                        }
                                        <SyntaxHighlighter
                                            style={materialDark}
                                            customStyle={{
                                                margin: 0
                                            }}
                                            children={String(children).replace(/\n$/, '')}
                                            language={match ? match[1] : ''}
                                            PreTag="div"
                                        />
                                    </Box>
                                )
                            }
                        }}
                    />
                </Box>
            }
        </Box>
    )
}
