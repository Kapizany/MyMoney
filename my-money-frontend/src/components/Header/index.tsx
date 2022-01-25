import { Flex } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Flex
      position="fixed"
      w="100vw"
      h="6vh"
      bg="gray.700"
      justifyContent="space-between"
    >
      <Flex w="25vw" justifyContent="space-between">
        <Flex>
            um um
        </Flex>
        <Flex>
            um dois
        </Flex>
      </Flex>
      <Flex>
        Segunda parte
      </Flex>
    </Flex>
  )
}
