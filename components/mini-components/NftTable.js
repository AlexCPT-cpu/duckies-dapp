import React from 'react'
import { Spacer, Button, Col, Row, Container, Table, Card, Grid, Dropdown, Image, Text } from '@nextui-org/react';
import { NFTCONTRACT } from '../../configs/configurations';
import NftAbi from './NftAbi';

export default function NftTable(props) {

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

      const nft = () => {
        async function getnfts() {

        }
      }
      
  return (
    <div>
  <Table
      bordered
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="multiple"
    >
      <Table.Header>
        <Table.Column>NFT</Table.Column>
        <Table.Column>TokenID</Table.Column>
        <Table.Column>{props.setStatus}</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell><Image  alt="logo" css={{width:'$32',height:'$32'}} src="https://github.com/AlexCPT-cpu/duckie-squad/blob/main/src/assets/HomeGIF.gif?raw=true" /></Table.Cell>
          <Table.Cell>#1</Table.Cell>
          <Table.Cell>Ready to Stake</Table.Cell>
        </Table.Row>
        </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={3}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
    <Spacer />
    </div>
  )
}
