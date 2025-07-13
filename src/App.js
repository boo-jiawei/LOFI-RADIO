import React, { useRef, useState } from "react";
import {
  Image,
  Box,
  Heading,
  IconButton,
  MoonIcon,
  SunIcon,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/icons";

const streamUrl = "https://ice3.somafm.com/groovesalad-128-mp3";
const vinylUrl =
  "https://cdn.pixabay.com/photo/2018/02/12/16/35/phonograph-record-3148686_1280.jpg";

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.800", "white")}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      position="relative"
    >
      {/*Theme Toggle */}
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        position="absolute"
        top={4}
        left={4}
        size="lg"
        variant="ghost"
        colorScheme="gray"
        aria-label="Toggle Theme"
      />

      <VStack spacing={8}>
        <Heading fontSize="4xl" textAlign="center">
          🎧 Lo-Fi Vinyl Player
        </Heading>

        {/*VINYL GLOW CONTAINER */}

        <Box //This is the vinyl container
          onClick={handleToggle}
          cursor="pointer"
          position="relative"
          w={250}
          h={250}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={isPlaying ? "glow-ring bounce" : ""}
          transition="all 0.3s ease-in-out"
        >
          {/* Vinyl Image */}
          <Image
            src={vinylUrl}
            alt="vinyl"
            boxSize="240px"
            borderRadius="full"
            objectFit="cover"
            transformOrigin="center"
            transition="transform 0.3s ease-in-out"
            sx={{
              animation: "spin 5s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>

        {/* Now Playing Text */}
        {isPlaying && (
          <Heading
            fontSize="lg"
            color="teal.400"
            mt={2}
            transition="opacity 0.3s ease-in-out"
          >
            🎶 Now Playin GrooveSalad
          </Heading>
        )}

        {/* Audio Element */}
        <audio ref={audioRef} src={streamUrl} />
      </VStack>

      {/* Rainbow Glow & Animation Styles */}
      <style>
        {`
          .glow-ring::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 10px;
          background: conic-gradient(
          from 0deg,
          #ff0080,
          #ff8c00,
          #40c0d0,
          #8a2be2,
          #ff0080
          );
          filter: blur(8px);
          animation: rotate-glow 4s linear infinite;
          z-index: -1;
          }

          @keyframes rotate-glow {
          from {
            transform: rotate(0deg);
          }
            to {
            transform: rotate(360deg);
            }
          }

          .bounce{ 
            animation: bouncePulse 3s ease-in-out infinite;
          }

          @keyframes bouncePulse {
            0% {
              transform: scale(1) rotate(0deg);
            }
                          20% {
              transform: scale(1.03) rotate(0.5deg);
            }
                          50% {
              transform: scale(1.01) rotate(-0.4deg);
            }
                          80% {
              transform: scale(1.04) rotate(0.8deg);
            }
                         100% {
              transform: scale(1) rotate(0deg);
            }
          }
          `}
      </style>
    </Box>
  );
};

export default App;
