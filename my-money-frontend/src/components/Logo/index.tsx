import { Box, Heading, Icon } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";

export const Logo = () => {
  return <Box textAlign="center" color="dollar.500">
    <Icon boxSize="3.5rem" as={FaDollarSign} />
    <Heading fontSize="1.4rem">
      M<Box fontSize="1.2rem" display="inline" color="dollar.900">y</Box>M<Box fontSize="1.2rem" display="inline" color="dollar.900">oney</Box>
    </Heading>
  </Box>
}