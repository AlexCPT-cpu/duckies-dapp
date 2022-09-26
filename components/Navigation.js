import React, { useContext } from "react";
import { Button, Text, Row, Col, Spacer } from "@nextui-org/react";
import { Container, Link } from '@nextui-org/react';
import { WalletConnectContext } from "../context/WalletConnectContext";

export const Navigation = () => {

    const ConnectContext = useContext(WalletConnectContext);
    const { account, ConnectWallet, DisconnectWallet } = ConnectContext

  return (
    <div>
          <Container lg css={{ marginTop: "$5" }}>
          <Row justify="space-between">
            <Col css={{ marginTop: "$8" }}>
              <Text
                h5
                size={18}
                css={{
                  textGradient: "45deg, $yellow600 -20%, $green600 100%",
                }}
                weight="bold"
              >
             <Link href='/'>MINT  NFT</Link> 
              </Text>
            </Col>
            <Col css={{ marginTop: "$8" }}>
            <Text
                h5
                size={18}
                css={{
                  textGradient: "45deg, $yellow600 -20%, $green600 100%",
                }}
                weight="bold"
              >
              <Link href='/claim'>CLAIM BNB</Link>
              </Text>
            </Col>
            <Col css={{ marginTop: "$8" }}>
                { account ? 
                    <Button id="wallet-address" auto className="button" type="button" onClick={DisconnectWallet} >
                    {account}
                  </Button>
                  :
                                  <Button id="wallet-address" auto className="button" type="button" onClick={ConnectWallet} >
                  Connect
                </Button>
                }

            </Col>
          </Row>
        </Container>
        <Spacer />
        <Spacer />
        </div>
  )
}
