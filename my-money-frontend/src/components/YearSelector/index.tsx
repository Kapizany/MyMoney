import { Flex, Select } from "@chakra-ui/react";
import { YearSelectorProps } from "../../interfaces/yearSelector";


export function YearSelector({
    years,
    year,
    setYear,
    setLoading,
  }: YearSelectorProps) {
  return (
    <Flex
      h="5%"
      alignItems="center"
      justifyContent="center"
      bgColor="#eeeef2"
    >
      <Flex
        mr="0.25rem"
        fontWeight="bold"
        color="#1f2029"
      >
        Year:
      </Flex>
      <Select
        maxWidth="fit-content"
        variant="unstyled"
        color="#000000"
        value={year}
        onChange={(event) => {
          setYear(event.target.value);
          setLoading(true);
        }}
      >
        {years.map((yearOption: string) => {
          return (
            <option
              key={yearOption}
              value={yearOption}
            >
              {yearOption}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
}
