const initState = {
  nfts: [
    {"token_id":"183","num_sales":0,"background_color":null,"image_url":"https://storage.opensea.io/files/5a129929f454d03db9690faf3703d6da.svg","image_preview_url":"https://lh3.googleusercontent.com/C1gqiF6IrevQB6Ss7YKDMs-xWMqo3oDKH7mC6pageF3ubSAzYZg8azT57M7BoKUe_lW6rEG9iYYVd9cjmVo7eaSP=s250","image_thumbnail_url":"https://lh3.googleusercontent.com/C1gqiF6IrevQB6Ss7YKDMs-xWMqo3oDKH7mC6pageF3ubSAzYZg8azT57M7BoKUe_lW6rEG9iYYVd9cjmVo7eaSP=s128","image_original_url":"http://locksmith.unlock-protocol.com/lock/0x775E90a06A3D908940eC326924262b37943Aa140/icon","animation_url":null,"animation_original_url":null,"name":"Unlock Key","description":"A Key to an Unlock lock. Unlock is a protocol for memberships. https://unlock-protocol.com/","external_link":"","asset_contract":{"address":"0x775e90a06a3d908940ec326924262b37943aa140","asset_contract_type":"non-fungible","created_date":"2020-04-13T15:18:08.297839","name":"HackMoney","nft_version":"3.0","opensea_version":null,"owner":null,"schema_name":"ERC721","symbol":"","total_supply":"1","description":null,"external_link":null,"image_url":null,"default_to_fiat":false,"dev_buyer_fee_basis_points":0,"dev_seller_fee_basis_points":0,"only_proxied_transfers":false,"opensea_buyer_fee_basis_points":0,"opensea_seller_fee_basis_points":250,"buyer_fee_basis_points":0,"seller_fee_basis_points":250,"payout_address":null},"owner":{"user":{"username":"dmusan"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/27.png","address":"0xd20c29f34ee11ef39b0f14c3dfbc86833dd1d04b","config":"","discord_id":""},"permalink":"https://opensea.io/assets/0x775e90a06a3d908940ec326924262b37943aa140/183","collection":{"banner_image_url":null,"chat_url":null,"created_date":"2020-04-13T15:18:08.921548","default_to_fiat":false,"description":null,"dev_buyer_fee_basis_points":"0","dev_seller_fee_basis_points":"0","discord_url":null,"display_data":{"card_display_style":"padded","images":[]},"external_url":null,"featured":false,"featured_image_url":null,"hidden":true,"safelist_request_status":"not_requested","image_url":null,"is_subject_to_whitelist":false,"large_image_url":null,"medium_username":null,"name":"HackMoney","only_proxied_transfers":false,"opensea_buyer_fee_basis_points":"0","opensea_seller_fee_basis_points":"250","payout_address":null,"require_email":false,"short_description":null,"slug":"hackmoney","telegram_url":null,"twitter_username":null,"wiki_url":null},"decimals":0,"auctions":null,"sell_orders":[],"traits":[{"trait_type":"Expiration","value":1591778964,"display_type":"date","max_value":null,"trait_count":0,"order":null}],"last_sale":null,"top_bid":null,"current_price":null,"current_escrow_price":null,"listing_date":null,"is_presale":false,"transfer_fee_payment_token":null,"transfer_fee":null},
  ]
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'ADD_MY_NFTS') {
    let newNFTs = action.nftsList;
    return {
      nfts: newNFTs
    }
  }
  return state;
}

export default rootReducer;
