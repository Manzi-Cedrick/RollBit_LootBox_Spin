import React, { FC } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { spinType } from "./types";
// import Image from "next/image";

interface Props {
  index: number;
  spin: spinType;
  winnerIndex: number;
}

const SpinCard: FC<Props> = ({ spin, index, winnerIndex }) => {
  // const { colorMode } = useColorMode();
  const isDarkMode = true;
  const isEnd = winnerIndex !== -1;
  const isSelected = winnerIndex === index;

  return (
    <Box
      position="absolute"
      width={240}
      height={320}
      left={(240 + 4) * index}
      borderRadius="20px"
      border={"1px solid"}
      borderColor="#014606" 
      boxShadow={isDarkMode ? "lg" : "none"}
      mr="4px"
      pb="2rem"
      textAlign="center"
      alignItems="center"
      bg="#03101c"
      overflow="hidden"
      // the animation of winner
      sx={{
        transition: "transform 0.5s",
        transform: `scale(${isSelected ? 1.01 : 1})`,
        zIndex: isSelected ? 10 : 1,
        borderColor: isSelected ? "#427247" : "#014606" ,
        filter: `blur(${isEnd ? (isSelected ? 0 : 6) : 0}px)`,
      }}
    >
      <Box 
        height={40}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        bgColor={"#0c1620"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Text fontSize="1rem"  lineHeight={"40px"} fontWeight="600" color="white" mt={2}>
          Questy Tokens
        </Text>
      </Box>
      <Box
        width={8}
        height={400}
        bgColor={"#ffffffdd"}
        position="absolute"
        zIndex={11}
        top={-9}
        transform="rotate(30deg)"
        style={{
          transition: "left 0.8s",
          left: !isSelected ? -160 : 500,
        }}
      />
      
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Box 
          height={190}
          width={240} 
          display={"flex"}
          justifyContent={"center"}
          alignItems={"Center"}
        >
          {spin.image !== "" ? (
            <img
              src={spin.image}
              height={70}
              width={70}
              alt="This is failed."
            />
          ) : (
            <Box
              width={240}
              height={240}
              bgColor= "grey"
            ></Box>
          )}
        </Box>
       
        <Text fontSize="1rem" fontWeight="600" color="white" mt={2}>
          {`${spin.percent*10 } $QST`}
        </Text>
      </Box>
    </Box>
  );
};

export default SpinCard;
