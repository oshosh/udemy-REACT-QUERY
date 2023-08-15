/* eslint-disable max-lines-per-function */
import { ReactElement } from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';
import {
  Box,
  Checkbox,
  Grid,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { UserAppointments } from '../user/UserAppointments';

import { useAppointments } from './hooks/useAppointments';
import { DateBox } from './DateBox';

export function Calendar(): ReactElement {
  const currentDate = dayjs();

  const { appointments, monthYear, updateMonthYear, showAll, setShowAll } =
    useAppointments();

  return (
    <Box>
      <HStack mt={10} spacing={8} justify="center">
        <IconButton
          aria-label="previous month"
          onClick={() => updateMonthYear(-1)}
          icon={<TiArrowLeftThick />}
          isDisabled={monthYear.startDate < currentDate}
        />
        <Heading minW="40%" textAlign="center">
          {monthYear.monthName} {monthYear.year}
        </Heading>
        <IconButton
          aria-label="next month"
          onClick={() => updateMonthYear(1)}
          icon={<TiArrowRightThick />}
        />
        <Checkbox
          variant="flushed"
          width="48"
          position="absolute"
          right="10px"
          checked={!showAll}
          defaultIsChecked
          onChange={() => setShowAll((prevValue) => !prevValue)}
        >
          Only show available
        </Checkbox>
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={4} my={5} mx={10}>
        {/* first day needs a grid column */}
        <DateBox
          date={1}
          gridColumn={monthYear.firstDOW + 1}
          appointments={appointments[1]}
        />
        {/* the rest of the days will follow */}
        {/* 31 혹은 30에 해당 하는 빈 배열 생성 */}
        {[...Array(monthYear.lastDate)].map((_, i) => {
          if (i > 0) {
            return (
              <DateBox
                key={i}
                date={i + 1}
                appointments={appointments[i + 1]}
              />
            );
          } else {
            return null;
          }
        })}
      </Grid>
      <UserAppointments />
    </Box>
  );
}
