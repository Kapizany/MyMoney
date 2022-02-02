import { Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BackgroundScreen } from "../components/BackgroundScreen";
import { Header } from "../components/Header";
import { SideBarMenu } from "../components/SideBarMenu";
import { DashboardProps } from "../interfaces/dashboard";

export function Transactions({selectedPage, setSelectedPage}: DashboardProps) {
    setSelectedPage("transactions");
    const mockedTableData = [
      {
        "id": 1,
        "value": 1,
        "date": "2022-02-02",
        "description": "1",
        "user": "admin@example.com"
      },
      {
        "id": 2,
        "value": 2,
        "date": "2022-02-02",
        "description": "2",
        "user": "admin@example.com"
      },
      {
        "id": 3,
        "value": 3,
        "date": "2022-02-02",
        "description": "3",
        "user": "admin@example.com"
      },
    ]
    return  <BackgroundScreen alignItems="normal" justifyContent="flex-start">
      <Header />
      <SideBarMenu selectedPage={selectedPage}/>
      <Flex
        w="83vw"
        mt="6vh"
        ml="17vw"
        bgColor="gray.100"
        flexDirection="column"
      >
        <Flex
          w="83vw%"
          h="3rem"
          m="1rem"
          px="1rem"
          alignItems="center"
          bg="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
        >
          <Heading size="md" color='dollar.900'>Transactions</Heading>
        </Flex>

        <Table
          w="83vw%"
          mx="1rem"
          bg="gray.50"
          boxShadow="0px 0px 8px 0px rgba(0,0,0,0.4)"
          color='dollar.900'
        >
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Day</Th>
              <Th>Description</Th>
              <Th isNumeric>Value (USD)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockedTableData.map((data) => {
              return (
                <Tr key={data.id}>
                  <Td>{data.date}</Td>
                  <Td>{data.date}</Td>
                  <Td>{data.description}</Td>
                  <Td isNumeric>{data.value}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Flex>
    </BackgroundScreen>
}
