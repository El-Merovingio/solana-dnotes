import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Note } from "../target/types/note";
import { PublicKey } from '@solana/web3.js';
import { expect } from 'chai';
import * as assert from "assert";


const { SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3
const getDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
}
  const provider = anchor.setProvider(anchor.AnchorProvider.env());

  /* generate a random number, multiply this random number with the difference of 
     min and max and ultimately add min to it */
  
  const par1 = Math.floor(Math.random() * (256 - 1) + 1);
  const parsed_id = new anchor.BN(par1).toArrayLike(Buffer);

  const par2 = Math.floor(Date.now() / (Date.now() - 1) + 1);

  console.log('par1 ' + par1);
  console.log('par2 ' + par2);
  console.log('parsed_id ' + parsed_id);
