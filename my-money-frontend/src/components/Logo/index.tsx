import { Box, Heading, Icon, Stack } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";

interface LogoProps {
  stack?: "vertical"|"horizontal";
  logoImageSize?:string;
  logoMSize?:string;
  logoTextSize?:string;
  logoTextColor?: string;
}
export const Logo:React.FC<LogoProps> = (props) => {
  const logoAlign = props.stack == "horizontal" ? "row" : "column";
  const paddingY = props.stack == "horizontal" ? "5%" : undefined;

  return <Stack alignItems="center" color="dollar.500" direction={[logoAlign]}>
    <Icon boxSize={props.logoImageSize? props.logoImageSize : "3.5rem"} as={FaDollarSign} />
    <Heading py={paddingY} fontSize={props.logoMSize? props.logoMSize : "1.4rem"}>
      M<Box fontSize={props.logoTextSize? props.logoTextSize : "1.2rem"} display="inline" color={props.logoTextColor? props.logoTextColor : "dollar.900"}>y</Box>M<Box fontSize={props.logoTextSize? props.logoTextSize : "1.2rem"} display="inline" color={props.logoTextColor? props.logoTextColor : "dollar.900"}>oney</Box>
    </Heading>
  </Stack>
};
