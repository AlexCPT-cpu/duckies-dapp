import React from 'react'
import NftTable from './NftTable';
import { Spacer, Button, Col, Row, Container, Table, Card, Grid, Dropdown, Image, Text } from '@nextui-org/react';

function Nftmap() {
  return (
    <>
    <Container>
      <NftTable setStatus={'Status'} />
      <Spacer />
      <Spacer />
      <NftTable setStatus={'Status'} />
      </Container>
    </>
  )
}

export default Nftmap