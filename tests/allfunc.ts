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


describe("dnotes", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.setProvider(anchor.AnchorProvider.env());
  const par1 = Math.floor(Math.random() * (256 - 1) + 1);
  const parsed_id = new anchor.BN(par1).toArrayLike(Buffer);
  console.log("PARSED ID " + parsed_id);
  console.log("par1      " + par1);
  const program = anchor.workspace.Note as Program<Note>;
  const programProvider = program.provider as anchor.AnchorProvider;
  const user = programProvider.wallet.publicKey;

  const title = "Testing"
  const description = "Testing description"

  
  it("Creating note!", async () => {
    const [note, _] = await PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode("noteaccount"), // first seed
      user.toBuffer(), // the user address who is creating the bank
      parsed_id
  ], program.programId)

    // Add your test here.
    const tx = await program.methods.createNote(
      par1, title, description).accounts(
        {
          note: note,
          user: programProvider.wallet.publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,}
      ).rpc()

      expect((await program.account.note.fetch(note)).title).to.equal("Testing");
      expect((await program.account.note.fetch(note)).description).to.equal("Testing description");
    const nts = (await program.account.note.fetch(note)).timestamp
    const nts2 = Number(nts);
    const date: Date = getDate(nts2);
    console.log("Creation Date: " + date.toUTCString()); // 2021-09-02T06:30:45.000Z

    console.log("Your transaction signature", tx);
    console.log("Your note ID: ", note);
    console.log("Your Program ID", program.programId);
    console.log("Sysvar Rent ID", SYSVAR_RENT_PUBKEY);

    
  });

  it("Updating note!", async () => {
    const updated_title = "Testing update"
    const updated_description = "Testing updated descripting"
    const [note, _] = await PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode("noteaccount"), // first seed
      user.toBuffer(), // the user address who is creating the bank
      parsed_id
  ], program.programId)
  
    // Add your test here.
    const tx = await program.methods.updateNote(
      updated_title, updated_description).accounts(
        {
          note: note,
          user: programProvider.wallet.publicKey,
          systemProgram: SystemProgram.programId,}
      ).rpc()

      expect((await program.account.note.fetch(note)).title).to.equal("Testing update");
      expect((await program.account.note.fetch(note)).description).to.equal("Testing updated descripting");
      
    const nts = (await program.account.note.fetch(note)).timestamp
    const nts2 = Number(nts);
    const date: Date = getDate(nts2);
    console.log("Creation Date: " + date.toUTCString()); // 2021-09-02T06:30:45.000Z
    
    const unts = (await program.account.note.fetch(note)).lastEdit
    const unts2 = Number(unts);
    const udate: Date = getDate(unts2);
    console.log("Update Date: " + udate.toUTCString()); // 2021-09-02T06:30:45.000Z

    
    console.log("Your transaction signature", tx);
    console.log("Your note ID: ", note);
    console.log("Your Program ID", program.programId);
  });

  it("Deleting note!", async () => {
    const [note, _] = await PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode("noteaccount"), // first seed
      user.toBuffer(), // the user address who is creating the bank
      parsed_id
  ], program.programId)
  
    // Add your test here.
    const tx = await program.methods.deleteNote().accounts(
        {
          note: note,
          user: programProvider.wallet.publicKey,
          systemProgram: SystemProgram.programId,}
      ).rpc()
           
      const noteAccount = await program.account.note.fetchNullable(note);
      assert.ok(noteAccount === null);
    
    console.log("Your transaction signature", tx);
    console.log("Your note ID: ", note);
    console.log("Your Program ID", program.programId);
  });

});
