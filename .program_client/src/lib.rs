// DO NOT EDIT - automatically generated file (except `use` statements inside the `*_instruction` module
pub mod note_instruction {
    use trdelnik_client::*;
    pub static PROGRAM_ID: Pubkey = Pubkey::new_from_array([
        139u8, 74u8, 138u8, 81u8, 17u8, 79u8, 176u8, 104u8, 179u8, 243u8, 235u8, 78u8, 157u8,
        171u8, 83u8, 56u8, 243u8, 212u8, 115u8, 139u8, 21u8, 255u8, 180u8, 235u8, 28u8, 248u8,
        138u8, 249u8, 248u8, 80u8, 24u8, 139u8,
    ]);
    pub async fn create_note(
        client: &Client,
        i_parsed_id: u8,
        i_title: String,
        i_description: String,
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_rent: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
        signers: impl IntoIterator<Item = Keypair> + Send + 'static,
    ) -> Result<EncodedConfirmedTransactionWithStatusMeta, ClientError> {
        Ok(client
            .send_instruction(
                PROGRAM_ID,
                note::instruction::CreateNote {
                    parsed_id: i_parsed_id,
                    title: i_title,
                    description: i_description,
                },
                note::accounts::CreateNote {
                    note: a_note,
                    user: a_user,
                    rent: a_rent,
                    system_program: a_system_program,
                },
                signers,
            )
            .await?)
    }
    pub fn create_note_ix(
        i_parsed_id: u8,
        i_title: String,
        i_description: String,
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_rent: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
    ) -> Instruction {
        Instruction {
            program_id: PROGRAM_ID,
            data: note::instruction::CreateNote {
                parsed_id: i_parsed_id,
                title: i_title,
                description: i_description,
            }
            .data(),
            accounts: note::accounts::CreateNote {
                note: a_note,
                user: a_user,
                rent: a_rent,
                system_program: a_system_program,
            }
            .to_account_metas(None),
        }
    }
    pub async fn update_note(
        client: &Client,
        i_title: String,
        i_description: String,
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
        signers: impl IntoIterator<Item = Keypair> + Send + 'static,
    ) -> Result<EncodedConfirmedTransactionWithStatusMeta, ClientError> {
        Ok(client
            .send_instruction(
                PROGRAM_ID,
                note::instruction::UpdateNote {
                    title: i_title,
                    description: i_description,
                },
                note::accounts::UpdateNote {
                    note: a_note,
                    user: a_user,
                    system_program: a_system_program,
                },
                signers,
            )
            .await?)
    }
    pub fn update_note_ix(
        i_title: String,
        i_description: String,
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
    ) -> Instruction {
        Instruction {
            program_id: PROGRAM_ID,
            data: note::instruction::UpdateNote {
                title: i_title,
                description: i_description,
            }
            .data(),
            accounts: note::accounts::UpdateNote {
                note: a_note,
                user: a_user,
                system_program: a_system_program,
            }
            .to_account_metas(None),
        }
    }
    pub async fn delete_note(
        client: &Client,
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
        signers: impl IntoIterator<Item = Keypair> + Send + 'static,
    ) -> Result<EncodedConfirmedTransactionWithStatusMeta, ClientError> {
        Ok(client
            .send_instruction(
                PROGRAM_ID,
                note::instruction::DeleteNote {},
                note::accounts::DeleteNote {
                    note: a_note,
                    user: a_user,
                    system_program: a_system_program,
                },
                signers,
            )
            .await?)
    }
    pub fn delete_note_ix(
        a_note: anchor_lang::solana_program::pubkey::Pubkey,
        a_user: anchor_lang::solana_program::pubkey::Pubkey,
        a_system_program: anchor_lang::solana_program::pubkey::Pubkey,
    ) -> Instruction {
        Instruction {
            program_id: PROGRAM_ID,
            data: note::instruction::DeleteNote {}.data(),
            accounts: note::accounts::DeleteNote {
                note: a_note,
                user: a_user,
                system_program: a_system_program,
            }
            .to_account_metas(None),
        }
    }
}
