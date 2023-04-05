import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Note } from "../target/types/note";
import { PublicKey } from '@solana/web3.js';
import { expect } from 'chai';
import * as assert from "assert";

const { SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3



describe("Constraints test", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.setProvider(anchor.AnchorProvider.env());

    const par1 = Math.floor(Math.random() * (256 - 1) + 1);
    const parsed_id = new anchor.BN(par1).toArrayLike(Buffer);
    const program = anchor.workspace.Note as Program<Note>;

    const programProvider = program.provider as anchor.AnchorProvider;
    const user = programProvider.wallet.publicKey;
    const otherUser = anchor.web3.Keypair.generate();

    const title = "Constraints Testing"
    const description = "Constraints Testing description"

    it("Constraints Creating note!", async () => {

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
                    systemProgram: SystemProgram.programId,
                }
            ).rpc()

        expect((await program.account.note.fetch(note)).title).to.equal("Constraints Testing");
        expect((await program.account.note.fetch(note)).description).to.equal("Constraints Testing description");
        //await (await program.account.note.fetch(note)).title
        console.log("Your transaction signature", tx);
        console.log("Your note ID: ", note);
        console.log("Your Program ID", program.programId);
        console.log("Sysvar Rent ID", SYSVAR_RENT_PUBKEY);
    });

    it("Checking updating constraints!", async () => {
        const updated_title = "Constraints Testing update"
        const updated_description = "Constraints Testing updated"
        const [note, _] = await PublicKey.findProgramAddressSync([
            anchor.utils.bytes.utf8.encode("noteaccount"), // first seed
            user.toBuffer(), // the user address who is creating the bank
            parsed_id
        ], program.programId)

        // Add your test here.
        try {
            const tx = await program.methods.updateNote(
                updated_title, updated_description).accounts(
                    {
                        note: note,
                        user: otherUser.publicKey,
                        systemProgram: SystemProgram.programId,
                    }
                ).rpc()

            expect((await program.account.note.fetch(note)).title).to.equal("Constraints Testing update");
            expect((await program.account.note.fetch(note)).description).to.equal("Constraints Testing updated ");

            console.log("Your transaction signature", tx);
            console.log("Your note ID: ", note);
            console.log("Your Program ID", program.programId);
            
            console.log('%cThis text has a yellow background!', 'background-color: yellow');
            console.log('%cThis text is red and has a larger font!', 'color: red; font-size: larger');

        } catch (err) { console.log("\x1b[1;4;31m" + err) }
    });

    it("Constraints Deleting note!", async () => {
        const [note, _] = await PublicKey.findProgramAddressSync([
            anchor.utils.bytes.utf8.encode("noteaccount"), // first seed
            user.toBuffer(), // the user address who is creating the bank
            parsed_id
        ], program.programId)

        // Add your test here.
        try {
            const tx = await program.methods.deleteNote().accounts(
                {
                    note: note,
                    user: otherUser.publicKey,
                    systemProgram: SystemProgram.programId,
                }
            ).rpc()

            const noteAccount = await program.account.note.fetchNullable(note);
            assert.ok(noteAccount === null);

            console.log("Your transaction signature", tx);
            console.log("Your note ID: ", note);
            console.log("Your Program ID", program.programId);
        } catch (err) { console.log("\x1b[1;4;31m" + err) }
    });


});
