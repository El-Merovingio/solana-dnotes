use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("ANjbSZys9sYrPfywRWk68GhW5eRFQG8qJ3QV3K6csoGE");

#[program]
pub mod note {
    use super::*;

    pub fn create_note(ctx: Context<CreateNote>, parsed_id: u8, title: String, description: String) -> ProgramResult {
        let note = &mut ctx.accounts.note;

        if title.chars().count() > 50 || description.chars().count() > 500 {
            return Err(ProgramError::InvalidInstructionData)
        }

        msg!("parsed_id: {:?}", &[parsed_id as u8]);
        let note_ts = Clock::get()?.unix_timestamp;
        note.id = parsed_id;
        note.owner = *ctx.accounts.user.key;
        note.title = title;
        note.description = description;
        note.timestamp = note_ts;
        note.last_edit = note_ts;
        msg!("Note.id (Parsed ID): {:?}", note.id);
        Ok({})
    }

    pub fn update_note(ctx: Context<UpdateNote>, title: String, description: String) -> ProgramResult {
        let note = &mut ctx.accounts.note;
        let note_ts = Clock::get()?.unix_timestamp;
        if note_ts < note.timestamp {
            return Err(ProgramError::InvalidArgument);
        }
        if title.chars().count() > 50 || description.chars().count() > 500 {
            return Err(ProgramError::InvalidInstructionData)
        }
        note.title = title;
        note.description = description;
        note.last_edit = note_ts;
        Ok(())
    }

    pub fn delete_note(_ctx: Context<DeleteNote>) -> ProgramResult {
        Ok(())
    }

}
    #[derive(Accounts)]
    #[instruction(id: u8)]
    pub struct CreateNote<'info> {
        // seeds with random number
        #[account(init, payer=user, space=2249, seeds=[b"noteaccount", user.key().as_ref(), &[id as u8]], bump)]
        pub note: Account<'info, Note>,
        #[account(mut)]
        pub user: Signer<'info>,
        pub rent: Sysvar<'info, Rent>,
        pub system_program: Program<'info, System>,
    }

    #[account]
    pub struct Note {
        pub id: u8, // 1 byte
        pub owner: Pubkey, // 32 bytes
        pub title: String, // 50 * 4
        pub description: String, // 500 * 4
        pub timestamp: i64, // 8
        pub last_edit: i64 // 8
        // total size = 2249
    }

    #[derive(Accounts)]
    pub struct UpdateNote<'info> {
        #[account(mut, constraint = user.key() == note.owner)]
        pub note: Account<'info, Note>,
        #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>,
    }

    #[derive(Accounts)]
    pub struct DeleteNote<'info> {
        #[account(mut, close = user, constraint = user.key() == note.owner)]
        pub note: Account<'info, Note>,
        #[account(mut)]
        pub user: Signer<'info>,
        pub system_program: Program<'info, System>,
    }