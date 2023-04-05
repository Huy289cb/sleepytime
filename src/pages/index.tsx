import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import {
  Text,
  Box,
  Container,
  Select,
  Button,
  // useColorMode,
  List,
  ListItem,
  ListIcon,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

const calculatedFromTimeSleep = (time: Date) => {
  const result = [...Array(4)].map((_: undefined, index: number) => {
    const i = index + 1;
    const resultDate = new Date(time);
    resultDate.setMinutes(i * 90 + 15);
    return resultDate;
  });
  return result;
};

const calculatedFromTimeWakeup = (time: Date) => {
  const fullMinutes = 555;
  const result = [...Array(4)].map((_: undefined, index: number) => {
    const i = index + 1;
    const resultDate = new Date(time);
    resultDate.setMinutes(resultDate.getMinutes() - (fullMinutes - index * 90));
    return resultDate;
  });
  return result;
};

type timeResult = {
  time: Date;
  listResult: Date[];
};

export default function Home() {
  const [hour, setHour] = useState<string>("8");
  const [minute, setMinute] = useState<string>("00");
  const [ampm, setAmpm] = useState<string>("AM");

  const [timeWakeup, setTimeWakeup] = useState<timeResult>();
  console.log("🚀 ~ file: index.tsx:37 ~ Home ~ timeWakeup:", timeWakeup);

  const handleSubmit = () => {
    const now = new Date();
    if (ampm === "AM") {
      now.setHours(parseInt(hour));
    } else {
      now.setHours(parseInt(hour) + 12);
    }
    now.setMinutes(parseInt(minute));

    const result = calculatedFromTimeWakeup(now);

    setTimeWakeup({
      time: now,
      listResult: result,
    });
  };

  return (
    <Container
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {!timeWakeup ? (
        <Box borderRadius="lg" p={3} mb={6} textAlign="center">
          <Text as="h1" fontSize="2.2rem" fontWeight="bold" mb={8}>
            I have to wake up at
          </Text>
          <Box display="flex" gap={4} pb={16}>
            <Select
              value={hour}
              onChange={(event) => setHour(event.target.value)}
            >
              {[...Array(12)].map((_: undefined, index: number) => {
                return (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </Select>
            <Select
              value={minute}
              onChange={(event) => setMinute(event.target.value)}
            >
              {[...Array(60)].map((_: undefined, index: number) => {
                let display = index + "";
                if (display.length === 1) display = "0" + display;
                return (
                  <option key={index} value={index}>
                    {display}
                  </option>
                );
              })}
            </Select>
            <Select
              value={ampm}
              onChange={(event) => setAmpm(event.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Select>
          </Box>
          <Box>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="purple"
              onClick={handleSubmit}
            >
              Go
            </Button>
          </Box>
        </Box>
      ) : (
        <Box borderRadius="lg" p={3} mb={6} textAlign="center" flex="1 1">
          <Text as="h1" fontSize="2.2rem" fontWeight="bold" mb={8}>
            I have to wake up at <TimeDisplay time={timeWakeup.time} />
          </Text>
          {timeWakeup?.listResult?.length > 0 && (
            <>
              <Text as="div" mb={8}>
                <strong>Go to bed</strong> at one of the following times:
              </Text>
              <List display="flex" justifyContent="space-around" mb={8}>
                {timeWakeup.listResult.map((result, index) => {
                  const cycles = 6 - index;
                  const hours = 9 - 1.5 * index;
                  let color = "green.500";
                  if (cycles < 5) color = "orange.500";
                  return (
                    <ListItem key={result.getTime()}>
                      <Box
                        border="1px solid"
                        borderColor={color}
                        padding={2}
                        borderRadius="sm"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <ListIcon as={CheckCircleIcon} color={color} />
                          <TimeDisplay time={result} />
                        </Box>
                        <Text as="span" fontSize="0.825rem" color={color}>
                          {`${cycles} cycles (${hours}hrs)`}
                        </Text>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              <UnorderedList mb={16} textAlign="left" spacing={2}>
                <ListItem>
                  The average adult human takes <strong>fifteen minutes</strong>{" "}
                  to fall asleep.
                </ListItem>
                <ListItem>
                  sleepytime works by counting backwards in{" "}
                  <strong>sleep cycles</strong>. Sleep cycles typically last{" "}
                  <strong>90 minutes</strong>.
                </ListItem>
                <ListItem>
                  Waking up in the middle of a sleep cycle leaves you feeling
                  tired and groggy, but waking up <i>in between</i> cycles lets
                  you wake up feeling refreshed and alert!
                </ListItem>
                <ListItem>
                  {`We're working on a sleepytime app.`} &nbsp;
                  <Link as={NextLink} href="#" textDecoration="underline">
                    {`Get notified when it's ready`}
                  </Link>
                </ListItem>
              </UnorderedList>
              <Box>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  colorScheme="purple"
                  onClick={() => setTimeWakeup(undefined)}
                >
                  Back
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}

const TimeDisplay = ({ time }: { time: Date }) => {
  let hours = time.getHours() + "";
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  let minutes = time.getMinutes() + "";
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  return <Text as="span" colorScheme="teal">{`${hours}:${minutes}`}</Text>;
};
