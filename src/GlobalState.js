import React, { createContext, useReducer, useContext } from 'react';
import jwtDecode from 'jwt-decode'

//checks local storage for items in the cart and sets the starting cart value accordingly if it's there.  If it's null, it will set the starting cart value to an empty array.
const saved = localStorage.getItem('cart')
//had to change this because the clear cart had to change when other things ended up in global storage.
let startCart = []
if (saved) {
  startCart = JSON.parse(saved)
}


let user = JSON.parse(localStorage.getItem('user'))

let animar = {
  "object": "card",
  "id": "1df98d4a-0f11-4064-a113-54ab14b9b3eb",
  "oracle_id": "725880b2-1675-414f-b61b-cf6533797dbf",
  "multiverse_ids": [
      442185
  ],
  "mtgo_id": 67306,
  "mtgo_foil_id": 67307,
  "tcgplayer_id": 161521,
  "cardmarket_id": 319243,
  "name": "Animar, Soul of Elements",
  "lang": "en",
  "released_at": "2018-03-16",
  "uri": "https://api.scryfall.com/cards/1df98d4a-0f11-4064-a113-54ab14b9b3eb",
  "scryfall_uri": "https://scryfall.com/card/a25/196/animar-soul-of-elements?utm_source=api",
  "layout": "normal",
  "highres_image": true,
  "image_status": "highres_scan",
  "image_uris": {
      "small": "https://c1.scryfall.com/file/scryfall-cards/small/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
      "normal": "https://c1.scryfall.com/file/scryfall-cards/normal/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
      "large": "https://c1.scryfall.com/file/scryfall-cards/large/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
      "png": "https://c1.scryfall.com/file/scryfall-cards/png/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.png?1562433472",
      "art_crop": "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
      "border_crop": "https://c1.scryfall.com/file/scryfall-cards/border_crop/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472"
  },
  "mana_cost": "{G}{U}{R}",
  "cmc": 3,
  "type_line": "Legendary Creature — Elemental",
  "oracle_text": "Protection from white and from black\nWhenever you cast a creature spell, put a +1/+1 counter on Animar, Soul of Elements.\nCreature spells you cast cost {1} less to cast for each +1/+1 counter on Animar.",
  "power": "1",
  "toughness": "1",
  "colors": [
      "G",
      "R",
      "U"
  ],
  "color_identity": [
      "G",
      "R",
      "U"
  ],
  "keywords": [
      "Protection"
  ],
  "legalities": {
      "standard": "not_legal",
      "future": "not_legal",
      "historic": "not_legal",
      "gladiator": "not_legal",
      "pioneer": "not_legal",
      "explorer": "not_legal",
      "modern": "not_legal",
      "legacy": "legal",
      "pauper": "not_legal",
      "vintage": "legal",
      "penny": "not_legal",
      "commander": "legal",
      "brawl": "not_legal",
      "historicbrawl": "not_legal",
      "alchemy": "not_legal",
      "paupercommander": "not_legal",
      "duel": "legal",
      "oldschool": "not_legal",
      "premodern": "not_legal"
  },
  "games": [
      "paper",
      "mtgo"
  ],
  "reserved": false,
  "foil": true,
  "nonfoil": true,
  "finishes": [
      "nonfoil",
      "foil"
  ],
  "oversized": false,
  "promo": false,
  "reprint": true,
  "variation": false,
  "set_id": "41ee6e2f-69b3-4c53-8a8e-960f5e974cfc",
  "set": "a25",
  "set_name": "Masters 25",
  "set_type": "masters",
  "set_uri": "https://api.scryfall.com/sets/41ee6e2f-69b3-4c53-8a8e-960f5e974cfc",
  "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aa25&unique=prints",
  "scryfall_set_uri": "https://scryfall.com/sets/a25?utm_source=api",
  "rulings_uri": "https://api.scryfall.com/cards/1df98d4a-0f11-4064-a113-54ab14b9b3eb/rulings",
  "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A725880b2-1675-414f-b61b-cf6533797dbf&unique=prints",
  "collector_number": "196",
  "digital": false,
  "rarity": "mythic",
  "watermark": "set",
  "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
  "artist": "Peter Mohrbacher",
  "artist_ids": [
      "c8f27311-46a5-4eaf-9b2e-d660ed1db649"
  ],
  "illustration_id": "99c11f64-4fda-41af-ad5b-29d4554de465",
  "border_color": "black",
  "frame": "2015",
  "security_stamp": "oval",
  "full_art": false,
  "textless": false,
  "booster": true,
  "story_spotlight": false,
  "edhrec_rank": 2484,
  "prices": {
      "usd": "7.25",
      "usd_foil": "70.91",
      "usd_etched": null,
      "eur": "4.40",
      "eur_foil": "39.95",
      "tix": "1.98"
  },
  "related_uris": {
      "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=442185",
      "tcgplayer_infinite_articles": "https://infinite.tcgplayer.com/search?contentMode=article&game=magic&partner=scryfall&q=Animar%2C+Soul+of+Elements&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall",
      "tcgplayer_infinite_decks": "https://infinite.tcgplayer.com/search?contentMode=deck&game=magic&partner=scryfall&q=Animar%2C+Soul+of+Elements&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall",
      "edhrec": "https://edhrec.com/route/?cc=Animar%2C+Soul+of+Elements"
  },
  "purchase_uris": {
      "tcgplayer": "https://www.tcgplayer.com/product/161521?page=1&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall",
      "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Animar%2C+Soul+of+Elements&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
      "cardhoarder": "https://www.cardhoarder.com/cards/67306?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
  },
  "_tokens": [],
  "_hasTokens": false,
  "card_faces": [
      {
          "object": "card_face",
          "artist": "Peter Mohrbacher",
          "colors": [
              "G",
              "R",
              "U"
          ],
          "illustration_id": "99c11f64-4fda-41af-ad5b-29d4554de465",
          "image_uris": {
              "small": "https://c1.scryfall.com/file/scryfall-cards/small/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
              "normal": "https://c1.scryfall.com/file/scryfall-cards/normal/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
              "large": "https://c1.scryfall.com/file/scryfall-cards/large/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
              "png": "https://c1.scryfall.com/file/scryfall-cards/png/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.png?1562433472",
              "art_crop": "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472",
              "border_crop": "https://c1.scryfall.com/file/scryfall-cards/border_crop/front/1/d/1df98d4a-0f11-4064-a113-54ab14b9b3eb.jpg?1562433472"
          },
          "mana_cost": "{G}{U}{R}",
          "name": "Animar, Soul of Elements",
          "oracle_id": "725880b2-1675-414f-b61b-cf6533797dbf",
          "oracle_text": "Protection from white and from black\nWhenever you cast a creature spell, put a +1/+1 counter on Animar, Soul of Elements.\nCreature spells you cast cost {1} less to cast for each +1/+1 counter on Animar.",
          "power": "1",
          "toughness": "1",
          "type_line": "Legendary Creature — Elemental",
          "watermark": "set"
      }
  ],
  "content_warning": false,
  "_isDoublesided": false
}

const initialState = {
  cart: startCart,
  currentUser: user ? jwtDecode(user.access) : null,
  currentUserToken: user ? user.access : null,
  card: {...animar},
  foil: "non",
  condition: 1
}


const GlobalStateContext = createContext(initialState);
const DispatchStateContext = createContext(undefined)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialState,
  );


  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext)
];