module Evergreen.V1.GenerateurDeProblemes exposing (..)


type alias Model =
    { structureDuSujet : String
    , sujetGenere : String
    }


type Msg
    = StructureDuSujet String
    | GenererSujetAleatoire
    | GenererVariantesSujet
    | SujetGenere String
    | TelechargerSujet
