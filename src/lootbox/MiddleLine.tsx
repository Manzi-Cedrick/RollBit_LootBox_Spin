import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface MiddleLineProps {
  isSpinEnd: boolean;
}
const MiddleLine: FC<MiddleLineProps> = ({ isSpinEnd }) => {
  const isDarkMode = true;
  return (
    <Box
      width={'1px'}
      height={360}
      position="absolute"
      left="50%"
      top={1}
      transform="transform(-1px, -4px)"
      bgColor={isDarkMode ? "#fff" : "#f3e033"}
      boxShadow={isDarkMode ? "10px 4px 10px #000" : "10px 4px 10px #000"}
      opacity={!isSpinEnd ? 1 : 0}
      style={{
        transition: `opacity 0.5s`,
      }}
    >
      <Box
        position="absolute"
        left={-1}
        top={-1}
        transform="rotate(45deg)"
        w={3}
        h={3}
        bgColor={isDarkMode ? "#fff" : "#f3e033"}
      ></Box>
      <Box
        position="absolute"
        left={-1}
        bottom={-1}
        transform="rotate(45deg)"
        w={3}
        h={3}
        bgColor={isDarkMode ? "#fff" : "#f3e033"}
      ></Box>
    </Box>
  );
};

export default MiddleLine;
