import React, { useContext, useEffect} from 'react'
import { Container, Card, Text, Row, Spacer, Button, Loading } from '@nextui-org/react'
import { WalletConnectContext } from '../context/WalletConnectContext';

function Claim() {

  const ConnectContext = useContext(WalletConnectContext);
  const { isConnected, Claim, ConnectWallet, isClaiming, Rewards } = ConnectContext

  const mint = async () => {
    isConnected ? Claim() : await ConnectWallet()
  }

  return (
    <Container>    
    <Row style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text
      style={{textAlign:"center"}}
      h5
      size={25}
      css={{
        textGradient: "45deg, $blue600 -20%, $green600 50%",
        m: 0,
      }}
      weight="bold"
    >
      Claim
    </Text>
    &nbsp;&nbsp;&nbsp;
    <Text
      h5
      size={25}
      css={{
        textGradient: "45deg, $yellow600 -20%, $green600 100%",
        m: 0,
      }}
      weight="bold"
    >
     BNB
    </Text>
    </Row>
    <Spacer />
        <Card isHoverable isPressable style={{textAlign: "center"}}>
            
        <Card.Header> <Text h5
      size={25}
      css={{
        textGradient: "45deg, $blue600 -20%, $pink600 100%",
      }}
      style={{margin:"0 auto"}}
      weight="bold">Your Rewards</Text></Card.Header>
          <Spacer />    <Spacer />
            <Card.Body>    <Row style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text
      style={{textAlign:"center"}}
      h5
      size={25}
      css={{
        textGradient: "45deg, $blue600 -5%, $pink600 40%",
        m: 0,
      }}
      weight="bold"
    >
      {Rewards}
    </Text>
    &nbsp;&nbsp;&nbsp;
    <Text
      h5
      size={25}
      css={{
        textGradient: "45deg, $blue600 -20%, $green600 100%",
        m: 0,
      }}
      weight="bold"
    >
      BNB
    </Text>
    </Row></Card.Body>
    <Spacer />    <Spacer />
    <Spacer />
    <Card.Body style={{margin:"0 auto"}}>
      { isClaiming ?
        <Loading color="primary" type="default" />
        :
        <Button size='lg' onClick={Claim} style={{width: "fit-content",margin:"0 auto"}} shadow>Claim Rewards</Button>
      }
    </Card.Body>
    <Spacer />    <Spacer />
        </Card>
    </Container>
  )
}

export default Claim