import React, { FC, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaKey } from "react-icons/fa"
import SpinCard from "./SpinCard";
import { useWindowSize } from "react-use";
import { CARD_GAP, CARD_WIDTH, DEMO_LOOTBOX } from "./config";
import MiddleLine from "./MiddleLine";
import spin from "./spin.mp3"

const SpinPage = () => {
  const isDarkMode = true; // for theme
  const spinRef = useRef(null);

  const { width } = useWindowSize(); // need get the center of window for responsive and card orders
  const [isFast, setIsFast] = useState(false); // flag - fast/normal spin speed

  // get center position from DEMO_USERS and window width
  const centerPoint = useMemo(() => {
    let value = 0;
    if (width >= 1700) {
      value = width / 2 - (width - 1680) / 2 - 40;
    } else {
      value = width / 2 - 50;
    }
    return value;
  }, [DEMO_LOOTBOX, width]);

  const firstLeft = useMemo(() => {
    let value = 0;
    if (width >= 1700) {
      value = 72 - CARD_WIDTH - CARD_GAP;
    } else {
      value = ((width / 2) % (CARD_WIDTH + CARD_GAP)) - 50 + CARD_GAP;
    }
    return value;
  }, [width]);

  const originCards = useMemo(() => {
    const showCards = DEMO_LOOTBOX.flatMap((item) =>
      Array.from({ length: item.value }, () => item)
    );

    return showCards;
  }, [DEMO_LOOTBOX, centerPoint]);

  const prevCount = Math.ceil(centerPoint / (CARD_WIDTH + CARD_GAP)) + 1;

  const showCards = useMemo(() => {
    const repeatedCards = Array(4).fill(originCards).flat();
    const list = [
      ...originCards.slice(-prevCount),
      ...repeatedCards,
      ...originCards.slice(0, originCards.length - prevCount),
    ];
    return list;
  }, [originCards]);

  const [target, setTarget] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(-1);

  const [isSpinEnd, setIsSpinEnd] = useState(false);

  // main spin function
  //
  const handleSpin = (end?: number) => {
    const duration = !isFast ? 12000 : 2000; // 12 seconds or 2 second by isFast toggle
    const startTime = performance.now();
    const startValue = target;
    const endValue = end
      ? end
      : (CARD_WIDTH + CARD_GAP) * originCards.length * (3 + Math.random()); // this is random value

    const winner =
      Math.floor(endValue / (CARD_WIDTH + CARD_GAP)) + prevCount - 2;

      const audio = new Audio(spin);
      audio.play();
    
    const updateTargetValue = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= duration) {
        setTarget(endValue);
        setWinnerIndex(winner);
        setIsSpinEnd(true);
      } else {
        const t = elapsedTime / duration;
        const easing = 1 - Math.pow(1 - t, 4); // Cubic easing function
        const newValue = startValue + (endValue - startValue) * easing;
        setTarget(newValue);
        setTimeout(updateTargetValue, 16); // Update every 16ms (~60fps)
      }
    };

    updateTargetValue();
  };

  return (
    <>
      <Box mx="1.5rem" mt="3rem">
        <Box position="relative">
          <Box position="relative" ref={spinRef} mb={4} overflow="hidden">
            <Box
              display="flex"
              height={360}
              mt={6}
              position="relative"
              style={{
                translate: "transform 16ms",
                transform: `translateX(-${target}px)`, // target is moved position of cards' row
                marginLeft: firstLeft,
              }}
            >
              {showCards.map((spin, index) => (
                <>
                  <SpinCard
                    key={index}
                    spin={spin}
                    index={index}
                    winnerIndex={winnerIndex}
                  />
                </>
                ))}
            </Box>
          </Box>
          <MiddleLine isSpinEnd={isSpinEnd} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent={"center"} gap={2} mt={2}>
          <Button 
          leftIcon={<FaKey />} 
          bgColor="#2e7d32"
          border="none"
          width="90px"
          height="40px"
          fontWeight={800}
          onClick={() => {
            setTarget(0);
            setWinnerIndex(-1);
            setIsSpinEnd(false);
          }}
          _hover={{
            backgroundColor: "#5B5B5B !important",
            boxShadow: "-2px -4px 0px #444 inset",
          }}
          disabled={winnerIndex === -1}
          variant='solid'>
            ROLL
          </Button>
          <Button
            bgColor="transparent"
            border="none"
            textColor={"white"}
            fontWeight={800}
            padding={10}
            onClick={() => handleSpin(
              (CARD_WIDTH + CARD_GAP) * (prevCount + 9 * 2 + Math.random() *4 )
            )}
            
            disabled={winnerIndex !== -1}
          >
            Try it
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default SpinPage;
