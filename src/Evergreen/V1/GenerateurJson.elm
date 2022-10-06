module Evergreen.V1.GenerateurJson exposing (..)


type alias Model =
    { nomObjet : String
    , sourceJson : String
    , codeElmGenere : String
    }


type Msg
    = NomObjet String
    | SourceJson String
    | GenererCodeElm
    | TelechargerCodeElm
