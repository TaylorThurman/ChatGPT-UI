import {Box, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import React from "react";
import {IoEllipsisHorizontal, TbSend} from "react-icons/all";

export default function PromptInput(props: any) {
    const handleKeyDownEnter = (e: any) => {
        if (e.key === 'Enter') {
            props.handleSubmit(e);
        }
    }
    return (
        <Box display="flex"
             pl={1}
             zIndex={1}
             pos={"absolute"}
             bottom={-10}
             width={"99%"}
             height={"100px"}
             alignItems={"center"}
        >

            <InputGroup bg={"gray.800"}>
                <Input value={props.prompt}
                       placeholder="Lets chat"
                       borderColor={"purple.800"}
                       variant={"filled"}
                       bg={"gray.800"}
                       _hover={{borderColor: "purple.700"}}
                       _focusVisible={{borderColor: "purple.700"}}
                       boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                       filter={"drop-shadow(0 0 1rem indigo);"}
                       onKeyDown={handleKeyDownEnter}
                       onChange={(e) => props.setPrompt(e.target.value)}/>
                <InputRightElement
                    mr={2}
                    filter={"drop-shadow(0 0 1rem indigo);"}
                    _hover={{filter: "drop-shadow(0 0 .35rem white);"}}
                    children={
                        <>
                            {
                                props.messageIsLoading ? <IoEllipsisHorizontal size={20}/> :
                                    <TbSend size={20} onClick={props.handleSubmit}/>
                            }
                        </>
                    }/>
            </InputGroup>
        </Box>
    );
}