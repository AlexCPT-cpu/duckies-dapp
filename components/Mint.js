import React, { useContext, useState, useEffect } from 'react'
import { Container, Modal, Button, Text, Input, Row, Col, Card, Spacer, Loading } from "@nextui-org/react";
import { WalletConnectContext } from "../context/WalletConnectContext";
import truncateEthAddress from 'truncate-eth-address'

export const Mint = () => {

    const [visible, setVisible] = useState(false);
    const ConnectContext = useContext(WalletConnectContext);
    const { isConnected, ConnectWallet, Mint, setAmount, reciept, isMinting, cost, minted, chainId } = ConnectContext
  
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1 
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 
      }
    };

    
    const handler = () => setVisible(true);
  
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    const mint = async () => {
      isConnected ? Mint() : ConnectWallet()
      localStorage.setItem('isWalletConnected', true)
    }
    let transactionHash = "https://goerli.etherscan.io/tx/" + reciept

  return (
    <Container style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
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
    Duckies
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
    Minting Dapp
  </Text></Row>
  <Spacer />
  <Row>
    <Col>
    <Card isHoverable isPressable style={{textAlign:"center",border:"1px dashed yellowgreen",}}>
    <Card.Header> <Text h5
    size={28}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 100%",
    }}
    style={{margin:"0 auto"}}
    weight="bold"> {minted}/ 3000</Text></Card.Header>
    <Card.Divider />
    <br/>
    <Container css={{dflex:"center"}}>
    <Card.Image
    src="https://github.com/AlexCPT-cpu/duckie-squad/blob/main/src/assets/HomeGIF.gif?raw=true"
    alt="Default Image"
    style={{borderRadius:"20px"}}
    width="300px"
     />
    </Container>
    <Card.Body>
      { minted == 3000 ?
      <Text h6
    size={15}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 100%",
    }}
    style={{margin:"0 auto"}}
    >1 DUCKIE WAS SOLD AT {cost} BNB</Text>
  :
  <Text h6
  size={15}
  css={{
    textGradient: "45deg, $blue600 -20%, $pink600 100%",
  }}
  style={{margin:"0 auto"}}
  >1 DUCKIE COSTS {cost} BNB</Text>
  }
    <Spacer />
{ chainId != 5 ?
  <Text h6
    size={20}
    color="error"
    style={{margin:"0 auto"}}
    weight="bold"
    >connect to smartchain</Text>
  :
  <div></div>
  }
    
    </Card.Body>
    <Card.Divider />
    <Spacer />
{  minted == 3000 ?
  <Button auto shadow disabled style={{alignSelf:"center"}} onClick={handler}>
  Collection minted out
</Button>
   :
  <Button auto shadow style={{alignSelf:"center"}} onClick={handler}>
      Mint NFT
    </Button>}
    <Spacer /></Card>
    </Col>
    <Spacer />
    </Row>
    <Spacer />
{  minted == 3000 ?
<div>
</div>
:
 <Text h6
    size={18}
    css={{
      textGradient: "45deg, $pink600 -20%, $blue600 100%",
      m: 0
    }} style={{margin:"0 auto", textAlign:"center"}}>Please make sure your connected to the binance smartchain and the correct. Please Note: once you mint an NFT, you cannot undo this action.
    <Spacer /> We. recommend that you don't lower your gas limit</Text>}
{ visible ?
      <Modal
      closeButton
      aria-labelledby="modal-title"
      open={true}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          
        <Text h6
    size={18}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 100%",
    }}
    weight='bold'
    >
           Input mint amount
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          style={{textAlign:"center"}}
          placeholder="1"
          type="number"
          onChange={(e)=> setAmount(e.target.value)}
        />

      </Modal.Body>
      <Modal.Footer justify="space-between">
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
        { reciept ?
                   <Text h6
                   size={18}
                   css={{
                     textGradient: "45deg, $blue600 -20%, $pink600 100%",
                   }}
                   weight='bold'
                   >
                          <a href={transactionHash} target='_blank' rel='noreferrer'style={{textDecoration:"underline"}}>{truncateEthAddress(reciept)}</a>
                         </Text>
                         :
                         <div></div>
        }
        { isMinting ?
         <Loading color="primary" type="default" />
         :
                  <Button auto onClick={mint}>
          Mint
        </Button>  
        }
 
      </Modal.Footer>
    </Modal>
    :
    <div></div>
}

    </Container>
  </Container>
  )
}
